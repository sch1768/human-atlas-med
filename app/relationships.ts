/**
 * 해부학적 관계 (Anatomical Relationships) 데이터 모델
 * - 단순 소속(Region/System)을 넘어 'A 구조가 B 구조와 어떠한 기능적/공간적 연결 관계를 맺는가'를 정의합니다.
 */

export type RelationshipType =
  | 'branch'          // 동맥/신경 분기 (A gives off B)
  | 'tributary'       // 정맥 합류 (B drains into A)
  | 'supplies'        // 혈액 공급 (A supplies B)
  | 'drains-to'       // 정맥/림프 배액 (A drains to B)
  | 'innervates'      // 운동/감각 신경 지배 (A innervates B)
  | 'passes-through'  // 구조물/공간 통과 (A passes through B)
  | 'forms'           // 구성/경계 형성 (A forms part of B)
  | 'originates-from' // 근육 기시 (A originates from B)
  | 'inserts-on'      // 근육 정지 (A inserts on B)
  | 'adjacent';       // 인접/주변 관계

export interface AnatomicalRelationship {
  id: string;
  sourceConcept: string;      // 주체 구조물 (소문자 영문 또는 식별자)
  sourceLabel: string;        // 표시 명칭 (예: "Radial nerve")
  targetConcept: string;      // 대상 구조물
  targetLabel: string;        // 표시 명칭 (예: "Radial groove")
  type: RelationshipType;
  relationshipLabel: string;  // 한글/영문 관계 레이블 (예: "주행 통로", "분기", "운동 지배")
  clinicalNote?: string;      // 관련 임상/시험 포인트
}

