import type { Atlas, Concept } from './anatomy';

/**
 * BodyParts3D에서 세부 갈래/갈래머리(heads/parts)로 분할되어 있어
 * 전체를 가리키는 단일 개념이 없거나 파편화된 주요 근육군들을
 * 하나의 통합된 '합성 개념(Composite Concept)'으로 집계합니다.
 */
export function buildCompositeConcepts(atlas: Atlas): Concept[] {
  const groups: Record<string, { right: string[]; left: string[] }> = {
    trapezius: { right: [], left: [] },
    deltoid: { right: [], left: [] },
    pectoralis_major: { right: [], left: [] },
    triceps_brachii: { right: [], left: [] },
    biceps_brachii: { right: [], left: [] },
    gastrocnemius: { right: [], left: [] },
    quadriceps_femoris: { right: [], left: [] },
    biceps_femoris: { right: [], left: [] },
    hamstrings: { right: [], left: [] },
    pronator_teres: { right: [], left: [] },
    rotator_cuff: { right: [], left: [] },
    // 혈관 및 신경 복합 개념 (Vascular & Neural Composites)
    circle_of_willis: { right: [], left: [] },
    celiac_trunk_system: { right: [], left: [] },
    brachial_plexus: { right: [], left: [] },
    coronary_circulation: { right: [], left: [] },
    portal_triad: { right: [], left: [] },
    hepatic_segments: { right: [], left: [] },
    cranial_nerves: { right: [], left: [] },
    extraocular_muscles: { right: [], left: [] },
    pelvic_floor: { right: [], left: [] },
    intrinsic_hand_muscles: { right: [], left: [] },
    superficial_flexors_forearm: { right: [], left: [] },
  };

  const rotatorParts = ['supraspinatus', 'infraspinatus', 'teres minor', 'subscapularis'];

  for (const c of atlas.concepts) {
    const n = c.name.toLowerCase();

    // 1. Trapezius (등세모근 / 승모근)
    if (n.includes('part of') && n.includes('trapezius')) {
      if (n.includes('right')) groups.trapezius.right.push(...c.elements);
      else if (n.includes('left')) groups.trapezius.left.push(...c.elements);
    }

    // 2. Deltoid (어깨세모근 / 삼각근)
    if (n.includes('part of') && n.includes('deltoid')) {
      if (n.includes('right')) groups.deltoid.right.push(...c.elements);
      else if (n.includes('left')) groups.deltoid.left.push(...c.elements);
    }

    // 3. Pectoralis Major (큰가슴근 / 대흉근)
    if (n.includes('part of') && n.includes('pectoralis major')) {
      if (n.includes('right')) groups.pectoralis_major.right.push(...c.elements);
      else if (n.includes('left')) groups.pectoralis_major.left.push(...c.elements);
    }

    // 4. Triceps Brachii (위팔세갈래근 / 상완삼두근)
    if (n.includes('head of') && n.includes('triceps brachii')) {
      if (n.includes('right')) groups.triceps_brachii.right.push(...c.elements);
      else if (n.includes('left')) groups.triceps_brachii.left.push(...c.elements);
    }

    // 5. Biceps Brachii (위팔두갈래근 / 상완이두근)
    if (n.includes('head of') && n.includes('biceps brachii')) {
      if (n.includes('right')) groups.biceps_brachii.right.push(...c.elements);
      else if (n.includes('left')) groups.biceps_brachii.left.push(...c.elements);
    }

    // 6. Gastrocnemius (장딴지근 / 비복근)
    if (n.includes('head of') && n.includes('gastrocnemius')) {
      if (n.includes('right')) groups.gastrocnemius.right.push(...c.elements);
      else if (n.includes('left')) groups.gastrocnemius.left.push(...c.elements);
    }

    // 7. Quadriceps Femoris (넙다리네갈래근 / 대퇴사두근)
    if (
      n.includes('rectus femoris') ||
      n.includes('vastus lateralis') ||
      n.includes('vastus medialis') ||
      n.includes('vastus intermedius')
    ) {
      if (n.startsWith('right ')) groups.quadriceps_femoris.right.push(...c.elements);
      else if (n.startsWith('left ')) groups.quadriceps_femoris.left.push(...c.elements);
    }

    // 8. Biceps Femoris (넙다리두갈래근 / 대퇴이두근)
    if (n.includes('head of') && n.includes('biceps femoris')) {
      if (n.includes('right')) groups.biceps_femoris.right.push(...c.elements);
      else if (n.includes('left')) groups.biceps_femoris.left.push(...c.elements);
    }

    // 9. Hamstrings 보강: semitendinosus, semimembranosus
    if (n === 'right semitendinosus' || n === 'right semimembranosus') {
      groups.hamstrings.right.push(...c.elements);
    }
    if (n === 'left semitendinosus' || n === 'left semimembranosus') {
      groups.hamstrings.left.push(...c.elements);
    }

    // 10. Pronator Teres (원엎침근 / 원회내근)
    if (n.includes('head of') && n.includes('pronator teres')) {
      if (n.includes('right')) groups.pronator_teres.right.push(...c.elements);
      else if (n.includes('left')) groups.pronator_teres.left.push(...c.elements);
    }

    // 11. Rotator Cuff (회전근개)
    for (const rPart of rotatorParts) {
      if (n.includes(rPart)) {
        if (n.includes('right')) groups.rotator_cuff.right.push(...c.elements);
        else if (n.includes('left')) groups.rotator_cuff.left.push(...c.elements);
      }
    }

    // 12. Circle of Willis (대뇌동맥고리 / 윌리스 서클)
    if (
      n.includes('anterior cerebral artery') ||
      n.includes('anterior communicating artery') ||
      n.includes('internal carotid artery') ||
      n.includes('posterior communicating artery') ||
      n.includes('posterior cerebral artery') ||
      n.includes('basilar artery')
    ) {
      if (n.includes('right')) groups.circle_of_willis.right.push(...c.elements);
      else if (n.includes('left')) groups.circle_of_willis.left.push(...c.elements);
      else {
        groups.circle_of_willis.right.push(...c.elements);
        groups.circle_of_willis.left.push(...c.elements);
      }
    }

    // 13. Celiac Trunk System (복강동맥 분지계)
    if (
      n.includes('celiac artery') ||
      n.includes('celiac trunk') ||
      n.includes('left gastric artery') ||
      n.includes('splenic artery') ||
      n.includes('common hepatic artery') ||
      n.includes('proper hepatic artery')
    ) {
      groups.celiac_trunk_system.right.push(...c.elements);
      groups.celiac_trunk_system.left.push(...c.elements);
    }

    // 14. Brachial Plexus (팔신경총 / 상완신경총)
    if (n.includes('brachial plexus')) {
      if (n.includes('right')) groups.brachial_plexus.right.push(...c.elements);
      else if (n.includes('left')) groups.brachial_plexus.left.push(...c.elements);
      else {
        groups.brachial_plexus.right.push(...c.elements);
        groups.brachial_plexus.left.push(...c.elements);
      }
    }

    // 15. Coronary Circulation (관상동맥 순환계)
    if (
      n.includes('coronary artery') ||
      n.includes('circumflex branch') ||
      n.includes('interventricular branch')
    ) {
      if (n.includes('right')) groups.coronary_circulation.right.push(...c.elements);
      else if (n.includes('left')) groups.coronary_circulation.left.push(...c.elements);
      else {
        groups.coronary_circulation.right.push(...c.elements);
        groups.coronary_circulation.left.push(...c.elements);
      }
    }

    // 16. Portal Triad (문맥삼합)
    if (
      n.includes('portal vein') ||
      n.includes('proper hepatic artery') ||
      n.includes('common bile duct')
    ) {
      groups.portal_triad.right.push(...c.elements);
      groups.portal_triad.left.push(...c.elements);
    }

    // 17. Hepatic Segments / Portal distribution
    if (
      n.includes('portal vein') ||
      n.includes('hepatic vein') ||
      n.includes('liver segment')
    ) {
      if (n.includes('right')) groups.hepatic_segments.right.push(...c.elements);
      else if (n.includes('left')) groups.hepatic_segments.left.push(...c.elements);
      else {
        groups.hepatic_segments.right.push(...c.elements);
        groups.hepatic_segments.left.push(...c.elements);
      }
    }

    // 18. Extraocular Muscles (외안근)
    if (
      n.includes('superior rectus') ||
      n.includes('inferior rectus') ||
      n.includes('medial rectus') ||
      n.includes('lateral rectus') ||
      n.includes('superior oblique') ||
      n.includes('inferior oblique')
    ) {
      if (n.includes('right')) groups.extraocular_muscles.right.push(...c.elements);
      else if (n.includes('left')) groups.extraocular_muscles.left.push(...c.elements);
      else {
        groups.extraocular_muscles.right.push(...c.elements);
        groups.extraocular_muscles.left.push(...c.elements);
      }
    }

    // 19. Pelvic Floor (골반바닥)
    if (
      n.includes('pubococcygeus') ||
      n.includes('puborectalis') ||
      n.includes('iliococcygeus') ||
      n.includes('levator ani') ||
      n.includes('coccygeus')
    ) {
      if (n.includes('right')) groups.pelvic_floor.right.push(...c.elements);
      else if (n.includes('left')) groups.pelvic_floor.left.push(...c.elements);
      else {
        groups.pelvic_floor.right.push(...c.elements);
        groups.pelvic_floor.left.push(...c.elements);
      }
    }

    // 20. Intrinsic Hand Muscles (손의 고유근)
    if (
      n.includes('lumbrical') ||
      n.includes('dorsal interosseous') ||
      n.includes('palmar interosseous') ||
      n.includes('abductor pollicis brevis') ||
      n.includes('flexor pollicis brevis') ||
      n.includes('opponens pollicis') ||
      n.includes('adductor pollicis') ||
      n.includes('abductor digiti minimi')
    ) {
      if (n.includes('right')) groups.intrinsic_hand_muscles.right.push(...c.elements);
      else if (n.includes('left')) groups.intrinsic_hand_muscles.left.push(...c.elements);
      else {
        groups.intrinsic_hand_muscles.right.push(...c.elements);
        groups.intrinsic_hand_muscles.left.push(...c.elements);
      }
    }

    // 21. Superficial Flexors of Forearm (전완 앞칸 얕은층)
    if (
      n.includes('pronator teres') ||
      n.includes('flexor carpi radialis') ||
      n.includes('palmaris longus') ||
      n.includes('flexor carpi ulnaris')
    ) {
      if (n.includes('right')) groups.superficial_flexors_forearm.right.push(...c.elements);
      else if (n.includes('left')) groups.superficial_flexors_forearm.left.push(...c.elements);
      else {
        groups.superficial_flexors_forearm.right.push(...c.elements);
        groups.superficial_flexors_forearm.left.push(...c.elements);
      }
    }

    // 22. Cranial Nerves (뇌신경계)
    if (
      n.includes('cranial nerve') ||
      n.includes('optic nerve') ||
      n.includes('oculomotor nerve') ||
      n.includes('trochlear nerve') ||
      n.includes('trigeminal nerve') ||
      n.includes('abducens nerve') ||
      n.includes('facial nerve') ||
      n.includes('vestibulocochlear nerve') ||
      n.includes('glossopharyngeal nerve') ||
      n.includes('vagus nerve') ||
      n.includes('accessory nerve') ||
      n.includes('hypoglossal nerve')
    ) {
      if (n.includes('right')) groups.cranial_nerves.right.push(...c.elements);
      else if (n.includes('left')) groups.cranial_nerves.left.push(...c.elements);
      else {
        groups.cranial_nerves.right.push(...c.elements);
        groups.cranial_nerves.left.push(...c.elements);
      }
    }
  }

  // Hamstrings = Biceps Femoris + Semitendinosus + Semimembranosus
  groups.hamstrings.right.push(...groups.biceps_femoris.right);
  groups.hamstrings.left.push(...groups.biceps_femoris.left);

  // 고유 ID 세트로 변환
  const dedupe = (arr: string[]) => Array.from(new Set(arr));

  const compositeConfigs: {
    key: string;
    baseName: string;
    idPrefix: string;
  }[] = [
      { key: 'trapezius', baseName: 'trapezius', idPrefix: 'COMPOSITE_TRAPEZIUS' },
      { key: 'deltoid', baseName: 'deltoid', idPrefix: 'COMPOSITE_DELTOID' },
      { key: 'pectoralis_major', baseName: 'pectoralis major', idPrefix: 'COMPOSITE_PEC_MAJOR' },
      { key: 'triceps_brachii', baseName: 'triceps brachii', idPrefix: 'COMPOSITE_TRICEPS' },
      { key: 'biceps_brachii', baseName: 'biceps brachii', idPrefix: 'COMPOSITE_BICEPS' },
      { key: 'gastrocnemius', baseName: 'gastrocnemius', idPrefix: 'COMPOSITE_GASTRO' },
      { key: 'quadriceps_femoris', baseName: 'quadriceps femoris', idPrefix: 'COMPOSITE_QUAD' },
      { key: 'biceps_femoris', baseName: 'biceps femoris', idPrefix: 'COMPOSITE_BICEPS_FEM' },
      { key: 'hamstrings', baseName: 'hamstrings', idPrefix: 'COMPOSITE_HAMSTRINGS' },
      { key: 'pronator_teres', baseName: 'pronator teres', idPrefix: 'COMPOSITE_PRONATOR' },
      { key: 'rotator_cuff', baseName: 'rotator cuff', idPrefix: 'COMPOSITE_ROTATOR_CUFF' },
      { key: 'circle_of_willis', baseName: 'circle of willis', idPrefix: 'COMPOSITE_CIRCLE_OF_WILLIS' },
      { key: 'celiac_trunk_system', baseName: 'celiac trunk system', idPrefix: 'COMPOSITE_CELIAC_TRUNK' },
      { key: 'brachial_plexus', baseName: 'brachial plexus', idPrefix: 'COMPOSITE_BRACHIAL_PLEXUS' },
      { key: 'coronary_circulation', baseName: 'coronary arterial system', idPrefix: 'COMPOSITE_CORONARY' },
      { key: 'portal_triad', baseName: 'portal triad', idPrefix: 'COMPOSITE_PORTAL_TRIAD' },
      { key: 'hepatic_segments', baseName: 'hepatic vascular structures', idPrefix: 'COMPOSITE_HEPATIC_SEGMENTS' },
      { key: 'cranial_nerves', baseName: 'cranial nerves', idPrefix: 'COMPOSITE_CRANIAL_NERVES' },
      { key: 'extraocular_muscles', baseName: 'extraocular muscles', idPrefix: 'COMPOSITE_EXTRAOCULAR' },
      { key: 'pelvic_floor', baseName: 'pelvic floor', idPrefix: 'COMPOSITE_PELVIC_FLOOR' },
      { key: 'intrinsic_hand_muscles', baseName: 'intrinsic hand muscles', idPrefix: 'COMPOSITE_INTRINSIC_HAND' },
      { key: 'superficial_flexors_forearm', baseName: 'superficial flexors of forearm', idPrefix: 'COMPOSITE_FOREARM_FLEXORS' },
    ];

  const results: Concept[] = [];

  for (const cfg of compositeConfigs) {
    const rElems = dedupe(groups[cfg.key]?.right ?? []);
    const lElems = dedupe(groups[cfg.key]?.left ?? []);
    const allElems = dedupe([...rElems, ...lElems]);

    // 전체 양측 (Whole structure / bilateral)
    if (allElems.length > 0) {
      results.push({
        id: cfg.idPrefix,
        name: cfg.baseName,
        elements: allElems,
      });
    }

    // 우측 (Right)
    if (rElems.length > 0 && rElems.length !== allElems.length) {
      results.push({
        id: `${cfg.idPrefix}_R`,
        name: `right ${cfg.baseName}`,
        elements: rElems,
      });
    }

    // 좌측 (Left)
    if (lElems.length > 0 && lElems.length !== allElems.length) {
      results.push({
        id: `${cfg.idPrefix}_L`,
        name: `left ${cfg.baseName}`,
        elements: lElems,
      });
    }
  }

  return results;
}

