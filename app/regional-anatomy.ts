import type { Atlas, Part } from './anatomy';

export type RegionId =
  | 'head-neck'
  | 'thorax'
  | 'abdomen'
  | 'pelvis'
  | 'upper-limb'
  | 'lower-limb'
  | 'back-spine';

export type SubregionId =
  // Head & Neck
  | 'cranium-brain'
  | 'face-orbit'
  | 'oral-pharyngeal'
  | 'neck-larynx'
  // Thorax
  | 'heart-pericardium'
  | 'great-vessels'
  | 'lungs-pleura'
  | 'thoracic-wall'
  // Abdomen
  | 'stomach-duodenum'
  | 'liver-biliary'
  | 'pancreas-spleen'
  | 'kidneys-retroperitoneum'
  | 'abdominal-wall'
  // Pelvis
  | 'pelvic-girdle'
  | 'bladder-ureters'
  | 'reproductive-organs'
  | 'pelvic-floor'
  // Upper Limb
  | 'shoulder-axilla'
  | 'arm'
  | 'cubital-fossa'
  | 'forearm'
  | 'wrist-hand'
  // Lower Limb
  | 'gluteal-hip'
  | 'thigh'
  | 'knee-popliteal'
  | 'leg'
  | 'ankle-foot'
  // Back & Spine
  | 'vertebral-column'
  | 'superficial-back'
  | 'deep-back'
  | 'spinal-cord';

export interface Subregion {
  id: SubregionId;
  name: string;
  description?: string;
  match: (p: Part, n: string, center: [number, number, number]) => boolean;
}

export interface Region {
  id: RegionId;
  name: string;
  icon: string;
  shortLabel: string;
  subregions: Subregion[];
}

