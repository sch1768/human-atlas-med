# Open3DModel upper-limb pilot

This branch evaluates Open3DModel as a regional supplement to the BodyParts3D
male reference atlas. It does not replace or modify the current BodyParts3D
assets.

## Source snapshot

- Dataset: Open3DModel upper limb, July 2025
- Project page: https://anatomytool.org/open3dmodel-create
- OBJ archive: https://caskanatomy.info/open3dmodelfiles/upper-limb/upper-limb-obj.zip
- License linked for this archive: CC BY-SA 4.0
- Downloaded archive size: 21,336,550 bytes
- Reconstructed archive SHA-256: `70855490E82FC8CDE6A30DA60A46C1DFA62F32F115D3D5C1DD6DC496124C466B`
- Extracted OBJ: `upper-limb.obj`, 106,049,758 bytes

The source archive is intentionally not committed. Keep third-party source
files outside the repository and pass their path to the audit/import scripts.

## Initial audit

- 532 unique OBJ objects
- 50 nerve, root, division, cord, or plexus-related objects after excluding
  similarly named vascular and ligament structures
- Coordinates appear to be meters with Y as the superior axis.
- Right-sided structures commonly use the `.r` suffix and lie on negative X,
  matching the current BodyParts3D stage orientation.
- Open3DModel normally stores one side and mirrors bilateral structures in its
  viewer. The importer must materialize left-side geometry and stable IDs rather
  than depending on viewer-specific mirroring.

Run the reproducible audit with:

```powershell
node scripts/audit-open3d-obj.mjs C:\path\to\upper-limb.obj
```

## First pilot concepts

The first integration slice should map the following existing terminology and
relationship concepts to geometry:

- brachial plexus (C5-T1 roots, trunks, divisions, and cords)
- axillary nerve
- musculocutaneous nerve
- median nerve
- ulnar nerve
- radial nerve

Digital and named cutaneous branches remain in the source audit, but should be
added only after the six primary concepts pass registration and interaction QA.

## Acceptance gates

1. Compare Open3DModel and BodyParts3D clavicle, scapula, and humerus landmarks.
2. Decide between neurovascular-only overlay and complete upper-limb regional
   replacement based on visible registration error.
3. Namespace every new geometry ID with its source; do not reuse `FJ` IDs.
4. Preserve per-object provenance and CC BY-SA attribution in generated data.
5. Load the pilot pack on demand so the current initial download is unchanged.
6. Verify search, selection, isolate, ghost, regional anatomy, and clinical-space
   behavior for all six concepts on desktop and mobile.