export const ANATOMICAL_RELATIONSHIPS: AnatomicalRelationship[] = [
  // 1. Radial nerve (노신경 / 요골신경)
  {
    id: 'rel-rad-1',
    sourceConcept: 'radial nerve',
    sourceLabel: 'Radial nerve (노신경)',
    targetConcept: 'radial groove',
    targetLabel: 'Radial groove of humerus (노신경고랑)',
    type: 'passes-through',
    relationshipLabel: '통과 (Course)',
    clinicalNote: '위팔뼈 중간부 골절(Humeral mid-shaft fx.) 시 손상 → 손목처짐(Wrist drop) 호발',
  },
  {
    id: 'rel-rad-2',
    sourceConcept: 'radial nerve',
    sourceLabel: 'Radial nerve (노신경)',
    targetConcept: 'triceps brachii',
    targetLabel: 'Triceps brachii (위팔세갈래근)',
    type: 'innervates',
    relationshipLabel: '운동 지배 (Motor)',
    clinicalNote: '팔꿈치 신전(Extension) 운동 담당',
  },

  // 2. Celiac trunk (복강동맥)
  {
    id: 'rel-cel-1',
    sourceConcept: 'celiac artery',
    sourceLabel: 'Celiac trunk (복강동맥)',
    targetConcept: 'left gastric artery',
    targetLabel: 'Left gastric artery (좌위동맥)',
    type: 'branch',
    relationshipLabel: '3대 분지 (Branch)',
    clinicalNote: '위 소만부(Lesser curvature) 혈류 공급',
  },
  {
    id: 'rel-cel-2',
    sourceConcept: 'celiac artery',
    sourceLabel: 'Celiac trunk (복강동맥)',
    targetConcept: 'splenic artery',
    targetLabel: 'Splenic artery (비장동맥)',
    type: 'branch',
    relationshipLabel: '3대 분지 (Branch)',
    clinicalNote: '췌장 상연을 따라 비장 및 위저부(Short gastric aa.) 공급',
  },
  {
    id: 'rel-cel-3',
    sourceConcept: 'celiac artery',
    sourceLabel: 'Celiac trunk (복강동맥)',
    targetConcept: 'common hepatic artery',
    targetLabel: 'Common hepatic artery (총간동맥)',
    type: 'branch',
    relationshipLabel: '3대 분지 (Branch)',
    clinicalNote: 'Proper hepatic a.와 Gastroduodenal a.로 분기',
  },

  // 3. Median nerve (정중신경)
  {
    id: 'rel-med-1',
    sourceConcept: 'median nerve',
    sourceLabel: 'Median nerve (정중신경)',
    targetConcept: 'pronator teres',
    targetLabel: 'Pronator teres (원엎침근)',
    type: 'passes-through',
    relationshipLabel: '근육 사이 관통 (Course)',
    clinicalNote: '원회내근 증후군(Pronator teres syndrome) 시 두 갈래 사이에서 정중신경 포착',
  },
  {
    id: 'rel-med-2',
    sourceConcept: 'median nerve',
    sourceLabel: 'Median nerve (정중신경)',
    targetConcept: 'carpal tunnel',
    targetLabel: 'Carpal tunnel (수근관)',
    type: 'passes-through',
    relationshipLabel: '공간 통과 (Course)',
    clinicalNote: '수근관 증후군 압박 손상 → Ape hand',
  },

  // 4. Femoral nerve (대퇴신경)
  {
    id: 'rel-fem-1',
    sourceConcept: 'femoral nerve',
    sourceLabel: 'Femoral nerve (대퇴신경)',
    targetConcept: 'quadriceps femoris',
    targetLabel: 'Quadriceps femoris (대퇴사두근)',
    type: 'innervates',
    relationshipLabel: '운동 지배 (Motor)',
    clinicalNote: '무릎 신전 및 무릎반사(Patellar reflex, L3-L4) 중추',
  },
  {
    id: 'rel-fem-2',
    sourceConcept: 'femoral artery',
    sourceLabel: 'Femoral artery (대퇴동맥)',
    targetConcept: 'deep femoral artery',
    targetLabel: 'Deep femoral artery (심대퇴동맥 / profunda femoris)',
    type: 'branch',
    relationshipLabel: '주요 분지 (Branch)',
    clinicalNote: '넓적다리 깊은 근육군 공급 및 관절십자문합(Cruciate anastomosis) 형성',
  },
  // 5. Brachial plexus / Axillary region
  {
    id: 'rel-brachial-1',
    sourceConcept: 'brachial plexus',
    sourceLabel: 'Brachial plexus (팔신경총)',
    targetConcept: 'axillary artery',
    targetLabel: 'Axillary artery (겨드랑동맥)',
    type: 'passes-through',
    relationshipLabel: '주행 (Course)',
    clinicalNote: '상완신경총은 액와동맥을 둘러싸며 cords가 형성됨.',
  },
  {
    id: 'rel-brachial-2',
    sourceConcept: 'musculocutaneous nerve',
    sourceLabel: 'Musculocutaneous nerve (근육피부신경)',
    targetConcept: 'coracobrachialis',
    targetLabel: 'Coracobrachialis (부리위팔근)',
    type: 'passes-through',
    relationshipLabel: '관통 (Course)',
    clinicalNote: '근육피부신경은 부리위팔근을 관통한 후 위팔 앞칸으로 주행.',
  },

  // 6. Femoral nerve / Lower limb
  {
    id: 'rel-fem-3',
    sourceConcept: 'femoral nerve',
    sourceLabel: 'Femoral nerve (대퇴신경)',
    targetConcept: 'femoral sheath',
    targetLabel: 'Femoral sheath (대퇴집)',
    type: 'adjacent',
    relationshipLabel: '외측 주행 (Relation)',
    clinicalNote: '대퇴신경은 대퇴집에 포함되지 않고 대퇴집의 외측에 위치.',
  },
  {
    id: 'rel-fem-4',
    sourceConcept: 'femoral artery',
    sourceLabel: 'Femoral artery (대퇴동맥)',
    targetConcept: 'adductor hiatus',
    targetLabel: 'Adductor hiatus (모음근구멍)',
    type: 'passes-through',
    relationshipLabel: '통과 (Course)',
    clinicalNote: '대퇴동맥은 모음근구멍을 통과하여 슬와동맥으로 이어짐.',
  },
  {
    id: 'rel-fem-5',
    sourceConcept: 'great saphenous vein',
    sourceLabel: 'Great saphenous vein (큰두렁정맥)',
    targetConcept: 'femoral vein',
    targetLabel: 'Femoral vein (대퇴정맥)',
    type: 'tributary',
    relationshipLabel: '합류 (Tributary)',
    clinicalNote: '큰두렁정맥은 복재열공을 통해 대퇴정맥으로 합류.',
  },

  // 7. Popliteal fossa
  {
    id: 'rel-pop-1',
    sourceConcept: 'popliteal artery',
    sourceLabel: 'Popliteal artery (오금동맥)',
    targetConcept: 'popliteal fossa',
    targetLabel: 'Popliteal fossa (오금)',
    type: 'passes-through',
    relationshipLabel: '주행 (Course)',
    clinicalNote: '오금동맥은 오금의 가장 깊은 층에 위치.',
  },
  {
    id: 'rel-pop-2',
    sourceConcept: 'tibial nerve',
    sourceLabel: 'Tibial nerve (정강신경)',
    targetConcept: 'popliteal fossa',
    targetLabel: 'Popliteal fossa (오금)',
    type: 'passes-through',
    relationshipLabel: '주행 (Course)',
    clinicalNote: '정강신경은 오금의 비교적 얕은 층에서 주행.',
  },

  // 8. Median nerve
  {
    id: 'rel-med-3',
    sourceConcept: 'median nerve',
    sourceLabel: 'Median nerve (정중신경)',
    targetConcept: 'interosseous membrane',
    targetLabel: 'Interosseous membrane (뼈사이막)',
    type: 'adjacent',
    relationshipLabel: '주변 주행 (Relation)',
    clinicalNote: '전완에서 정중신경은 앞뼈사이신경을 분지하여 깊은굽힘근 등을 지배.',
  },
  {
    id: 'rel-med-4',
    sourceConcept: 'median nerve',
    sourceLabel: 'Median nerve (정중신경)',
    targetConcept: 'flexor digitorum superficialis',
    targetLabel: 'Flexor digitorum superficialis (얕은손가락굽힘근)',
    type: 'innervates',
    relationshipLabel: '운동 지배 (Motor)',
    clinicalNote: '전완 얕은/중간층 굽힘근 지배 (손가락 PIP 관절 굴곡).',
  },

  // 9. Ulnar nerve
  {
    id: 'rel-uln-1',
    sourceConcept: 'ulnar nerve',
    sourceLabel: 'Ulnar nerve (자신경)',
    targetConcept: 'medial epicondyle',
    targetLabel: 'Medial epicondyle (위팔뼈 안쪽위관절융기)',
    type: 'adjacent',
    relationshipLabel: '뒤쪽 주행 (Course)',
    clinicalNote: '안쪽위관절융기 뒤를 지나며 타격 시 저림을 유발하는 대표적 부위.',
  },
  {
    id: 'rel-uln-2',
    sourceConcept: 'ulnar nerve',
    sourceLabel: 'Ulnar nerve (자신경)',
    targetConcept: 'cubital tunnel',
    targetLabel: 'Cubital tunnel (팔꿈치굴)',
    type: 'passes-through',
    relationshipLabel: '통과 (Course)',
    clinicalNote: '팔꿈치굴 증후군에서 자신경 압박이 발생.',
  },

  // 10. Radial nerve
  {
    id: 'rel-rad-3',
    sourceConcept: 'radial nerve',
    sourceLabel: 'Radial nerve (노신경)',
    targetConcept: 'spiral groove',
    targetLabel: 'Spiral groove (노신경고랑)',
    type: 'passes-through',
    relationshipLabel: '주행 (Course)',
    clinicalNote: '위팔뼈 몸통 중간부 골절에서 노신경 손상이 중요.',
  },

  // 11. Cranial nerves / Cavernous sinus
  {
    id: 'rel-cav-1',
    sourceConcept: 'oculomotor nerve',
    sourceLabel: 'Oculomotor nerve (눈돌림신경, CN III)',
    targetConcept: 'cavernous sinus',
    targetLabel: 'Cavernous sinus (해면정맥동)',
    type: 'passes-through',
    relationshipLabel: '외측벽 주행 (Course)',
    clinicalNote: '해면정맥동 병변에서 안구운동신경 마비가 발생할 수 있음.',
  },
  {
    id: 'rel-cav-2',
    sourceConcept: 'abducens nerve',
    sourceLabel: 'Abducens nerve (갓돌림신경, CN VI)',
    targetConcept: 'cavernous sinus',
    targetLabel: 'Cavernous sinus (해면정맥동)',
    type: 'passes-through',
    relationshipLabel: '내부 통과 (Course)',
    clinicalNote: 'CN VI는 해면정맥동 내부를 지나므로 해면정맥동 병변에서 잘 손상됨.',
  },

  // 12. Carotid sheath
  {
    id: 'rel-carotid-1',
    sourceConcept: 'common carotid artery',
    sourceLabel: 'Common carotid artery (온목동맥)',
    targetConcept: 'carotid sheath',
    targetLabel: 'Carotid sheath (경동맥초)',
    type: 'passes-through',
    relationshipLabel: '포함 (Course)',
    clinicalNote: '경동맥초 내부에서 IJV 및 미주신경과 함께 주행.',
  },
  {
    id: 'rel-carotid-2',
    sourceConcept: 'vagus nerve',
    sourceLabel: 'Vagus nerve (미주신경)',
    targetConcept: 'carotid sheath',
    targetLabel: 'Carotid sheath (경동맥초)',
    type: 'passes-through',
    relationshipLabel: '주행 (Course)',
    clinicalNote: '경동맥과 속목정맥 사이의 후방에서 주행.',
  },

  // 13. Portal triad
  {
    id: 'rel-portal-1',
    sourceConcept: 'portal vein',
    sourceLabel: 'Portal vein (문맥)',
    targetConcept: 'hepatoduodenal ligament',
    targetLabel: 'Hepatoduodenal ligament (간십이지장인대)',
    type: 'passes-through',
    relationshipLabel: '포함 (Course)',
    clinicalNote: '간십이지장인대 내부에서 문맥, 고유간동맥, 총담관이 함께 주행.',
  },
  {
    id: 'rel-portal-2',
    sourceConcept: 'common bile duct',
    sourceLabel: 'Common bile duct (총담관)',
    targetConcept: 'hepatoduodenal ligament',
    targetLabel: 'Hepatoduodenal ligament (간십이지장인대)',
    type: 'passes-through',
    relationshipLabel: '포함 (Course)',
    clinicalNote: '간십이지장인대의 우측 전방에 위치하는 대표적 구조.',
  },

  // 14. Coronary arteries
  {
    id: 'rel-cor-1',
    sourceConcept: 'left coronary artery',
    sourceLabel: 'Left coronary artery (좌관상동맥)',
    targetConcept: 'anterior interventricular artery',
    targetLabel: 'Anterior interventricular artery / LAD (앞심실사이동맥)',
    type: 'branch',
    relationshipLabel: '주요 분지 (Branch)',
    clinicalNote: 'LAD는 좌심실 전벽 및 심실중격의 주요 혈액 공급을 담당.',
  },
  {
    id: 'rel-cor-2',
    sourceConcept: 'right coronary artery',
    sourceLabel: 'Right coronary artery (우관상동맥)',
    targetConcept: 'posterior interventricular artery',
    targetLabel: 'Posterior interventricular artery (뒤심실사이동맥)',
    type: 'branch',
    relationshipLabel: '주요 분지 (Branch)',
    clinicalNote: '우관상동맥 우세형에서 후심실사이동맥을 분지.',
  },

  // 15. Kidney / ureter
  {
    id: 'rel-kid-1',
    sourceConcept: 'renal artery',
    sourceLabel: 'Renal artery (콩팥동맥)',
    targetConcept: 'kidney',
    targetLabel: 'Kidney (콩팥)',
    type: 'supplies',
    relationshipLabel: '혈액 공급 (Supply)',
    clinicalNote: '신장문을 통해 신장으로 들어가며 신장 혈류를 담당.',
  },
  {
    id: 'rel-kid-2',
    sourceConcept: 'ureter',
    sourceLabel: 'Ureter (요관)',
    targetConcept: 'gonadal artery',
    targetLabel: 'Gonadal artery (생식샘동맥)',
    type: 'adjacent',
    relationshipLabel: '교차 관계 (Relation)',
    clinicalNote: '요관은 골반으로 내려가며 혈관과 교차하는 관계가 임상적으로 중요.',
  },

  // 16. Inguinal region
  {
    id: 'rel-inguinal-1',
    sourceConcept: 'spermatic cord',
    sourceLabel: 'Spermatic cord (정삭)',
    targetConcept: 'inguinal canal',
    targetLabel: 'Inguinal canal (서혜관)',
    type: 'passes-through',
    relationshipLabel: '통과 (Course)',
    clinicalNote: '남성에서 정삭은 서혜관을 통과하여 외서혜륜으로 나옴.',
  },
  {
    id: 'rel-inguinal-2',
    sourceConcept: 'round ligament of uterus',
    sourceLabel: 'Round ligament of uterus (자궁원인대)',
    targetConcept: 'inguinal canal',
    targetLabel: 'Inguinal canal (서혜관)',
    type: 'passes-through',
    relationshipLabel: '통과 (Course)',
    clinicalNote: '여성에서 자궁원인대가 서혜관을 통과하여 대음순으로 이어짐.',
  },

  // 17. Spinal nerve roots
  {
    id: 'rel-spine-1',
    sourceConcept: 'spinal nerve',
    sourceLabel: 'Spinal nerve (척수신경)',
    targetConcept: 'intervertebral foramen',
    targetLabel: 'Intervertebral foramen (추간공)',
    type: 'passes-through',
    relationshipLabel: '통과 (Course)',
    clinicalNote: '척수신경은 추간공을 통해 척추관 밖으로 나옴.',
  },
  {
    id: 'rel-spine-2',
    sourceConcept: 'spinal cord',
    sourceLabel: 'Spinal cord (척수)',
    targetConcept: 'vertebral canal',
    targetLabel: 'Vertebral canal (척추관)',
    type: 'passes-through',
    relationshipLabel: '위치 (Location)',
    clinicalNote: '척수는 척추관 내부를 주행하며 성인에서는 대개 L1-L2 수준에서 끝남.',
  },

  // 18. Ulnar nerve
  {
    id: 'rel-uln-3',
    sourceConcept: 'ulnar nerve',
    sourceLabel: 'Ulnar nerve (자신경)',
    targetConcept: 'flexor carpi ulnaris',
    targetLabel: 'Flexor carpi ulnaris (척측수근굴근)',
    type: 'innervates',
    relationshipLabel: '운동 지배 (Motor)',
    clinicalNote: '전완 앞칸의 척측수근굴근 및 손의 여러 고유근을 지배.',
  },

  // 19. Musculocutaneous nerve
  {
    id: 'rel-musculo-1',
    sourceConcept: 'musculocutaneous nerve',
    sourceLabel: 'Musculocutaneous nerve (근육피부신경)',
    targetConcept: 'brachialis',
    targetLabel: 'Brachialis (위팔근)',
    type: 'innervates',
    relationshipLabel: '운동 지배 (Motor)',
    clinicalNote: '위팔 앞칸의 주된 팔꿈치 굽힘근 지배.',
  },
  {
    id: 'rel-musculo-2',
    sourceConcept: 'musculocutaneous nerve',
    sourceLabel: 'Musculocutaneous nerve (근육피부신경)',
    targetConcept: 'biceps brachii',
    targetLabel: 'Biceps brachii (위팔두갈래근)',
    type: 'innervates',
    relationshipLabel: '운동 지배 (Motor)',
    clinicalNote: '상완 앞칸 근육을 지배하며 팔꿈치 굽힘에 중요.',
  },

  // 20. Long thoracic nerve
  {
    id: 'rel-thoracic-1',
    sourceConcept: 'long thoracic nerve',
    sourceLabel: 'Long thoracic nerve (긴가슴신경)',
    targetConcept: 'serratus anterior',
    targetLabel: 'Serratus anterior (앞톱니근)',
    type: 'innervates',
    relationshipLabel: '운동 지배 (Motor)',
    clinicalNote: '손상 시 앞톱니근 마비로 Winged scapula 발생.',
  },

  // 21. Axillary nerve
  {
    id: 'rel-axillary-1',
    sourceConcept: 'axillary nerve',
    sourceLabel: 'Axillary nerve (겨드랑신경)',
    targetConcept: 'quadrangular space',
    targetLabel: 'Quadrangular space (네모공간)',
    type: 'passes-through',
    relationshipLabel: '통과 (Course)',
    clinicalNote: '네모공간을 통해 뒤쪽으로 주행하며 어깨밑동맥과 함께 지나감.',
  },
  {
    id: 'rel-axillary-2',
    sourceConcept: 'axillary nerve',
    sourceLabel: 'Axillary nerve (겨드랑신경)',
    targetConcept: 'deltoid',
    targetLabel: 'Deltoid (어깨세모근)',
    type: 'innervates',
    relationshipLabel: '운동 지배 (Motor)',
    clinicalNote: '삼각근을 지배하며 어깨 외전의 핵심 신경.',
  },

  // 22. Common fibular nerve
  {
    id: 'rel-fibular-1',
    sourceConcept: 'common fibular nerve',
    sourceLabel: 'Common fibular nerve (온종아리신경)',
    targetConcept: 'fibular neck',
    targetLabel: 'Neck of fibula (종아리뼈 목)',
    type: 'adjacent',
    relationshipLabel: '주행 (Course)',
    clinicalNote: '종아리뼈 목을 돌아 주행하여 비골경부 골절에서 손상될 수 있음.',
  },
  {
    id: 'rel-fibular-2',
    sourceConcept: 'common fibular nerve',
    sourceLabel: 'Common fibular nerve (온종아리신경)',
    targetConcept: 'deep fibular nerve',
    targetLabel: 'Deep fibular nerve (깊은종아리신경)',
    type: 'branch',
    relationshipLabel: '분지 (Branch)',
    clinicalNote: '얕은종아리신경과 깊은종아리신경으로 분지.',
  },

  // 23. Tibial nerve
  {
    id: 'rel-tibial-1',
    sourceConcept: 'tibial nerve',
    sourceLabel: 'Tibial nerve (정강신경)',
    targetConcept: 'tarsal tunnel',
    targetLabel: 'Tarsal tunnel (발목굴)',
    type: 'passes-through',
    relationshipLabel: '통과 (Course)',
    clinicalNote: '내측복사 뒤쪽의 발목굴을 통과하며 발목굴증후군과 관련.',
  },

  // 24. Sciatic nerve
  {
    id: 'rel-sciatic-1',
    sourceConcept: 'sciatic nerve',
    sourceLabel: 'Sciatic nerve (궁둥신경)',
    targetConcept: 'piriformis',
    targetLabel: 'Piriformis (궁둥구멍근)',
    type: 'adjacent',
    relationshipLabel: '아래쪽 주행 (Course)',
    clinicalNote: '대부분 궁둥구멍근 아래쪽으로 큰궁둥구멍을 통과.',
  },

  // 25. Superior gluteal nerve
  {
    id: 'rel-gluteal-1',
    sourceConcept: 'superior gluteal nerve',
    sourceLabel: 'Superior gluteal nerve (위궁둥신경)',
    targetConcept: 'piriformis',
    targetLabel: 'Piriformis (궁둥구멍근)',
    type: 'adjacent',
    relationshipLabel: '위쪽 주행 (Course)',
    clinicalNote: '궁둥구멍근 위쪽으로 큰궁둥구멍을 통과.',
  },

  // 26. Inferior gluteal nerve
  {
    id: 'rel-gluteal-2',
    sourceConcept: 'inferior gluteal nerve',
    sourceLabel: 'Inferior gluteal nerve (아래궁둥신경)',
    targetConcept: 'gluteus maximus',
    targetLabel: 'Gluteus maximus (큰볼기근)',
    type: 'innervates',
    relationshipLabel: '운동 지배 (Motor)',
    clinicalNote: '큰볼기근을 지배하며 고관절 신전에 중요.',
  },

  // 27. Phrenic nerve
  {
    id: 'rel-phrenic-1',
    sourceConcept: 'phrenic nerve',
    sourceLabel: 'Phrenic nerve (가로막신경)',
    targetConcept: 'diaphragm',
    targetLabel: 'Diaphragm (가로막)',
    type: 'innervates',
    relationshipLabel: '운동 지배 (Motor)',
    clinicalNote: '가로막의 주된 운동신경이며 C3-C5에서 기원.',
  },

  // 28. Vagus nerve / recurrent laryngeal nerve
  {
    id: 'rel-vagus-1',
    sourceConcept: 'recurrent laryngeal nerve',
    sourceLabel: 'Recurrent laryngeal nerve (되돌이후두신경)',
    targetConcept: 'inferior thyroid artery',
    targetLabel: 'Inferior thyroid artery (아래갑상샘동맥)',
    type: 'adjacent',
    relationshipLabel: '교차 관계 (Relation)',
    clinicalNote: '갑상샘 수술에서 아래갑상샘동맥과 되돌이후두신경의 관계가 중요.',
  },

  // 29. Facial nerve
  {
    id: 'rel-facial-1',
    sourceConcept: 'facial nerve',
    sourceLabel: 'Facial nerve (얼굴신경, CN VII)',
    targetConcept: 'parotid gland',
    targetLabel: 'Parotid gland (귀밑샘)',
    type: 'passes-through',
    relationshipLabel: '관통 (Course)',
    clinicalNote: '얼굴신경은 귀밑샘 내부에서 여러 분지로 나뉘지만 귀밑샘을 분비신경 지배하지는 않음.',
  },

  // 30. Optic nerve
  {
    id: 'rel-optic-1',
    sourceConcept: 'optic nerve',
    sourceLabel: 'Optic nerve (시신경, CN II)',
    targetConcept: 'optic canal',
    targetLabel: 'Optic canal (시신경관)',
    type: 'passes-through',
    relationshipLabel: '통과 (Course)',
    clinicalNote: '시신경과 눈동맥이 시신경관을 통과.',
  },

  // 31. Oculomotor nerve
  {
    id: 'rel-oculo-1',
    sourceConcept: 'oculomotor nerve',
    sourceLabel: 'Oculomotor nerve (눈돌림신경, CN III)',
    targetConcept: 'superior orbital fissure',
    targetLabel: 'Superior orbital fissure (위눈확틈새)',
    type: 'passes-through',
    relationshipLabel: '통과 (Course)',
    clinicalNote: 'CN III는 위눈확틈새를 통해 안와로 들어가 외안근을 지배.',
  },

  // 32. Facial nerve / stylomastoid foramen
  {
    id: 'rel-facial-2',
    sourceConcept: 'facial nerve',
    sourceLabel: 'Facial nerve (얼굴신경, CN VII)',
    targetConcept: 'stylomastoid foramen',
    targetLabel: 'Stylomastoid foramen (붓꼭지구멍)',
    type: 'passes-through',
    relationshipLabel: '통과 (Course)',
    clinicalNote: '얼굴신경은 붓꼭지구멍을 통해 두개골 밖으로 나옴.',
  },

  // 33. Portal triad
  {
    id: 'rel-portal-3',
    sourceConcept: 'proper hepatic artery',
    sourceLabel: 'Proper hepatic artery (고유간동맥)',
    targetConcept: 'hepatoduodenal ligament',
    targetLabel: 'Hepatoduodenal ligament (간십이지장인대)',
    type: 'passes-through',
    relationshipLabel: '포함 (Course)',
    clinicalNote: '문맥 및 총담관과 함께 간십이지장인대를 주행.',
  },

  // 34. Portal vein
  {
    id: 'rel-portal-4',
    sourceConcept: 'portal vein',
    sourceLabel: 'Portal vein (문맥)',
    targetConcept: 'liver',
    targetLabel: 'Liver (간)',
    type: 'supplies',
    relationshipLabel: '혈류 공급 (Blood flow)',
    clinicalNote: '문맥은 위장관 및 비장 등에서 온 혈액을 간으로 운반.',
  },

  // 35. Bile duct
  {
    id: 'rel-bile-1',
    sourceConcept: 'common bile duct',
    sourceLabel: 'Common bile duct (총담관)',
    targetConcept: 'duodenum',
    targetLabel: 'Duodenum (십이지장)',
    type: 'drains-to',
    relationshipLabel: '배액 (Drainage)',
    clinicalNote: '총담관은 주로 주췌관과 합류하여 큰십이지장유두로 개구.',
  },

  // 36. Pancreatic duct
  {
    id: 'rel-pancreas-1',
    sourceConcept: 'main pancreatic duct',
    sourceLabel: 'Main pancreatic duct (주췌관)',
    targetConcept: 'duodenum',
    targetLabel: 'Duodenum (십이지장)',
    type: 'drains-to',
    relationshipLabel: '배액 (Drainage)',
    clinicalNote: '주췌관은 큰십이지장유두를 통해 십이지장으로 개구.',
  },

  // 37. Ureter
  {
    id: 'rel-ureter-1',
    sourceConcept: 'ureter',
    sourceLabel: 'Ureter (요관)',
    targetConcept: 'pelvic brim',
    targetLabel: 'Pelvic brim (골반가장자리)',
    type: 'adjacent',
    relationshipLabel: '교차 (Relation)',
    clinicalNote: '요관은 골반으로 내려오면서 주요 혈관 및 골반 구조물과 관계를 가짐.',
  },

  // 38. Renal artery
  {
    id: 'rel-renal-1',
    sourceConcept: 'renal artery',
    sourceLabel: 'Renal artery (콩팥동맥)',
    targetConcept: 'abdominal aorta',
    targetLabel: 'Abdominal aorta (배대동맥)',
    type: 'branch',
    relationshipLabel: '분지 (Branch)',
    clinicalNote: '배대동맥에서 직접 분지하여 신장으로 혈액을 공급.',
  },

  // 39. Coronary circulation
  {
    id: 'rel-cor-3',
    sourceConcept: 'right coronary artery',
    sourceLabel: 'Right coronary artery (우관상동맥)',
    targetConcept: 'right atrioventricular groove',
    targetLabel: 'Right atrioventricular groove (우심방실고랑)',
    type: 'passes-through',
    relationshipLabel: '주행 (Course)',
    clinicalNote: '우관상동맥은 우심방실고랑을 따라 주행.',
  },

  // 40. Great vessels
  {
    id: 'rel-aorta-1',
    sourceConcept: 'aortic arch',
    sourceLabel: 'Aortic arch (대동맥활)',
    targetConcept: 'left recurrent laryngeal nerve',
    targetLabel: 'Left recurrent laryngeal nerve (왼쪽 되돌이후두신경)',
    type: 'adjacent',
    relationshipLabel: '고리 주행 (Relation)',
    clinicalNote: '왼쪽 되돌이후두신경은 대동맥활 아래에서 돌아 후두로 올라감.',
  },
];

/**
 * 특정 해부학 개념에 연결된 모든 관계 항목들을 조회합니다.
 */
export function getRelationshipsForConcept(conceptName: string): AnatomicalRelationship[] {
  const q = conceptName.toLowerCase().trim();
  return ANATOMICAL_RELATIONSHIPS.filter(
    r => r.sourceConcept.includes(q) || q.includes(r.sourceConcept) ||
      r.targetConcept.includes(q) || q.includes(r.targetConcept)
  );
}
