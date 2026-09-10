# Anatomy data attribution

BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.

- License: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html (updated 2025-02-27)
- Dataset: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
- License terms: https://creativecommons.org/licenses/by/4.0/
- Source geometry: `isa_BP3D_4.0_obj_99.zip`, BodyParts3D 4.0.
- English names and relationships: IS-A and PART-OF concept, element, and inclusion tables from the same archive.
- Publication: Mitsuhashi et al. (2009), BodyParts3D: 3D structure database for anatomical concepts. https://doi.org/10.1093/nar/gkn613

Adaptations: axes and units converted from millimeters/Z-up to meters/Y-up; translated to rest at the stage; geometry simplified using meshoptimizer with 0.2% relative error limit per structure; normals quantized to signed 16-bit; packed into binary chunks; curated display system groupings and colors. The source contains 2,234 individual OBJ meshes; all remain represented. The combined hierarchy contains 3,432 named FMA concepts, which may reference multiple meshes. Original source identity is preserved in the manifest.

Source OBJ comments mention an older CC BY-SA 2.1 Japan license. The official current database license linked above supersedes that legacy text and explicitly permits redistribution and adaptation under CC BY 4.0.

BodyParts3D represents an adult male reference anatomy based on TARO MRI and anatomical illustration refinements. It is not a complete model of every possible human anatomical structure or variation. This interface is educational and is not a clinical tool.

## Historical assets (not included in the current release)

Earlier repository revisions included female reference anatomy: Kristen Browne and Heidi Schlehlein, Human Reference Atlas / HuBMAP, *3D Reference Organ Set for Female v1.5* (2023). CC BY 4.0. Geometry adapted for this viewer.

- Source DOI: https://doi.org/10.48539/HBM352.BTSQ.586
- Dataset: https://lod.humanatlas.io/ref-organ/united-female/v1.5
- Original GLB: https://cdn.humanatlas.io/digital-objects/ref-organ/united-female/v1.5/assets/3d-vh-f-united.glb
- License: https://creativecommons.org/licenses/by/4.0/

Adaptations: translated native meter/Y-up coordinates onto the stage, coincident vertices welded and source normals averaged, geometry simplified with a 0.2% per-structure relative error bound, and normals quantized. Colors and display systems are curated for this interface. All 888 source meshes are represented, with 1,073 source nodes available as selectable individual or compound concepts.

This is a reference assembly with whole-body surface and selected organs, including female reproductive anatomy. Its skeleton and muscle coverage is partial. It is not a complete model of every human structure or a single-person scan. Eight placenta/umbilical structures are classified under Pregnancy reference and hidden by default.

## Open3DModel upper-limb pilot

The `codex/newdatabase` branch loads a separately packaged selection of
upper-limb peripheral nerves from Open3DModel by default. Append `?pilot=off`
to compare against the unmodified BodyParts3D atlas.

- Project and downloads: https://anatomytool.org/open3dmodel-create
- Source snapshot: Open3DModel Upper limb, July 2025
- Source object archive: `upper-limb-obj.zip`
- License: Creative Commons Attribution-ShareAlike 4.0 International
- License terms: https://creativecommons.org/licenses/by-sa/4.0/
- Attribution: Open3DModel upper limb by the Open3DModel project and contributors, CC BY-SA 4.0

Adaptations: thirty-nine right-sided nerve and brachial-plexus objects were selected,
renamed for Terminologia-compatible search, and mirrored to produce explicit left
geometry (78 Open3DModel meshes total). Mirrored triangle winding and normals were
corrected. A bone-anchor translation aligns the pack to BodyParts3D. Local,
feathered corrections place the axillary nerve at the surgical neck, move the
ulnar nerve into the flexor compartment, keep the brachial-plexus roots and trunks
deep in the neck, trim digital branches inside the fingertip pads, and retain one
continuous posterior-interosseous trunk. Selected radial, median,
musculocutaneous, ulnar, and suprascapular branches are independently searchable.

The pack also contains five bilateral, project-authored schematic routes for the
great auricular, transverse cervical, lesser occipital, supraclavicular, and
accessory nerves (10 meshes total). These use the separate `curated:neck`
namespace, carry `PROJECT-AUTHORED` provenance, and are not attributed to
Open3DModel. Near-clavicular depth corrections for three BodyParts3D venous
meshes are applied only at viewer runtime. Geometry remains in a separate
manifest and binary pack with source-prefixed identifiers. Exact parameters,
provenance, and medical references are recorded in
`scripts/data/open3d-upper-limb-pilot.json`.
