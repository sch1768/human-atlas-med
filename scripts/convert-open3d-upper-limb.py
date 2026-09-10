"""Build the Open3DModel upper-limb nerve pilot pack.

Usage:
    python scripts/convert-open3d-upper-limb.py PATH_TO_UPPER_LIMB_OBJ

The source archive is not stored in this repository. Source, license, snapshot,
and audit details are documented in docs/open3d-upper-limb-pilot.md.
"""

import gzip
import json
import math
import struct
import sys
from array import array
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONFIG_PATH = ROOT / "scripts" / "data" / "open3d-upper-limb-pilot.json"
OUTPUT_DIR = ROOT / "public" / "models"
MANIFEST_NAME = "open3d-upper-limb-pilot.json"
BIN_NAME = "open3d-upper-limb-pilot-0.bin"


def normalized(values):
    length = math.sqrt(sum(value * value for value in values)) or 1.0
    return tuple(value / length for value in values)


def compute_normals(positions, indices):
    result = [[0.0, 0.0, 0.0] for _ in positions]
    for offset in range(0, len(indices), 3):
        ia, ib, ic = indices[offset : offset + 3]
        a, b, c = positions[ia], positions[ib], positions[ic]
        ab = (b[0] - a[0], b[1] - a[1], b[2] - a[2])
        ac = (c[0] - a[0], c[1] - a[1], c[2] - a[2])
        face = (
            ab[1] * ac[2] - ab[2] * ac[1],
            ab[2] * ac[0] - ab[0] * ac[2],
            ab[0] * ac[1] - ab[1] * ac[0],
        )
        for index in (ia, ib, ic):
            for axis in range(3):
                result[index][axis] += face[axis]
    return [normalized(value) for value in result]


def parse_selected_objects(filename, selected):
    extracted = {}
    current_name = None
    current = None
    global_vertices = 0
    global_normals = 0
    vertex_start = 0
    normal_start = 0

    def finish():
        nonlocal current
        if not current:
            return
        if not current["indices"]:
            raise ValueError(f"Selected object has no faces: {current_name}")
        if any(value is None for value in current["normals"]):
            current["normals"] = compute_normals(current["positions"], current["indices"])
        extracted[current_name] = current
        current = None

    with filename.open("r", encoding="utf-8-sig", errors="strict") as source:
        for raw in source:
            if raw.startswith("o "):
                finish()
                current_name = raw[2:].strip()
                vertex_start = global_vertices
                normal_start = global_normals
                if current_name in selected:
                    current = {
                        "source_positions": [],
                        "source_normals": [],
                        "positions": [],
                        "normals": [],
                        "indices": [],
                        "vertex_map": {},
                    }
                continue
            if raw.startswith("v "):
                point = tuple(map(float, raw.split()[1:4]))
                global_vertices += 1
                if current is not None:
                    current["source_positions"].append(point)
            elif raw.startswith("vn "):
                normal = normalized(tuple(map(float, raw.split()[1:4])))
                global_normals += 1
                if current is not None:
                    current["source_normals"].append(normal)
            elif raw.startswith("f ") and current is not None:
                polygon = []
                for token in raw.split()[1:]:
                    fields = token.split("/")
                    vertex_index = int(fields[0])
                    normal_index = int(fields[2]) if len(fields) > 2 and fields[2] else None
                    if vertex_index < 0 or (normal_index is not None and normal_index < 0):
                        raise ValueError(f"Negative OBJ indices are not supported: {current_name}")
                    local_vertex = vertex_index - vertex_start - 1
                    local_normal = normal_index - normal_start - 1 if normal_index is not None else None
                    if not 0 <= local_vertex < len(current["source_positions"]):
                        raise ValueError(f"Cross-object vertex reference in {current_name}")
                    key = (local_vertex, local_normal)
                    output_index = current["vertex_map"].get(key)
                    if output_index is None:
                        output_index = len(current["positions"])
                        current["vertex_map"][key] = output_index
                        current["positions"].append(current["source_positions"][local_vertex])
                        normal = None
                        if local_normal is not None and 0 <= local_normal < len(current["source_normals"]):
                            normal = current["source_normals"][local_normal]
                        current["normals"].append(normal)
                    polygon.append(output_index)
                for index in range(1, len(polygon) - 1):
                    current["indices"].extend((polygon[0], polygon[index], polygon[index + 1]))
    finish()

    missing = sorted(selected - extracted.keys())
    if missing:
        raise ValueError(f"Mapped OBJ objects were not found: {', '.join(missing)}")
    return extracted


def smoothstep(value):
    value = max(0.0, min(1.0, value))
    return value * value * (3.0 - 2.0 * value)


def contraction_weight(point, settings):
    y_min, y_max = map(float, settings["yRange"])
    feather = float(settings.get("yFeather", 0))
    if not y_min <= point[1] <= y_max:
        return 0.0
    y_weight = 1.0
    if feather > 0:
        y_weight = min(
            smoothstep((point[1] - y_min) / feather),
            smoothstep((y_max - point[1]) / feather),
        )
    full_x, zero_x = map(float, settings["lateralXRange"])
    if point[0] <= full_x:
        x_weight = 1.0
    elif point[0] >= zero_x:
        x_weight = 0.0
    else:
        x_weight = smoothstep((zero_x - point[0]) / (zero_x - full_x))
    return y_weight * x_weight


