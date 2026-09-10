# Open3DModel upper-limb pilot

This branch evaluates Open3DModel as a regional supplement to the BodyParts3D
male reference atlas. It does not replace or modify the current BodyParts3D
assets. The supplement is enabled by default on `codex/newdatabase`; append
`?pilot=off` only when a clean BodyParts3D comparison is needed.

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

Following route review, the pilot now also includes the radial deep,
posterior-interosseous, superficial, cutaneous, and dorsal digital branches;
the musculocutaneous continuation as the lateral cutaneous nerve of the
forearm; the recurrent branch of the median nerve; and the palmar, dorsal,
deep, communicating, and digital branches of the ulnar nerve. Each branch is
searchable independently and remains included when its parent nerve is selected.

## Registration and axillary-nerve correction

The initial zero-transform overlay visibly displaced the shoulder nerves. The
current import applies a 3D translation of `(4.586, 8.862, 6.667) mm`, derived
from the mean center offsets of the right clavicle, scapula, and humerus. After
translation, residual center error is 6.35 mm at the clavicle, 2.30 mm at the
scapula, and 6.00 mm at the humerus. These values describe anchor-center
alignment, not full surface correspondence.

The source object combines the axillary nerve with the superior lateral
cutaneous nerve of the arm. Its lateral loop also sat superficial to the
BodyParts3D deltoid. A feathered local deformation now contracts only the
lateral shoulder segment toward the humeral axis. The medial origin is fixed,
and the correction is mirrored after deformation so both sides remain
geometrically symmetric.

The target relationship follows the documented course through the quadrangular
space, around the surgical neck of the humerus, and into the deltoid. This is a
registration correction, not a claim that every terminal branch has completed
expert anatomical validation.

- https://www.ncbi.nlm.nih.gov/books/NBK493212/
- https://pubmed.ncbi.nlm.nih.gov/9381311/

The radial-nerve trunk already travels posteriorly and laterally around the
humeral shaft in the source coordinates. Its course looked incomplete because
the distal deep branch, posterior interosseous nerve, and superficial branch
were not imported. Those objects now continue the route around the radial neck,
through the supinator, and toward the dorsolateral hand.

The ulnar-nerve trunk passed behind the medial epicondyle but remained in the
posterior forearm for too long. A feathered path correction now moves the
segment immediately distal to the cubital tunnel anteriorly by up to 32 mm,
then returns to the source path toward the wrist. The imported palmar and deep
branches complete the route through the Guyon-canal region.

The median-nerve trunk was retained without deformation. Its recurrent branch
is now imported as a separate searchable structure. The musculocutaneous nerve
is extended distally with the source object representing the lateral cutaneous
nerve of the forearm.

- https://www.ncbi.nlm.nih.gov/books/NBK534840/
- https://www.ncbi.nlm.nih.gov/books/NBK431063/
- https://www.ncbi.nlm.nih.gov/books/NBK526051/
- https://www.ncbi.nlm.nih.gov/sites/books/NBK534199/

## Acceptance gates

1. Compare Open3DModel and BodyParts3D clavicle, scapula, and humerus landmarks.
2. Decide between neurovascular-only overlay and complete upper-limb regional
   replacement based on visible registration error.
3. Namespace every new geometry ID with its source; do not reuse `FJ` IDs.
4. Preserve per-object provenance and CC BY-SA attribution in generated data.
5. Load the pilot pack by default on `codex/newdatabase`, retaining
   `?pilot=off` as a comparison escape hatch.
6. Verify search, selection, isolate, ghost, regional anatomy, and clinical-space
   behavior for all parent nerves and separately searchable branch concepts on
   desktop and mobile.
