export interface KoreanTerm {
  koreanName: string; // 신용어 (순우리말 표준)
  hanjaName: string;  // 구용어 (한자어)
}

export const KOREAN_ANATOMY_TERMS: Record<string, KoreanTerm> = {
  'abdominal aorta': { koreanName: '배대동맥', hanjaName: '복부대동맥' },
  'abducens nerve': { koreanName: '벌림신경', hanjaName: '외전신경' },
  'accessory nerve': { koreanName: '더부신경', hanjaName: '부신경' },
  'accessory pancreatic duct': { koreanName: '덧이자관', hanjaName: '부췌관' },
  'achilles tendon': { koreanName: '아킬레스힘줄', hanjaName: '아킬레스건' },
  'acromion': { koreanName: '봉우리', hanjaName: '견봉' },
  'adductor brevis': { koreanName: '짧은모음근', hanjaName: '단내전근' },
  'adductor longus': { koreanName: '긴모음근', hanjaName: '장내전근' },
  'adductor magnus': { koreanName: '큰모음근', hanjaName: '대내전근' },
  'alveolar duct': { koreanName: '허파꽈리관', hanjaName: '폐포관' },
  'alveolus': { koreanName: '허파꽈리', hanjaName: '폐포' },
  'amygdala': { koreanName: '편도체', hanjaName: '편도체' },
  'anal canal': { koreanName: '항문관', hanjaName: '항문관' },
  'ankle joint': { koreanName: '발목관절', hanjaName: '족관절' },
  'anterior cerebral artery': { koreanName: '앞대뇌동맥', hanjaName: '전대뇌동맥' },
  'anterior communicating artery': { koreanName: '앞교통동맥', hanjaName: '전교통동맥' },
  'anterior cruciate ligament': { koreanName: '앞십자인대', hanjaName: '전방십자인대' },
  'anterior tibial artery': { koreanName: '앞정강동맥', hanjaName: '전경골동맥' },
  'antrum of stomach': { koreanName: '날문방', hanjaName: '유문동' },
  'anus': { koreanName: '항문', hanjaName: '항문' },
  'aorta': { koreanName: '대동맥', hanjaName: '대동맥' },
  'aortic valve': { koreanName: '대동맥판막', hanjaName: '대동맥판' },
  'appendix': { koreanName: '막창자꼬리', hanjaName: '충수' },
  'arachnoid mater': { koreanName: '거미막', hanjaName: '지주막' },
  'arch of aorta': { koreanName: '대동맥활', hanjaName: '대동맥궁' },
  'ascending aorta': { koreanName: '오름대동맥', hanjaName: '상행대동맥' },
  'ascending colon': { koreanName: '오름창자', hanjaName: '상행결장' },
  'atrial septum': { koreanName: '심방사이막', hanjaName: '심방중격' },
  'axillary artery': { koreanName: '겨드랑동맥', hanjaName: '액와동맥' },
  'axillary nerve': { koreanName: '겨드랑신경', hanjaName: '액와신경' },
  'axillary vein': { koreanName: '겨드랑정맥', hanjaName: '액와정맥' },
  'basal ganglia': { koreanName: '바닥핵', hanjaName: '기저핵' },
  'basilar artery': { koreanName: '뇌바닥동맥', hanjaName: '기저동맥' },
  'biceps brachii': { koreanName: '위팔두갈래근', hanjaName: '상완이두근' },
  'biceps femoris': { koreanName: '넙다리두갈래근', hanjaName: '대퇴이두근' },
  'bile duct': { koreanName: '쓸개관', hanjaName: '담관' },
  'body of pancreas': { koreanName: '이자몸통', hanjaName: '췌장체부' },
  'body of sternum': { koreanName: '복장뼈몸통', hanjaName: '흉골체' },
  'body of stomach': { koreanName: '위몸통', hanjaName: '위체' },
  'body of uterus': { koreanName: '자궁몸통', hanjaName: '자궁체' },
  'brachial artery': { koreanName: '위팔동맥', hanjaName: '상완동맥' },
  'brachial plexus': { koreanName: '팔신경얼기', hanjaName: '완신경총' },
  'brachial vein': { koreanName: '위팔정맥', hanjaName: '상완정맥' },
  'brachialis': { koreanName: '위팔근', hanjaName: '상완근' },
  'brain': { koreanName: '뇌', hanjaName: '뇌' },
  'brainstem': { koreanName: '뇌줄기', hanjaName: '뇌간' },
  'bronchiole': { koreanName: '세기관지', hanjaName: '세기관지' },
  'bronchus': { koreanName: '기관지', hanjaName: '기관지' },
  'calcaneal tendon': { koreanName: '발꿈치힘줄', hanjaName: '종골건' },
  'calcaneus': { koreanName: '발꿈치뼈', hanjaName: '종골' },
  'capitate': { koreanName: '알머리뼈', hanjaName: '유두골' },
  'cardia': { koreanName: '들문', hanjaName: '분문' },
  'carpal bone': { koreanName: '손목뼈', hanjaName: '수근골' },
  'caudate lobe of liver': { koreanName: '꼬리엽', hanjaName: '미상엽' },
  'caudate nucleus': { koreanName: '꼬리핵', hanjaName: '미상핵' },
  'cecum': { koreanName: '막창자', hanjaName: '맹장' },
  'celiac trunk': { koreanName: '복강동맥', hanjaName: '복강동맥' },
  'cerebellum': { koreanName: '소뇌', hanjaName: '소뇌' },
  'cerebral cortex': { koreanName: '대뇌겉질', hanjaName: '대뇌피질' },
  'cerebrospinal fluid': { koreanName: '뇌척수액', hanjaName: '뇌척수액' },
  'cerebrum': { koreanName: '대뇌', hanjaName: '대뇌' },
  'cervical vertebra': { koreanName: '목뼈', hanjaName: '경추' },
  'cervix': { koreanName: '자궁목', hanjaName: '자궁경부' },
  'chordae tendineae': { koreanName: '힘줄끈', hanjaName: '건삭' },
  'circle of willis': { koreanName: '윌리스동맥고리', hanjaName: '윌리스환' },
  'clavicle': { koreanName: '빗장뼈', hanjaName: '쇄골' },
  'coccyx': { koreanName: '꼬리뼈', hanjaName: '미골' },
  'colon': { koreanName: '잘록창자', hanjaName: '결장' },
  'common bile duct': { koreanName: '온쓸개관', hanjaName: '총담관' },
  'common carotid artery': { koreanName: '온목동맥', hanjaName: '총경동맥' },
  'common fibular nerve': { koreanName: '온종아리신경', hanjaName: '총비골신경' },
  'common hepatic artery': { koreanName: '온간동맥', hanjaName: '총간동맥' },
  'common hepatic duct': { koreanName: '온간관', hanjaName: '총간관' },
  'common iliac artery': { koreanName: '온엉덩동맥', hanjaName: '총장골동맥' },
  'common iliac vein': { koreanName: '온엉덩정맥', hanjaName: '총장골정맥' },
  'common peroneal nerve': { koreanName: '온종아리신경', hanjaName: '총비골신경' },
  'coracobrachialis': { koreanName: '부리위팔근', hanjaName: '오훼완근' },
  'coracoid process': { koreanName: '부리돌기', hanjaName: '오훼돌기' },
  'coronary artery': { koreanName: '관상동맥', hanjaName: '관상동맥' },
  'coronary sinus': { koreanName: '관상정맥동', hanjaName: '관상정맥동' },
  'corpus callosum': { koreanName: '뇌들보', hanjaName: '뇌량' },
  'cranial nerve': { koreanName: '뇌신경', hanjaName: '뇌신경' },
  'cuboid': { koreanName: '입방뼈', hanjaName: '입방골' },
  'cystic duct': { koreanName: '쓸개관', hanjaName: '담낭관' },
  'deep femoral artery': { koreanName: '깊은넙다리동맥', hanjaName: '심대퇴동맥' },
  'deep fibular nerve': { koreanName: '깊은종아리신경', hanjaName: '심비골신경' },
  'deep peroneal nerve': { koreanName: '깊은종아리신경', hanjaName: '심비골신경' },
  'deltoid': { koreanName: '어깨세모근', hanjaName: '삼각근' },
  'descending colon': { koreanName: '내림창자', hanjaName: '하행결장' },
  'diaphragm': { koreanName: '가로막', hanjaName: '횡격막' },
  'distal phalanx': { koreanName: '끝마디뼈', hanjaName: '원위지골' },
  'dorsal scapular nerve': { koreanName: '등쪽어깨신경', hanjaName: '견갑배신경' },
  'dorsalis pedis artery': { koreanName: '발등동맥', hanjaName: '족배동맥' },
  'duodenum': { koreanName: '샘창자', hanjaName: '십이지장' },
  'dura mater': { koreanName: '경질막', hanjaName: '경막' },
  'ejaculatory duct': { koreanName: '사정관', hanjaName: '사정관' },
  'elbow joint': { koreanName: '팔꿈치관절', hanjaName: '주관절' },
  'endometrium': { koreanName: '자궁내막', hanjaName: '자궁내막' },
  'epididymis': { koreanName: '부고환', hanjaName: '부고환' },
  'epiglottis': { koreanName: '후두덮개', hanjaName: '후두개' },
  'erector spinae': { koreanName: '척추세움근', hanjaName: '척주기립근' },
  'esophagus': { koreanName: '식도', hanjaName: '식도' },
  'ethmoid bone': { koreanName: '벌집뼈', hanjaName: '사골' },
  'extensor carpi radialis': { koreanName: '노쪽손목폄근', hanjaName: '요측수근신근' },
  'extensor carpi ulnaris': { koreanName: '자쪽손목폄근', hanjaName: '척측수근신근' },
  'extensor digitorum longus': { koreanName: '긴발가락폄근', hanjaName: '장족지신근' },
  'extensor hallucis longus': { koreanName: '긴엄지폄근', hanjaName: '장무지신근' },
  'external carotid artery': { koreanName: '바깥목동맥', hanjaName: '외경동맥' },
  'external iliac artery': { koreanName: '바깥엉덩동맥', hanjaName: '외장골동맥' },
  'external iliac vein': { koreanName: '바깥엉덩정맥', hanjaName: '외장골정맥' },
  'external jugular vein': { koreanName: '바깥목정맥', hanjaName: '외경정맥' },
  'external oblique': { koreanName: '배바깥빗근', hanjaName: '외복사근' },
  'facial nerve': { koreanName: '얼굴신경', hanjaName: '안면신경' },
  'fallopian tube': { koreanName: '자궁관', hanjaName: '난관' },
  'femoral artery': { koreanName: '넙다리동맥', hanjaName: '대퇴동맥' },
  'femoral head': { koreanName: '넙다리뼈머리', hanjaName: '대퇴골두' },
  'femoral neck': { koreanName: '넙다리뼈목', hanjaName: '대퇴골경' },
  'femoral nerve': { koreanName: '넙다리신경', hanjaName: '대퇴신경' },
  'femoral vein': { koreanName: '넙다리정맥', hanjaName: '대퇴정맥' },
  'femur': { koreanName: '넙다리뼈', hanjaName: '대퇴골' },
  'fibula': { koreanName: '종아리뼈', hanjaName: '비골' },
  'fibular artery': { koreanName: '종아리동맥', hanjaName: '비골동맥' },
  'fibularis brevis': { koreanName: '짧은종아리근', hanjaName: '단비골근' },
  'fibularis longus': { koreanName: '긴종아리근', hanjaName: '장비골근' },
  'fimbriae of uterine tube': { koreanName: '자궁관술', hanjaName: '난관채' },
  'flexor carpi radialis': { koreanName: '노쪽손목굽힘근', hanjaName: '요측수근굴근' },
  'flexor carpi ulnaris': { koreanName: '자쪽손목굽힘근', hanjaName: '척측수근굴근' },
  'flexor digitorum longus': { koreanName: '긴발가락굽힘근', hanjaName: '장족지굴근' },
  'flexor hallucis longus': { koreanName: '긴엄지굽힘근', hanjaName: '장무지굴근' },
  'fourth ventricle': { koreanName: '넷째뇌실', hanjaName: '제4뇌실' },
  'frontal bone': { koreanName: '이마뼈', hanjaName: '전두골' },
  'frontal lobe': { koreanName: '이마엽', hanjaName: '전두엽' },
  'fundus of stomach': { koreanName: '위바닥', hanjaName: '위저' },
  'fundus of uterus': { koreanName: '자궁바닥', hanjaName: '자궁저' },
  'gallbladder': { koreanName: '쓸개', hanjaName: '담낭' },
  'gastrocnemius': { koreanName: '장딴지근', hanjaName: '비복근' },
  'gastroduodenal artery': { koreanName: '위샘창자동맥', hanjaName: '위십이지장동맥' },
  'glans penis': { koreanName: '음경귀두', hanjaName: '귀두' },
  'glenoid cavity': { koreanName: '관절오목', hanjaName: '관절와' },
  'globus pallidus': { koreanName: '창백핵', hanjaName: '담창구' },
  'glomerulus': { koreanName: '토리', hanjaName: '사구체' },
  'glossopharyngeal nerve': { koreanName: '혀인두신경', hanjaName: '설인신경' },
  'gluteus maximus': { koreanName: '큰볼기근', hanjaName: '대둔근' },
  'gluteus medius': { koreanName: '중간볼기근', hanjaName: '중둔근' },
  'gluteus minimus': { koreanName: '작은볼기근', hanjaName: '소둔근' },
  'gracilis': { koreanName: '두덩정강근', hanjaName: '박근' },
  'great cardiac vein': { koreanName: '큰심장정맥', hanjaName: '대심장정맥' },
  'great saphenous vein': { koreanName: '큰두렁정맥', hanjaName: '대복재정맥' },
  'greater omentum': { koreanName: '큰그물막', hanjaName: '대망' },
  'greater trochanter': { koreanName: '큰돌기', hanjaName: '대전자' },
  'hamate': { koreanName: '갈고리뼈', hanjaName: '유구골' },
  'hard palate': { koreanName: '딱딱입천장', hanjaName: '경구개' },
  'head of epididymis': { koreanName: '부고환머리', hanjaName: '부고환두' },
  'head of femur': { koreanName: '넙다리뼈머리', hanjaName: '대퇴골두' },
  'head of pancreas': { koreanName: '이자머리', hanjaName: '췌장두부' },
  'heart': { koreanName: '심장', hanjaName: '심장' },
  'hepatic duct': { koreanName: '간관', hanjaName: '간관' },
  'hepatic vein': { koreanName: '간정맥', hanjaName: '간정맥' },
  'hip bone': { koreanName: '볼기뼈', hanjaName: '골반골' },
  'hip joint': { koreanName: '엉덩관절', hanjaName: '고관절' },
  'hippocampus': { koreanName: '해마', hanjaName: '해마' },
  'humerus': { koreanName: '위팔뼈', hanjaName: '상완골' },
  'hyoid bone': { koreanName: '목뿔뼈', hanjaName: '설골' },
  'hypoglossal nerve': { koreanName: '혀밑신경', hanjaName: '설하신경' },
  'hypothalamus': { koreanName: '시상하부', hanjaName: '시상하부' },
  'ileocecal valve': { koreanName: '돌막창자판막', hanjaName: '회맹판' },
  'ileum': { koreanName: '돌창자', hanjaName: '회장' },
  'ilium': { koreanName: '엉덩뼈', hanjaName: '장골' },
  'inferior gluteal nerve': { koreanName: '아래볼기신경', hanjaName: '하둔신경' },
  'inferior mesenteric artery': { koreanName: '아래창자간막동맥', hanjaName: '하장간막동맥' },
  'inferior mesenteric vein': { koreanName: '아래창자간막정맥', hanjaName: '하장간막정맥' },
  'inferior nasal concha': { koreanName: '아래코선반', hanjaName: '하비갑개' },
  'inferior pancreaticoduodenal artery': { koreanName: '아래이자샘창자동맥', hanjaName: '하췌십이지장동맥' },
  'inferior vena cava': { koreanName: '아래대정맥', hanjaName: '하대정맥' },
  'infraspinatus': { koreanName: '가시아래근', hanjaName: '극하근' },
  'insula': { koreanName: '섬엽', hanjaName: '뇌섬엽' },
  'interatrial septum': { koreanName: '심방사이막', hanjaName: '심방중격' },
  'intercostal nerve': { koreanName: '갈비사이신경', hanjaName: '늑간신경' },
  'intermediate cuneiform': { koreanName: '중간쐐기뼈', hanjaName: '중간설상골' },
  'internal carotid artery': { koreanName: '속목동맥', hanjaName: '내경동맥' },
  'internal iliac artery': { koreanName: '속엉덩동맥', hanjaName: '내장골동맥' },
  'internal iliac vein': { koreanName: '속엉덩정맥', hanjaName: '내장골정맥' },
  'internal jugular vein': { koreanName: '속목정맥', hanjaName: '내경정맥' },
  'internal oblique': { koreanName: '배속빗근', hanjaName: '내복사근' },
  'interventricular septum': { koreanName: '심실사이막', hanjaName: '심실중격' },
  'ischium': { koreanName: '궁둥뼈', hanjaName: '좌골' },
  'jejunum': { koreanName: '빈창자', hanjaName: '공장' },
  'kidney': { koreanName: '콩팥', hanjaName: '신장' },
  'knee joint': { koreanName: '무릎관절', hanjaName: '슬관절' },
  'lacrimal bone': { koreanName: '눈물뼈', hanjaName: '누골' },
  'large intestine': { koreanName: '큰창자', hanjaName: '대장' },
  'laryngopharynx': { koreanName: '후두인두', hanjaName: '후두인두' },
  'larynx': { koreanName: '후두', hanjaName: '후두' },
  'lateral collateral ligament': { koreanName: '가쪽곁인대', hanjaName: '외측측부인대' },
  'lateral cuneiform': { koreanName: '가쪽쐐기뼈', hanjaName: '외측설상골' },
  'lateral epicondyle of femur': { koreanName: '넙다리뼈가쪽위관절융기', hanjaName: '대퇴골외측상과' },
  'lateral malleolus': { koreanName: '가쪽복사', hanjaName: '외과' },
  'lateral pterygoid': { koreanName: '가쪽날개근', hanjaName: '외측익돌근' },
  'lateral ventricle': { koreanName: '가쪽뇌실', hanjaName: '측뇌실' },
  'latissimus dorsi': { koreanName: '넓은등근', hanjaName: '광배근' },
  'left anterior descending artery': { koreanName: '왼앞내림동맥', hanjaName: '좌전하행동맥' },
  'left atrium': { koreanName: '왼심방', hanjaName: '좌심방' },
  'left circumflex artery': { koreanName: '왼휘돌이동맥', hanjaName: '좌회선동맥' },
  'left coronary artery': { koreanName: '왼관상동맥', hanjaName: '좌관상동맥' },
  'left femur': { koreanName: '왼넙다리뼈', hanjaName: '좌측 대퇴골' },
  'left gastric artery': { koreanName: '왼위동맥', hanjaName: '좌위동맥' },
  'left gastroepiploic artery': { koreanName: '왼위그물막동맥', hanjaName: '좌위대망동맥' },
  'left hepatic artery': { koreanName: '왼간동맥', hanjaName: '좌간동맥' },
  'left humerus': { koreanName: '왼위팔뼈', hanjaName: '좌측 상완골' },
  'left kidney': { koreanName: '왼콩팥', hanjaName: '좌측 신장' },
  'left lobe of liver': { koreanName: '간왼엽', hanjaName: '간좌엽' },
  'left lung': { koreanName: '왼허파', hanjaName: '좌폐' },
  'left main bronchus': { koreanName: '왼주기관지', hanjaName: '좌주기관지' },
  'left ventricle': { koreanName: '왼심실', hanjaName: '좌심실' },
  'lesser omentum': { koreanName: '작은그물막', hanjaName: '소망' },
  'lesser trochanter': { koreanName: '작은돌기', hanjaName: '소전자' },
  'levator scapulae': { koreanName: '어깨올림근', hanjaName: '견갑거근' },
  'liver': { koreanName: '간', hanjaName: '간장' },
  'long thoracic nerve': { koreanName: '긴가슴신경', hanjaName: '장흉신경' },
  'lower lobe of left lung': { koreanName: '왼허파아래엽', hanjaName: '좌폐하엽' },
  'lower lobe of right lung': { koreanName: '오른허파아래엽', hanjaName: '우폐하엽' },
  'lumbar plexus': { koreanName: '허리신경얼기', hanjaName: '요신경총' },
  'lumbar vertebra': { koreanName: '허리뼈', hanjaName: '요추' },
  'lunate': { koreanName: '반달뼈', hanjaName: '월상골' },
  'lung': { koreanName: '허파', hanjaName: '폐' },
  'main bronchus': { koreanName: '주기관지', hanjaName: '주기관지' },
  'main pancreatic duct': { koreanName: '주이자관', hanjaName: '주췌관' },
  'major calyx': { koreanName: '큰콩팥잔', hanjaName: '대신배' },
  'mandible': { koreanName: '아래턱뼈', hanjaName: '하악골' },
  'manubrium of sternum': { koreanName: '복장뼈자루', hanjaName: '흉골병' },
  'masseter': { koreanName: '깨물근', hanjaName: '교근' },
  'maxilla': { koreanName: '위턱뼈', hanjaName: '상악골' },
  'medial collateral ligament': { koreanName: '안쪽곁인대', hanjaName: '내측측부인대' },
  'medial cuneiform': { koreanName: '안쪽쐐기뼈', hanjaName: '내측설상골' },
  'medial epicondyle of femur': { koreanName: '넙다리뼈안쪽위관절융기', hanjaName: '대퇴골내측상과' },
  'medial malleolus': { koreanName: '안쪽복사', hanjaName: '내과' },
  'medial pterygoid': { koreanName: '안쪽날개근', hanjaName: '내측익돌근' },
  'median nerve': { koreanName: '정중신경', hanjaName: '정중신경' },
  'medulla oblongata': { koreanName: '숨뇌', hanjaName: '연수' },
  'meninges': { koreanName: '뇌척수막', hanjaName: '뇌수막' },
  'mesentery': { koreanName: '창자간막', hanjaName: '장간막' },
  'metacarpal bone': { koreanName: '손허리뼈', hanjaName: '중수골' },
  'metatarsal bone': { koreanName: '발허리뼈', hanjaName: '중족골' },
  'midbrain': { koreanName: '중간뇌', hanjaName: '중뇌' },
  'middle cardiac vein': { koreanName: '중간심장정맥', hanjaName: '중심장정맥' },
  'middle cerebral artery': { koreanName: '중간대뇌동맥', hanjaName: '중대뇌동맥' },
  'middle lobe of lung': { koreanName: '허파중간엽', hanjaName: '폐중엽' },
  'middle lobe of right lung': { koreanName: '오른허파중간엽', hanjaName: '우폐중엽' },
  'middle phalanx': { koreanName: '중간마디뼈', hanjaName: '중절지골' },
  'minor calyx': { koreanName: '작은콩팥잔', hanjaName: '소신배' },
  'mitral valve': { koreanName: '승모판', hanjaName: '승모판' },
  'mouth': { koreanName: '입', hanjaName: '구강' },
  'musculocutaneous nerve': { koreanName: '근육피부신경', hanjaName: '근피신경' },
  'myometrium': { koreanName: '자궁근층', hanjaName: '자궁근층' },
  'nasal bone': { koreanName: '코뼈', hanjaName: '비골(코)' },
  'nasal cavity': { koreanName: '코안', hanjaName: '비강' },
  'nasopharynx': { koreanName: '코인두', hanjaName: '비인두' },
  'navicular': { koreanName: '발배뼈', hanjaName: '주상골' },
  'navicular bone': { koreanName: '발배뼈', hanjaName: '주상골' },
  'neck of femur': { koreanName: '넙다리뼈목', hanjaName: '대퇴골경' },
  'nephron': { koreanName: '콩팥단위', hanjaName: '신원' },
  'obturator nerve': { koreanName: '폐쇄신경', hanjaName: '폐쇄신경' },
  'occipital bone': { koreanName: '뒤통수뼈', hanjaName: '후두골' },
  'occipital lobe': { koreanName: '뒤통수엽', hanjaName: '후두엽' },
  'oculomotor nerve': { koreanName: '눈돌림신경', hanjaName: '동안신경' },
  'olecranon': { koreanName: '팔꿈치머리', hanjaName: '주두' },
  'olfactory nerve': { koreanName: '후각신경', hanjaName: '후신경' },
  'optic nerve': { koreanName: '시각신경', hanjaName: '시신경' },
  'oral cavity': { koreanName: '구강', hanjaName: '구강' },
  'oropharynx': { koreanName: '입인두', hanjaName: '구인두' },
  'ovary': { koreanName: '난소', hanjaName: '난소' },
  'palatine bone': { koreanName: '입천장뼈', hanjaName: '구개골' },
  'palatine tonsil': { koreanName: '입천장편도', hanjaName: '구개편도' },
  'pancreas': { koreanName: '이자', hanjaName: '췌장' },
  'pancreatic duct': { koreanName: '이자관', hanjaName: '췌관' },
  'papillary muscle': { koreanName: '꼭지근', hanjaName: '유두근' },
  'parietal bone': { koreanName: '마루뼈', hanjaName: '두정골' },
  'parietal lobe': { koreanName: '마루엽', hanjaName: '두정엽' },
  'parietal pleura': { koreanName: '벽쪽가슴막', hanjaName: '벽측흉막' },
  'parotid gland': { koreanName: '귀밑샘', hanjaName: '이하선' },
  'patella': { koreanName: '무릎뼈', hanjaName: '슬개골' },
  'patellar ligament': { koreanName: '무릎인대', hanjaName: '슬개인대' },
  'pectoralis major': { koreanName: '큰가슴근', hanjaName: '대흉근' },
  'pectoralis minor': { koreanName: '작은가슴근', hanjaName: '소흉근' },
  'penis': { koreanName: '음경', hanjaName: '음경' },
  'phalanx': { koreanName: '손가락뼈', hanjaName: '지골' },
  'pharynx': { koreanName: '인두', hanjaName: '인두' },
  'phrenic nerve': { koreanName: '가로막신경', hanjaName: '횡격막신경' },
  'pia mater': { koreanName: '연질막', hanjaName: '연막' },
  'pineal gland': { koreanName: '솔방울샘', hanjaName: '송과체' },
  'piriformis': { koreanName: '궁둥구멍근', hanjaName: '이상근' },
  'pisiform': { koreanName: '콩알뼈', hanjaName: '두상골' },
  'pituitary gland': { koreanName: '뇌하수체', hanjaName: '뇌하수체' },
  'pleura': { koreanName: '가슴막', hanjaName: '흉막' },
  'pleural cavity': { koreanName: '가슴막안', hanjaName: '흉막강' },
  'pons': { koreanName: '다리뇌', hanjaName: '교뇌' },
  'popliteal artery': { koreanName: '오금동맥', hanjaName: '슬와동맥' },
  'popliteal vein': { koreanName: '오금정맥', hanjaName: '슬와정맥' },
  'portal vein': { koreanName: '문맥', hanjaName: '문맥' },
  'posterior cerebral artery': { koreanName: '뒤대뇌동맥', hanjaName: '후대뇌동맥' },
  'posterior communicating artery': { koreanName: '뒤교통동맥', hanjaName: '후교통동맥' },
  'posterior cruciate ligament': { koreanName: '뒤십자인대', hanjaName: '후방십자인대' },
  'posterior tibial artery': { koreanName: '뒤정강동맥', hanjaName: '후경골동맥' },
  'pronator teres': { koreanName: '원엎침근', hanjaName: '원회내근' },
  'proper hepatic artery': { koreanName: '고유간동맥', hanjaName: '고유간동맥' },
  'prostate': { koreanName: '전립샘', hanjaName: '전립선' },
  'prostate gland': { koreanName: '전립샘', hanjaName: '전립선' },
  'proximal phalanx': { koreanName: '첫마디뼈', hanjaName: '근위지골' },
  'pubis': { koreanName: '두덩뼈', hanjaName: '치골' },
  'pudendal nerve': { koreanName: '음부신경', hanjaName: '음부신경' },
  'pulmonary artery': { koreanName: '허파동맥', hanjaName: '폐동맥' },
  'pulmonary trunk': { koreanName: '허파동맥간', hanjaName: '폐동맥간' },
  'pulmonary valve': { koreanName: '허파동맥판막', hanjaName: '폐동맥판' },
  'pulmonary vein': { koreanName: '허파정맥', hanjaName: '폐정맥' },
  'putamen': { koreanName: '조가비핵', hanjaName: '피각' },
  'pyloric sphincter': { koreanName: '날문조임근', hanjaName: '유문괄약근' },
  'pylorus': { koreanName: '날문', hanjaName: '유문' },
  'quadrate lobe of liver': { koreanName: '네모엽', hanjaName: '방형엽' },
  'quadriceps femoris': { koreanName: '넙다리네갈래근', hanjaName: '대퇴사두근' },
  'radial artery': { koreanName: '노동맥', hanjaName: '요골동맥' },
  'radial head': { koreanName: '노뼈머리', hanjaName: '요골두' },
  'radial neck': { koreanName: '노뼈목', hanjaName: '요골경' },
  'radial nerve': { koreanName: '노신경', hanjaName: '요골신경' },
  'radius': { koreanName: '노뼈', hanjaName: '요골' },
  'rectum': { koreanName: '곧창자', hanjaName: '직장' },
  'rectus abdominis': { koreanName: '배곧은근', hanjaName: '복직근' },
  'rectus femoris': { koreanName: '넙다리곧은근', hanjaName: '대퇴직근' },
  'recurrent laryngeal nerve': { koreanName: '되돌이후두신경', hanjaName: '반회후두신경' },
  'renal artery': { koreanName: '콩팥동맥', hanjaName: '신동맥' },
  'renal calyx': { koreanName: '콩팥잔', hanjaName: '신배' },
  'renal capsule': { koreanName: '콩팥주머니', hanjaName: '신피막' },
  'renal corpuscle': { koreanName: '콩팥소체', hanjaName: '신소체' },
  'renal cortex': { koreanName: '콩팥겉질', hanjaName: '신피질' },
  'renal medulla': { koreanName: '콩팥속질', hanjaName: '신수질' },
  'renal papilla': { koreanName: '콩팥유두', hanjaName: '신유두' },
  'renal pelvis': { koreanName: '콩팥깔때기', hanjaName: '신우' },
  'renal pyramid': { koreanName: '콩팥피라밋', hanjaName: '신추체' },
  'renal vein': { koreanName: '콩팥정맥', hanjaName: '신정맥' },
  'rhomboid major': { koreanName: '큰마름근', hanjaName: '대능형근' },
  'rhomboid minor': { koreanName: '작은마름근', hanjaName: '소능형근' },
  'rib': { koreanName: '갈비뼈', hanjaName: '늑골' },
  'right atrium': { koreanName: '오른심방', hanjaName: '우심방' },
  'right coronary artery': { koreanName: '오른관상동맥', hanjaName: '우관상동맥' },
  'right femur': { koreanName: '오른넙다리뼈', hanjaName: '우측 대퇴골' },
  'right gastric artery': { koreanName: '오른위동맥', hanjaName: '우위동맥' },
  'right gastroepiploic artery': { koreanName: '오른위그물막동맥', hanjaName: '우위대망동맥' },
  'right hepatic artery': { koreanName: '오른간동맥', hanjaName: '우간동맥' },
  'right humerus': { koreanName: '오른위팔뼈', hanjaName: '우측 상완골' },
  'right kidney': { koreanName: '오른콩팥', hanjaName: '우측 신장' },
  'right lobe of liver': { koreanName: '간오른엽', hanjaName: '간우엽' },
  'right lung': { koreanName: '오른허파', hanjaName: '우폐' },
  'right main bronchus': { koreanName: '오른주기관지', hanjaName: '우주기관지' },
  'right ventricle': { koreanName: '오른심실', hanjaName: '우심실' },
  'sacral plexus': { koreanName: '엉치신경얼기', hanjaName: '천골신경총' },
  'sacrum': { koreanName: '엉치뼈', hanjaName: '천골' },
  'sartorius': { koreanName: '넙다리빗근', hanjaName: '봉공근' },
  'scaphoid': { koreanName: '손배뼈', hanjaName: '주상골' },
  'scapula': { koreanName: '어깨뼈', hanjaName: '견갑골' },
  'sciatic nerve': { koreanName: '궁둥신경', hanjaName: '좌골신경' },
  'scrotum': { koreanName: '음낭', hanjaName: '음낭' },
  'semimembranosus': { koreanName: '반막근', hanjaName: '반막양근' },
  'seminal vesicle': { koreanName: '정낭', hanjaName: '정낭' },
  'semitendinosus': { koreanName: '반힘줄근', hanjaName: '반건양근' },
  'serratus anterior': { koreanName: '앞톱니근', hanjaName: '전거근' },
  'shoulder joint': { koreanName: '어깨관절', hanjaName: '견관절' },
  'sigmoid colon': { koreanName: '구불창자', hanjaName: 'S상결장' },
  'skull': { koreanName: '머리뼈', hanjaName: '두개골' },
  'small cardiac vein': { koreanName: '작은심장정맥', hanjaName: '소심장정맥' },
  'small intestine': { koreanName: '작은창자', hanjaName: '소장' },
  'small saphenous vein': { koreanName: '작은두렁정맥', hanjaName: '소복재정맥' },
  'soft palate': { koreanName: '물렁입천장', hanjaName: '연구개' },
  'soleus': { koreanName: '가자미근', hanjaName: '넙치근/가자미근' },
  'spermatic cord': { koreanName: '정삭', hanjaName: '정삭' },
  'sphenoid bone': { koreanName: '나비뼈', hanjaName: '접형골' },
  'spinal cord': { koreanName: '척수', hanjaName: '척수' },
  'spleen': { koreanName: '지라', hanjaName: '비장' },
  'splenic artery': { koreanName: '지라동맥', hanjaName: '비장동맥' },
  'sternocleidomastoid': { koreanName: '목빗근', hanjaName: '흉쇄유돌근' },
  'sternum': { koreanName: '복장뼈', hanjaName: '흉골' },
  'stomach': { koreanName: '위', hanjaName: '위장' },
  'subclavian artery': { koreanName: '빗장밑동맥', hanjaName: '쇄골하동맥' },
  'sublingual gland': { koreanName: '혀밑샘', hanjaName: '설하선' },
  'submandibular gland': { koreanName: '턱밑샘', hanjaName: '악하선' },
  'subscapularis': { koreanName: '어깨밑근', hanjaName: '견갑하근' },
  'superficial femoral artery': { koreanName: '얕은넙다리동맥', hanjaName: '천대퇴동맥' },
  'superficial fibular nerve': { koreanName: '얕은종아리신경', hanjaName: '천비골신경' },
  'superficial peroneal nerve': { koreanName: '얕은종아리신경', hanjaName: '천비골신경' },
  'superior gluteal nerve': { koreanName: '위볼기신경', hanjaName: '상둔신경' },
  'superior mesenteric artery': { koreanName: '위창자간막동맥', hanjaName: '상장간막동맥' },
  'superior mesenteric vein': { koreanName: '위창자간막정맥', hanjaName: '상장간막정맥' },
  'superior pancreaticoduodenal artery': { koreanName: '위이자샘창자동맥', hanjaName: '상췌십이지장동맥' },
  'superior vena cava': { koreanName: '위대정맥', hanjaName: '상대정맥' },
  'supinator': { koreanName: '뒤침근', hanjaName: '회외근' },
  'suprascapular nerve': { koreanName: '어깨위신경', hanjaName: '견갑상신경' },
  'supraspinatus': { koreanName: '가시위근', hanjaName: '극상근' },
  'tail of pancreas': { koreanName: '이자꼬리', hanjaName: '췌장미부' },
  'talus': { koreanName: '목말뼈', hanjaName: '거골' },
  'tarsal bone': { koreanName: '발목뼈', hanjaName: '족근골' },
  'temporal bone': { koreanName: '관자뼈', hanjaName: '측두골' },
  'temporal lobe': { koreanName: '관자엽', hanjaName: '측두엽' },
  'temporalis': { koreanName: '관자근', hanjaName: '측두근' },
  'teres major': { koreanName: '큰원근', hanjaName: '대원근' },
  'teres minor': { koreanName: '작은원근', hanjaName: '소원근' },
  'testicle': { koreanName: '고환', hanjaName: '고환' },
  'testis': { koreanName: '고환', hanjaName: '고환' },
  'thalamus': { koreanName: '시상', hanjaName: '시상' },
  'third ventricle': { koreanName: '셋째뇌실', hanjaName: '제3뇌실' },
  'thoracic aorta': { koreanName: '가슴대동맥', hanjaName: '흉대동맥' },
  'thoracic vertebra': { koreanName: '등뼈', hanjaName: '흉추' },
  'thoracodorsal nerve': { koreanName: '등쪽가슴신경', hanjaName: '흉배신경' },
  'thymus': { koreanName: '가슴샘', hanjaName: '흉선' },
  'thyroid gland': { koreanName: '갑상샘', hanjaName: '갑상선' },
  'tibia': { koreanName: '정강뼈', hanjaName: '경골' },
  'tibial nerve': { koreanName: '정강신경', hanjaName: '경골신경' },
  'tibial plateau': { koreanName: '정강뼈고평부', hanjaName: '경골고평부' },
  'tibial tuberosity': { koreanName: '정강뼈거친면', hanjaName: '경골조면' },
  'tibialis anterior': { koreanName: '앞정강근', hanjaName: '전경골근' },
  'tibialis posterior': { koreanName: '뒤정강근', hanjaName: '후경골근' },
  'toe phalanx': { koreanName: '발가락뼈', hanjaName: '족지골' },
  'tongue': { koreanName: '혀', hanjaName: '설' },
  'tonsil': { koreanName: '편도', hanjaName: '편도' },
  'trachea': { koreanName: '기관', hanjaName: '기도/기관' },
  'transverse colon': { koreanName: '가로창자', hanjaName: '횡행결장' },
  'transversus abdominis': { koreanName: '배가로근', hanjaName: '복횡근' },
  'trapezium': { koreanName: '큰마름뼈', hanjaName: '대능형골' },
  'trapezius': { koreanName: '등세모근', hanjaName: '승모근' },
  'trapezoid': { koreanName: '작은마름뼈', hanjaName: '소능형골' },
  'triceps brachii': { koreanName: '위팔세갈래근', hanjaName: '상완삼두근' },
  'tricuspid valve': { koreanName: '삼첨판', hanjaName: '삼첨판' },
  'trigeminal nerve': { koreanName: '삼차신경', hanjaName: '삼차신경' },
  'triquetrum': { koreanName: '세모뼈', hanjaName: '삼각골' },
  'trochlear nerve': { koreanName: '도르래신경', hanjaName: '활차신경' },
  'ulna': { koreanName: '자뼈', hanjaName: '척골' },
  'ulnar artery': { koreanName: '자동맥', hanjaName: '척골동맥' },
  'ulnar head': { koreanName: '자뼈머리', hanjaName: '척골두' },
  'ulnar nerve': { koreanName: '자신경', hanjaName: '척골신경' },
  'upper lobe of left lung': { koreanName: '왼허파위엽', hanjaName: '좌폐상엽' },
  'upper lobe of right lung': { koreanName: '오른허파위엽', hanjaName: '우폐상엽' },
  'ureter': { koreanName: '요관', hanjaName: '요관' },
  'urethra': { koreanName: '요도', hanjaName: '요도' },
  'urinary bladder': { koreanName: '방광', hanjaName: '방광' },
  'uterine cervix': { koreanName: '자궁목', hanjaName: '자궁경부' },
  'uterine tube': { koreanName: '자궁관', hanjaName: '난관' },
  'uterus': { koreanName: '자궁', hanjaName: '자궁' },
  'vagina': { koreanName: '질', hanjaName: '질' },
  'vagus nerve': { koreanName: '미주신경', hanjaName: '미주신경' },
  'vas deferens': { koreanName: '정관', hanjaName: '정관' },
  'vastus intermedius': { koreanName: '중간넓은근', hanjaName: '중간광근' },
  'vastus lateralis': { koreanName: '가쪽넓은근', hanjaName: '외측광근' },
  'vastus medialis': { koreanName: '안쪽넓은근', hanjaName: '내측광근' },
  'ventricle': { koreanName: '뇌실', hanjaName: '뇌실' },
  'vermiform appendix': { koreanName: '막창자꼬리', hanjaName: '충수돌기' },
  'vertebra': { koreanName: '척추뼈', hanjaName: '추골' },
  'vertebral artery': { koreanName: '척추동맥', hanjaName: '추골동맥' },
  'vestibulocochlear nerve': { koreanName: '속귀신경', hanjaName: '내이신경/청신경' },
  'visceral pleura': { koreanName: '내장쪽가슴막', hanjaName: '장측흉막' },
  'vocal cord': { koreanName: '성대', hanjaName: '성대' },
  'vocal fold': { koreanName: '성대주름', hanjaName: '성대' },
  'vomer': { koreanName: '보습뼈', hanjaName: '서골' },
  'xiphoid process': { koreanName: '칼돌기', hanjaName: '검상돌기' },
  'zygomatic bone': { koreanName: '광대뼈', hanjaName: '관골' },

  // === 신규 복합 개념 검색어 (Composite Search Keys) ===
  'triceps': { koreanName: '위팔세갈래근', hanjaName: '상완삼두근' },
  'biceps': { koreanName: '위팔두갈래근', hanjaName: '상완이두근' },
  'quadriceps': { koreanName: '넙다리네갈래근', hanjaName: '대퇴사두근' },
  'hamstrings': { koreanName: '넙다리뒤근육', hanjaName: '슬건근/햄스트링' },
  'hamstring': { koreanName: '넙다리뒤근육', hanjaName: '슬건근/햄스트링' },
  'rotator cuff': { koreanName: '회전근개', hanjaName: '회전근개' },

  // === 확장 핵심 해부학 명사 (Clinical & High-Yield Terms) ===
  'cephalic vein': { koreanName: '노쪽피부정맥', hanjaName: '요측피정맥' },
  'basilic vein': { koreanName: '자쪽피부정맥', hanjaName: '척측피정맥' },
  'median cubital vein': { koreanName: '팔오금중간정맥', hanjaName: '주정중피정맥' },
  'saphenous vein': { koreanName: '두드러기정맥', hanjaName: '복재정맥' },
  'jugular vein': { koreanName: '목정맥', hanjaName: '경정맥' },
  'subclavian vein': { koreanName: '빗장밑정맥', hanjaName: '쇄골하정맥' },
  'azygos vein': { koreanName: '홀정맥', hanjaName: '기정맥' },
  'hemiazygos vein': { koreanName: '반홀정맥', hanjaName: '반기정맥' },
  'accessory hemiazygos vein': { koreanName: '덧반홀정맥', hanjaName: '부반기정맥' },
  'intercostal vein': { koreanName: '갈비사이정맥', hanjaName: '늑간정맥' },
  'intercostal artery': { koreanName: '갈비사이동맥', hanjaName: '늑간동맥' },
  'subcostal artery': { koreanName: '갈비아래동맥', hanjaName: '늑하동맥' },
  'subcostal vein': { koreanName: '갈비아래정맥', hanjaName: '늑하정맥' },
  'pudendal artery': { koreanName: '음부동맥', hanjaName: '음부동맥' },
  'pudendal vein': { koreanName: '음부정맥', hanjaName: '음부정맥' },
  'hepatic portal vein': { koreanName: '간문맥', hanjaName: '간문맥' },
  'middle hepatic vein': { koreanName: '중간간정맥', hanjaName: '중간간정맥' },
  'splenic vein': { koreanName: '지라정맥', hanjaName: '비장정맥' },
  'gastric artery': { koreanName: '위동맥', hanjaName: '위동맥' },
  'gastric vein': { koreanName: '위정맥', hanjaName: '위정맥' },
  'gastro-omental artery': { koreanName: '위그물막동맥', hanjaName: '위대망동맥' },
  'superior thyroid artery': { koreanName: '위갑상동맥', hanjaName: '상갑상선동맥' },
  'inferior thyroid artery': { koreanName: '아래갑상동맥', hanjaName: '하갑상선동맥' },
  'internal thoracic artery': { koreanName: '속가슴동맥', hanjaName: '내흉동맥' },
  'internal thoracic vein': { koreanName: '속가슴정맥', hanjaName: '내흉정맥' },
  'anterior spinal artery': { koreanName: '앞척수동맥', hanjaName: '전척수동맥' },
  'posterior spinal artery': { koreanName: '뒤척수동맥', hanjaName: '후척수동맥' },
  'posterior inferior cerebellar artery': { koreanName: '뒤아래소뇌동맥', hanjaName: '후하소뇌동맥' },
  'anterior inferior cerebellar artery': { koreanName: '앞아래소뇌동맥', hanjaName: '전하소뇌동맥' },
  'superior cerebellar artery': { koreanName: '위소뇌동맥', hanjaName: '상소뇌동맥' },
  'anterior choroidal artery': { koreanName: '앞맥락총동맥', hanjaName: '전맥락총동맥' },
  'iliocostalis': { koreanName: '엉덩갈비근', hanjaName: '장늑근' },
  'iliocostalis lumborum': { koreanName: '허리엉덩갈비근', hanjaName: '요장늑근' },
  'iliocostalis thoracis': { koreanName: '등엉덩갈비근', hanjaName: '흉장늑근' },
  'iliocostalis cervicis': { koreanName: '목엉덩갈비근', hanjaName: '경장늑근' },
  'longissimus': { koreanName: '가장긴근', hanjaName: '최장근' },
  'longissimus thoracis': { koreanName: '등가장긴근', hanjaName: '흉최장근' },
  'longissimus cervicis': { koreanName: '목가장긴근', hanjaName: '경최장근' },
  'longissimus capitis': { koreanName: '머리가장긴근', hanjaName: '두최장근' },
  'spinalis': { koreanName: '가시근', hanjaName: '극근' },
  'spinalis thoracis': { koreanName: '등가시근', hanjaName: '흉극근' },
  'spinalis cervicis': { koreanName: '목가시근', hanjaName: '경극근' },
  'spinalis capitis': { koreanName: '머리가시근', hanjaName: '두극근' },
  'serratus posterior': { koreanName: '뒤톱니근', hanjaName: '후거근' },
  'serratus posterior superior': { koreanName: '위뒤톱니근', hanjaName: '상후거근' },
  'serratus posterior inferior': { koreanName: '아래뒤톱니근', hanjaName: '하후거근' },
  'rhomboid': { koreanName: '마름근', hanjaName: '능형근' },
  'splenius capitis': { koreanName: '머리널판근', hanjaName: '두판상근' },
  'splenius cervicis': { koreanName: '목널판근', hanjaName: '경판상근' },
  'semispinalis capitis': { koreanName: '머리반가시근', hanjaName: '두반극근' },
  'semispinalis cervicis': { koreanName: '목반가시근', hanjaName: '경반극근' },
  'semispinalis thoracis': { koreanName: '등반가시근', hanjaName: '흉반극근' },
  'multifidus': { koreanName: '뭇갈래근', hanjaName: '다열근' },
  'quadratus lumborum': { koreanName: '허리네모근', hanjaName: '요방형근' },
  'transversus thoracis': { koreanName: '가슴가로근', hanjaName: '흉횡근' },
  'subcostal muscle': { koreanName: '갈비아래근', hanjaName: '늑하근' },
  'external intercostal': { koreanName: '바깥갈비사이근', hanjaName: '외늑간근' },
  'internal intercostal': { koreanName: '속갈비사이근', hanjaName: '내늑간근' },
  'innermost intercostal': { koreanName: '맨안쪽갈비사이근', hanjaName: '최내늑간근' },
  'scalene': { koreanName: '목갈비근', hanjaName: '사각근' },
  'anterior scalene': { koreanName: '앞목갈비근', hanjaName: '전사각근' },
  'middle scalene': { koreanName: '중간목갈비근', hanjaName: '중사각근' },
  'posterior scalene': { koreanName: '뒤목갈비근', hanjaName: '후사각근' },
  'omohyoid': { koreanName: '어깨목뿔근', hanjaName: '견갑설골근' },
  'sternohyoid': { koreanName: '복장목뿔근', hanjaName: '흉골설골근' },
  'sternothyroid': { koreanName: '복장갑상근', hanjaName: '흉골갑상근' },
  'thyrohyoid': { koreanName: '갑상목뿔근', hanjaName: '갑상설골근' },
  'mylohyoid': { koreanName: '턱목뿔근', hanjaName: '악설골근' },
  'geniohyoid': { koreanName: '턱끝목뿔근', hanjaName: '이설골근' },
  'digastric': { koreanName: '두힘살근', hanjaName: '악이복근' },
  'buccinator': { koreanName: '볼근', hanjaName: '협근' },
  'orbicularis oris': { koreanName: '입둘레근', hanjaName: '구륜근' },
  'orbicularis oculi': { koreanName: '눈둘레근', hanjaName: '안륜근' },
  'frontalis': { koreanName: '이마근', hanjaName: '전두근' },
  'occipitalis': { koreanName: '뒤통수근', hanjaName: '후두근' },
  'levator palpebrae superioris': { koreanName: '눈꺼풀올림근', hanjaName: '상안검거근' },
  'superior rectus': { koreanName: '위곧은근', hanjaName: '상직근' },
  'inferior rectus': { koreanName: '아래곧은근', hanjaName: '하직근' },
  'medial rectus': { koreanName: '안쪽곧은근', hanjaName: '내직근' },
  'lateral rectus': { koreanName: '가쪽곧은근', hanjaName: '외직근' },
  'pectineus': { koreanName: '두덩근', hanjaName: '치골근' },
  'iliopsoas': { koreanName: '엉덩허리근', hanjaName: '장요근' },
  'psoas major': { koreanName: '큰허리근', hanjaName: '대요근' },
  'psoas minor': { koreanName: '작은허리근', hanjaName: '소요근' },
  'iliacus': { koreanName: '엉덩근', hanjaName: '장골근' },
  'tensor fasciae latae': { koreanName: '넙다리근막긴장근', hanjaName: '대퇴근막장근' },
  'obturator internus': { koreanName: '속폐쇄근', hanjaName: '내폐쇄근' },
  'obturator externus': { koreanName: '바깥폐쇄근', hanjaName: '외폐쇄근' },
  'superior gemellus': { koreanName: '위쌍둥이근', hanjaName: '상쌍자근' },
  'inferior gemellus': { koreanName: '아래쌍둥이근', hanjaName: '하쌍자근' },
  'quadratus femoris': { koreanName: '넙다리네모근', hanjaName: '대퇴방형근' },
  'popliteus': { koreanName: '오금근', hanjaName: '슬와근' },
  'plantaris': { koreanName: '발바닥근', hanjaName: '족척근' },
  'fibularis tertius': { koreanName: '셋째종아리근', hanjaName: '제3비골근' },
  'extensor digitorum brevis': { koreanName: '짧은발가락폄근', hanjaName: '단지신근' },
  'flexor digitorum brevis': { koreanName: '짧은발가락굽힘근', hanjaName: '단지굴근' },
  'brachioradialis': { koreanName: '위팔노근', hanjaName: '상완요골근' },
  'pronator quadratus': { koreanName: '네모엎침근', hanjaName: '방형회내근' },
  'anconeus': { koreanName: '팔꿈치근', hanjaName: '주근' },
  'extensor carpi radialis longus': { koreanName: '긴노쪽손목폄근', hanjaName: '장요측수근신근' },
  'extensor carpi radialis brevis': { koreanName: '짧은노쪽손목폄근', hanjaName: '단요측수근신근' },
  'palmaris longus': { koreanName: '긴손바닥근', hanjaName: '장장근' },
  'flexor digitorum superficialis': { koreanName: '얕은손가락굽힘근', hanjaName: '천지굴근' },
  'flexor digitorum profundus': { koreanName: '깊은손가락굽힘근', hanjaName: '심지굴근' },
  'extensor digitorum': { koreanName: '손가락폄근', hanjaName: '지신근' },
  'abductor pollicis longus': { koreanName: '긴엄지벌림근', hanjaName: '장무지외전근' },
  'extensor pollicis brevis': { koreanName: '짧은엄지폄근', hanjaName: '단무지신근' },
  'extensor pollicis longus': { koreanName: '긴엄지폄근', hanjaName: '장무지신근' },
  'extensor indicis': { koreanName: '집게폄근', hanjaName: '시지신근' },
  'cornea': { koreanName: '각막', hanjaName: '각막' },
  'choroid': { koreanName: '맥락막', hanjaName: '맥락막' },
  'retina': { koreanName: '망막', hanjaName: '망막' },
  'iris': { koreanName: '홍채', hanjaName: '홍채' },
  'sclera': { koreanName: '공막', hanjaName: '공막' },
  'lens': { koreanName: '수정체', hanjaName: '수정체' },
  'ciliary body': { koreanName: '섬모체', hanjaName: '모양체' },
  'ciliary ganglion': { koreanName: '섬모체신경절', hanjaName: '모양체신경절' },
  'optic chiasm': { koreanName: '시각교차', hanjaName: '시신경교차' },
  'optic tract': { koreanName: '시각로', hanjaName: '시삭' },
  'adrenal gland': { koreanName: '부신', hanjaName: '부신' },
  'left adrenal gland': { koreanName: '왼부신', hanjaName: '좌부신' },
  'right adrenal gland': { koreanName: '오른부신', hanjaName: '우부신' },
  'pineal body': { koreanName: '송과체', hanjaName: '송과체' },
  'gingiva': { koreanName: '잇몸', hanjaName: '치은' },
  'gingiva of upper jaw': { koreanName: '위턱잇몸', hanjaName: '상악치은' },
  'gingiva of lower jaw': { koreanName: '아래턱잇몸', hanjaName: '하악치은' },
  'subcostal nerve': { koreanName: '갈비아래신경', hanjaName: '늑하신경' },
  'saphenous nerve': { koreanName: '두드러기신경', hanjaName: '복재신경' },
  'sural nerve': { koreanName: '종아리신경', hanjaName: '비복신경' },
  'ilioinguinal nerve': { koreanName: '엉덩서혜신경', hanjaName: '장골서혜신경' },
  'iliohypogastric nerve': { koreanName: '엉덩아랫배신경', hanjaName: '장골하복신경' },
  'genitofemoral nerve': { koreanName: '음부넙다리신경', hanjaName: '음부대퇴신경' },
};

