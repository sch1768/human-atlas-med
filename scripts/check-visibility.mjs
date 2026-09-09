import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../app/visibility.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { visibleParts, hideSelection } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const atlas = JSON.parse(await readFile(new URL('../public/models/atlas.json', import.meta.url), 'utf8'));
const pancreas = atlas.concepts.find(c => c.name.toLowerCase() === 'pancreas')?.elements ?? atlas.parts.filter(p => p.name.toLowerCase().includes('pancreas')).map(p => p.id);
assert.ok(pancreas.length > 1, 'Use a real multi-mesh organ for regression coverage');
const state = { visible: [...new Set(atlas.parts.map(p => p.system))], selected: pancreas,
  hidden: [], isolate: false, isolatedPartIds: [], ghost: true, explode: 0, view: 'front', rotate: false, reset: 0 };
const before = visibleParts(atlas.parts, state).length;
const hidden = hideSelection(state);
assert.equal(visibleParts(atlas.parts, hidden).length, before - pancreas.length);
assert.deepEqual(state.hidden, [], 'Hide must not mutate the undo snapshot');
assert.deepEqual(state.selected, pancreas, 'Undo snapshot must retain the whole organ');
assert.equal(visibleParts(atlas.parts, state).length, before, 'Restoring one snapshot restores every mesh');
const isolated = { ...state, isolate: true, isolatedPartIds: pancreas };
assert.equal(visibleParts(atlas.parts, isolated).length, pancreas.length);
assert.equal(visibleParts(atlas.parts, hideSelection(isolated)).length, 0);
assert.equal(visibleParts(atlas.parts, { ...state, visible: [], hidden: pancreas }).length, 0,
  'Explicitly hidden parts override selection, including with all systems off');
assert.equal(visibleParts(atlas.parts, { ...state, visible: [] }).length, pancreas.length,
  'Search selection remains visible when its system is off');
assert.equal(new Set(hideSelection({ ...state, hidden: pancreas }).hidden).size, pancreas.length);
console.log(`Visibility regression checks passed (${pancreas.length}-mesh pancreas, ${atlas.parts.length} atlas parts).`);

