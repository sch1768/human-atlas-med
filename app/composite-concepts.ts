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
  ];

  const results: Concept[] = [];

  for (const cfg of compositeConfigs) {
    const rElems = dedupe(groups[cfg.key]?.right ?? []);
    const lElems = dedupe(groups[cfg.key]?.left ?? []);
    const allElems = dedupe([...rElems, ...lElems]);

    // 전체 양측 (Whole muscle)
    if (allElems.length > 0) {
      results.push({
        id: cfg.idPrefix,
        name: cfg.baseName,
        elements: allElems,
      });
    }

    // 우측 (Right muscle)
    if (rElems.length > 0) {
      results.push({
        id: `${cfg.idPrefix}_R`,
        name: `right ${cfg.baseName}`,
        elements: rElems,
      });
    }

    // 좌측 (Left muscle)
    if (lElems.length > 0) {
      results.push({
        id: `${cfg.idPrefix}_L`,
        name: `left ${cfg.baseName}`,
        elements: lElems,
      });
    }
  }

  return results;
}