// 방향 접두사 변환 규칙 (Prefix modifiers)
const PREFIXES: { en: RegExp; koPrefix: string; hanjaPrefix: string }[] = [
  { en: /^right\s+/i, koPrefix: '오른', hanjaPrefix: '우측 ' },
  { en: /^left\s+/i, koPrefix: '왼', hanjaPrefix: '좌측 ' },
  { en: /^anterior\s+/i, koPrefix: '앞', hanjaPrefix: '전 ' },
  { en: /^posterior\s+/i, koPrefix: '뒤', hanjaPrefix: '후 ' },
  { en: /^superior\s+/i, koPrefix: '위', hanjaPrefix: '상 ' },
  { en: /^inferior\s+/i, koPrefix: '아래', hanjaPrefix: '하 ' },
  { en: /^medial\s+/i, koPrefix: '안쪽', hanjaPrefix: '내측 ' },
  { en: /^lateral\s+/i, koPrefix: '가쪽', hanjaPrefix: '외측 ' },
  { en: /^superficial\s+/i, koPrefix: '얕은', hanjaPrefix: '천 ' },
  { en: /^deep\s+/i, koPrefix: '깊은', hanjaPrefix: '심 ' },
  { en: /^ascending\s+/i, koPrefix: '오름', hanjaPrefix: '상행 ' },
  { en: /^descending\s+/i, koPrefix: '내림', hanjaPrefix: '하행 ' },
  { en: /^long\s+/i, koPrefix: '긴', hanjaPrefix: '장 ' },
  { en: /^short\s+/i, koPrefix: '짧은', hanjaPrefix: '단 ' },
  { en: /^transverse\s+/i, koPrefix: '가로', hanjaPrefix: '횡 ' },
  { en: /^internal\s+/i, koPrefix: '속', hanjaPrefix: '내 ' },
  { en: /^external\s+/i, koPrefix: '바깥', hanjaPrefix: '외 ' },
  { en: /^proximal\s+/i, koPrefix: '몸쪽', hanjaPrefix: '근위 ' },
  { en: /^distal\s+/i, koPrefix: '먼쪽', hanjaPrefix: '원위 ' },
];

