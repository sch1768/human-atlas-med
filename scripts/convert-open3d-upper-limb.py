"""Build the opt-in Open3DModel upper-limb nerve pilot pack.

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


def transformed_geometry(geometry, mirror, scale, translation):
    positions = []
    normals = []
    for point, normal in zip(geometry["positions"], geometry["normals"]):
        x = -point[0] if mirror else point[0]
        nx = -normal[0] if mirror else normal[0]
        positions.append((
            x * scale + translation[0],
            point[1] * scale + translation[1],
            point[2] * scale + translation[2],
        ))
        normals.append(normalized((nx, normal[1], normal[2])))
    indices = list(geometry["indices"])
    if mirror:
        for offset in range(0, len(indices), 3):
            indices[offset + 1], indices[offset + 2] = indices[offset + 2], indices[offset + 1]
    return positions, normals, indices


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

    blob = bytearray()
    parts = []

    def append(values, typecode):
        while len(blob) % 4:
            blob.append(0)
        offset = len(blob)
        blob.extend(array(typecode, values).tobytes())
        return offset

    for entry in config["objects"]:
        geometry = geometries[entry["sourceObject"]]
        for side, mirror in (("right", False), ("left", True)):
            positions, normals, indices = transformed_geometry(geometry, mirror, scale, translation)
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
    for concept in config["concepts"]:
        by_side = {}
        for side in ("right", "left"):
            elements = [
                part["id"]
                for part in parts
                if part["conceptId"] == f"open3d:upper-limb:concept:{concept['slug']}:{side}"
            ]
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
        "scope": "Opt-in upper-limb nerve pilot",
        "license": config["source"]["license"],
        "licenseUrl": config["source"]["licenseUrl"],
        "attribution": config["source"]["attribution"],
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
