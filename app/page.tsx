import {flushSync} from 'react-dom';
import {registerAtlasTools} from './agent-tools';
import {useEffect,useMemo,useRef,useState} from 'react';
import {Activity,ArrowUpRight,ChevronDown,ChevronLeft,ChevronRight,ChevronUp,EyeOff,Focus,Info,Layers3,Pause,RotateCcw,RotateCw,Search,Undo2,X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Switch} from '@/components/ui/switch';
import {Sheet,SheetContent,SheetTitle,SheetDescription} from '@/components/ui/sheet';
import AnatomyScene from './scene';
import {DEFAULT_VISIBLE,SYSTEMS,EXPLANATIONS,explanation,type Atlas,type Concept,type SceneState,type SystemId,type View} from './anatomy';
import {getDisplayName,getHanjaName,matchesSearchTerm,getKoreanTerms} from './korean-anatomy';
import {buildCompositeConcepts} from './composite-concepts';
import {REGIONS,getRegionPartIds,type RegionId,type SubregionId} from './regional-anatomy';

const initial:SceneState={explode:0,visible:DEFAULT_VISIBLE,selected:[],isolate:false,view:'three-quarter',rotate:false,reset:0,ghost:false,hidden:[]};

const FEATURED_ORGANS: {name:string;label:string;color:string}[] = [
 {name:'heart',label:'Heart (심장)',color:'#b96760'},
 {name:'brain',label:'Brain (뇌)',color:'#d8b565'},
 {name:'liver',label:'Liver (간)',color:'#b8916b'},
 {name:'stomach',label:'Stomach (위)',color:'#b8916b'},
 {name:'kidney',label:'Kidneys (콩팥)',color:'#b47961'},
 {name:'right lung',label:'Right lung (오른허파)',color:'#b98991'},
 {name:'left lung',label:'Left lung (왼허파)',color:'#b98991'},
 {name:'pancreas',label:'Pancreas (이자)',color:'#b8916b'},
 {name:'spleen',label:'Spleen (지라)',color:'#879f7c'},
 {name:'gallbladder',label:'Gallbladder (쓸개)',color:'#b8916b'},
 {name:'urinary bladder',label:'Urinary bladder (방광)',color:'#b47961'},
 {name:'trachea',label:'Trachea (기관)',color:'#b98991'},
];