/**
 * 32개 치아(Teeth) 전용 패턴 해석기
 * 예: "left lower first secondary molar tooth" -> "왼아래 첫째 큰어금니 (좌하악 제1대구치)"
 */
function resolveTooth(lower: string): KoreanTerm | null {
  const m = lower.match(/^(right|left)\s+(upper|lower)\s+(first|second|third|central|lateral)?\s*(secondary\s+)?(molar|premolar|incisor|canine)\s+tooth$/i);
  if (!m) return null;
  const side = m[1].toLowerCase() === 'right' ? { ko: '오른', hanja: '우' } : { ko: '왼', hanja: '좌' };
  const jaw = m[2].toLowerCase() === 'upper' ? { ko: '위', hanja: '상악 ' } : { ko: '아래', hanja: '하악 ' };
  const numMap: Record<string, { ko: string; hanja: string }> = {
    first: { ko: '첫째', hanja: '제1' },
    second: { ko: '둘째', hanja: '제2' },
    third: { ko: '셋째', hanja: '제3' },
    central: { ko: '안쪽', hanja: '중절' },
    lateral: { ko: '가쪽', hanja: '측절' },
  };
  const toothMap: Record<string, { ko: string; hanja: string }> = {
    molar: { ko: '큰어금니', hanja: '대구치' },
    premolar: { ko: '작은어금니', hanja: '소구치' },
    incisor: { ko: '앞니', hanja: '치' },
    canine: { ko: '송곳니', hanja: '견치' },
  };
  const num = m[3] ? numMap[m[3].toLowerCase()] : null;
  const kind = toothMap[m[5].toLowerCase()];
  if (!kind) return null;

  const numKo = num ? `${num.ko} ` : '';
  const numHanja = num ? num.hanja : '';
  return {
    koreanName: `${side.ko}${jaw.ko} ${numKo}${kind.ko}`,
    hanjaName: `${side.hanja}${jaw.hanja}${numHanja}${kind.hanja}`,
  };
}

