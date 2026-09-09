import fs from 'fs';

let hasError = false;

// 1. Relationships check
const relText = fs.readFileSync('./app/relationships.ts', 'utf8');
const relIds = [...relText.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const relIdSet = new Set();
for (const id of relIds) {
  if (relIdSet.has(id)) {
    console.error('ERROR: Duplicate relationship ID:', id);
    hasError = true;
  }
  relIdSet.add(id);
}

// Check semantic duplicate
const relObjRegex = /\{[^{}]*?id:\s*['"]([^'"]+)['"][^{}]*?sourceConcept:\s*['"]([^'"]+)['"][^{}]*?targetConcept:\s*['"]([^'"]+)['"][^{}]*?type:\s*['"]([^'"]+)['"][^{}]*?\}/gs;
const relPairs = {};
let rm;
while ((rm = relObjRegex.exec(relText)) !== null) {
  const [_, id, src, tgt, type] = rm;
  const key = `${src.trim()} -> ${tgt.trim()} [${type.trim()}]`;
  if (!relPairs[key]) relPairs[key] = [];
  relPairs[key].push(id);
}
for (const [k, ids] of Object.entries(relPairs)) {
  if (ids.length > 1) {
    console.error('ERROR: Semantic duplicate in relationships:', k, ids);
    hasError = true;
  }
}

// 2. Spaces check
const spaceText = fs.readFileSync('./app/spaces.ts', 'utf8');
const spaceIds = [...spaceText.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const spaceIdSet = new Set();
for (const id of spaceIds) {
  if (spaceIdSet.has(id)) {
    console.error('ERROR: Duplicate space ID:', id);
    hasError = true;
  }
  spaceIdSet.add(id);
}

// 3. Composite concepts check
const compText = fs.readFileSync('./app/composite-concepts.ts', 'utf8');
const configsMatch = compText.match(/const compositeConfigs:[\s\S]*?=\s*\[([\s\S]*?)\];/);
const configKeys = configsMatch ? [...configsMatch[1].matchAll(/key:\s*['"]([^'"]+)['"]/g)].map(m => m[1]) : [];

for (const k of configKeys) {
  if (!compText.includes(`groups.${k}.`)) {
    console.error(`ERROR: composite config key '${k}' is not populated in groups!`);
    hasError = true;
  }
}

if (hasError) {
  console.error('Validation FAILED!');
  process.exit(1);
} else {
  console.log(`Validation PASSED! Total spaces: ${spaceIds.length}, Total relationships: ${relIds.length}, Total composite configs: ${configKeys.length}`);
}
