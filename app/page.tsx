import { visibleParts, hideSelection } from './visibility';
import { flushSync } from 'react-dom';
import { registerAtlasTools } from './agent-tools';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, EyeOff, Focus, Info, Layers3, Pause, RotateCcw, RotateCw, Search, Undo2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import AnatomyScene from './scene';
import { DEFAULT_VISIBLE, SYSTEMS, EXPLANATIONS, explanation, mergeAtlasPack, type Atlas, type Concept, type SceneState, type SystemId, type View } from './anatomy';
import { getDisplayName, getHanjaName, matchesSearchTerm, getKoreanTerms } from './korean-anatomy';
import { buildCompositeConcepts } from './composite-concepts';
import { REGIONS, getRegionPartIds, type RegionId, type SubregionId } from './regional-anatomy';
import { CLINICAL_SPACES, getSpacePartIds, type ClinicalSpace } from './spaces';
import { ANATOMICAL_RELATIONSHIPS, getRelationshipsForConcept, type AnatomicalRelationship } from './relationships';

const initial: SceneState = { explode: 0, visible: DEFAULT_VISIBLE, selected: [], isolate: false, isolatedPartIds: [], view: 'three-quarter', rotate: false, reset: 0, ghost: false, hidden: [] };

const FEATURED_ORGANS: { name: string; label: string; color: string }[] = [
  { name: 'heart', label: 'Heart (심장)', color: '#b96760' },
  { name: 'brain', label: 'Brain (뇌)', color: '#d8b565' },
  { name: 'liver', label: 'Liver (간)', color: '#b8916b' },
  { name: 'stomach', label: 'Stomach (위)', color: '#b8916b' },
  { name: 'kidney', label: 'Kidneys (콩팥)', color: '#b47961' },
  { name: 'right lung', label: 'Right lung (오른허파)', color: '#b98991' },
  { name: 'left lung', label: 'Left lung (왼허파)', color: '#b98991' },
  { name: 'pancreas', label: 'Pancreas (이자)', color: '#b8916b' },
  { name: 'spleen', label: 'Spleen (지라)', color: '#879f7c' },
  { name: 'gallbladder', label: 'Gallbladder (쓸개)', color: '#b8916b' },
  { name: 'urinary bladder', label: 'Urinary bladder (방광)', color: '#b47961' },
  { name: 'trachea', label: 'Trachea (기관)', color: '#b98991' },
];

const CAMERA_VIEWS: { id: View; label: string; title: string }[] = [
  { id: 'three-quarter', label: '사선', title: '사선 보기' },
  { id: 'front', label: '앞', title: '앞면 보기' },
  { id: 'side', label: '옆', title: '옆면 보기' },
  { id: 'back', label: '뒤', title: '뒷면 보기' },
];