/**
 * 손가락 및 발가락 마디뼈(Phalanges) 패턴 해석기
 * 예: "distal phalanx of right index finger" -> "오른집게손가락 끝마디뼈 (우측 시지 원위지골)"
 */
function resolvePhalanx(lower: string): KoreanTerm | null {
  const m = lower.match(/^(distal|middle|proximal)\s+phalanx\s+of\s+(right|left)\s+(thumb|index\s+finger|middle\s+finger|ring\s+finger|little\s+finger|great\s+toe|second\s+toe|third\s+toe|fourth\s+toe|little\s+toe|finger|toe)$/i);
  if (!m) return null;
  const partMap: Record<string, { ko: string; hanja: string }> = {
    distal: { ko: '끝마디뼈', hanja: '원위지골' },
    middle: { ko: '중간마디뼈', hanja: '중위지골' },
    proximal: { ko: '첫마디뼈', hanja: '근위지골' },
  };
  const sideMap: Record<string, { ko: string; hanja: string }> = {
    right: { ko: '오른', hanja: '우측 ' },
    left: { ko: '왼', hanja: '좌측 ' },
  };
  const digitMap: Record<string, { ko: string; hanja: string }> = {
    thumb: { ko: '엄지손가락', hanja: '수무지' },
    'index finger': { ko: '집게손가락', hanja: '시지' },
    'middle finger': { ko: '가운뎃손가락', hanja: '중지' },
    'ring finger': { ko: '반짓손가락', hanja: '약지' },
    'little finger': { ko: '새끼손가락', hanja: '소지' },
    'great toe': { ko: '엄지발가락', hanja: '족무지' },
    'second toe': { ko: '둘째발가락', hanja: '제2족지' },
    'third toe': { ko: '셋째발가락', hanja: '제3족지' },
    'fourth toe': { ko: '넷째발가락', hanja: '제4족지' },
    'little toe': { ko: '새끼발가락', hanja: '소족지' },
    finger: { ko: '손가락', hanja: '수지' },
    toe: { ko: '발가락', hanja: '족지' },
  };
  const part = partMap[m[1].toLowerCase()];
  const side = sideMap[m[2].toLowerCase()];
  const digit = digitMap[m[3].toLowerCase()];
  if (!part || !side || !digit) return null;
  return {
    koreanName: `${side.ko}${digit.ko} ${part.ko}`,
    hanjaName: `${side.hanja}${digit.hanja} ${part.hanja}`,
  };
}

