import type { Atlas, Part } from './anatomy';
import type { RegionId } from './regional-anatomy';

export type SpaceBoundaryType =
  | 'superior'
  | 'inferior'
  | 'medial'
  | 'lateral'
  | 'anterior'
  | 'posterior'
  | 'floor'
  | 'roof'
  | 'apex'
  | 'base';

export interface SpaceBoundary {
  type: SpaceBoundaryType;
  label: string;
  keywords: string[];
}

export interface SpaceContent {
  label: string;
  category: 'nerve' | 'artery' | 'vein' | 'tendon' | 'lymph' | 'organ';
  keywords: string[];
}

export interface ClinicalPoint {
  title: string;
  description: string;
}

export interface ClinicalSpace {
  id: string;
  name: string;
  koreanName: string;
  regionId: RegionId;
  icon: string;
  summary: string;
  boundaries: SpaceBoundary[];
  contents: SpaceContent[];
  clinicalPoints: ClinicalPoint[];
}

export const CLINICAL_SPACES: ClinicalSpace[] = [
  // 1. Carpal Tunnel (손목굴 / 수근관)
  {
    id: 'carpal-tunnel',
    name: 'Carpal Tunnel',
    koreanName: '수근관 (손목굴)',
    regionId: 'upper-limb',
    icon: '✋',
    summary: '손목 앞쪽에서 정중신경과 손가락 굽힘근 힘줄들이 통과하는 섬유골성 터널.',
    boundaries: [
      { type: 'roof', label: 'Flexor retinaculum', keywords: ['retinaculum', 'flexor'] },
      { type: 'floor', label: 'Carpal bones', keywords: ['scaphoid', 'lunate', 'triquetrum', 'pisiform', 'trapezium', 'trapezoid', 'capitate', 'hamate'] },
    ],
    contents: [
      { label: 'Median nerve', category: 'nerve', keywords: ['median nerve'] },
      { label: 'Flexor digitorum superficialis tendon', category: 'tendon', keywords: ['flexor digitorum superficialis'] },
      { label: 'Flexor digitorum profundus tendon', category: 'tendon', keywords: ['flexor digitorum profundus'] },
      { label: 'Flexor pollicis longus tendon', category: 'tendon', keywords: ['flexor pollicis longus'] },
    ],
    clinicalPoints: [
      { title: '수근관 증후군 (Carpal Tunnel Syndrome)', description: '정중신경 압박으로 엄지~약지 외측 감각이상 및 무지구근(Thenar mm.) 위축 발생. Tinel 징후, Phalen 검사 양성.' },
      { title: '정중신경 손목 손상', description: '원숭이손(Ape hand) 변형 및 엄지 대립(Opposition) 기능 소실.' },
    ],
  },

  // 2. Cubital Fossa (팔오금 / 주와)
  {
    id: 'cubital-fossa',
    name: 'Cubital Fossa',
    koreanName: '팔오금 (주와)',
    regionId: 'upper-limb',
    icon: '💪',
    summary: '팔꿈치 앞쪽의 삼각형 오목으로, 혈관 채혈 및 상완동맥 맥박 촉지의 핵심 랜드마크.',
    boundaries: [
      { type: 'superior', label: 'Line between epicondyles', keywords: ['humerus'] },
      { type: 'medial', label: 'Pronator teres', keywords: ['pronator teres'] },
      { type: 'lateral', label: 'Brachioradialis', keywords: ['brachioradialis'] },
      { type: 'floor', label: 'Brachialis & Supinator', keywords: ['brachialis', 'supinator'] },
      { type: 'roof', label: 'Bicipital aponeurosis', keywords: ['biceps brachii'] },
    ],
    contents: [
      { label: 'Biceps brachii tendon', category: 'tendon', keywords: ['biceps brachii'] },
      { label: 'Brachial artery', category: 'artery', keywords: ['brachial artery'] },
      { label: 'Median nerve', category: 'nerve', keywords: ['median nerve'] },
      { label: 'Radial nerve', category: 'nerve', keywords: ['radial nerve'] },
    ],
    clinicalPoints: [
      { title: '혈압 측정 & 맥박 촉지', description: '안쪽에서 Biceps tendon 바로 내측의 Brachial artery 맥박 촉지 및 청진.' },
      { title: '내측에서 외측 내용물 배열 (M→L)', description: 'Median nerve → Brachial artery → Biceps tendon → Radial nerve (암기: MBBR)' },
    ],
  },

  // 3. Axilla (겨드랑 / 액와)
  {
    id: 'axilla',
    name: 'Axilla',
    koreanName: '겨드랑 (액와)',
    regionId: 'upper-limb',
    icon: '🎯',
    summary: '목과 위팔 사이의 피라미드형 통로로, 상완신경총과 액와동정맥이 통과함.',
    boundaries: [
      { type: 'anterior', label: 'Pectoralis major & minor', keywords: ['pectoralis major', 'pectoralis minor'] },
      { type: 'posterior', label: 'Subscapularis, Teres major, Latissimus dorsi', keywords: ['subscapularis', 'teres major', 'latissimus dorsi'] },
      { type: 'medial', label: 'Serratus anterior & Thoracic wall', keywords: ['serratus anterior', 'rib'] },
      { type: 'lateral', label: 'Intertubercular sulcus of humerus', keywords: ['humerus'] },
    ],
    contents: [
      { label: 'Axillary artery & branches', category: 'artery', keywords: ['axillary artery'] },
      { label: 'Axillary vein', category: 'vein', keywords: ['axillary vein'] },
      { label: 'Brachial plexus cords & branches', category: 'nerve', keywords: ['brachial plexus', 'median nerve', 'ulnar nerve', 'radial nerve', 'musculocutaneous nerve'] },
      { label: 'Axillary lymph nodes', category: 'lymph', keywords: ['lymph'] },
    ],
    clinicalPoints: [
      { title: '유방암 림프절 곽청술 (Axillary Dissection)', description: 'Long thoracic n.(손상 시 Winged scapula) 및 Thoracodorsal n.(손상 시 Latissimus dorsi 마비) 손상 주의.' },
    ],
  },

  // 4. Femoral Triangle (넙다리삼각 / 대퇴삼각 / Scarpa triangle)
  {
    id: 'femoral-triangle',
    name: 'Femoral Triangle',
    koreanName: '대퇴삼각 (넙다리삼각)',
    regionId: 'lower-limb',
    icon: '🦵',
    summary: '넓적다리 앞쪽 상부의 삼각 공간. 대퇴혈관 카테터 삽입 및 대퇴탈장의 주요 부위.',
    boundaries: [
      { type: 'superior', label: 'Inguinal ligament', keywords: ['inguinal ligament'] },
      { type: 'medial', label: 'Adductor longus', keywords: ['adductor longus'] },
      { type: 'lateral', label: 'Sartorius', keywords: ['sartorius'] },
      { type: 'floor', label: 'Iliopsoas & Pectineus', keywords: ['iliopsoas', 'psoas', 'iliacus', 'pectineus'] },
    ],
    contents: [
      { label: 'Femoral nerve', category: 'nerve', keywords: ['femoral nerve'] },
      { label: 'Femoral artery & Deep femoral a.', category: 'artery', keywords: ['femoral artery'] },
      { label: 'Femoral vein & Great saphenous v.', category: 'vein', keywords: ['femoral vein', 'saphenous vein'] },
      { label: 'Femoral canal & Deep inguinal lymph nodes', category: 'lymph', keywords: ['inguinal lymph', 'lymph'] },
    ],
    clinicalPoints: [
      { title: '내측에서 외측 내용물 배열 (L→M)', description: '신경(N) - 동맥(A) - 정맥(V) - 림프/관(Empty space / Canal) : 암기약어 NAVEL.' },
      { title: '대퇴관 탈장 (Femoral Hernia)', description: '서혜인대 하방, 대퇴정맥 내측의 Femoral ring을 통해 발생. 여성에서 호발하며 감돈(Strangulation) 위험 극도로 높음.' },
    ],
  },

  // 5. Popliteal Fossa (오금 / 슬와)
  {
    id: 'popliteal-fossa',
    name: 'Popliteal Fossa',
    koreanName: '오금 (슬와)',
    regionId: 'lower-limb',
    icon: '🦵',
    summary: '무릎 뒤쪽의 다이아몬드형 오목 공간. 오금동맥류, 베이커낭종의 주요 발생 부위.',
    boundaries: [
      { type: 'superior', label: 'Biceps femoris & Semimembranosus/Semitendinosus', keywords: ['biceps femoris', 'semimembranosus', 'semitendinosus'] },
      { type: 'inferior', label: 'Gastrocnemius medial & lateral heads', keywords: ['gastrocnemius', 'plantaris'] },
      { type: 'floor', label: 'Popliteal surface of femur & Popliteus muscle', keywords: ['femur', 'popliteus'] },
    ],
    contents: [
      { label: 'Tibial nerve', category: 'nerve', keywords: ['tibial nerve'] },
      { label: 'Common fibular nerve', category: 'nerve', keywords: ['common fibular nerve', 'peroneal nerve'] },
      { label: 'Popliteal vein', category: 'vein', keywords: ['popliteal vein'] },
      { label: 'Popliteal artery', category: 'artery', keywords: ['popliteal artery'] },
    ],
    clinicalPoints: [
      { title: '심부→천부 배열 (Deep to Superficial)', description: '동맥(A) → 정맥(V) → 신경(N). 동맥이 뼈 바닥에 가장 밀착되어 무릎뼈 골절/탈구 시 파열 위험.' },
      { title: '베이커 낭종 (Baker cyst)', description: '비복근-반막양근 점액낭의 비대로 슬와부 종괴 형성.' },
    ],
  },

  // 6. Adductor Canal (모음근관 / 내전근관 / Hunter canal)
  {
    id: 'adductor-canal',
    name: 'Adductor Canal',
    koreanName: '모음근관 (내전근관 / 헌터관)',
    regionId: 'lower-limb',
    icon: '🦵',
    summary: '넓적다리 중간 1/3의 건막성 터널로, 대퇴동맥이 슬와동맥으로 이행하는 통로.',
    boundaries: [
      { type: 'anterior', label: 'Sartorius', keywords: ['sartorius'] },
      { type: 'posterior', label: 'Adductor longus & Adductor magnus', keywords: ['adductor longus', 'adductor magnus'] },
      { type: 'lateral', label: 'Vastus medialis', keywords: ['vastus medialis'] },
    ],
    contents: [
      { label: 'Femoral artery', category: 'artery', keywords: ['femoral artery'] },
      { label: 'Femoral vein', category: 'vein', keywords: ['femoral vein'] },
      { label: 'Saphenous nerve', category: 'nerve', keywords: ['saphenous nerve'] },
    ],
    clinicalPoints: [
      { title: '내전근관 차단술 (Adductor Canal Block)', description: '무릎 관절 수술 후 운동 신경(사두근)을 보존하면서 통증만 억제하는 국소마취술.' },
    ],
  },

  // 7. Carotid Triangle (목동맥삼각 / 경동맥삼각)
  {
    id: 'carotid-triangle',
    name: 'Carotid Triangle',
    koreanName: '목동맥삼각 (경동맥삼각)',
    regionId: 'head-neck',
    icon: '🧠',
    summary: '목 앞삼각의 주요 구역으로, 온목동맥이 내경동맥과 외경동맥으로 분지하는 부위.',
    boundaries: [
      { type: 'superior', label: 'Posterior belly of Digastric', keywords: ['digastric'] },
      { type: 'lateral', label: 'Sternocleidomastoid anterior border', keywords: ['sternocleidomastoid'] },
      { type: 'inferior', label: 'Superior belly of Omohyoid', keywords: ['omohyoid'] },
    ],
    contents: [
      { label: 'Common carotid artery & bifurcation', category: 'artery', keywords: ['carotid artery'] },
      { label: 'Internal jugular vein', category: 'vein', keywords: ['jugular vein'] },
      { label: 'Vagus nerve', category: 'nerve', keywords: ['vagus nerve'] },
      { label: 'Hypoglossal nerve', category: 'nerve', keywords: ['hypoglossal nerve'] },
      { label: 'Carotid sinus & Carotid body', category: 'organ', keywords: ['carotid'] },
    ],
    clinicalPoints: [
      { title: '경동맥 맥박 촉지 및 경동맥초 (Carotid Sheath)', description: 'Sheath 내측에 Carotid a., 외측에 IJV, 후방 사이에 Vagus n. 주행.' },
      { title: '경동맥동 마사지 (Carotid Sinus Massage)', description: 'PSVT(발작성 상심실성 빈맥) 치료를 위해 미주신경 자극.' },
    ],
  },

  // 8. Cavernous Sinus (해면정맥동)
  {
    id: 'cavernous-sinus',
    name: 'Cavernous Sinus',
    koreanName: '해면정맥동 (해면선)',
    regionId: 'head-neck',
    icon: '🧠',
    summary: '접형골체 양측의 정맥동으로 안구/안면 신경 및 내경동맥이 관통함.',
    boundaries: [
      { type: 'medial', label: 'Sphenoid bone & Pituitary gland', keywords: ['sphenoid', 'pituitary'] },
      { type: 'roof', label: 'Dura mater', keywords: ['dura mater', 'cranium'] },
    ],
    contents: [
      { label: 'Internal carotid artery', category: 'artery', keywords: ['internal carotid artery', 'carotid artery'] },
      { label: 'Abducens nerve', category: 'nerve', keywords: ['abducens nerve', 'cranial nerve'] },
      { label: 'Oculomotor nerve', category: 'nerve', keywords: ['oculomotor nerve', 'cranial nerve'] },
      { label: 'Trochlear nerve', category: 'nerve', keywords: ['trochlear nerve', 'cranial nerve'] },
      { label: 'Ophthalmic (V1) & Maxillary (V2) nerves', category: 'nerve', keywords: ['trigeminal nerve', 'ophthalmic nerve', 'maxillary nerve'] },
    ],
    clinicalPoints: [
      { title: '해면정맥동 혈전증 (Cavernous Sinus Thrombosis)', description: '안면부 위험삼각(Danger triangle of face) 감염이 안정맥을 타고 파급. 내측 통과하는 CN VI 마비(외전 장애)가 가장 먼저 발현.' },
    ],
  },

  // 9. Superior Mediastinum (위세로칸 / 상종격동)
  {
    id: 'superior-mediastinum',
    name: 'Superior Mediastinum',
    koreanName: '상종격동 (위세로칸)',
    regionId: 'thorax',
    icon: '🫀',
    summary: '흉골병(Manubrium) 뒤쪽, T4-5 흉골각 상방의 핵심 흉부 공간.',
    boundaries: [
      { type: 'anterior', label: 'Manubrium sterni', keywords: ['sternum', 'manubrium'] },
      { type: 'posterior', label: 'T1-T4 vertebral bodies', keywords: ['thoracic vertebra'] },
      { type: 'inferior', label: 'Transverse thoracic plane', keywords: ['sternal angle', 'rib'] },
    ],
    contents: [
      { label: 'Thymus', category: 'organ', keywords: ['thymus'] },
      { label: 'Aortic arch & 3 great branches', category: 'artery', keywords: ['aortic arch', 'brachiocephalic', 'carotid', 'subclavian'] },
      { label: 'Brachiocephalic veins & Superior vena cava', category: 'vein', keywords: ['brachiocephalic vein', 'superior vena cava'] },
      { label: 'Trachea & Esophagus', category: 'organ', keywords: ['trachea', 'esophagus'] },
      { label: 'Vagus & Phrenic nerves', category: 'nerve', keywords: ['vagus nerve', 'phrenic nerve'] },
    ],
    clinicalPoints: [
      { title: '흉골각(Sternal Angle / Louis각) 임상 의의', description: '2번 갈비뼈 관절 위치, 기관분기부(Carina), 대동맥활 시작 및 끝 위치.' },
    ],
  },

  // 10. Triangle of Calot (담낭삼각 / 간담도 삼각)
  {
    id: 'calot-triangle',
    name: "Triangle of Calot",
    koreanName: '담낭삼각 (칼로 삼각)',
    regionId: 'abdomen',
    icon: '🫃',
    summary: '복강경 담낭절제술 시 담낭동맥(Cystic a.)을 안전하게 결찰하기 위한 핵심 외과적 랜드마크.',
    boundaries: [
      { type: 'medial', label: 'Common hepatic duct', keywords: ['hepatic duct'] },
      { type: 'lateral', label: 'Cystic duct', keywords: ['cystic duct'] },
      { type: 'superior', label: 'Inferior border of liver', keywords: ['liver'] },
    ],
    contents: [
      { label: 'Cystic artery', category: 'artery', keywords: ['cystic artery'] },
      { label: 'Lund node', category: 'lymph', keywords: ['lymph'] },
    ],
    clinicalPoints: [
      { title: '외과적 안전 결찰 (Critical View of Safety)', description: 'Calot 삼각 박리 시 담낭동맥과 담낭관을 명확히 박리해야 총담관(CBD) 오인 결찰 손상 예방.' },
    ],
  },

  // 11. Anterior Triangle (앞목삼각 / 전경삼각)
  {
    id: 'anterior-triangle',
    name: 'Anterior Triangle',
    koreanName: '앞목삼각 (전경삼각)',
    regionId: 'head-neck',
    icon: '🧠',
    summary: '목 앞쪽의 삼각형 공간으로, 경동맥초와 갑상샘·후두·인두 등의 주요 구조물이 위치함.',
    boundaries: [
      { type: 'medial', label: 'Midline of neck', keywords: ['midline', 'sternum'] },
      { type: 'lateral', label: 'Anterior border of sternocleidomastoid', keywords: ['sternocleidomastoid'] },
      { type: 'superior', label: 'Inferior border of mandible', keywords: ['mandible'] },
    ],
    contents: [
      { label: 'Common/Internal/External carotid arteries', category: 'artery', keywords: ['carotid artery'] },
      { label: 'Internal jugular vein', category: 'vein', keywords: ['internal jugular vein'] },
      { label: 'Vagus nerve', category: 'nerve', keywords: ['vagus nerve'] },
      { label: 'Thyroid gland', category: 'organ', keywords: ['thyroid'] },
    ],
    clinicalPoints: [
      { title: '경동맥 삼각', description: '경동맥 맥박 촉지, 경동맥 분지 및 경동맥초 구조를 확인하는 주요 해부학적 영역.' },
      { title: '갑상샘 수술', description: '갑상샘 수술 시 반회후두신경 및 상·하갑상샘동맥 주변 구조물 손상에 주의.' },
    ],
  },

  // 12. Posterior Triangle (뒤목삼각 / 후경삼각)
  {
    id: 'posterior-triangle',
    name: 'Posterior Triangle',
    koreanName: '뒤목삼각 (후경삼각)',
    regionId: 'head-neck',
    icon: '🧠',
    summary: '목 뒤가쪽의 삼각형 공간으로, 부신경과 상완신경총 및 쇄골하혈관이 주행함.',
    boundaries: [
      { type: 'anterior', label: 'Posterior border of sternocleidomastoid', keywords: ['sternocleidomastoid'] },
      { type: 'posterior', label: 'Anterior border of trapezius', keywords: ['trapezius'] },
      { type: 'inferior', label: 'Middle third of clavicle', keywords: ['clavicle'] },
    ],
    contents: [
      { label: 'Spinal accessory nerve', category: 'nerve', keywords: ['accessory nerve', 'spinal accessory'] },
      { label: 'Brachial plexus', category: 'nerve', keywords: ['brachial plexus'] },
      { label: 'Subclavian artery', category: 'artery', keywords: ['subclavian artery'] },
      { label: 'External jugular vein', category: 'vein', keywords: ['external jugular vein'] },
    ],
    clinicalPoints: [
      { title: '부신경 손상', description: '목 림프절 생검 및 수술 중 부신경 손상 시 승모근 마비와 어깨 처짐이 발생할 수 있음.' },
      { title: '상완신경총', description: '상완신경총의 주요 줄기와 분지들이 주행하는 영역.' },
    ],
  },

  // 13. Orbit (눈확 / 안와)
  {
    id: 'orbit',
    name: 'Orbit',
    koreanName: '눈확 (안와)',
    regionId: 'head-neck',
    icon: '👁️',
    summary: '안구와 외안근, 시신경 및 안구혈관 등이 위치하는 뼈로 둘러싸인 공간.',
    boundaries: [
      { type: 'roof', label: 'Frontal bone & lesser wing of sphenoid', keywords: ['frontal bone', 'sphenoid'] },
      { type: 'floor', label: 'Maxilla, zygomatic & palatine bones', keywords: ['maxilla', 'zygomatic', 'palatine'] },
      { type: 'medial', label: 'Ethmoid bone', keywords: ['ethmoid'] },
      { type: 'lateral', label: 'Zygomatic bone & greater wing of sphenoid', keywords: ['zygomatic', 'sphenoid'] },
    ],
    contents: [
      { label: 'Globe of eye', category: 'organ', keywords: ['eyeball', 'globe'] },
      { label: 'Optic nerve', category: 'nerve', keywords: ['optic nerve'] },
      { label: 'Extraocular muscles', category: 'organ', keywords: ['rectus', 'oblique'] },
      { label: 'Ophthalmic artery', category: 'artery', keywords: ['ophthalmic artery'] },
    ],
    clinicalPoints: [
      { title: '안와첨', description: '시신경과 안구운동 관련 신경 및 혈관이 통과하는 중요한 부위.' },
      { title: '안와 골절', description: 'Blow-out fracture에서 안와 바닥 손상 및 하직근 포착 등이 중요.' },
    ],
  },

  // 14. Mediastinum (종격동 / 세로칸)
  {
    id: 'mediastinum',
    name: 'Mediastinum',
    koreanName: '종격동 (세로칸)',
    regionId: 'thorax',
    icon: '🫀',
    summary: '양쪽 흉막강 사이의 흉부 중앙 공간으로 심장과 주요 혈관·기도·식도가 위치함.',
    boundaries: [
      { type: 'anterior', label: 'Sternum', keywords: ['sternum'] },
      { type: 'posterior', label: 'Thoracic vertebral column', keywords: ['thoracic vertebra'] },
      { type: 'lateral', label: 'Mediastinal pleura', keywords: ['pleura'] },
    ],
    contents: [
      { label: 'Heart & pericardium', category: 'organ', keywords: ['heart', 'pericardium'] },
      { label: 'Aorta', category: 'artery', keywords: ['aorta'] },
      { label: 'Superior vena cava', category: 'vein', keywords: ['superior vena cava'] },
      { label: 'Trachea & Esophagus', category: 'organ', keywords: ['trachea', 'esophagus'] },
    ],
    clinicalPoints: [
      { title: '종격동 구분', description: '흉골각을 기준으로 상종격동과 하종격동을 구분하며, 하종격동은 전·중·후종격동으로 나뉨.' },
      { title: '종격동 종괴', description: '종격동의 위치에 따라 대표적인 종양 및 낭종의 감별이 중요함.' },
    ],
  },

  // 15. Pleural Cavity (흉막강)
  {
    id: 'pleural-cavity',
    name: 'Pleural Cavity',
    koreanName: '흉막강',
    regionId: 'thorax',
    icon: '🫁',
    summary: '장측흉막과 벽측흉막 사이의 잠재적 공간으로, 정상적으로 소량의 흉막액이 존재함.',
    boundaries: [
      { type: 'medial', label: 'Mediastinal pleura', keywords: ['mediastinal pleura'] },
      { type: 'lateral', label: 'Costal pleura', keywords: ['costal pleura', 'rib'] },
      { type: 'inferior', label: 'Diaphragmatic pleura', keywords: ['diaphragm'] },
    ],
    contents: [
      { label: 'Lung', category: 'organ', keywords: ['lung'] },
      { label: 'Pleura', category: 'organ', keywords: ['pleura'] },
    ],
    clinicalPoints: [
      { title: '기흉', description: '흉막강에 공기가 차면서 폐가 허탈하는 질환.' },
      { title: '흉수', description: '흉막강에 액체가 증가하는 상태로, 흉막천자의 주요 대상.' },
    ],
  },

  // 16. Lesser Sac (작은그물주머니 / 소망낭)
  {
    id: 'lesser-sac',
    name: 'Lesser Sac',
    koreanName: '작은그물주머니 (소망낭)',
    regionId: 'abdomen',
    icon: '🫃',
    summary: '위와 작은그물막 뒤쪽에 위치하는 복막강의 공간으로, 큰그물주머니와 그물주머니구멍을 통해 연결됨.',
    boundaries: [
      { type: 'anterior', label: 'Stomach & Lesser omentum', keywords: ['stomach', 'lesser omentum'] },
      { type: 'posterior', label: 'Pancreas', keywords: ['pancreas'] },
    ],
    contents: [
      { label: 'Pancreas', category: 'organ', keywords: ['pancreas'] },
      { label: 'Splenic vessels', category: 'artery', keywords: ['splenic artery', 'splenic vein'] },
    ],
    clinicalPoints: [
      { title: '그물주머니구멍', description: '작은그물주머니와 큰복막강을 연결하는 통로로, 간십이지장인대 뒤쪽에 위치.' },
      { title: '췌장 질환', description: '췌장은 작은그물주머니의 후벽을 이루므로 췌장염 등의 병변과 관련됨.' },
    ],
  },

  // 17. Retroperitoneum (후복막강)
  {
    id: 'retroperitoneum',
    name: 'Retroperitoneum',
    koreanName: '후복막강',
    regionId: 'abdomen',
    icon: '🫃',
    summary: '복막 뒤쪽의 공간으로 신장·부신·췌장 일부·십이지장 일부 등이 위치함.',
    boundaries: [
      { type: 'anterior', label: 'Parietal peritoneum', keywords: ['peritoneum'] },
      { type: 'posterior', label: 'Posterior abdominal wall', keywords: ['psoas', 'quadratus lumborum', 'vertebra'] },
    ],
    contents: [
      { label: 'Kidneys', category: 'organ', keywords: ['kidney'] },
      { label: 'Adrenal glands', category: 'organ', keywords: ['adrenal'] },
      { label: 'Pancreas', category: 'organ', keywords: ['pancreas'] },
      { label: 'Duodenum', category: 'organ', keywords: ['duodenum'] },
    ],
    clinicalPoints: [
      { title: '후복막 장기', description: '신장, 부신, 췌장 대부분, 십이지장 대부분, 상행결장·하행결장 등이 후복막 구조임.' },
      { title: '후복막 출혈', description: '외상이나 혈관질환 등에서 후복막 공간으로 출혈이 발생할 수 있음.' },
    ],
  },

  // 18. Ischioanal Fossa (궁둥항문오목 / 좌골직장와)
  {
    id: 'ischioanal-fossa',
    name: 'Ischioanal Fossa',
    koreanName: '궁둥항문오목 (좌골직장와)',
    regionId: 'pelvis',
    icon: '🩺',
    summary: '항문관 양쪽의 쐐기 모양 공간으로 지방조직과 음부신경·혈관의 주행 경로가 위치함.',
    boundaries: [
      { type: 'medial', label: 'Anal canal & external anal sphincter', keywords: ['anal canal', 'anal sphincter'] },
      { type: 'lateral', label: 'Obturator internus & obturator fascia', keywords: ['obturator internus'] },
      { type: 'superior', label: 'Pelvic floor', keywords: ['levator ani'] },
    ],
    contents: [
      { label: 'Fat', category: 'organ', keywords: ['fat'] },
      { label: 'Pudendal nerve', category: 'nerve', keywords: ['pudendal nerve'] },
      { label: 'Internal pudendal vessels', category: 'artery', keywords: ['internal pudendal'] },
    ],
    clinicalPoints: [
      { title: '항문주위 농양', description: '좌골항문오목은 항문주위 농양이 퍼질 수 있는 주요 공간.' },
      { title: '음부신경', description: '음부신경과 속음부혈관이 Alcock canal을 통해 주행함.' },
    ],
  },

  // 19. Femoral Sheath (대퇴집)
  {
    id: 'femoral-sheath',
    name: 'Femoral Sheath',
    koreanName: '대퇴집',
    regionId: 'lower-limb',
    icon: '🦵',
    summary: '서혜인대 아래에서 대퇴동맥·정맥 및 대퇴관을 둘러싸는 근막성 공간.',
    boundaries: [
      { type: 'anterior', label: 'Transversalis fascia', keywords: ['transversalis fascia'] },
      { type: 'posterior', label: 'Iliac fascia', keywords: ['iliac fascia'] },
    ],
    contents: [
      { label: 'Femoral artery', category: 'artery', keywords: ['femoral artery'] },
      { label: 'Femoral vein', category: 'vein', keywords: ['femoral vein'] },
      { label: 'Femoral canal', category: 'lymph', keywords: ['femoral canal'] },
    ],
    clinicalPoints: [
      { title: '대퇴탈장', description: '대퇴관을 통해 발생하며 서혜인대 아래쪽, 대퇴정맥 내측에서 관찰됨.' },
      { title: '대퇴신경', description: '대퇴신경은 대퇴집에 포함되지 않음.' },
    ],
  },

  // 20. Vertebral Canal (척추관)
  {
    id: 'vertebral-canal',
    name: 'Vertebral Canal',
    koreanName: '척추관',
    regionId: 'back-spine',
    icon: '🦴',
    summary: '척추뼈의 척추구멍이 연결되어 형성되는 공간으로 척수와 그 주변 구조물이 위치함.',
    boundaries: [
      { type: 'anterior', label: 'Vertebral bodies & intervertebral discs', keywords: ['vertebral body', 'intervertebral disc'] },
      { type: 'posterior', label: 'Laminae & ligamentum flavum', keywords: ['lamina', 'ligamentum flavum'] },
      { type: 'lateral', label: 'Pedicles', keywords: ['pedicle'] },
    ],
    contents: [
      { label: 'Spinal cord', category: 'organ', keywords: ['spinal cord'] },
      { label: 'Spinal nerve roots', category: 'nerve', keywords: ['spinal nerve', 'nerve root'] },
    ],
    clinicalPoints: [
      { title: '척추관 협착증', description: '척추관이 좁아지면서 척수 또는 신경뿌리가 압박될 수 있음.' },
      { title: '경막외마취', description: '척추관 내 경막외강을 이용하여 국소마취제를 주입함.' },
    ],
  },

  // 21. Inguinal Canal (서혜관)
  {
    id: 'inguinal-canal',
    name: 'Inguinal Canal',
    koreanName: '서혜관',
    regionId: 'pelvis',
    icon: '🩺',
    summary: '앞배벽의 사선 방향 통로로, 남성에서는 정삭, 여성에서는 자궁원인대가 통과함.',
    boundaries: [
      { type: 'anterior', label: 'External oblique aponeurosis', keywords: ['external oblique'] },
      { type: 'posterior', label: 'Transversalis fascia', keywords: ['transversalis fascia'] },
      { type: 'roof', label: 'Internal oblique & Transversus abdominis', keywords: ['internal oblique', 'transversus abdominis'] },
      { type: 'floor', label: 'Inguinal ligament', keywords: ['inguinal ligament'] },
    ],
    contents: [
      { label: 'Spermatic cord', category: 'organ', keywords: ['spermatic cord'] },
      { label: 'Round ligament of uterus', category: 'organ', keywords: ['round ligament'] },
      { label: 'Ilioinguinal nerve', category: 'nerve', keywords: ['ilioinguinal nerve'] },
    ],
    clinicalPoints: [
      { title: '직접·간접 서혜탈장', description: '간접 서혜탈장은 deep inguinal ring을 통해 서혜관으로 들어가며, 직접 서혜탈장은 Hesselbach 삼각을 통해 발생.' },
      { title: '서혜관 내용물', description: '남성에서는 정삭과 엉덩이샅굴신경, 여성에서는 자궁원인대와 엉덩이샅굴신경이 중요.' },
    ],
  },

  // 22. Hesselbach Triangle (헤셀바흐 삼각)
  {
    id: 'hesselbach-triangle',
    name: 'Hesselbach Triangle',
    koreanName: '헤셀바흐 삼각',
    regionId: 'pelvis',
    icon: '🩺',
    summary: '앞배벽의 해부학적 약점으로 직접 서혜탈장이 발생하는 부위.',
    boundaries: [
      { type: 'medial', label: 'Lateral border of rectus abdominis', keywords: ['rectus abdominis'] },
      { type: 'lateral', label: 'Inferior epigastric vessels', keywords: ['inferior epigastric'] },
      { type: 'inferior', label: 'Inguinal ligament', keywords: ['inguinal ligament'] },
    ],
    contents: [
      { label: 'Inferior epigastric vessels', category: 'artery', keywords: ['inferior epigastric'] },
    ],
    clinicalPoints: [
      { title: '직접 서혜탈장', description: '아래배벽혈관의 내측에서 Hesselbach 삼각을 통해 발생.' },
      { title: '직접 vs 간접 서혜탈장', description: '직접 서혜탈장은 아래배벽혈관 내측, 간접 서혜탈장은 아래배벽혈관 외측에서 발생.' },
    ],
  },

  // 23. Thoracic Outlet (흉곽출구)
  {
    id: 'thoracic-outlet',
    name: 'Thoracic Outlet',
    koreanName: '흉곽출구',
    regionId: 'thorax',
    icon: '🫁',
    summary: '목과 상지 사이에서 쇄골하혈관 및 상완신경총이 통과하는 부위.',
    boundaries: [
      { type: 'anterior', label: 'Clavicle', keywords: ['clavicle'] },
      { type: 'medial', label: 'First rib', keywords: ['first rib'] },
      { type: 'posterior', label: 'Scalene muscles', keywords: ['scalene'] },
    ],
    contents: [
      { label: 'Subclavian artery', category: 'artery', keywords: ['subclavian artery'] },
      { label: 'Subclavian vein', category: 'vein', keywords: ['subclavian vein'] },
      { label: 'Brachial plexus', category: 'nerve', keywords: ['brachial plexus'] },
    ],
    clinicalPoints: [
      { title: '흉곽출구증후군', description: '상완신경총 또는 쇄골하혈관이 압박되어 상지의 통증·감각이상 또는 혈관 증상이 발생할 수 있음.' },
      { title: '사각근 사이', description: '앞목갈비근과 중간목갈비근 사이로 상완신경총과 쇄골하동맥이 지나며 쇄골하정맥은 그 앞쪽을 주행.' },
    ],
  },

  // 24. Carotid Sheath (경동맥초)
  {
    id: 'carotid-sheath',
    name: 'Carotid Sheath',
    koreanName: '경동맥초',
    regionId: 'head-neck',
    icon: '🧠',
    summary: '목의 주요 신경혈관 구조를 둘러싸는 근막성 구조로, 경동맥·속목정맥·미주신경이 핵심 내용물.',
    boundaries: [
      { type: 'medial', label: 'Pharynx & larynx', keywords: ['pharynx', 'larynx'] },
      { type: 'posterior', label: 'Prevertebral fascia', keywords: ['prevertebral fascia'] },
    ],
    contents: [
      { label: 'Common/Internal carotid artery', category: 'artery', keywords: ['carotid artery'] },
      { label: 'Internal jugular vein', category: 'vein', keywords: ['internal jugular vein'] },
      { label: 'Vagus nerve', category: 'nerve', keywords: ['vagus nerve'] },
    ],
    clinicalPoints: [
      { title: '경동맥초 배열', description: '경동맥은 내측, 속목정맥은 외측, 미주신경은 두 혈관 사이의 후방에 위치.' },
      { title: '경정맥 중심정맥관', description: '속목정맥은 중심정맥관 삽입에 이용되는 주요 혈관.' },
    ],
  },

  // 25. Inguinal Rings (서혜륜 / 샅굴구멍)
  {
    id: 'inguinal-ring-region',
    name: 'Inguinal Rings',
    koreanName: '서혜륜',
    regionId: 'pelvis',
    icon: '🩺',
    summary: '서혜관의 양 끝에 위치하는 깊은서혜륜과 얕은서혜륜.',
    boundaries: [
      { type: 'posterior', label: 'Transversalis fascia', keywords: ['transversalis fascia'] },
      { type: 'anterior', label: 'External oblique aponeurosis', keywords: ['external oblique'] },
    ],
    contents: [
      { label: 'Spermatic cord', category: 'organ', keywords: ['spermatic cord'] },
      { label: 'Round ligament of uterus', category: 'organ', keywords: ['round ligament'] },
    ],
    clinicalPoints: [
      { title: 'Deep inguinal ring', description: '아래배벽혈관의 외측에 위치하며 간접 서혜탈장의 시작점.' },
      { title: 'Superficial inguinal ring', description: '외복사근 널힘줄에 존재하며 서혜관의 표재성 출구.' },
    ],
  },

  // 26. Pericardial Cavity (심낭강)
  {
    id: 'pericardial-cavity',
    name: 'Pericardial Cavity',
    koreanName: '심낭강',
    regionId: 'thorax',
    icon: '🫀',
    summary: '장측심낭과 벽측심낭 사이의 잠재적 공간으로 심장을 둘러쌈.',
    boundaries: [
      { type: 'anterior', label: 'Anterior pericardium', keywords: ['pericardium'] },
      { type: 'posterior', label: 'Posterior pericardium', keywords: ['pericardium'] },
    ],
    contents: [
      { label: 'Heart', category: 'organ', keywords: ['heart'] },
      { label: 'Pericardium', category: 'organ', keywords: ['pericardium'] },
    ],
    clinicalPoints: [
      { title: '심낭삼출', description: '심낭강에 액체가 증가하는 상태.' },
      { title: '심장눌림증', description: '심낭 내 압력 증가로 심장의 이완기 충만이 제한되는 응급상황.' },
    ],
  },

  // 27. Pelvic Floor (골반바닥)
  {
    id: 'pelvic-floor-space',
    name: 'Pelvic Floor',
    koreanName: '골반바닥',
    regionId: 'pelvis',
    icon: '🩺',
    summary: '골반강의 아래쪽을 형성하며 골반 장기를 지지하는 근육성 구조.',
    boundaries: [
      { type: 'superior', label: 'Pelvic cavity', keywords: ['pelvis'] },
      { type: 'inferior', label: 'Perineum', keywords: ['perineum'] },
    ],
    contents: [
      { label: 'Levator ani', category: 'organ', keywords: ['levator ani'] },
      { label: 'Coccygeus', category: 'organ', keywords: ['coccygeus'] },
      { label: 'Pudendal nerve', category: 'nerve', keywords: ['pudendal nerve'] },
    ],
    clinicalPoints: [
      { title: '골반장기 지지', description: '골반 장기를 지지하며 배뇨·배변 및 골반 장기 기능과 관련됨.' },
      { title: '골반장기 탈출', description: '골반바닥 지지 기능이 약화되면 골반장기 탈출의 위험이 증가할 수 있음.' },
    ],
  },

  // 28. Renal Hilum (콩팥문 / 신문)
  {
    id: 'renal-hilum',
    name: 'Renal Hilum',
    koreanName: '콩팥문',
    regionId: 'abdomen',
    icon: '🫘',
    summary: '신장의 안쪽 모서리에 위치하며 신장혈관과 신우가 출입하는 통로.',
    boundaries: [
      { type: 'medial', label: 'Medial border of kidney', keywords: ['kidney'] },
    ],
    contents: [
      { label: 'Renal vein', category: 'vein', keywords: ['renal vein'] },
      { label: 'Renal artery', category: 'artery', keywords: ['renal artery'] },
      { label: 'Renal pelvis', category: 'organ', keywords: ['renal pelvis'] },
    ],
    clinicalPoints: [
      { title: '신장문 배열', description: '앞에서 뒤로 일반적으로 신장정맥 → 신장동맥 → 신우의 순서로 배열됨.' },
      { title: '신장 수술', description: '신장문을 통해 신장혈관과 요로 구조가 출입하므로 신장 절제술에서 중요한 해부학적 기준점.' },
    ],
  },
];

/**
 * 주어진 Space ID 및 필터(all | boundaries | contents)에 해당하는 파트 ID 목록을 추출합니다.
 */
export function getSpacePartIds(
  atlas: Atlas,
  spaceId: string,
  filter: 'all' | 'boundaries' | 'contents' = 'all'
): string[] {
  const space = CLINICAL_SPACES.find(s => s.id === spaceId);
  if (!space) return [];

  const targetKeywords: string[] = [];

  if (filter === 'all' || filter === 'boundaries') {
    for (const b of space.boundaries) {
      targetKeywords.push(...b.keywords);
    }
  }

  if (filter === 'all' || filter === 'contents') {
    for (const c of space.contents) {
      targetKeywords.push(...c.keywords);
    }
  }

  const cleanKeywords = targetKeywords.map(k => k.toLowerCase().trim()).filter(Boolean);
  const partIds = new Set<string>();

  for (const part of atlas.parts) {
    const pName = part.name.toLowerCase();
    for (const kw of cleanKeywords) {
      if (pName.includes(kw)) {
        partIds.add(part.id);
        break;
      }
    }
  }

  return Array.from(partIds);
}