export default function Home() {
  const detailTitle = useRef<HTMLHeadingElement>(null);
  const [atlas, setAtlas] = useState<Atlas | null>(null), [state, setState] = useState(initial), [progress, setProgress] = useState(0), [error, setError] = useState(''), [panel, setPanel] = useState<'layers' | 'search' | null>(null), [details, setDetails] = useState(false), [about, setAbout] = useState(false), [query, setQuery] = useState(''), [chosen, setChosen] = useState<Concept | null>(null), [showQuickPicks, setShowQuickPicks] = useState(true), [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [hideHistory, setHideHistory] = useState<SceneState[]>([]);
  const [detailExpanded, setDetailExpanded] = useState(false);
  const [matchedQuery, setMatchedQuery] = useState('');
  const [layerTab, setLayerTab] = useState<'systems' | 'regions' | 'spaces'>('systems');
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>(null);
  const [selectedSubregion, setSelectedSubregion] = useState<SubregionId | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<ClinicalSpace | null>(null);
  const [spaceFilter, setSpaceFilter] = useState<'all' | 'boundaries' | 'contents'>('all');
  const [spaceSearch, setSpaceSearch] = useState('');
  const [collapsedRegions, setCollapsedRegions] = useState<Record<string, boolean>>({});
  const [summaryExpanded, setSummaryExpanded] = useState(true);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  useEffect(() => { const abort = new AbortController(); setProgress(0); setError(''); setAtlas(null); setChosen(null); setDetails(false); setState({ ...initial, visible: DEFAULT_VISIBLE }); const load=async()=>{const read=async(url:string)=>{const response=await fetch(url,{signal:abort.signal});if(!response.ok)throw new Error('The anatomy catalogue could not be loaded.');return response.json() as Promise<Atlas>;};const base=await read('/models/atlas.json');const pilotDisabled=new URLSearchParams(window.location.search).get('pilot')==='off';const data=pilotDisabled?base:mergeAtlasPack(base,await read('/models/open3d-upper-limb-pilot.json'));setAtlas(data);};void load().catch(e=>{if(e.name!=='AbortError')setError(e.message);});return()=>abort.abort();},[]);
  const hideSelected = () => {
    if (!state.selected.length) return;
    setHideHistory(history => [...history.slice(-29), state]);
    setState(hideSelection(state));
    setDetails(false);
  };
  const undoHide = () => {
    const previous = hideHistory.at(-1);
    if (!previous) return;
    setState(s => ({ ...previous, focusTargetIds: previous.selected, focusNonce: (s.focusNonce ?? 0) + 1 }));
    const concept = allConcepts.find(c => c.elements.length === previous.selected.length && c.elements.every(id => previous.selected.includes(id)));
    const part = atlas?.parts.find(p => p.id === previous.selected[0]);
    setChosen(concept ?? (part ? { id: part.id, name: part.name, elements: previous.selected } : null));
    setMatchedQuery('');
    setHideHistory(history => history.slice(0, -1));
    setPanel(null); setLeftPanelOpen(false); setDetails(true); setDetailExpanded(false);
  };
  const resetHidden = () => { setHideHistory([]); setState(s => ({ ...s, hidden: [] })); };
  const toggleIsolate = () => {
    setState(s => {
      const willIsolate = !s.isolate;
      if (willIsolate) {
        const partsToIsolate = s.selected.length > 0 ? s.selected : (s.isolatedPartIds ?? []);
        return { ...s, isolate: true, isolatedPartIds: partsToIsolate, explode: 0 };
      } else {
        return { ...s, isolate: false, isolatedPartIds: [], explode: 0 };
      }
    });
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      if (e.key === '/') { e.preventDefault(); setPanel('search'); setDetails(false); setLeftPanelOpen(false); }
      else if (e.key === 'Escape') { setPanel(null); setDetails(false); setState(s => ({ ...s, selected: [], isolate: false, isolatedPartIds: [], ghost: false, focusTargetIds: undefined })); }
      else if (key === 'f' && state.selected.length > 0) { e.preventDefault(); setState(s => ({ ...s, focusNonce: (s.focusNonce ?? 0) + 1 })); }
      else if (key === 'h' && state.selected.length > 0) { e.preventDefault(); hideSelected(); }
      else if (key === 'u' && hideHistory.length > 0) { e.preventDefault(); undoHide(); }
      else if (key === 'g' && state.selected.length > 0) { e.preventDefault(); setState(s => ({ ...s, ghost: !s.ghost, isolate: false, isolatedPartIds: [] })); }
      else if (key === 'i' && (state.selected.length > 0 || state.isolate)) { e.preventDefault(); toggleIsolate(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, hideHistory, atlas]);
  const parts = useMemo(() => new Map(atlas?.parts.map(p => [p.id, p])), [atlas]);
  const counts = useMemo(() => Object.fromEntries(SYSTEMS.map(s => [s.id, atlas?.parts.filter(p => p.system === s.id).length ?? 0])), [atlas]);
  const activeSystems = SYSTEMS.filter(s => counts[s.id] > 0);
  const selectedParts = state.selected.map(id => parts.get(id)).filter(p => !!p), selected = selectedParts[0], system = SYSTEMS.find(s => s.id === selected?.system);
  const visibleCount = visibleParts(atlas?.parts ?? [], state).length;
  const compositeConcepts = useMemo(() => {
    if (!atlas) return [];
    return buildCompositeConcepts(atlas);
  }, [atlas]);
  const allConcepts = useMemo(() => {
    if (!atlas) return [];
    return [...compositeConcepts, ...atlas.concepts];
  }, [atlas, compositeConcepts]);
  const results = useMemo(() => {
    if (!atlas) return [];
    const term = query.toLowerCase().trim();
    if (!term) return [];
    const matchedConcepts = allConcepts.filter(c => matchesSearchTerm(c.name, term) || c.id.toLowerCase().includes(term));
    const conceptNames = new Set(allConcepts.map(c => c.name.toLowerCase())), matchedParts: Concept[] = [];
    atlas.parts.forEach(p => { if (!conceptNames.has(p.name.toLowerCase()) && (matchesSearchTerm(p.name, term) || p.id.toLowerCase().includes(term))) { matchedParts.push({ id: p.id, name: p.name, elements: [p.id] }); } });
    return [...matchedConcepts, ...matchedParts].sort((a, b) => {
      const aExact = a.name.toLowerCase() === term || getKoreanTerms(a.name)?.koreanName === term || getKoreanTerms(a.name)?.hanjaName === term;
      const bExact = b.name.toLowerCase() === term || getKoreanTerms(b.name)?.koreanName === term || getKoreanTerms(b.name)?.hanjaName === term;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      const aIsComposite = a.id.startsWith('COMPOSITE_');
      const bIsComposite = b.id.startsWith('COMPOSITE_');
      if (aIsComposite && !bIsComposite) return -1;
      if (!aIsComposite && bIsComposite) return 1;
      return a.name.length - b.name.length;
    }).slice(0, 80);
  }, [atlas, allConcepts, query]);
  const choose = (c: Concept, searchTerm = '') => {
    setChosen(c);
    setMatchedQuery(/[가-힣]/.test(searchTerm) ? searchTerm.trim() : '');
    setState(s => ({ ...s, selected: c.elements, hidden: (s.hidden ?? []).filter(id => !c.elements.includes(id)),
      isolate: false, isolatedPartIds: [], ghost: true, explode: 0, rotate: false,
      focusTargetIds: c.elements, focusNonce: (s.focusNonce ?? 0) + 1 }));
    setDetails(true); setDetailExpanded(false); setPanel(null); setLeftPanelOpen(false);
  };
  const chooseFeatured = (organName: string) => {
    const c = allConcepts.find(x => x.name.toLowerCase() === organName);
    if (c) choose(c);
  };
  useEffect(() => { if (!atlas) return; return registerAtlasTools(atlas, c => flushSync(() => choose(c))); }, [atlas]);
  const choosePart = (id: string | null, isDouble = false) => {
    if (!id) {
      setChosen(null);
      setDetails(false);
      setState(s => ({ ...s, selected: [], ghost: false }));
      return;
    }
    setMatchedQuery(''); setDetailExpanded(false); setLeftPanelOpen(false);
    const p = parts.get(id);
    if (!p) return;
    setChosen({ id: p.conceptId, name: p.name, elements: [id] });
    setState(s => {
      const keepIsolate = s.isolate && (s.isolatedPartIds?.length ?? 0) > 0;
      return {
        ...s,
        selected: [id],
        focusTargetIds: [id],
        isolate: keepIsolate,
        isolatedPartIds: keepIsolate ? s.isolatedPartIds : [],
        rotate: false,
        focusNonce: (s.focusNonce ?? 0) + 1
      };
    });
    setDetails(true); setDetailExpanded(false); setLeftPanelOpen(false);
    setPanel(null);
  };
  const toggle = (id: SystemId) => { setHideHistory([]); setDetails(false); setState(s => ({ ...s, selected: [], isolate: false, visible: s.visible.includes(id) ? s.visible.filter(x => x !== id) : [...s.visible, id] })); };
  const reset = () => { setHideHistory([]); setSelectedRegion(null); setSelectedSubregion(null); setSelectedSpace(null); setState(s => ({ ...initial, visible: DEFAULT_VISIBLE, reset: s.reset + 1, hidden: [], focusTargetIds: undefined })); setChosen(null); setDetails(false); setPanel(null); };
  const toggleLeftPanel = () => { const open = panel !== 'layers'; setLeftPanelOpen(open); setPanel(open ? 'layers' : null); setDetails(false); };
  const openPanel = (next: 'layers' | 'search') => { setDetails(false); setLeftPanelOpen(false); setPanel(p => p === next ? null : next); };
  const openLayerTab = (tab: 'systems' | 'regions' | 'spaces') => {
    const shouldClose = panel === 'layers' && layerTab === tab;
    setLayerTab(tab);
    setDetails(false);
    setLeftPanelOpen(false);
    setPanel(shouldClose ? null : 'layers');
  };

  const handleSelectRegion = (regionId: RegionId) => {
    setHideHistory([]);
    if (!atlas) return;
    setSelectedRegion(regionId);
    setSelectedSubregion(null);
    const partIds = getRegionPartIds(atlas, regionId);
    const partIdSet = new Set(partIds);
    const newlyHidden = atlas.parts.filter(p => !partIdSet.has(p.id)).map(p => p.id);
    setState(s => ({ ...s, hidden: newlyHidden, selected: [], focusTargetIds: partIds, focusNonce: (s.focusNonce ?? 0) + 1, isolate: false }));
    setDetails(false); setPanel(null); setLeftPanelOpen(false);
  };

  const handleSelectSubregion = (regionId: RegionId, subId: SubregionId) => {
    setHideHistory([]);
    if (!atlas) return;
    setSelectedRegion(regionId);
    setSelectedSubregion(subId);
    const partIds = getRegionPartIds(atlas, regionId, subId);
    const partIdSet = new Set(partIds);
    const newlyHidden = atlas.parts.filter(p => !partIdSet.has(p.id)).map(p => p.id);
    setState(s => ({ ...s, hidden: newlyHidden, selected: [], focusTargetIds: partIds, focusNonce: (s.focusNonce ?? 0) + 1, isolate: false }));
    setDetails(false); setPanel(null); setLeftPanelOpen(false);
  };

  const handleResetToWholeBody = () => {
    setHideHistory([]);
    setSelectedRegion(null);
    setSelectedSubregion(null);
    setSelectedSpace(null);
    setState(s => ({ ...s, hidden: [], selected: [], isolate: false, isolatedPartIds: [], ghost: false, focusTargetIds: undefined, reset: s.reset + 1 }));
    setDetails(false);
  };

  const handleSelectSpace = (space: ClinicalSpace, filter: 'all' | 'boundaries' | 'contents' = 'all') => {
    setHideHistory([]);
    if (!atlas) return;
    setSelectedSpace(space);
    setSpaceFilter(filter);
    const partIds = getSpacePartIds(atlas, space.id, filter);
    const partIdSet = new Set(partIds);

    const targetSystems = new Set(state.visible);
    for (const pid of partIds) {
      const p = parts.get(pid);
      if (p && p.system) targetSystems.add(p.system);
    }

    const boundaryPartIds = getSpacePartIds(atlas, space.id, 'boundaries');
    const focusIds = boundaryPartIds.length > 0 ? boundaryPartIds : partIds;

    const newlyHidden = atlas.parts.filter(p => !partIdSet.has(p.id)).map(p => p.id);
    setState(s => ({
      ...s,
      visible: Array.from(targetSystems),
      hidden: newlyHidden,
      selected: [],
      focusTargetIds: focusIds.length > 0 ? focusIds : undefined,
      focusNonce: (s.focusNonce ?? 0) + 1,
      isolate: false,
      ghost: filter === 'boundaries'
    }));
    setDetails(false);
  };

  const handleSpaceFilterChange = (filter: 'all' | 'boundaries' | 'contents') => {
    if (!selectedSpace || !atlas) return;
    handleSelectSpace(selectedSpace, filter);
  };

  const getKeywordMatchingParts = (keywords: string[]) => {
    if (!atlas || keywords.length === 0) return [];
    const cleanKws = keywords.map(k => k.toLowerCase().trim()).filter(Boolean);
    const matched: string[] = [];
    for (const part of atlas.parts) {
      const pName = part.name.toLowerCase();
      if (cleanKws.some(kw => pName.includes(kw))) {
        matched.push(part.id);
      }
    }
    return matched;
  };

  const handleSelectKeywords = (keywords: string[], label?: string) => {
    if (!atlas || keywords.length === 0) return;
    const partIds = getKeywordMatchingParts(keywords);
    if (partIds.length === 0) return;

    const targetSystems = new Set(state.visible);
    for (const pid of partIds) {
      const p = parts.get(pid);
      if (p && p.system) targetSystems.add(p.system);
    }

    const firstPart = parts.get(partIds[0]);
    setChosen({
      id: label ?? (firstPart ? firstPart.name : 'Structure'),
      name: label ?? (firstPart ? firstPart.name : 'Structure'),
      elements: partIds,
    });
    setState(s => ({
      ...s,
      visible: Array.from(targetSystems),
      selected: partIds,
      hidden: (s.hidden ?? []).filter(id => !partIds.includes(id)),
      ghost: true,
      isolate: false,
      focusTargetIds: partIds,
      focusNonce: (s.focusNonce ?? 0) + 1,
    }));
    setDetails(true); setDetailExpanded(false); setLeftPanelOpen(false);
    setPanel(null);
  };

  const handleNavigateToConcept = (targetName: string) => {
    if (!atlas) return;
    const q = targetName.toLowerCase();
    const c = allConcepts.find(x => x.name.toLowerCase().includes(q) || q.includes(x.name.toLowerCase()));
    if (c) choose(c);
  };

  const activeRegionObj = REGIONS.find(r => r.id === selectedRegion);

  return <main className={`studio ${panel ? `panel-open panel-${panel}` : ''} ${details ? 'details-open' : ''}`}>
    {atlas && <AnatomyScene atlas={atlas} state={{ ...state, inspectorOpen: details && selectedParts.length > 0 }} onSelect={choosePart} onProgress={n => { setProgress(n); if (n === 100) setError(''); }} onError={setError} />}
    <div className="vignette" />
    <header className="identity"><div className="eyebrow"><span className="status-dot" /> INTERACTIVE ANATOMY</div><h1>Human Atlas<Badge variant="outline" className="edition">3D</Badge></h1><div className="identity-meta">{atlas ? atlas.parts.length.toLocaleString() : '2,234'} modeled pieces <span>·</span> {atlas?.source??'BodyParts3D'}</div></header>
    <nav className="top-actions" aria-label="Explorer panels">
      <Button variant="ghost" className={`icon-button desktop-layers-trigger ${leftPanelOpen ? 'active' : ''}`} aria-label="Toggle system layers" title="좌측 패널 접기/펼치기 (Toggle Sidebar)" onClick={toggleLeftPanel}><Layers3 size={18} /></Button>
      <Button variant="ghost" className={`desktop-search-trigger ${panel === 'search' ? 'active' : ''}`} onClick={() => openPanel('search')} aria-label="Search anatomy"><Search size={18} /><span>구조·용어 검색</span><kbd>/</kbd></Button>
      <Button variant="ghost" className="icon-button" aria-label="About this atlas" title="학습 가이드 & PWA 안내" onClick={() => { setDetails(false); setPanel(null); setAbout(true); }}><Info size={18} /></Button>
    </nav>
    <nav className="mobile-explorer glass" aria-label="빠른 해부 탐색">
      <Button variant="ghost" className={panel === 'search' ? 'active' : ''} aria-pressed={panel === 'search'} onClick={() => openPanel('search')}><Search size={15} /><span>검색</span></Button>
      <Button variant="ghost" className={panel === 'layers' && layerTab === 'systems' ? 'active' : ''} aria-pressed={panel === 'layers' && layerTab === 'systems'} onClick={() => openLayerTab('systems')}>계통</Button>
      <Button variant="ghost" className={panel === 'layers' && layerTab === 'regions' ? 'active' : ''} aria-pressed={panel === 'layers' && layerTab === 'regions'} onClick={() => openLayerTab('regions')}>부위</Button>
      <Button variant="ghost" className={panel === 'layers' && layerTab === 'spaces' ? 'active' : ''} aria-pressed={panel === 'layers' && layerTab === 'spaces'} onClick={() => openLayerTab('spaces')}>임상공간</Button>
    </nav>
    <section className={`layers-panel glass ${panel === 'layers' ? 'mobile-open' : ''} ${!leftPanelOpen ? 'desktop-hidden' : ''}`} aria-label="Anatomical layers">
      <div className="panel-heading">
        <div className="panel-tab-group">
          <button type="button" className={`panel-tab ${layerTab === 'systems' ? 'active' : ''}`} onClick={() => setLayerTab('systems')}>계통</button>
          <button type="button" className={`panel-tab ${layerTab === 'regions' ? 'active' : ''}`} onClick={() => setLayerTab('regions')}>부위</button>
          <button type="button" className={`panel-tab ${layerTab === 'spaces' ? 'active' : ''}`} onClick={() => setLayerTab('spaces')}>임상공간</button>
        </div>
        <Button variant="ghost" className="mobile-only icon-button" onClick={() => setPanel(null)} aria-label="Close panel"><X size={18} /></Button>
      </div>

      {layerTab === 'systems' ? (
        <>
          <div className="layer-presets"><Button variant="ghost" aria-pressed={activeSystems.every(x => state.visible.includes(x.id))} onClick={() => setState(s => ({ ...s, selected: [], isolate: false, visible: activeSystems.map(x => x.id) }))}>All</Button><Button variant="ghost" aria-pressed={state.visible.length === 1 && state.visible[0] === 'skeletal'} onClick={() => setState(s => ({ ...s, selected: [], isolate: false, visible: ['skeletal'] }))}>Skeleton</Button><Button variant="ghost" aria-pressed={state.visible.length === 6 && ['cardiac', 'respiratory', 'digestive', 'urinary', 'endocrine', 'reproductive'].every(id => state.visible.includes(id as SystemId))} onClick={() => setState(s => ({ ...s, selected: [], isolate: false, visible: ['cardiac', 'respiratory', 'digestive', 'urinary', 'endocrine', 'reproductive'] }))}>Organs</Button></div>
          <div className="system-list">{activeSystems.map(s => <div className={`system-row ${state.visible.includes(s.id) ? 'enabled' : ''}`} key={s.id}><Button variant="ghost" className="system-name" title={`${s.name} 표시 / 숨기기`} onClick={() => toggle(s.id)}><span className="system-dot" style={{ background: s.color }} />{s.name}<span className="system-count">{counts[s.id]}</span></Button><Button variant="ghost" className="system-isolate" aria-label={`${s.name}만 보기`} title={`${s.name}만 보기`} onClick={() => { setHideHistory([]); setState(v => ({ ...v, visible: [s.id], selected: [], isolate: false, isolatedPartIds: [], ghost: false })); }}><Focus size={14} /></Button><Switch checked={state.visible.includes(s.id)} onCheckedChange={() => toggle(s.id)} aria-label={`Show ${s.name.toLowerCase()}`} /></div>)}</div>
          <div className="panel-foot"><Button variant="ghost" onClick={reset}>전체 초기화</Button><span>{visibleCount.toLocaleString()}개 표시</span><Button variant="ghost" onClick={() => setState(s => ({ ...s, visible: [], selected: [], isolate: false }))}>모두 숨기기</Button></div>
        </>
      ) : layerTab === 'regions' ? (
        <div className="regions-container">
          {!selectedRegion ? (
            <div className="regions-grid">
              {REGIONS.map(reg => (
                <button key={reg.id} type="button" className="region-card" onClick={() => handleSelectRegion(reg.id)}>
                  <span className="region-card-icon">{reg.icon}</span>
                  <span className="region-name-en">{reg.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="subregion-view">
              <div className="region-sub-header">
                <Button variant="ghost" className="subregion-back-btn" onClick={() => { setSelectedRegion(null); setSelectedSubregion(null); handleResetToWholeBody(); }}>
                  <ChevronLeft size={16} /> <span>All Regions</span>
                </Button>
                <div className="current-region-badge">
                  <span className="region-header-icon">{activeRegionObj?.icon}</span>
                  <strong>{activeRegionObj?.name}</strong>
                </div>
                <Button variant="outline" className={`subregion-all-btn ${selectedSubregion === null ? 'active' : ''}`} onClick={() => handleSelectRegion(selectedRegion)}>
                  <span>All {activeRegionObj?.name} ({atlas ? getRegionPartIds(atlas, selectedRegion).length : 0} pieces)</span>
                </Button>
              </div>
              <div className="subregion-list">
                {activeRegionObj?.subregions.map(sub => {
                  const isSubActive = selectedSubregion === sub.id;
                  const subCount = atlas ? getRegionPartIds(atlas, selectedRegion, sub.id).length : 0;
                  return (
                    <button key={sub.id} type="button" className={`subregion-row ${isSubActive ? 'active' : ''}`} onClick={() => handleSelectSubregion(selectedRegion, sub.id)}>
                      <span className="subregion-name">{sub.name}</span>
                      <span className="subregion-count">{subCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="spaces-container">
          {!selectedSpace ? (
            <>
              <div className="spaces-search-box">
                <Search size={13} style={{ color: '#7b8a97', flexShrink: 0 }} />
                <input
                  value={spaceSearch}
                  onChange={e => setSpaceSearch(e.target.value)}
                  placeholder="Search spaces (carpal, fossa, triangle...)"
                  aria-label="Search clinical spaces"
                />
                {spaceSearch && <Button variant="ghost" className="search-clear-btn" onClick={() => setSpaceSearch('')}><X size={12} /></Button>}
              </div>
              <div className="spaces-toolbar">
                <span className="spaces-toolbar-count">{CLINICAL_SPACES.length} Clinical Spaces</span>
                <button
                  type="button"
                  className="spaces-collapse-all-btn"
                  onClick={() => {
                    const allCollapsed = REGIONS.every(r => collapsedRegions[r.id]);
                    const nextState: Record<string, boolean> = {};
                    REGIONS.forEach(r => { nextState[r.id] = !allCollapsed; });
                    setCollapsedRegions(nextState);
                  }}
                >
                  {REGIONS.every(r => collapsedRegions[r.id]) ? 'Expand all' : 'Collapse all'}
                </button>
              </div>
              <div className="spaces-list">
                {REGIONS.map(reg => {
                  const spacesInRegion = CLINICAL_SPACES.filter(s => {
                    if (s.regionId !== reg.id) return false;
                    if (!spaceSearch.trim()) return true;
                    const q = spaceSearch.toLowerCase().trim();
                    return s.name.toLowerCase().includes(q) || s.koreanName.includes(q);
                  });
                  if (spacesInRegion.length === 0) return null;
                  const isCollapsed = !spaceSearch && collapsedRegions[reg.id];

                  return (
                    <div key={reg.id} className="space-region-group">
                      <button
                        type="button"
                        className="space-region-header"
                        onClick={() => setCollapsedRegions(prev => ({ ...prev, [reg.id]: !prev[reg.id] }))}
                      >
                        <div className="space-region-title">
                          <span>{reg.icon}</span>
                          <span>{reg.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span className="space-region-count">{spacesInRegion.length}</span>
                          {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                        </div>
                      </button>
                      {!isCollapsed && (
                        <div className="space-region-items">
                          {spacesInRegion.map(space => (
                            <button key={space.id} type="button" className="space-card" onClick={() => handleSelectSpace(space, 'all')}>
                              <div className="space-card-name">{space.name}</div>
                              <div className="space-card-korean">{space.koreanName}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="space-detail-view">
              <Button variant="ghost" className="space-back-btn" onClick={() => { setSelectedSpace(null); handleResetToWholeBody(); }}>
                <ChevronLeft size={16} /> <span>All Clinical Spaces</span>
              </Button>
              <div className="space-header">
                <div className="space-header-title">
                  <strong>{selectedSpace.name}</strong>
                </div>
                <span className="space-card-korean">{selectedSpace.koreanName}</span>
              </div>
              <div className="space-summary-box">
                <div className="space-summary-header" onClick={() => setSummaryExpanded(v => !v)}>
                  <span>Summary</span>
                  <span>{summaryExpanded ? '접기' : '펼치기'}</span>
                </div>
                {summaryExpanded && <p className="space-summary-text">{selectedSpace.summary}</p>}
              </div>
              <div className="space-filter-bar" role="group" aria-label="Space layer filter">
                <button type="button" className={`space-filter-btn ${spaceFilter === 'all' ? 'active' : ''}`} onClick={() => handleSpaceFilterChange('all')}>All</button>
                <button type="button" className={`space-filter-btn ${spaceFilter === 'boundaries' ? 'active' : ''}`} onClick={() => handleSpaceFilterChange('boundaries')}>Boundaries</button>
                <button type="button" className={`space-filter-btn ${spaceFilter === 'contents' ? 'active' : ''}`} onClick={() => handleSpaceFilterChange('contents')}>Contents</button>
              </div>
              <div className="space-section">
                <div className="space-section-title"><span>Boundaries</span></div>
                <div className="space-item-list">
                  {selectedSpace.boundaries.map((b, i) => {
                    const matchIds = getKeywordMatchingParts(b.keywords);
                    const isAvailable = matchIds.length > 0;
                    return (
                      <div
                        key={i}
                        className={`space-item-row ${!isAvailable ? 'disabled' : ''}`}
                        onClick={isAvailable ? () => handleSelectKeywords(b.keywords, b.label) : undefined}
                        title={isAvailable ? `Click to inspect all ${matchIds.length} parts in 3D` : 'Structure not modeled in 3D'}
                      >
                        <span className="space-item-name">
                          {b.label}
                          {!isAvailable && <span className="space-item-unmodeled">(Unmodeled)</span>}
                        </span>
                        <span className="space-item-type">{b.type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="space-section">
                <div className="space-section-title"><span>Contents</span></div>
                <div className="space-item-list">
                  {selectedSpace.contents.map((c, i) => {
                    const matchIds = getKeywordMatchingParts(c.keywords);
                    const isAvailable = matchIds.length > 0 && c.category !== 'lymph';
                    return (
                      <div
                        key={i}
                        className={`space-item-row ${!isAvailable ? 'disabled' : ''}`}
                        onClick={isAvailable ? () => handleSelectKeywords(c.keywords, c.label) : undefined}
                        title={isAvailable ? `Click to inspect all ${matchIds.length} parts in 3D` : 'Structure not modeled in 3D'}
                      >
                        <span className="space-item-name">
                          {c.label}
                          {!isAvailable && <span className="space-item-unmodeled">(Unmodeled)</span>}
                        </span>
                        <span className="space-item-type">{c.category}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {selectedSpace.clinicalPoints.length > 0 && (
                <div className="space-section">
                  <div className="space-section-title"><span>🩺 KMLE High-Yield Points</span></div>
                  {selectedSpace.clinicalPoints.map((cp, i) => (
                    <div key={i} className="clinical-point-card">
                      <span className="clinical-point-title">{cp.title}</span>
                      <span className="clinical-point-desc">{cp.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
    {panel === 'search' && <section className="search-panel glass" aria-label="Find anatomy">
      <div className="panel-heading"><span>구조·용어 검색</span><Button variant="ghost" className="icon-button" onClick={() => setPanel(null)} aria-label="Close search"><X size={18} /></Button></div>
      <div className="search-input-box">
        <Search size={16} className="search-box-icon" />
        <input autoFocus value={query} onChange={e => { setQuery(e.target.value); setSelectedResultIndex(-1); }} onKeyDown={e => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedResultIndex(i => Math.min(i + 1, results.length - 1)); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedResultIndex(i => Math.max(i - 1, 0)); }
          else if (e.key === 'Enter' && results.length > 0) { e.preventDefault(); const idx = selectedResultIndex >= 0 ? selectedResultIndex : 0; choose(results[idx], query); }
          else if (e.key === 'Escape') { setPanel(null); }
        }} placeholder="넙다리뼈, 대퇴골, femur, 심장, heart…" aria-label="Search named anatomical structures" />
        {query && <Button variant="ghost" className="search-clear-btn" onClick={() => { setQuery(''); setSelectedResultIndex(-1); }} aria-label="Clear search"><X size={14} /></Button>}
      </div>
      {!query.trim() ? (
        <div className="quick-picks-section">
          <div className="quick-picks-header">
            <span>대표 장기 바로가기 (Featured Organs)</span>
            <Button variant="ghost" className="quick-toggle" onClick={() => setShowQuickPicks(v => !v)} aria-label={showQuickPicks ? '대표 장기 접기' : '대표 장기 펼치기'}>
              <span>{showQuickPicks ? '접기' : '펼치기'}</span>
              {showQuickPicks ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </Button>
          </div>
          {showQuickPicks && (
            <div className="quick-picks-grid">
              {FEATURED_ORGANS.map(organ => (
                <Button key={organ.name} variant="ghost" className="quick-pick-pill" onClick={() => chooseFeatured(organ.name)}>
                  <span className="quick-dot" style={{ background: organ.color }} />
                  <span>{organ.label}</span>
                </Button>
              ))}
            </div>
          )}
          <p className="search-note">영문(Femur), 신용어(넙다리뼈), 구용어(대퇴골) 중 편한 언어로 검색해 보세요.</p>
        </div>
      ) : (
        <div className="search-results-list" role="listbox">
          {results.length === 0 ? (
            <div className="search-empty">
              {query.toLowerCase().includes('radial') || query.toLowerCase().includes('sciatic') || query.toLowerCase().includes('median') || query.toLowerCase().includes('ulnar') || query.includes('요골') || query.includes('정중') || query.includes('척골') || query.includes('좌골')
                ? '말초신경(Radial/Median/Sciatic 등)은 BodyParts3D 원본에 미포함되어 있습니다. Optic nerve, Cranial nerve 등 뇌신경을 검색해 보세요.'
                : '일치하는 해부학 구조물이 없습니다.'}
            </div>
          ) : (
            results.map((c, i) => {
              const hanja = getHanjaName(c.name);
              return (
                <button key={c.id} type="button" className={`search-result-item ${i === selectedResultIndex ? 'selected' : ''}`} onClick={() => choose(c, query)}>
                  <div className="search-result-info">
                    <span className="search-result-name">{getDisplayName(c.name)}</span>
                    {hanja && <span className="search-result-hanja">구용어: {hanja}</span>}
                  </div>
                  <span className="small-number">{c.elements.length} {c.elements.length === 1 ? 'piece' : 'pieces'}</span>
                </button>
              );
            })
          )}
        </div>
      )}
    </section>}
    <nav className={`view-controls glass ${(details && selectedParts.length > 0) || panel === 'search' ? 'shifted' : ''}`} aria-label="Camera controls">{CAMERA_VIEWS.map(v => <Button variant="ghost" key={v.id} className={state.view === v.id ? 'active' : ''} aria-pressed={state.view === v.id} onClick={() => setState(s => ({ ...s, view: v.id, reset: s.reset + 1, rotate: false }))} title={v.title} aria-label={v.title}><span>{v.label}</span></Button>)}<i /><Button variant="ghost" aria-label={state.rotate ? '회전 멈춤' : '자동 회전'} title="자동 회전" className={state.rotate ? 'active' : ''} onClick={() => setState(s => ({ ...s, rotate: !state.rotate }))}>{state.rotate ? <Pause size={17} /> : <RotateCw size={18} />}</Button><Button variant="ghost" aria-label="카메라 원위치" title="카메라 원위치 (레이어 유지)" onClick={() => setState(s => ({ ...s, reset: s.reset + 1, view: 'three-quarter', rotate: false }))}><RotateCcw size={17} /></Button></nav>
    {((!details && state.selected.length > 0) || (state.hidden?.length ?? 0) > 0) && <div className="floating-dock glass" role="toolbar" aria-label="Dissection tools">{!details && state.selected.length > 0 && <><Button variant="ghost" onClick={() => setState(s => ({ ...s, focusTargetIds: s.selected, focusNonce: (s.focusNonce ?? 0) + 1 }))} title="Focus on structure (F)"><Focus size={15} /><span>확대 Focus</span><kbd>F</kbd></Button><Button variant="ghost" onClick={hideSelected} title="Hide structure (H)"><EyeOff size={15} /><span>숨기기</span><kbd>H</kbd></Button><Button variant="ghost" aria-pressed={!!state.ghost && !state.isolate} className={state.ghost && !state.isolate ? 'active' : ''} onClick={() => setState(s => ({ ...s, ghost: !s.ghost, isolate: false, isolatedPartIds: [], focusTargetIds: s.selected, focusNonce: (s.focusNonce ?? 0) + 1 }))} title="Toggle Ghost mode (G)"><Layers3 size={15} /><span>주변 반투명{state.ghost && !state.isolate ? ' · ON' : ''}</span><kbd>G</kbd></Button><Button variant="ghost" className={state.isolate ? 'active' : ''} onClick={toggleIsolate} title="Isolate structure (I)"><span>{state.isolate ? '주변 함께 보기' : '단독 보기 Isolate'}</span><kbd>I</kbd></Button></>}{(state.hidden?.length ?? 0) > 0 && <>{!details && state.selected.length > 0 && <i className="dock-sep" />}<Button variant="ghost" onClick={undoHide} disabled={!hideHistory.length} title="Undo hide (U)"><Undo2 size={15} /><span>숨기기 취소 ({hideHistory.length})</span><kbd>U</kbd></Button><Button variant="ghost" onClick={resetHidden} title="Unhide all structures"><span>숨김 복원</span></Button></>}</div>}
    <footer className="studio-footer"><span>드래그: 회전 · 휠/핀치: 확대 · 구조 선택: 상세 보기</span></footer>
    {progress < 100 && !error && <div className="loading glass" role="status"><Activity size={18} /><div><strong>3D 모델 불러오는 중</strong><span>{progress}% · Loading {atlas?.parts.length.toLocaleString() ?? '2,234'} pieces</span><div className="loading-track"><i style={{ width: `${progress}%` }} /></div></div></div>}
    {error && <div className="loading glass error" role="alert"><p>{error}</p><Button variant="ghost" onClick={() => location.reload()}>다시 불러오기</Button></div>}
    <Sheet open={details && selectedParts.length > 0} modal={false} disablePointerDismissal onOpenChange={setDetails}><SheetContent initialFocus={detailTitle} className={`detail-sheet glass ${state.isolate ? 'is-isolated' : ''} ${detailExpanded ? 'expanded' : 'compact'}`} showCloseButton={true}><div className="detail-header"><div className="detail-accent" style={{ background: system?.color }} /><div className="eyebrow">{system?.name ?? 'ANATOMY'}</div><SheetTitle ref={detailTitle} tabIndex={-1} className="structure-title">{chosen ? getDisplayName(chosen.name) : ''}</SheetTitle>{chosen && getHanjaName(chosen.name) && <div className="structure-tags"><Badge variant="outline" className="hanja-badge">구용어: {getHanjaName(chosen.name)}</Badge></div>}{matchedQuery && <p className="matched-query">검색한 용어: <strong>{matchedQuery}</strong></p>}<SheetDescription className="sr-only">Structure inspector</SheetDescription></div><Button variant="ghost" className="detail-expand" aria-expanded={detailExpanded} onClick={() => setDetailExpanded(v => !v)}>{detailExpanded ? '접기' : '도구 · 관계 펼치기'}</Button><div className="detail-actions"><Button className="primary-action" onClick={() => setState(s => ({ ...s, focusTargetIds: s.selected, focusNonce: (s.focusNonce ?? 0) + 1 }))}><Focus size={17} /><span>확대 Focus</span><kbd className="detail-kbd">F</kbd></Button><Button variant="outline" aria-pressed={!!state.ghost && !state.isolate} className={`secondary-action ${state.ghost && !state.isolate ? 'active' : ''}`} onClick={() => setState(s => ({ ...s, ghost: !s.ghost, isolate: false, isolatedPartIds: [], focusTargetIds: s.selected, focusNonce: (s.focusNonce ?? 0) + 1 }))} title="주변 구조물 반투명화 및 선택 부위 황금빛 강조 (단축키 G)"><Layers3 size={15} /><span>주변 반투명{state.ghost && !state.isolate ? ' · ON' : ''}</span><kbd className="detail-kbd">G</kbd></Button><Button variant="outline" className="secondary-action" onClick={hideSelected}><EyeOff size={15} /><span>숨기기 Hide</span><kbd className="detail-kbd">H</kbd></Button><Button variant="outline" aria-pressed={state.isolate} className={`secondary-action ${state.isolate ? 'active' : ''}`} onClick={toggleIsolate}><span>{state.isolate ? '주변 함께 보기' : '단독 보기 Isolate'}</span><kbd className="detail-kbd">I</kbd></Button><Button variant="ghost" className="secondary-action clear-action" onClick={() => { setState(s => ({ ...s, selected: [], isolate: false, isolatedPartIds: [], ghost: false })); setDetails(false); }}><span>선택 해제</span><kbd className="detail-kbd">Esc</kbd></Button></div>{chosen && (() => { const rels = getRelationshipsForConcept(chosen.name); if (rels.length === 0) return null; return (<div className="inspector-relationships"><div className="relationships-title">Anatomical Relationships ({rels.length})</div>{rels.map(rel => { const isSource = chosen.name.toLowerCase().includes(rel.sourceConcept); const peerName = isSource ? rel.targetLabel : rel.sourceLabel; const peerConcept = isSource ? rel.targetConcept : rel.sourceConcept; return (<button key={rel.id} type="button" className="relationship-chip" onClick={() => handleNavigateToConcept(peerConcept)} title={rel.clinicalNote ?? rel.relationshipLabel}><span className="rel-tag">{rel.relationshipLabel.replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, '')}</span><span className="rel-name">{peerName}</span></button>); })}</div>); })()}</SheetContent></Sheet>
    <Sheet open={about} onOpenChange={setAbout}><SheetContent className="about-sheet glass"><div className="eyebrow">USER GUIDE & REFERENCE</div><SheetTitle className="structure-title">3D 인체 해부학 가이드</SheetTitle><SheetDescription>골학·실습·KMLE(의사국가고시) 대비 고해상도 3D 인터랙티브 아틀라스</SheetDescription><div className="about-copy"><h3>🧭 3대 탐색 모드</h3><p>• <b>Systems (계통)</b>: 골격, 근육, 순환, 신경, 장기 등 8대 계통별 표시/숨김<br />• <b>Regions (부위)</b>: 7대 대분류 및 30개 세부 분과(Subregions) 원클릭 격리<br />• <b>Spaces (공간)</b>: 28개 임상 국소 공간(수근관, 서혜관, 종격 등) 경계(Boundaries) 및 내용물(Contents) 자동 포커싱 & 복합 구조물 동시 선택</p><h3>⚡ 핵심 조작 & 단축키</h3><p>• <b>기본 조작</b>: 드래그(360° 회전), 휠/핀치(줌), 더블클릭(포커스 이동)<br />• <b><code>F</code> (Focus)</b>: 선택 구조물 중심으로 정밀 줌인<br />• <b><code>H</code> (Hide) / <code>U</code> (Undo)</b>: 구조물 숨기기 / 되돌리기<br />• <b><code>G</code> (Ghost)</b>: 주변을 반투명화하고 선택 구조물을 황금빛 네온(Golden Glow)으로 투과 강조 (담도, 뇌신경, 심부 혈관 관찰 최적화)<br />• <b><code>I</code> (Isolate)</b>: 선택 부위만 단독 관찰<br />• <b><code>/</code> (Search)</b>: 한글(신·구용어) 및 영문 통합 검색<br />• <b><code>Esc</code></b>: 선택 해제 및 패널 닫기</p><h3>📱 iPad 전체화면 앱 (PWA)</h3><p>Safari 브라우저에서 <b>공유 버튼</b> ➔ <b>[홈 화면에 추가]</b>를 누르면 주소창 없는 120Hz ProMotion 전체화면 단독 앱으로 사용할 수 있습니다.</p><h3>📚 데이터셋 출처 (Attribution)</h3><p><b>BodyParts3D 4.0</b> (2,234개 3D 메쉬 및 3,432개 개념 인덱싱)<br />© The Database Center for Life Science (DBCLS), NBDC 라이선스 (CC BY 4.0).</p><a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html" target="_blank" rel="noreferrer">데이터셋 라이선스 정책 <ArrowUpRight size={14} /></a><a href="https://academic.oup.com/nar/article/37/suppl_1/D782/1000752" target="_blank" rel="noreferrer">공식 학술 논문 <ArrowUpRight size={14} /></a><h3>⚠️ 데이터셋 한계 및 미지원 안내</h3><p>BodyParts3D 공식 기준, 아직 데이터에 표현되지 않았거나 제작 중인 파트가 있어 다음 항목은 3D 표현 및 기능이 제한될 수 있습니다.<br />• <b>말초신경</b>: 일부 말초신경은 3D 분리/마스킹이 제한됩니다.<br />• <b>안면동맥 및 일부 세부 혈관</b>: 세부 혈관 분할(Segmentation)이 불완전할 수 있습니다.<br />• <b>작은 혈관·신경 가지</b>: 미세한 구조는 검색 또는 개별 선택이 제한될 수 있습니다.<br />• <b>세부 해부학적 구조</b>: BodyParts3D에 개별 mesh가 없는 경우 3D 모델이 제공되지 않습니다.<br />• ℹ️ <b>Compound(복합) 개념</b>: 일부 해부학 개념은 여러 3D 요소를 조합하여 표현합니다.<br />• ℹ️ <b>초미세 구조</b>: 독립 mesh가 있더라도 화면 배율에 따라 식별이 어려울 수 있습니다.</p></div></SheetContent></Sheet>
  </main>;
}