/**
 * 척추뼈(Vertebrae) 번호별 해석기
 * 예: "first cervical vertebra" -> "첫째 목뼈 (제1경추)"
 */
function resolveVertebra(lower: string): KoreanTerm | null {
  const m = lower.match(/^(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth)\s+(cervical|thoracic|lumbar|sacral|coccygeal)\s+vertebra$/i);
  if (!m) return null;
  const numMap: Record<string, { ko: string; hanja: string }> = {
    first: { ko: '첫째', hanja: '제1' }, second: { ko: '둘째', hanja: '제2' }, third: { ko: '셋째', hanja: '제3' },
    fourth: { ko: '넷째', hanja: '제4' }, fifth: { ko: '다섯째', hanja: '제5' }, sixth: { ko: '여섯째', hanja: '제6' },
    seventh: { ko: '일곱째', hanja: '제7' }, eighth: { ko: '여덟째', hanja: '제8' }, ninth: { ko: '아홉째', hanja: '제9' },
    tenth: { ko: '열째', hanja: '제10' }, eleventh: { ko: '열한째', hanja: '제11' }, twelfth: { ko: '열두째', hanja: '제12' },
  };
  const typeMap: Record<string, { ko: string; hanja: string }> = {
    cervical: { ko: '목뼈', hanja: '경추' },
    thoracic: { ko: '등뼈', hanja: '흉추' },
    lumbar: { ko: '허리뼈', hanja: '요추' },
    sacral: { ko: '엉치뼈', hanja: '천추' },
    coccygeal: { ko: '꼬리뼈', hanja: '미추' },
  };
  const num = numMap[m[1].toLowerCase()];
  const type = typeMap[m[2].toLowerCase()];
  if (!num || !type) return null;
  return {
    koreanName: `${num.ko} ${type.ko}`,
    hanjaName: `${num.hanja}${type.hanja}`,
  };
}

