import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const filename = process.argv[2];
if (!filename) {
  console.error('Usage: node scripts/audit-open3d-obj.mjs PATH_TO_OBJ');
  process.exit(1);
}

const absolute = path.resolve(filename);
const input = fs.createReadStream(absolute, { encoding: 'utf8' });
const lines = readline.createInterface({ input, crlfDelay: Infinity });
const objects = [];
const names = new Set();
const duplicates = new Set();
let current = null;
let totalVertices = 0;
let totalNormals = 0;
let totalFaces = 0;

function startObject(name) {
  if (names.has(name)) duplicates.add(name);
  names.add(name);
  current = {
    name,
    vertices: 0,
    normals: 0,
    faces: 0,
    materials: new Set(),
    bounds: [[Infinity, Infinity, Infinity], [-Infinity, -Infinity, -Infinity]],
  };
  objects.push(current);
}

for await (const line of lines) {
  if (line.startsWith('o ')) {
    startObject(line.slice(2).trim());
    continue;
  }
  if (!current) continue;
  if (line.startsWith('v ')) {
    const point = line.trim().split(/\s+/).slice(1, 4).map(Number);
    if (point.length !== 3 || point.some(value => !Number.isFinite(value))) {
      throw new Error(`Invalid vertex in ${current.name}`);
    }
    for (let axis = 0; axis < 3; axis++) {
      current.bounds[0][axis] = Math.min(current.bounds[0][axis], point[axis]);
      current.bounds[1][axis] = Math.max(current.bounds[1][axis], point[axis]);
    }
    current.vertices++;
    totalVertices++;
  } else if (line.startsWith('vn ')) {
    current.normals++;
    totalNormals++;
  } else if (line.startsWith('f ')) {
    current.faces++;
    totalFaces++;
  } else if (line.startsWith('usemtl ')) {
    current.materials.add(line.slice(7).trim());
  }
}

const nervePattern = /nerve|plexus|(?:^|_)C[5-8]_root|(?:^|_)T1_root|division|(?:^|_)(?:lateral|medial|posterior|superior|middle|inferior)_cord/i;
const nerveObjects = objects.filter(object => nervePattern.test(object.name));
const registrationAnchorPattern = /^(?:Clavicle\.r|Scapula\.r\.|Humerus\.r|Thoracic_vertebra_\(T[1-9]|Thoracic_vertebra_\(T1[0-2])/;
const registrationAnchors = objects.filter(object => registrationAnchorPattern.test(object.name));
const emptyObjects = objects.filter(object => object.vertices === 0 || object.faces === 0);
const finiteBounds = object => object.bounds.flat().every(Number.isFinite);

const report = {
  source: absolute,
  bytes: fs.statSync(absolute).size,
  counts: {
    objects: objects.length,
    uniqueObjects: names.size,
    vertices: totalVertices,
    normals: totalNormals,
    faces: totalFaces,
    nerveObjects: nerveObjects.length,
  },
  duplicateObjects: [...duplicates].sort(),
  emptyObjects: emptyObjects.map(object => object.name),
  invalidBounds: objects.filter(object => !finiteBounds(object)).map(object => object.name),
  nerveObjects: nerveObjects.map(object => ({
    name: object.name,
    vertices: object.vertices,
    faces: object.faces,
    bounds: object.bounds,
    materials: [...object.materials],
  })),
  registrationAnchors: registrationAnchors.map(object => ({
    name: object.name,
    vertices: object.vertices,
    faces: object.faces,
    bounds: object.bounds,
  })),
};

console.log(JSON.stringify(report, null, 2));