export default function Home(){
 const detailTitle=useRef<HTMLHeadingElement>(null);
 const [atlas,setAtlas]=useState<Atlas|null>(null),[state,setState]=useState(initial),[progress,setProgress]=useState(0),[error,setError]=useState(''),[panel,setPanel]=useState<'layers'|'search'|null>(null),[details,setDetails]=useState(false),[about,setAbout]=useState(false),[query,setQuery]=useState(''),[chosen,setChosen]=useState<Concept|null>(null),[showQuickPicks,setShowQuickPicks]=useState(true),[selectedResultIndex,setSelectedResultIndex]=useState(-1);
 const [layerTab,setLayerTab]=useState<'systems'|'regions'>('systems');
 const [selectedRegion,setSelectedRegion]=useState<RegionId|null>(null);
 const [selectedSubregion,setSelectedSubregion]=useState<SubregionId|null>(null);
 useEffect(()=>{const abort=new AbortController();setProgress(0);setError('');setAtlas(null);setChosen(null);setDetails(false);setState({...initial,visible:DEFAULT_VISIBLE});fetch('/models/atlas.json',{signal:abort.signal}).then(r=>{if(!r.ok)throw new Error('The anatomy catalogue could not be loaded.');return r.json();}).then(data=>setAtlas(data as Atlas)).catch(e=>{if(e.name!=='AbortError')setError(e.message);});return()=>abort.abort();},[]);
 const hideSelected=()=>{if(state.selected.length===0)return;const newlyHidden=state.selected;setState(s=>({...s,hidden:[...(s.hidden??[]),...newlyHidden],selected:[],isolate:false}));setDetails(false);};
 const undoHide=()=>{if(!state.hidden||state.hidden.length===0)return;setState(s=>{const next=[...(s.hidden??[])],restored=next.pop();return{...s,hidden:next,...(restored?{selected:[restored]}:{})};});};
 const resetHidden=()=>{setState(s=>({...s,hidden:[]}));};
 useEffect(()=>{
  const handleKeyDown=(e:KeyboardEvent)=>{
   if(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement)return;
   const key=e.key.toLowerCase();
   if(e.key==='/'){e.preventDefault();setPanel('search');setDetails(false);}
   else if(e.key==='Escape'){setPanel(null);setDetails(false);setState(s=>({...s,selected:[],isolate:false}));}
   else if(key==='f'&&state.selected.length>0){e.preventDefault();setState(s=>({...s,focusNonce:(s.focusNonce??0)+1,isolate:false}));}
   else if(key==='h'&&state.selected.length>0){e.preventDefault();hideSelected();}
   else if(key==='u'&&(state.hidden?.length??0)>0){e.preventDefault();undoHide();}
   else if(key==='g'&&state.selected.length>0){e.preventDefault();setState(s=>({...s,ghost:!s.ghost,isolate:false}));}
   else if(key==='i'&&state.selected.length>0){e.preventDefault();setState(s=>({...s,isolate:!s.isolate,explode:0}));}
  };
  window.addEventListener('keydown',handleKeyDown);
  return()=>window.removeEventListener('keydown',handleKeyDown);
 },[state.selected,state.hidden,state.ghost,state.isolate]);
 const parts=useMemo(()=>new Map(atlas?.parts.map(p=>[p.id,p])),[atlas]);
 const counts=useMemo(()=>Object.fromEntries(SYSTEMS.map(s=>[s.id,atlas?.parts.filter(p=>p.system===s.id).length??0])),[atlas]);
 const activeSystems=SYSTEMS.filter(s=>counts[s.id]>0);
 const selectedParts=state.selected.map(id=>parts.get(id)).filter(p=>!!p),selected=selectedParts[0],system=SYSTEMS.find(s=>s.id===selected?.system);
 const visibleCount=atlas?.parts.filter(p=>state.isolate?state.selected.includes(p.id):state.visible.includes(p.system)||state.selected.includes(p.id)).length??0;
 const compositeConcepts=useMemo(()=>{
  if(!atlas)return[];
  return buildCompositeConcepts(atlas);
 },[atlas]);
 const allConcepts=useMemo(()=>{
  if(!atlas)return[];
  return[...compositeConcepts,...atlas.concepts];
 },[atlas,compositeConcepts]);
 const results=useMemo(()=>{
  if(!atlas)return[];
  const term=query.toLowerCase().trim();
  if(!term)return[];
  const matchedConcepts=allConcepts.filter(c=>matchesSearchTerm(c.name,term)||c.id.toLowerCase().includes(term));
  const conceptNames=new Set(allConcepts.map(c=>c.name.toLowerCase())),matchedParts:Concept[]=[];
  atlas.parts.forEach(p=>{if(!conceptNames.has(p.name.toLowerCase())&&(matchesSearchTerm(p.name,term)||p.id.toLowerCase().includes(term))){matchedParts.push({id:p.id,name:p.name,elements:[p.id]});}});
  return[...matchedConcepts,...matchedParts].sort((a,b)=>{
   const aExact=a.name.toLowerCase()===term||getKoreanTerms(a.name)?.koreanName===term||getKoreanTerms(a.name)?.hanjaName===term;
   const bExact=b.name.toLowerCase()===term||getKoreanTerms(b.name)?.koreanName===term||getKoreanTerms(b.name)?.hanjaName===term;
   if(aExact&&!bExact)return-1;
   if(!aExact&&bExact)return 1;
   const aIsComposite=a.id.startsWith('COMPOSITE_');
   const bIsComposite=b.id.startsWith('COMPOSITE_');
   if(aIsComposite&&!bIsComposite)return-1;
   if(!aIsComposite&&bIsComposite)return 1;
   return a.name.length-b.name.length;
  }).slice(0,80);
 },[atlas,allConcepts,query]);
 const choose=(c:Concept)=>{setChosen(c);setState(s=>({...s,selected:c.elements,isolate:false,rotate:false,focusNonce:(s.focusNonce??0)+1}));setDetails(true);setPanel(null);};
 const chooseFeatured=(organName:string)=>{
  if(!atlas)return;
  const c=allConcepts.find(x=>x.name.toLowerCase()===organName);
  if(c)choose(c);
 };
 useEffect(()=>{if(!atlas)return;return registerAtlasTools(atlas,c=>flushSync(()=>choose(c)));},[atlas]);
 const choosePart=(id:string,isDouble=false)=>{const p=parts.get(id);if(!p)return;setChosen({id:p.conceptId,name:p.name,elements:[id]});setState(s=>({...s,selected:[id],isolate:false,rotate:false,...(isDouble?{focusNonce:(s.focusNonce??0)+1}:{})}));setDetails(true);setPanel(null);};
 const toggle=(id:SystemId)=>{setDetails(false);setState(s=>({...s,selected:[],isolate:false,visible:s.visible.includes(id)?s.visible.filter(x=>x!==id):[...s.visible,id]}));};
 const reset=()=>{setSelectedRegion(null);setSelectedSubregion(null);setState(s=>({...initial,visible:DEFAULT_VISIBLE,reset:s.reset+1,hidden:[],focusTargetIds:undefined}));setChosen(null);setDetails(false);setPanel(null);};
 const openPanel=(next:'layers'|'search')=>{setDetails(false);setPanel(p=>p===next?null:next);};

 const handleSelectRegion=(regionId:RegionId)=>{
  if(!atlas)return;
  setSelectedRegion(regionId);
  setSelectedSubregion(null);
  const partIds=getRegionPartIds(atlas,regionId);
  const partIdSet=new Set(partIds);
  const newlyHidden=atlas.parts.filter(p=>!partIdSet.has(p.id)).map(p=>p.id);
  setState(s=>({...s,hidden:newlyHidden,selected:[],focusTargetIds:partIds,focusNonce:(s.focusNonce??0)+1,isolate:false}));
  setDetails(false);
 };

 const handleSelectSubregion=(regionId:RegionId,subId:SubregionId)=>{
  if(!atlas)return;
  setSelectedRegion(regionId);
  setSelectedSubregion(subId);
  const partIds=getRegionPartIds(atlas,regionId,subId);
  const partIdSet=new Set(partIds);
  const newlyHidden=atlas.parts.filter(p=>!partIdSet.has(p.id)).map(p=>p.id);
  setState(s=>({...s,hidden:newlyHidden,selected:[],focusTargetIds:partIds,focusNonce:(s.focusNonce??0)+1,isolate:false}));
  setDetails(false);
 };

 const handleResetToWholeBody=()=>{
  setSelectedRegion(null);
  setSelectedSubregion(null);
  setState(s=>({...s,hidden:[],selected:[],focusTargetIds:undefined,reset:s.reset+1}));
  setDetails(false);
 };

 const activeRegionObj=REGIONS.find(r=>r.id===selectedRegion);

 return <main className="studio">
  {atlas&&<AnatomyScene atlas={atlas} state={{...state,inspectorOpen:details&&selectedParts.length>0}} onSelect={choosePart} onProgress={n=>{setProgress(n);if(n===100)setError('');}} onError={setError}/>}
  <div className="vignette"/>
  <header className="identity"><div className="eyebrow"><span className="status-dot"/> INTERACTIVE ANATOMY</div><h1>Human Atlas<Badge variant="outline" className="edition">3D</Badge></h1><div className="identity-meta">{atlas?atlas.parts.length.toLocaleString():'2,234'} modeled pieces <span>·</span> BodyParts3D</div></header>
  <nav className="top-actions" aria-label="Explorer panels">
   <Button variant="ghost" className={`mobile-only icon-button ${panel==='layers'?'active':''}`} aria-label="Open system layers" onClick={()=>openPanel('layers')}><Layers3 size={18}/></Button>
   <Button variant="ghost" className={panel==='search'?'active':''} onClick={()=>openPanel('search')} aria-label="Search anatomy"><Search size={18}/><span>Find a structure</span><kbd>/</kbd></Button>
   <Button variant="ghost" className="icon-button" aria-label="About this atlas" onClick={()=>{setDetails(false);setPanel(null);setAbout(true);}}><Info size={18}/></Button>
  </nav>
  <section className={`layers-panel glass ${panel==='layers'?'mobile-open':''}`} aria-label="Anatomical layers">
   <div className="panel-heading">
    <div className="panel-tab-group">
     <button type="button" className={`panel-tab ${layerTab==='systems'?'active':''}`} onClick={()=>setLayerTab('systems')}>Systems</button>
     <button type="button" className={`panel-tab ${layerTab==='regions'?'active':''}`} onClick={()=>setLayerTab('regions')}>Regions</button>
    </div>
    <Button variant="ghost" className="mobile-only icon-button" onClick={()=>setPanel(null)} aria-label="Close panel"><X size={18}/></Button>
   </div>

   {layerTab==='systems'?(
    <>
     <div className="layer-presets"><Button variant="ghost" aria-pressed={activeSystems.every(x=>state.visible.includes(x.id))} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:activeSystems.map(x=>x.id)}))}>All</Button><Button variant="ghost" aria-pressed={state.visible.length===1&&state.visible[0]==='skeletal'} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:['skeletal']}))}>Skeleton</Button><Button variant="ghost" aria-pressed={state.visible.length===6&&['cardiac','respiratory','digestive','urinary','endocrine','reproductive'].every(id=>state.visible.includes(id as SystemId))} onClick={()=>setState(s=>({...s,selected:[],isolate:false,visible:['cardiac','respiratory','digestive','urinary','endocrine','reproductive']}))}>Organs</Button></div>
     <div className="system-list">{activeSystems.map(s=><div className={`system-row ${state.visible.includes(s.id)?'enabled':''}`} key={s.id}><Button variant="ghost" className="system-name" title={`Show only ${s.name.toLowerCase()}`} onClick={()=>setState(v=>({...v,visible:[s.id],isolate:false,selected:[]}))}><span className="system-dot" style={{background:s.color}}/>{s.name}<span className="system-count">{counts[s.id]}</span></Button><Switch checked={state.visible.includes(s.id)} onCheckedChange={()=>toggle(s.id)} aria-label={`Show ${s.name.toLowerCase()}`} /></div>)}</div>
     <div className="panel-foot"><span>{visibleCount.toLocaleString()} pieces visible</span><Button variant="ghost" onClick={()=>setState(s=>({...s,visible:[],selected:[],isolate:false}))}>Hide all</Button></div>
    </>
   ):(
    <div className="regions-container">
     {!selectedRegion?(
      <div className="regions-grid">
       {REGIONS.map(reg=>(
        <button key={reg.id} type="button" className="region-card" onClick={()=>handleSelectRegion(reg.id)}>
         <span className="region-card-icon">{reg.icon}</span>
         <span className="region-name-en">{reg.name}</span>
        </button>
       ))}
       <button type="button" className="region-card whole-body" onClick={handleResetToWholeBody}>
        <span className="region-card-icon">🌐</span>
        <span className="region-name-en">Whole Body</span>
       </button>
      </div>
     ):(
      <div className="subregion-view">
       <div className="region-sub-header">
        <Button variant="ghost" className="subregion-back-btn" onClick={()=>{setSelectedRegion(null);setSelectedSubregion(null);handleResetToWholeBody();}}>
         <ChevronLeft size={16}/> <span>All Regions</span>
        </Button>
        <div className="current-region-badge">
         <span className="region-header-icon">{activeRegionObj?.icon}</span>
         <strong>{activeRegionObj?.name}</strong>
        </div>
        <Button variant="outline" className={`subregion-all-btn ${selectedSubregion===null?'active':''}`} onClick={()=>handleSelectRegion(selectedRegion)}>
         <span>All {activeRegionObj?.name} ({atlas?getRegionPartIds(atlas,selectedRegion).length:0} pieces)</span>
        </Button>
       </div>
       <div className="subregion-list">
        {activeRegionObj?.subregions.map(sub=>{
         const isSubActive=selectedSubregion===sub.id;
         const subCount=atlas?getRegionPartIds(atlas,selectedRegion,sub.id).length:0;
         return (
          <button key={sub.id} type="button" className={`subregion-row ${isSubActive?'active':''}`} onClick={()=>handleSelectSubregion(selectedRegion,sub.id)}>
           <span className="subregion-name">{sub.name}</span>
           <span className="subregion-count">{subCount}</span>
          </button>
         );
        })}
       </div>
      </div>
     )}
    </div>
   )}
  </section>
  {panel==='search'&&<section className="search-panel glass" aria-label="Find anatomy">
   <div className="panel-heading"><span>Find a structure</span><Button variant="ghost" className="icon-button" onClick={()=>setPanel(null)} aria-label="Close search"><X size={18}/></Button></div>
   <div className="search-input-box">
    <Search size={16} className="search-box-icon"/>
    <input autoFocus value={query} onChange={e=>{setQuery(e.target.value);setSelectedResultIndex(-1);}} onKeyDown={e=>{
     if(e.key==='ArrowDown'){e.preventDefault();setSelectedResultIndex(i=>Math.min(i+1,results.length-1));}
     else if(e.key==='ArrowUp'){e.preventDefault();setSelectedResultIndex(i=>Math.max(i-1,0));}
     else if(e.key==='Enter'&&results.length>0){e.preventDefault();const idx=selectedResultIndex>=0?selectedResultIndex:0;choose(results[idx]);}
     else if(e.key==='Escape'){setPanel(null);}
    }} placeholder="넙다리뼈, 대퇴골, femur, 심장, heart…" aria-label="Search named anatomical structures"/>
    {query&&<Button variant="ghost" className="search-clear-btn" onClick={()=>{setQuery('');setSelectedResultIndex(-1);}} aria-label="Clear search"><X size={14}/></Button>}
   </div>
   {!query.trim()?(
    <div className="quick-picks-section">
     <div className="quick-picks-header">
      <span>대표 장기 바로가기 (Featured Organs)</span>
      <Button variant="ghost" className="quick-toggle" onClick={()=>setShowQuickPicks(v=>!v)} aria-label={showQuickPicks?'대표 장기 접기':'대표 장기 펼치기'}>
       <span>{showQuickPicks?'접기':'펼치기'}</span>
       {showQuickPicks?<ChevronUp size={14}/>:<ChevronDown size={14}/>}
      </Button>
     </div>
     {showQuickPicks&&(
      <div className="quick-picks-grid">
       {FEATURED_ORGANS.map(organ=>(
        <Button key={organ.name} variant="ghost" className="quick-pick-pill" onClick={()=>chooseFeatured(organ.name)}>
         <span className="quick-dot" style={{background:organ.color}}/>
         <span>{organ.label}</span>
        </Button>
       ))}
      </div>
     )}
     <p className="search-note">영문(Femur), 신용어(넙다리뼈), 구용어(대퇴골) 중 편한 언어로 검색해 보세요.</p>
    </div>
   ):(
    <div className="search-results-list" role="listbox">
     {results.length===0?(
      <div className="search-empty">
       {query.toLowerCase().includes('radial')||query.toLowerCase().includes('sciatic')||query.toLowerCase().includes('median')||query.toLowerCase().includes('ulnar')||query.includes('요골')||query.includes('정중')||query.includes('척골')||query.includes('좌골')
        ?'말초신경(Radial/Median/Sciatic 등)은 BodyParts3D 원본에 미포함되어 있습니다. Optic nerve, Cranial nerve 등 뇌신경을 검색해 보세요.'
        :'일치하는 해부학 구조물이 없습니다.'}
      </div>
     ):(
      results.map((c,i)=>{
       const hanja=getHanjaName(c.name);
       return (
        <button key={c.id} type="button" className={`search-result-item ${i===selectedResultIndex?'selected':''}`} onClick={()=>choose(c)}>
         <div className="search-result-info">
          <span className="search-result-name">{getDisplayName(c.name)}</span>
          {hanja&&<span className="search-result-hanja">구용어: {hanja}</span>}
         </div>
         <span className="small-number">{c.elements.length} {c.elements.length===1?'piece':'pieces'}</span>
        </button>
       );
      })
     )}
    </div>
   )}
  </section>}
  <nav className={`view-controls glass ${details&&selectedParts.length>0?'shifted':''}`} aria-label="Camera controls">{(['three-quarter','front','side','back'] as View[]).map((v,i)=><Button variant="ghost" key={v} className={state.view===v?'active':''} aria-pressed={state.view===v} onClick={()=>setState(s=>({...s,view:v,reset:s.reset+1,rotate:false}))} title={`${v} view`} aria-label={`${v} view`}><span>{['¾','F','S','B'][i]}</span></Button>)}<i/><Button variant="ghost" aria-label={state.rotate?'Pause rotation':'Rotate body'} title="Auto rotate" className={state.rotate?'active':''} onClick={()=>setState(s=>({...s,rotate:!s.rotate}))}>{state.rotate?<Pause size={17}/>:<RotateCw size={18}/>}</Button><Button variant="ghost" aria-label="Reset view and layers" title="Reset" onClick={reset}><RotateCcw size={17}/></Button></nav>
  {(state.selected.length>0||(state.hidden?.length??0)>0)&&<div className="floating-dock glass" role="toolbar" aria-label="Quick dissection tools">{state.selected.length>0&&<><Button variant="ghost" onClick={()=>setState(s=>({...s,focusNonce:(s.focusNonce??0)+1,isolate:false}))} title="Focus on structure (F)"><Focus size={15}/><span>Focus</span><kbd>F</kbd></Button><Button variant="ghost" onClick={hideSelected} title="Hide structure (H)"><EyeOff size={15}/><span>Hide</span><kbd>H</kbd></Button><Button variant="ghost" className={state.ghost?'active':''} onClick={()=>setState(s=>({...s,ghost:!state.ghost,isolate:false}))} title="Toggle Ghost mode (G)"><Layers3 size={15}/><span>{state.ghost?'Ghost':'Solid'}</span><kbd>G</kbd></Button><Button variant="ghost" className={state.isolate?'active':''} onClick={()=>setState(s=>({...s,isolate:!state.isolate,explode:0}))} title="Isolate structure (I)"><span>{state.isolate?'Show all':'Isolate'}</span><kbd>I</kbd></Button></>}{(state.hidden?.length??0)>0&&<>{state.selected.length>0&&<i className="dock-sep"/>}<Button variant="ghost" onClick={undoHide} title="Undo hide (U)"><Undo2 size={15}/><span>Undo ({state.hidden!.length})</span><kbd>U</kbd></Button><Button variant="ghost" onClick={resetHidden} title="Unhide all structures"><span>Unhide all</span></Button></>}</div>}
  <footer className="studio-footer"><span>Drag to orbit · Pinch to zoom · Tap to inspect · Double-tap to focus</span></footer>
  {progress<100&&!error&&<div className="loading glass" role="status"><Activity size={18}/><div><strong>Preparing the anatomy</strong><span>{progress}% · Loading {atlas?.parts.length.toLocaleString()??'2,234'} pieces</span><div className="loading-track"><i style={{width:`${progress}%`}}/></div></div></div>}
  {error&&<div className="loading glass error" role="alert"><p>{error}</p><Button variant="ghost" onClick={()=>location.reload()}>Reload viewer</Button></div>}
  <Sheet open={details&&selectedParts.length>0} modal={false} disablePointerDismissal onOpenChange={setDetails}><SheetContent initialFocus={detailTitle} className={`detail-sheet glass ${state.isolate?'is-isolated':''}`} showCloseButton={true}><div className="detail-header"><div className="detail-accent" style={{background:system?.color}}/><div className="eyebrow">{system?.name??'ANATOMY'}</div><SheetTitle ref={detailTitle} tabIndex={-1} className="structure-title">{chosen?getDisplayName(chosen.name):''}</SheetTitle>{chosen&&getHanjaName(chosen.name)&&<div className="structure-tags"><Badge variant="outline" className="hanja-badge">구용어: {getHanjaName(chosen.name)}</Badge></div>}<SheetDescription className="sr-only">Structure inspector</SheetDescription></div><div className="detail-actions"><Button className="primary-action" onClick={()=>setState(s=>({...s,focusNonce:(s.focusNonce??0)+1,isolate:false}))}><Focus size={18}/>Focus</Button><Button variant="outline" className={`secondary-action ${state.ghost?'active':''}`} onClick={()=>setState(s=>({...s,ghost:!state.ghost,isolate:false}))}><Layers3 size={16}/>{state.ghost?'Ghost':'Solid'}</Button><Button variant="outline" className="secondary-action" onClick={hideSelected}><EyeOff size={16}/>Hide structure</Button><Button variant="outline" className={`secondary-action ${state.isolate?'active':''}`} onClick={()=>setState(s=>({...s,isolate:!state.isolate,explode:0}))}>{state.isolate?'Show all':'Isolate'}</Button><Button variant="ghost" className="secondary-action" onClick={()=>{setState(s=>({...s,selected:[],isolate:false,ghost:false}));setDetails(false);}}>Clear</Button></div></SheetContent></Sheet>
  <Sheet open={about} onOpenChange={setAbout}><SheetContent className="about-sheet glass"><div className="eyebrow">USER GUIDE & REFERENCE</div><SheetTitle className="structure-title">3D 인체 해부학 학습 가이드</SheetTitle><SheetDescription>한국 의대생의 내신 골학/땡시 및 KMLE(의사국가고시) 대비를 위한 상호작용형 3D 아틀라스입니다.</SheetDescription><div className="about-copy"><h3>기본 조작 방법 (Controls)</h3><p><b>• 1회 클릭 (Single Tap)</b>: 구조물 선택 및 상세 정보 확인<br/><b>• 더블 클릭 (Double Tap)</b>: 해당 구조물로 부드럽게 시점 이동 (Fly-to) 및 회전 중심축 재설정<br/><b>• 좌클릭 드래그</b>: 인체 360° 오빗(Orbit) 회전<br/><b>• 마우스 휠 / 핀치</b>: 시점 확대 및 축소 (Zoom)<br/><b>• 뷰 버튼 (¾, F, S, B)</b>: 쿼터뷰 / 정면(Front) / 측면(Side) / 후면(Back) 즉시 정렬</p><h3>핵심 학습 도구 (Study Tools)</h3><p><b>• Focus (시점 집중 - 단축키 F)</b>: 현재 시야각을 유지하며 선택된 신경·혈관·근육의 중심 위치로 줌인합니다.<br/><b>• Ghost (반투명 X-Ray - 단축키 G)</b>: 선택한 구조물만 선명하게 강조하고 주변 뼈와 근육을 은은한 반투명으로 유지하여 <b>주행 경로(Course)와 공간적 상관관계</b>를 관찰합니다.<br/><b>• Hide (숨기기 박리 - 단축키 H)</b>: 겉을 가리는 표재성 뼈나 근육을 숨겨 그 안쪽의 심부 혈관/신경을 노출합니다.<br/><b>• Undo (되돌리기 - 단축키 U)</b>: 숨긴 구조물을 순차적으로 다시 복원합니다.<br/><b>• Isolate (단독 관찰 - 단축키 I)</b>: 주변 구조를 숨기고 선택한 부위만 단독으로 면밀히 관찰합니다.</p><h3>단축키 요약 (Keyboard Shortcuts)</h3><p><b>• <code>F</code></b>: 선택 구조물로 포커스 줌인<br/><b>• <code>H</code></b>: 선택 구조물 숨기기 (Dissection)<br/><b>• <code>U</code></b>: 숨긴 구조물 되돌리기 (Undo)<br/><b>• <code>G</code></b>: Ghost 반투명 모드 토글<br/><b>• <code>I</code></b>: Isolate 단독 관찰 모드 토글<br/><b>• <code>/</code></b>: 해부학 검색창 열기<br/><b>• <code>Esc</code></b>: 선택 해제 및 패널 닫기</p><h3>데이터셋 출처 (Attribution)</h3><p><b>BodyParts3D 4.0 (성인 남성 표준 참조 모델)</b><br/>총 2,234개 개별 3D 메쉬 및 3,432개 해부학 개념 인덱싱.<br/>© The Database Center for Life Science (DBCLS), 일본 국립 바이오사이언스 DB 센터(NBDC) 라이선스 (CC BY 4.0).</p><a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html" target="_blank" rel="noreferrer">데이터셋 라이선스 정책 <ArrowUpRight size={14}/></a><a href="https://academic.oup.com/nar/article/37/suppl_1/D782/1000752" target="_blank" rel="noreferrer">공식 학술 논문 보기 <ArrowUpRight size={14}/></a></div></SheetContent></Sheet>
 </main>;
}