/**
 * 갈비뼈(Ribs) 번호별 해석기
 * 예: "right first rib" -> "오른첫째 갈비뼈 (우측 제1늑골)"
 */
function resolveRib(lower: string): KoreanTerm | null {
  const m = lower.match(/^(right|left)?\s*(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth)\s+rib$/i);
  if (!m) return null;
  const side = m[1] ? (m[1].toLowerCase() === 'right' ? { ko: '오른', hanja: '우측 ' } : { ko: '왼', hanja: '좌측 ' }) : { ko: '', hanja: '' };
  const numMap: Record<string, { ko: string; hanja: string }> = {
    first: { ko: '첫째', hanja: '제1' }, second: { ko: '둘째', hanja: '제2' }, third: { ko: '셋째', hanja: '제3' },
    fourth: { ko: '넷째', hanja: '제4' }, fifth: { ko: '다섯째', hanja: '제5' }, sixth: { ko: '여섯째', hanja: '제6' },
    seventh: { ko: '일곱째', hanja: '제7' }, eighth: { ko: '여덟째', hanja: '제8' }, ninth: { ko: '아홉째', hanja: '제9' },
    tenth: { ko: '열째', hanja: '제10' }, eleventh: { ko: '열한째', hanja: '제11' }, twelfth: { ko: '열두째', hanja: '제12' },
  };
  const num = numMap[m[2].toLowerCase()];
  if (!num) return null;
  return {
    koreanName: `${side.ko}${num.ko} 갈비뼈`,
    hanjaName: `${side.hanja}${num.hanja}늑골`,
  };
}

