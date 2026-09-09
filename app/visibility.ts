import type { Part, SceneState } from './anatomy';

// Use the same visibility rules for the counter and the renderer.
export function visibleParts(parts: Part[], state: SceneState): Part[] {
  const hidden = new Set(state.hidden ?? []);
  const selected = new Set(state.selected);
  const systems = new Set(state.visible);
  const isolated = new Set(state.isolatedPartIds?.length ? state.isolatedPartIds : state.selected);
  return parts.filter(p => !hidden.has(p.id) && (state.isolate
    ? isolated.has(p.id) || selected.has(p.id)
    : systems.has(p.system) || selected.has(p.id)));
}

export function hideSelection(state: SceneState): SceneState {
  if (!state.selected.length) return state;
  return { ...state, hidden: [...new Set([...(state.hidden ?? []), ...state.selected])],
    selected: [], ghost: false };
}