def contract_around_humerus(point, settings):
    weight = contraction_weight(point, settings)
    if weight <= 0:
        return point
    axis_x, axis_z = map(float, settings["axisXZ"])
    dx, dz = point[0] - axis_x, point[2] - axis_z
    radius = math.hypot(dx, dz)
    radius_floor = float(settings["radiusFloor"])
    if radius <= radius_floor:
        return point
    target_radius = radius_floor + (radius - radius_floor) * float(settings["factor"])
    adjusted_radius = radius + (target_radius - radius) * weight
    ratio = adjusted_radius / radius
    return (
        axis_x + dx * ratio,
        point[1],
        axis_z + dz * ratio,
    )


def apply_path_offsets(point, controls):
    controls = sorted(controls, key=lambda control: float(control["y"]))
    if not controls:
        return point
    y = point[1]
    if y <= float(controls[0]["y"]):
        offset = controls[0]["offset"]
    elif y >= float(controls[-1]["y"]):
        offset = controls[-1]["offset"]
    else:
        for lower, upper in zip(controls, controls[1:]):
            lower_y, upper_y = float(lower["y"]), float(upper["y"])
            if lower_y <= y <= upper_y:
                blend = smoothstep((y - lower_y) / (upper_y - lower_y))
                offset = [
                    float(lower["offset"][axis]) * (1.0 - blend)
                    + float(upper["offset"][axis]) * blend
                    for axis in range(3)
                ]
                break
    return tuple(point[axis] + float(offset[axis]) for axis in range(3))


def apply_object_transform(point, object_transform):
    transformed = point
    if object_transform.get("pathOffsets"):
        transformed = apply_path_offsets(transformed, object_transform["pathOffsets"])
    if object_transform.get("radialContraction"):
        transformed = contract_around_humerus(
            transformed,
            object_transform["radialContraction"],
        )
    return transformed


def transformed_geometry(geometry, mirror, scale, translation, object_transform=None):
    positions = []
    normals = []
    for point, normal in zip(geometry["positions"], geometry["normals"]):
        transformed = (
            point[0] * scale + translation[0],
            point[1] * scale + translation[1],
            point[2] * scale + translation[2],
        )
        if object_transform:
            transformed = apply_object_transform(transformed, object_transform)
        x = -transformed[0] if mirror else transformed[0]
        nx = -normal[0] if mirror else normal[0]
        positions.append((x, transformed[1], transformed[2]))
        normals.append(normalized((nx, normal[1], normal[2])))
    indices = list(geometry["indices"])
    if mirror:
        for offset in range(0, len(indices), 3):
            indices[offset + 1], indices[offset + 2] = indices[offset + 2], indices[offset + 1]
    if object_transform:
        normals = compute_normals(positions, indices)
    return positions, normals, indices


def validate_local_correction(geometry, scale, translation, object_transform):
    before, _, _ = transformed_geometry(geometry, False, scale, translation)
    after, _, _ = transformed_geometry(
        geometry,
        False,
        scale,
        translation,
        object_transform,
    )
    radial_settings = object_transform.get("radialContraction")
    changed_radii_before = [] if radial_settings else None
    changed_radii_after = [] if radial_settings else None
    max_displacement = 0.0
    medial_displacement = 0.0
    changed_vertices = 0
    for original, corrected in zip(before, after):
        displacement = math.dist(original, corrected)
        max_displacement = max(max_displacement, displacement)
        if displacement > 1e-8:
            changed_vertices += 1
        if radial_settings:
            axis_x, axis_z = map(float, radial_settings["axisXZ"])
            _, zero_x = map(float, radial_settings["lateralXRange"])
            if original[0] >= zero_x:
                medial_displacement = max(medial_displacement, displacement)
            if displacement > 1e-8:
                changed_radii_before.append(math.hypot(original[0] - axis_x, original[2] - axis_z))
                changed_radii_after.append(math.hypot(corrected[0] - axis_x, corrected[2] - axis_z))
    if not changed_vertices:
        raise ValueError("Configured local correction did not move any vertices")
    if radial_settings and medial_displacement > 1e-8:
        raise ValueError("Axillary-nerve correction moved the protected medial origin")
    if radial_settings and sum(changed_radii_after) >= sum(changed_radii_before):
        raise ValueError("Axillary-nerve correction did not reduce the lateral radius")
    max_allowed = float(object_transform.get("maxDisplacement", 0.025))
    if max_displacement > max_allowed:
        raise ValueError(
            f"Local correction exceeded its {max_allowed * 1000:.1f} mm displacement guardrail"
        )
    metrics = {
        "changedVertices": changed_vertices,
        "maxDisplacementMillimeters": round(max_displacement * 1000, 3),
    }
    if radial_settings:
        metrics["meanRadiusBeforeMillimeters"] = round(
            sum(changed_radii_before) / len(changed_radii_before) * 1000,
            3,
        )
        metrics["meanRadiusAfterMillimeters"] = round(
            sum(changed_radii_after) / len(changed_radii_after) * 1000,
            3,
        )
    return metrics