/**
 * 영문 구조물 명칭을 기반으로 한글 신용어와 구용어를 반환합니다.
 * 사전 직접 매핑, 치아/지골/척추/늑골 규칙, 다중 접두사 연쇄 분해 엔진을 적용합니다.
 */
export function getKoreanTerms(name: string): KoreanTerm | null {
  const lower = name.trim().toLowerCase();
  if (KOREAN_ANATOMY_TERMS[lower]) {
    return KOREAN_ANATOMY_TERMS[lower];
  }

  // 1. 치아, 지골, 척추뼈, 갈비뼈 패턴 해석
  const tooth = resolveTooth(lower);
  if (tooth) return tooth;
  const phalanx = resolvePhalanx(lower);
  if (phalanx) return phalanx;
  const vertebra = resolveVertebra(lower);
  if (vertebra) return vertebra;
  const rib = resolveRib(lower);
  if (rib) return rib;

  // 2. 다중 접두사 연쇄 분해 (예: "Right anterior cerebral artery" -> "오른" + "앞" + "대뇌동맥")
  let cur = lower;
  let koAcc = '';
  let hanjaAcc = '';
  let matchedPrefix = true;
  while (matchedPrefix && cur.length > 0) {
    matchedPrefix = false;
    for (const { en, koPrefix, hanjaPrefix } of PREFIXES) {
      if (en.test(cur)) {
        koAcc += koPrefix;
        hanjaAcc += hanjaPrefix;
        cur = cur.replace(en, '').trim();
        matchedPrefix = true;
        break;
      }
    }
    if (cur && KOREAN_ANATOMY_TERMS[cur]) {
      const base = KOREAN_ANATOMY_TERMS[cur];
      return {
        koreanName: `${koAcc}${base.koreanName}`,
        hanjaName: `${hanjaAcc}${base.hanjaName}`,
      };
    }
  }

  return null;
}

