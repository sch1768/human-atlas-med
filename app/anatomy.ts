export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac';
export const SYSTEMS: {id:SystemId;name:string;color:string;description:string}[] = [
 {id:'skeletal',name:'Skeleton',color:'#e2d9ba',description:'Bones form the supporting framework of the body, protect organs, and provide attachment points for muscles. Their internal tissue also stores minerals and produces blood cells.'},
 {id:'muscular',name:'Muscles',color:'#a85b50',description:'Skeletal muscles generate movement by pulling on their attachments. Together with tendons, they move joints, stabilize posture, and produce heat.'},
 {id:'cardiac',name:'Heart',color:'#b96760',description:'The heart is a muscular pump with four chambers. Its valves direct blood forward through the pulmonary and systemic circuits.'},
 {id:'sensory',name:'Sensory organs',color:'#b0c8ce',description:'These structures contribute to special senses, including sight, hearing, and balance. Their specialized tissues detect stimuli and work with the nervous system to convey information.'},
 {id:'arterial',name:'Arteries',color:'#c05245',description:'The heart drives blood through the circulation. Arteries carry blood away from the heart to supply tissues or, in the pulmonary circuit, to the lungs.'},
 {id:'venous',name:'Veins',color:'#527c9f',description:'Veins return blood toward the heart. Superficial and deep networks collect blood from the tissues; the pulmonary veins bring oxygenated blood back from the lungs.'},
 {id:'nervous',name:'Nervous system',color:'#d8b565',description:'The brain, spinal cord, and peripheral nerves carry and process signals. They support sensation, movement, coordination, and automatic regulation of body functions.'},
 {id:'respiratory',name:'Respiratory',color:'#b98991',description:'The airways conduct air to the lungs, where oxygen and carbon dioxide move between air and blood. Breathing depends on pressure changes produced by respiratory muscles.'},
 {id:'digestive',name:'Digestive',color:'#b8916b',description:'The digestive tract breaks down food, absorbs nutrients and water, and moves waste onward. Accessory organs contribute bile and digestive enzymes.'},
 {id:'urinary',name:'Urinary',color:'#b47961',description:'The kidneys filter blood and regulate fluid, electrolyte, and acid–base balance. Urine travels through the ureters to the bladder and exits through the urethra.'},
 {id:'lymphatic',name:'Lymphatic',color:'#879f7c',description:'Lymphatic vessels return excess tissue fluid to the circulation. Lymph nodes and other lymphoid organs support immune surveillance and responses.'},
 {id:'endocrine',name:'Endocrine',color:'#c5a09a',description:'Endocrine organs release hormones into the blood to coordinate processes such as metabolism, growth, stress responses, and reproduction.'},
 {id:'reproductive',name:'Reproductive',color:'#bda098',description:'The male reproductive structures represented here contribute to sperm production, maturation, transport, and the production of sex hormones.'},
 {id:'integumentary',name:'Body surface',color:'#ba9b7d',description:'The body surface provides an outer anatomical reference. The integumentary system forms a protective barrier and contributes to sensation and temperature regulation.'},
 {id:'connective',name:'Connective tissue',color:'#aec3bb',description:'Cartilage, ligaments, and other connective tissues support, connect, and separate structures. Their roles include stabilizing joints and distributing mechanical loads.'},
];
export interface Part {id:string;name:string;conceptId:string;system:SystemId;source?:string;sourceObjectId?:string;licenseId?:string;laterality?:'left'|'right'|'midline';chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;elements:string[]}
export interface AtlasSource {name:string;version:string;license?:string;licenseUrl?:string;attribution?:string}
export interface AtlasRegistration {method:string;anchors?:string[];translationMeters?:number[];anchorCenterResidualMillimeters?:Record<string,number>}
export interface AtlasAdaptation {structure:string;method:string;reason:string;references?:string[]}
export interface Atlas {version:string;sex?:'male'|'female';source?:string;scope?:string;license?:string;licenseUrl?:string;attribution?:string;sources?:AtlasSource[];registration?:AtlasRegistration;adaptations?:AtlasAdaptation[];parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export function mergeAtlasPack(base:Atlas,pack:Atlas):Atlas{
 const partIds=new Set(base.parts.map(part=>part.id)),conceptIds=new Set(base.concepts.map(concept=>concept.id));
 for(const part of pack.parts)if(partIds.has(part.id))throw new Error(`Duplicate anatomy part ID: ${part.id}`);
 for(const concept of pack.concepts)if(conceptIds.has(concept.id))throw new Error(`Duplicate anatomy concept ID: ${concept.id}`);
 const baseSources=base.sources??[{name:base.source??'Unknown',version:base.version,license:base.license,licenseUrl:base.licenseUrl,attribution:base.attribution}];
 const packSources=pack.sources??[{name:pack.source??'Unknown',version:pack.version,license:pack.license,licenseUrl:pack.licenseUrl,attribution:pack.attribution}];
 return {
  ...base,
  version:`${base.version} + ${pack.version}`,
  source:`${base.source??'Base atlas'} + ${pack.source??'supplement'}`,
  scope:`${base.scope??'Base atlas'} · ${pack.scope??'Supplement'}`,
  sources:[...baseSources,...packSources],
  registration:pack.registration??base.registration,
  adaptations:[...(base.adaptations??[]),...(pack.adaptations??[])],
  parts:[...base.parts,...pack.parts.map(part=>({...part,chunk:part.chunk+base.chunks.length}))],
  concepts:[...base.concepts,...pack.concepts],
  chunks:[...base.chunks,...pack.chunks],
  triangles:base.triangles+pack.triangles,
 };
}
export type View = 'three-quarter'|'front'|'back'|'side';
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];isolate:boolean;isolatedPartIds?:string[];view:View;rotate:boolean;reset:number;focusNonce?:number;focusTargetIds?:string[];ghost?:boolean;hidden?:string[]}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','connective'];
export const EXPLANATIONS:Record<string,string> = {
 'heart':'A muscular pump in the chest. Its right side sends blood to the lungs; its left side sends blood through the systemic circulation.',
 'liver':'A large organ beneath the right side of the diaphragm. It processes absorbed nutrients, produces bile, and synthesizes many proteins carried in the blood.',
 'brain':'The central organ of the nervous system. Its interconnected regions support perception, movement, memory, language, and the regulation of bodily functions.',
 'stomach':'A muscular chamber between the esophagus and small intestine. It stores and mixes food with acid and enzymes before releasing it into the duodenum.',
 'spleen':'A lymphoid organ in the upper left abdomen. It filters blood, removes aging blood cells, and participates in immune responses.',
 'pancreas':'An abdominal organ with digestive and endocrine roles. It supplies enzymes to the small intestine and releases hormones including insulin and glucagon.',
 'urinary bladder':'A muscular reservoir in the pelvis that stores urine arriving from the kidneys through the ureters.',
 'trachea':'The main airway connecting the larynx to the bronchi. Its cartilage supports keep the airway open during breathing.',
 'diaphragm':'A broad muscle separating the chest and abdomen. When it contracts, it increases chest volume and helps draw air into the lungs.',
 'trapezius':'A large superficial back muscle extending from the occipital bone to the lower thoracic vertebrae and laterally to the spine of the scapula. It stabilizes and moves the scapula.',
 'deltoid':'The large triangular muscle covering the shoulder joint. Its anterior, lateral, and posterior fibers abduct, flex, and extend the arm.',
 'pectoralis major':'A thick, fan-shaped muscle covering the upper chest, responsible for flexion, adduction, and medial rotation of the arm.',
 'triceps brachii':'A three-headed muscle on the posterior arm, serving as the primary extensor of the elbow joint.',
 'biceps brachii':'A two-headed muscle on the anterior arm, acting as a powerful flexor of the elbow and supinator of the forearm.',
 'gastrocnemius':'A superficial two-headed calf muscle that plantarflexes the foot at the ankle and flexes the leg at the knee joint.',
 'quadriceps femoris':'A large four-part muscle group covering the front and sides of the thigh, acting as the primary extensor of the knee joint.',
 'hamstrings':'A posterior thigh muscle group (biceps femoris, semitendinosus, and semimembranosus) that flexes the knee and extends the hip.',
 'rotator cuff':'A group of four shoulder muscles (supraspinatus, infraspinatus, teres minor, and subscapularis) that stabilize the glenohumeral joint.',
};
export function explanation(name:string,system:SystemId){return EXPLANATIONS[name.toLowerCase()] ?? SYSTEMS.find(s=>s.id===system)?.description ?? '';}