def main():
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    source_path = Path(sys.argv[1]).resolve()
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    selected = {entry["sourceObject"] for entry in config["objects"]}
    geometries = parse_selected_objects(source_path, selected)
    transform = config.get("transform", {})
    scale = float(transform.get("scale", 1))
    translation = tuple(map(float, transform.get("translation", [0, 0, 0])))
    object_transforms = config.get("objectTransforms", {})

    blob = bytearray()
    parts = []
    correction_metrics = {}

    def append(values, typecode):
        while len(blob) % 4:
            blob.append(0)
        offset = len(blob)
        blob.extend(array(typecode, values).tobytes())
        return offset

    for entry in config["objects"]:
        geometry = geometries[entry["sourceObject"]]
        object_transform = object_transforms.get(entry["sourceObject"])
        if object_transform:
            correction_metrics[entry["sourceObject"]] = validate_local_correction(
                geometry,
                scale,
                translation,
                object_transform,
            )
        for side, mirror in (("right", False), ("left", True)):
            positions, normals, indices = transformed_geometry(
                geometry,
                mirror,
                scale,
                translation,
                object_transform,
            )
            flat_positions = [value for point in positions for value in point]
            flat_normals = [
                max(-32767, min(32767, round(value * 32767)))
                for normal in normals
                for value in normal
            ]
            position_offset = append(flat_positions, "f")
            normal_offset = append(flat_normals, "h")
            index_offset = append(indices, "I")
            bounds = [
                [min(point[axis] for point in positions) for axis in range(3)],
                [max(point[axis] for point in positions) for axis in range(3)],
            ]
            part_id = f"open3d:upper-limb:{entry['slug']}:{side}"
            parts.append({
                "id": part_id,
                "name": f"{side.title()} {entry['name']}",
                "conceptId": f"open3d:upper-limb:concept:{entry['concept']}:{side}",
                "system": "nervous",
                "source": "Open3DModel",
                "sourceObjectId": entry["sourceObject"],
                "licenseId": "CC-BY-SA-4.0",
                "laterality": side,
                "chunk": 0,
                "positions": position_offset,
                "normals": normal_offset,
                "indices": index_offset,
                "vertexCount": len(positions),
                "indexCount": len(indices),
                "bounds": bounds,
            })

    concepts = []
    entries_by_source = {entry["sourceObject"]: entry for entry in config["objects"]}
    for concept in config["concepts"]:
        by_side = {}
        for side in ("right", "left"):
            elements = [
                part["id"]
                for part in parts
                if part["laterality"] == side
                and (
                    entries_by_source[part["sourceObjectId"]]["concept"] == concept["slug"]
                    or concept["slug"]
                    in entries_by_source[part["sourceObjectId"]].get("parents", [])
                )
            ]
            if not elements:
                raise ValueError(f"Concept has no mapped geometry: {concept['slug']}:{side}")
            by_side[side] = elements
            concepts.append({
                "id": f"open3d:upper-limb:concept:{concept['slug']}:{side}",
                "name": f"{side.title()} {concept['name']}",
                "elements": elements,
            })
        concepts.append({
            "id": f"open3d:upper-limb:concept:{concept['slug']}",
            "name": concept["name"],
            "elements": by_side["right"] + by_side["left"],
        })

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    binary_path = OUTPUT_DIR / BIN_NAME
    binary_path.write_bytes(blob)
    compressed = gzip.compress(blob, compresslevel=9)
    (OUTPUT_DIR / f"{BIN_NAME}.gz").write_bytes(compressed)
    manifest = {
        "version": config["source"]["version"],
        "sex": "male",
        "source": config["source"]["name"],
        "scope": "Upper-limb nerve pilot enabled by default on codex/newdatabase",
        "license": config["source"]["license"],
        "licenseUrl": config["source"]["licenseUrl"],
        "attribution": config["source"]["attribution"],
        "registration": config.get("registration"),
        "adaptations": config.get("adaptations", []),
        "correctionMetrics": correction_metrics,
        "parts": parts,
        "concepts": concepts,
        "chunks": [{
            "url": f"/models/{BIN_NAME}",
            "bytes": len(blob),
            "gzip": f"/models/{BIN_NAME}.gz",
            "gzipBytes": len(compressed),
        }],
        "triangles": sum(part["indexCount"] for part in parts) // 3,
    }
    (OUTPUT_DIR / MANIFEST_NAME).write_text(
        json.dumps(manifest, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    print(json.dumps({
        "parts": len(parts),
        "concepts": len(concepts),
        "triangles": manifest["triangles"],
        "bytes": len(blob),
        "gzipBytes": len(compressed),
    }, indent=2))


if __name__ == "__main__":
    main()