/**
 * 구조물 메인 타이틀 포맷: "English (신용어)"
 * 예: "Femur (넙다리뼈)", 매핑 정보가 없으면 "Femur" 그대로 반환.
 */
export function getDisplayName(name: string): string {
  const term = getKoreanTerms(name);
  if (term && term.koreanName) {
    return `${name} (${term.koreanName})`;
  }
  return name;
}

/**
 * 구조물 구용어(한자어) 뱃지 텍스트 반환
 * 신용어와 구용어가 완전히 동일할 경우 깔끔한 UI를 위해 null을 반환하여 뱃지를 생략합니다.
 * 예: "대퇴골" (신용어 넙다리뼈와 다르므로 표시), "심장" (신구용어 동일하므로 null).
 */
export function getHanjaName(name: string): string | null {
  const term = getKoreanTerms(name);
  if (!term || !term.hanjaName) return null;
  if (term.hanjaName.trim() === term.koreanName.trim()) return null;
  return term.hanjaName;
}

/**
 * Clinically common vessel abbreviations. Abbreviations are matched as whole
 * queries so short forms such as PA, RA, and SV do not create substring noise.
 * A target may intentionally resolve to multiple structures (for example PA
 * resolves to both pulmonary and popliteal arteries).
 */
const VASCULAR_ABBREVIATIONS: Record<string, string[]> = {
  ao: ['aorta'],
  ca: ['celiac artery', 'celiac trunk'],
  ct: ['celiac artery', 'celiac trunk'],
  sma: ['superior mesenteric artery'],
  ima: ['inferior mesenteric artery'],
  ra: ['renal artery'],
  ivc: ['inferior vena cava'],
  pv: ['portal vein', 'pulmonary vein'],
  smv: ['superior mesenteric vein'],
  sv: ['splenic vein'],
  hv: ['hepatic vein'],
  svc: ['superior vena cava'],
  pa: ['pulmonary artery', 'popliteal artery'],
  lmca: ['left main coronary artery', 'trunk of left coronary artery'],
  lm: ['left main coronary artery', 'trunk of left coronary artery'],
  lad: ['left anterior descending artery', 'anterior descending branch of left coronary artery', 'anterior interventricular branch of left coronary artery'],
  lcx: ['left circumflex artery', 'circumflex branch of left coronary artery'],
  rca: ['right coronary artery'],
  cca: ['common carotid artery'],
  ica: ['internal carotid artery'],
  eca: ['external carotid artery'],
  aca: ['anterior cerebral artery'],
  mca: ['middle cerebral artery'],
  pca: ['posterior cerebral artery'],
  va: ['vertebral artery'],
  ba: ['basilar artery'],
  acom: ['anterior communicating artery'],
  pcom: ['posterior communicating artery'],
  cia: ['common iliac artery'],
  eia: ['external iliac artery'],
  cfa: ['common femoral artery', 'femoral artery'],
  sfa: ['superficial femoral artery', 'femoral artery'],
  gsv: ['great saphenous vein'],
};

function includesWholePhrase(name: string, phrase: string): boolean {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:^|\\b)${escaped}\\b`).test(name);
}

export function isVascularAbbreviation(searchTerm: string): boolean {
  return searchTerm.trim().length > 0 && searchTerm.trim().toLowerCase().replace(/[.\s-]/g, '') in VASCULAR_ABBREVIATIONS;
}

/**
 * 3-Way 검색 매칭 함수 (영문, 신용어, 구용어)
 * term이 영문 명칭, 한글 신용어, 한글 구용어 중 어느 하나라도 포함되면 true 반환.
 */
export function matchesSearchTerm(name: string, searchTerm: string): boolean {
  const q = searchTerm.trim().toLowerCase();
  if (!q) return false;

  const lowerName = name.toLowerCase();
  const abbreviation = q.replace(/[.\s-]/g, '');
  const vesselTargets = VASCULAR_ABBREVIATIONS[abbreviation];
  if (vesselTargets) {
    if (abbreviation === 'cfa' || abbreviation === 'sfa') return /^(?:left |right )?(?:common |superficial )?femoral artery$/.test(lowerName);
    return vesselTargets.some(target => includesWholePhrase(lowerName, target));
  }

  // 1. 영문 검색 매칭
  if (lowerName.includes(q)) return true;

  // 2. 한글 신용어 / 구용어 매칭
  const term = getKoreanTerms(name);
  if (term) {
    if (term.koreanName.toLowerCase().includes(q)) return true;
    if (term.hanjaName.toLowerCase().includes(q)) return true;
  }

  return false;
}