export const REGIONS: Region[] = [
  {
    id: 'head-neck',
    name: 'Head & Neck',
    icon: '🧠',
    shortLabel: 'Head & Neck',
    subregions: [
      {
        id: 'cranium-brain',
        name: 'Cranium & Brain',
        match: (p, n, [, y]) =>
          y >= 1.50 &&
          (n.includes('brain') ||
            n.includes('cerebr') ||
            n.includes('cerebel') ||
            n.includes('cranial') ||
            n.includes('skull') ||
            n.includes('parietal') ||
            n.includes('frontal') ||
            n.includes('occipital') ||
            n.includes('temporal bone') ||
            n.includes('sphenoid') ||
            n.includes('ethmoid') ||
            n.includes('ventricle') ||
            n.includes('thalamus') ||
            n.includes('mening') ||
            n.includes('pituitary') ||
            n.includes('corpus callosum') ||
            (p.system === 'nervous' && y >= 1.50)),
      },
      {
        id: 'face-orbit',
        name: 'Face & Orbit',
        match: (p, n, [, y]) =>
          y >= 1.40 &&
          (n.includes('eye') ||
            n.includes('orbit') ||
            n.includes('nasal') ||
            n.includes('maxilla') ||
            n.includes('zygomatic') ||
            n.includes('lacrimal') ||
            n.includes('optic') ||
            n.includes('facial') ||
            n.includes('masseter') ||
            n.includes('temporalis') ||
            n.includes('buccinator') ||
            n.includes('eyeball') ||
            n.includes('retina') ||
            n.includes('lens')),
      },
      {
        id: 'oral-pharyngeal',
        name: 'Oral & Pharyngeal',
        match: (p, n, [, y]) =>
          y >= 1.38 &&
          y <= 1.58 &&
          (n.includes('mandible') ||
            n.includes('tongue') ||
            n.includes('palat') ||
            n.includes('tooth') ||
            n.includes('teeth') ||
            n.includes('gingiva') ||
            n.includes('pharynx') ||
            n.includes('pharyngeal') ||
            n.includes('salivary') ||
            n.includes('parotid') ||
            n.includes('submandibular')),
      },
      {
        id: 'neck-larynx',
        name: 'Neck & Larynx',
        match: (p, n, [, y]) =>
          y >= 1.30 &&
          y <= 1.52 &&
          (n.includes('larynx') ||
            n.includes('laryngeal') ||
            n.includes('thyroid') ||
            n.includes('hyoid') ||
            n.includes('trachea') ||
            n.includes('carotid') ||
            n.includes('jugular') ||
            n.includes('sternocleidomastoid') ||
            n.includes('scalenus') ||
            n.includes('cervical') ||
            n.includes('phrenic') ||
            n.includes('vagus')),
      },
    ],
  },
  {
    id: 'thorax',
    name: 'Thorax',
    icon: '🫀',
    shortLabel: 'Thorax',
    subregions: [
      {
        id: 'heart-pericardium',
        name: 'Heart & Pericardium',
        match: (p, n, [, y]) =>
          y >= 1.20 &&
          y <= 1.42 &&
          (n.includes('heart') ||
            n.includes('atrium') ||
            n.includes('ventricle of heart') ||
            n.includes('myocard') ||
            n.includes('pericard') ||
            n.includes('cardiac') ||
            n.includes('coronary') ||
            n.includes('mitral') ||
            n.includes('tricuspid') ||
            n.includes('aortic valve') ||
            n.includes('pulmonary valve')),
      },
      {
        id: 'great-vessels',
        name: 'Great Vessels',
        match: (p, n, [, y]) =>
          y >= 1.15 &&
          y <= 1.45 &&
          (n.includes('aorta') ||
            n.includes('vena cava') ||
            n.includes('pulmonary trunk') ||
            n.includes('pulmonary artery') ||
            n.includes('pulmonary vein') ||
            n.includes('brachiocephalic') ||
            n.includes('subclavian artery') ||
            n.includes('subclavian vein')),
      },
      {
        id: 'lungs-pleura',
        name: 'Lungs & Pleura',
        match: (p, n, [, y]) =>
          y >= 1.10 &&
          y <= 1.45 &&
          (n.includes('lung') ||
            n.includes('pleura') ||
            n.includes('bronch') ||
            n.includes('pulmonary lobe')),
      },
      {
        id: 'thoracic-wall',
        name: 'Thoracic Wall & Ribs',
        match: (p, n, [, y]) =>
          y >= 1.08 &&
          y <= 1.45 &&
          (n.includes('rib') ||
            n.includes('sternum') ||
            n.includes('costal') ||
            n.includes('intercostal') ||
            n.includes('pectoralis') ||
            n.includes('serratus anterior') ||
            n.includes('internal thoracic') ||
            n.includes('diaphragm')),
      },
    ],
  },
  {
    id: 'abdomen',
    name: 'Abdomen',
    icon: '🫃',
    shortLabel: 'Abdomen',
    subregions: [
      {
        id: 'stomach-duodenum',
        name: 'Stomach & Duodenum',
        match: (p, n, [, y]) =>
          y >= 0.95 &&
          y <= 1.26 &&
          (n.includes('stomach') ||
            n.includes('gastric') ||
            n.includes('duoden') ||
            n.includes('pylor') ||
            n.includes('omentum') ||
            n.includes('celiac')),
      },
      {
        id: 'liver-biliary',
        name: 'Liver & Biliary System',
        match: (p, n, [, y]) =>
          y >= 0.98 &&
          y <= 1.28 &&
          (n.includes('liver') ||
            n.includes('hepatic') ||
            n.includes('gallbladder') ||
            n.includes('bile') ||
            n.includes('cystic duct') ||
            n.includes('portal vein')),
      },
      {
        id: 'pancreas-spleen',
        name: 'Pancreas & Spleen',
        match: (p, n, [, y]) =>
          y >= 0.98 &&
          y <= 1.25 &&
          (n.includes('pancreas') ||
            n.includes('pancreatic') ||
            n.includes('spleen') ||
            n.includes('splenic')),
      },
      {
        id: 'kidneys-retroperitoneum',
        name: 'Kidneys & Retroperitoneum',
        match: (p, n, [, y]) =>
          y >= 0.90 &&
          y <= 1.25 &&
          (n.includes('kidney') ||
            n.includes('renal') ||
            n.includes('adrenal') ||
            n.includes('suprarenal') ||
            n.includes('ureter')),
      },
      {
        id: 'abdominal-wall',
        name: 'Abdominal Wall',
        match: (p, n, [, y]) =>
          y >= 0.85 &&
          y <= 1.25 &&
          (n.includes('rectus abdominis') ||
            n.includes('oblique') ||
            n.includes('transversus abdominis') ||
            n.includes('linea alba') ||
            n.includes('quadratus lumborum') ||
            n.includes('psoas') ||
            n.includes('iliopsoas')),
      },
    ],
  },
  {
    id: 'pelvis',
    name: 'Pelvis',
    icon: '🦴',
    shortLabel: 'Pelvis',
    subregions: [
      {
        id: 'pelvic-girdle',
        name: 'Pelvic Girdle',
        match: (p, n, [, y]) =>
          y >= 0.70 &&
          y <= 1.00 &&
          (n.includes('ilium') ||
            n.includes('ischium') ||
            n.includes('pubis') ||
            n.includes('hip bone') ||
            n.includes('pelvic') ||
            n.includes('pelvis') ||
            n.includes('sacrum') ||
            n.includes('coccyx') ||
            n.includes('sacroiliac')),
      },
      {
        id: 'bladder-ureters',
        name: 'Bladder & Ureters',
        match: (p, n, [, y]) =>
          y >= 0.75 &&
          y <= 0.95 &&
          (n.includes('urinary bladder') || n.includes('vesical') || n.includes('urethra')),
      },
      {
        id: 'reproductive-organs',
        name: 'Reproductive Organs',
        match: (p, n, [, y]) =>
          y >= 0.70 &&
          y <= 0.95 &&
          (p.system === 'reproductive' ||
            n.includes('prostate') ||
            n.includes('testis') ||
            n.includes('epididymis') ||
            n.includes('scrotum') ||
            n.includes('penis') ||
            n.includes('seminal') ||
            n.includes('vas deferens') ||
            n.includes('ductus deferens')),
      },
      {
        id: 'pelvic-floor',
        name: 'Pelvic Floor & Perineum',
        match: (p, n, [, y]) =>
          y >= 0.70 &&
          y <= 0.92 &&
          (n.includes('levator ani') ||
            n.includes('coccygeus') ||
            n.includes('perine') ||
            n.includes('sphincter ani') ||
            n.includes('pudendal') ||
            n.includes('internal iliac')),
      },
    ],
  },
  {
    id: 'upper-limb',
    name: 'Upper Limb',
    icon: '💪',
    shortLabel: 'Upper Limb',
    subregions: [
      {
        id: 'shoulder-axilla',
        name: 'Shoulder & Axilla',
        match: (p, n, [x, y]) =>
          Math.abs(x) >= 0.12 &&
          y >= 1.20 &&
          y <= 1.50 &&
          (n.includes('scapula') ||
            n.includes('clavicle') ||
            n.includes('deltoid') ||
            n.includes('supraspinatus') ||
            n.includes('infraspinatus') ||
            n.includes('teres') ||
            n.includes('subscapularis') ||
            n.includes('axill') ||
            n.includes('glenohumeral') ||
            n.includes('acromi') ||
            n.includes('coracoid')),
      },
      {
        id: 'arm',
        name: 'Arm',
        match: (p, n, [x, y]) =>
          Math.abs(x) >= 0.14 &&
          y >= 1.05 &&
          y <= 1.35 &&
          (n.includes('humerus') ||
            n.includes('biceps brachii') ||
            n.includes('triceps brachii') ||
            n.includes('brachialis') ||
            n.includes('coracobrachialis') ||
            n.includes('brachial artery') ||
            n.includes('brachial vein') ||
            n.includes('brachial plexus')),
      },
      {
        id: 'cubital-fossa',
        name: 'Cubital Fossa',
        match: (p, n, [x, y]) =>
          Math.abs(x) >= 0.15 &&
          y >= 0.95 &&
          y <= 1.15 &&
          (n.includes('elbow') ||
            n.includes('cubit') ||
            n.includes('olecranon') ||
            n.includes('epicondyle') ||
            n.includes('bicipital aponeurosis') ||
            n.includes('median cubital') ||
            n.includes('brachioradialis') ||
            n.includes('anconeus')),
      },
      {
        id: 'forearm',
        name: 'Forearm',
        match: (p, n, [x, y]) =>
          Math.abs(x) >= 0.15 &&
          y >= 0.78 &&
          y <= 1.05 &&
          (n.includes('radius') ||
            n.includes('ulna') ||
            n.includes('pronator') ||
            n.includes('supinator') ||
            n.includes('flexor carpi') ||
            n.includes('flexor digitorum') ||
            n.includes('extensor carpi') ||
            n.includes('extensor digitorum') ||
            n.includes('radial artery') ||
            n.includes('ulnar artery') ||
            n.includes('interosseous membrane of forearm') ||
            n.includes('interosseous artery')),
      },
      {
        id: 'wrist-hand',
        name: 'Wrist & Hand',
        match: (p, n, [x, y]) =>
          Math.abs(x) >= 0.15 &&
          y <= 0.90 &&
          (n.includes('hand') ||
            n.includes('carpal') ||
            n.includes('metacarpal') ||
            n.includes('phalanges of hand') ||
            n.includes('thenar') ||
            n.includes('hypothenar') ||
            n.includes('lumbrical of hand') ||
            n.includes('interosseous of hand') ||
            n.includes('palmar') ||
            n.includes('wrist') ||
            n.includes('scaphoid') ||
            n.includes('lunate') ||
            n.includes('triquetrum') ||
            n.includes('pisiform') ||
            n.includes('trapezium') ||
            n.includes('trapezoid') ||
            n.includes('capitate') ||
            n.includes('hamate')),
      },
    ],
  },
  {
    id: 'lower-limb',
    name: 'Lower Limb',
    icon: '🦵',
    shortLabel: 'Lower Limb',
    subregions: [
      {
        id: 'gluteal-hip',
        name: 'Gluteal & Hip',
        match: (p, n, [, y]) =>
          y >= 0.65 &&
          y <= 0.95 &&
          (n.includes('gluteus') ||
            n.includes('piriformis') ||
            n.includes('obturator') ||
            n.includes('gemellus') ||
            n.includes('quadratus femoris') ||
            n.includes('tensor fasciae latae') ||
            n.includes('acetabulum') ||
            n.includes('femoral head') ||
            n.includes('greater trochanter')),
      },
      {
        id: 'thigh',
        name: 'Thigh',
        match: (p, n, [, y]) =>
          y >= 0.45 &&
          y <= 0.85 &&
          (n.includes('femur') ||
            n.includes('quadriceps') ||
            n.includes('rectus femoris') ||
            n.includes('vastus') ||
            n.includes('sartorius') ||
            n.includes('gracilis') ||
            n.includes('adductor') ||
            n.includes('biceps femoris') ||
            n.includes('semitendinosus') ||
            n.includes('semimembranosus') ||
            n.includes('femoral artery') ||
            n.includes('femoral vein') ||
            n.includes('femoral nerve') ||
            n.includes('sciatic nerve')),
      },
      {
        id: 'knee-popliteal',
        name: 'Knee & Popliteal Fossa',
        match: (p, n, [, y]) =>
          y >= 0.38 &&
          y <= 0.55 &&
          (n.includes('patella') ||
            n.includes('knee') ||
            n.includes('poplite') ||
            n.includes('meniscus') ||
            n.includes('cruciate') ||
            n.includes('collateral ligament of knee') ||
            n.includes('patellar ligament')),
      },
      {
        id: 'leg',
        name: 'Leg',
        match: (p, n, [, y]) =>
          y >= 0.08 &&
          y <= 0.45 &&
          (n.includes('tibia') ||
            n.includes('fibula') ||
            n.includes('gastrocnemius') ||
            n.includes('soleus') ||
            n.includes('tibialis') ||
            n.includes('peroneus') ||
            n.includes('fibularis') ||
            n.includes('calcaneal tendon') ||
            n.includes('achilles') ||
            n.includes('tibial artery') ||
            n.includes('fibular artery')),
      },
      {
        id: 'ankle-foot',
        name: 'Ankle & Foot',
        match: (p, n, [, y]) =>
          y <= 0.12 &&
          (n.includes('foot') ||
            n.includes('tarsal') ||
            n.includes('metatarsal') ||
            n.includes('phalanges of foot') ||
            n.includes('calcaneus') ||
            n.includes('talus') ||
            n.includes('navicular') ||
            n.includes('cuneiform') ||
            n.includes('cuboid') ||
            n.includes('plantar') ||
            n.includes('ankle') ||
            n.includes('malleolus')),
      },
    ],
  },
  {
    id: 'back-spine',
    name: 'Back & Spine',
    icon: '🦴',
    shortLabel: 'Back & Spine',
    subregions: [
      {
        id: 'vertebral-column',
        name: 'Vertebral Column',
        match: (p, n, [, , z]) =>
          z <= 0.04 &&
          (n.includes('vertebra') ||
            n.includes('intervertebral disc') ||
            n.includes('spinous process') ||
            n.includes('transverse process') ||
            n.includes('sacrum') ||
            n.includes('coccyx')),
      },
      {
        id: 'superficial-back',
        name: 'Superficial Back',
        match: (p, n, [, , z]) =>
          z <= 0.03 &&
          (n.includes('trapezius') ||
            n.includes('latissimus dorsi') ||
            n.includes('rhomboid') ||
            n.includes('levator scapulae') ||
            n.includes('thoracolumbar fascia')),
      },
      {
        id: 'deep-back',
        name: 'Deep Intrinsic Back',
        match: (p, n, [, , z]) =>
          z <= 0.02 &&
          (n.includes('erector spinae') ||
            n.includes('iliocostalis') ||
            n.includes('longissimus') ||
            n.includes('spinalis') ||
            n.includes('splenius') ||
            n.includes('multifidus') ||
            n.includes('semispinalis') ||
            n.includes('rotatores')),
      },
      {
        id: 'spinal-cord',
        name: 'Spinal Cord & Canal',
        match: (p, n, [, , z]) =>
          z <= 0.02 &&
          (n.includes('spinal cord') ||
            n.includes('cauda equina') ||
            n.includes('spinal nerve') ||
            n.includes('dura mater of spinal cord') ||
            n.includes('arachnoid of spinal cord')),
      },
    ],
  },
];

function getPartCenter(p: Part): [number, number, number] {
  return [
    (p.bounds[0][0] + p.bounds[1][0]) / 2,
    (p.bounds[0][1] + p.bounds[1][1]) / 2,
    (p.bounds[0][2] + p.bounds[1][2]) / 2,
  ];
}

/**
 * Returns part IDs belonging to a region or subregion.
 */
export function getRegionPartIds(
  atlas: Atlas,
  regionId: RegionId,
  subregionId?: SubregionId
): string[] {
  const region = REGIONS.find(r => r.id === regionId);
  if (!region) return [];

  const targetSubregions = subregionId
    ? region.subregions.filter(s => s.id === subregionId)
    : region.subregions;

  const matchedPartIds = new Set<string>();

  for (const part of atlas.parts) {
    const nameLower = part.name.toLowerCase();
    const center = getPartCenter(part);
    for (const sub of targetSubregions) {
      if (sub.match(part, nameLower, center)) {
        matchedPartIds.add(part.id);
        break;
      }
    }
  }

  return Array.from(matchedPartIds);
}
