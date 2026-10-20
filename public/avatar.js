import * as THREE from 'three';

export const CATALOG = {
  tops: [
    { id: 'tee', name: 'Everyday tee', color: '#d9d4c8', kind: 'tee' },
    { id: 'hoodie', name: 'Studio hoodie', color: '#61736c', kind: 'hoodie' },
    { id: 'sweater', name: 'Knit sweater', color: '#8b3a3a', kind: 'sweater' },
    { id: 'shirt', name: 'Oxford shirt', color: '#b6c7d4', kind: 'shirt' },
    { id: 'polo', name: 'Weekend polo', color: '#2c4a6e', kind: 'shirt' },
    { id: 'jacket', name: 'City jacket', color: '#343b48', kind: 'jacket' },
    { id: 'denim', name: 'Denim jacket', color: '#3d5a80', kind: 'jacket' }
  ],
  bottoms: [
    { id: 'jeans', name: 'Straight jeans', color: '#354d68', kind: 'pants' },
    { id: 'chinos', name: 'Khaki chinos', color: '#c4a574', kind: 'pants' },
    { id: 'joggers', name: 'Soft joggers', color: '#3a3d42', kind: 'pants' },
    { id: 'cargo', name: 'Cargo trousers', color: '#78785e', kind: 'cargo' },
    { id: 'shorts', name: 'Weekend shorts', color: '#b5a18b', kind: 'shorts' },
    { id: 'bermuda', name: 'Bermuda shorts', color: '#5c6b4a', kind: 'shorts' },
    { id: 'skirt', name: 'A-line skirt', color: '#554d64', kind: 'skirt' },
    { id: 'midi', name: 'Midi skirt', color: '#6b4c5a', kind: 'skirt' }
  ],
  shoes: [
    { id: 'sneakers', name: 'Court sneakers', color: '#ece8dd', kind: 'sneakers' },
    { id: 'runners', name: 'Trail runners', color: '#e8e4d9', kind: 'sneakers' },
    { id: 'boots', name: 'Chelsea boots', color: '#493b31', kind: 'boots' },
    { id: 'hikers', name: 'Hiker boots', color: '#5a4a32', kind: 'boots' },
    { id: 'loafers', name: 'Classic loafers', color: '#292a2b', kind: 'loafers' },
    { id: 'derby', name: 'Derby shoes', color: '#6b4423', kind: 'loafers' }
  ],
  hair: [
    { id: 'crop', name: 'Textured crop', color: '#30251f', kind: 'crop' },
    { id: 'buzz', name: 'Buzz cut', color: '#1a1614', kind: 'crop' },
    { id: 'bob', name: 'Soft bob', color: '#503b2c', kind: 'bob' },
    { id: 'fringe', name: 'Fringe bob', color: '#7a3e2e', kind: 'bob' },
    { id: 'long', name: 'Long layers', color: '#2f2925', kind: 'long' },
    { id: 'curls', name: 'Natural curls', color: '#211d1a', kind: 'curls' },
    { id: 'none', name: 'No hair', color: '#d1b294', kind: 'none' }
  ],
  accessories: [
    { id: 'none', name: 'No eyewear', color: '#222', kind: 'none' },
    { id: 'round', name: 'Round frames', color: '#847258', kind: 'round' },
    { id: 'square', name: 'Square frames', color: '#262a2b', kind: 'square' }
  ]
};

export const DEFAULT_LOOK = {
  tops: 'tee',
  bottoms: 'jeans',
  shoes: 'sneakers',
  hair: 'none',
  accessories: 'none',
  skin: '#b98c70',
  width: 1,
  height: 1
};

export function item(category, id) {
  return CATALOG[category]?.find(x => x.id === id) || CATALOG[category]?.[0];
}

export function wardrobeIcon(category, id) {
  const product = item(category, id), c = product.color;
  let drawing = '';
  if (category === 'tops') {
    drawing = `<path d="M30 15 15 23 5 40 18 48 25 37 25 83 75 83 75 37 82 48 95 40 85 23 70 15Q50 29 30 15Z" fill="${c}" stroke="#343b3b" stroke-width="1.5"/>${product.kind === 'hoodie' ? '<path d="M34 17Q50-5 66 17L60 28H40Z" fill="#52645e"/><path d="M34 60H66L70 73H30Z" fill="none" stroke="#354940"/>' : product.kind === 'shirt' || product.kind === 'jacket' ? '<path d="M36 18 50 32 64 18M50 32V81" fill="none" stroke="#46535b" stroke-width="2"/><circle cx="55" cy="48" r="1.5"/><circle cx="55" cy="62" r="1.5"/>' : ''}`;
  } else if (category === 'bottoms') {
    drawing = product.kind === 'skirt' ? `<path d="M31 13H69L85 84H15Z" fill="${c}"/><path d="M29 22H71M38 27 30 79M62 27 70 79" stroke="#aaa" fill="none"/>` : `<path d="M22 12H78L83 ${product.kind === 'shorts' ? 58 : 87}H55L50 37 45 ${product.kind === 'shorts' ? 58 : 87}H17Z" fill="${c}"/><path d="M22 20H78M50 20V37" stroke="#a1adba" fill="none"/>${product.kind === 'cargo' ? '<path d="M21 43H39V59H21ZM61 43H79V59H61Z" fill="none" stroke="#c3bea6"/>' : ''}`;
  } else if (category === 'shoes') {
    drawing = `<path d="M15 ${product.kind === 'boots' ? 30 : 44}H48L54 62 83 68Q94 72 90 82H12Q6 64 15 ${product.kind === 'boots' ? 30 : 44}Z" fill="${c}"/><path d="M11 80H90V87H11Z" fill="#a6a7a2"/><path d="M44 57 58 63M47 62 64 68" stroke="#969b97" stroke-width="3"/>`;
  } else if (category === 'hair') {
    drawing = `<ellipse cx="50" cy="55" rx="26" ry="34" fill="#c49b80"/>${id === 'none' ? '' : `<path d="M20 53Q8 5 48 10Q87 4 82 53L72 35Q56 41 31 29Z${product.kind === 'long' ? 'M21 40 13 90H32V44M79 40 87 90H68V44' : product.kind === 'bob' ? 'M20 40 17 73H31V40M80 40 83 73H69V40' : ''}" fill="${c}"/>`}${product.kind === 'curls' ? '<g fill="#211d1a"><circle cx="25" cy="27" r="13"/><circle cx="44" cy="19" r="14"/><circle cx="64" cy="20" r="14"/><circle cx="79" cy="33" r="12"/></g>' : ''}`;
  } else {
    drawing = id === 'none' ? '<circle cx="50" cy="48" r="28" fill="none" stroke="#c2c6c1" stroke-width="2"/><path d="m29 69 42-42" stroke="#c2c6c1" stroke-width="2"/>' : `<${product.kind === 'round' ? 'ellipse cx="28" cy="49" rx="18" ry="18"' : 'rect x="10" y="32" width="36" height="30" rx="5"'} fill="none" stroke="${c}" stroke-width="5"/><${product.kind === 'round' ? 'ellipse cx="72" cy="49" rx="18" ry="18"' : 'rect x="54" y="32" width="36" height="30" rx="5"'} fill="none" stroke="${c}" stroke-width="5"/><path d="M46 45H54M10 40 3 35M90 40 97 35" stroke="${c}" stroke-width="4"/>`;
  }
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${drawing}</svg>`);
}

function material(color, fabric = false) {
  const m = new THREE.MeshStandardMaterial({ color, roughness: fabric ? 0.95 : 0.72 });
  if (fabric && typeof document !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#deded8';
        ctx.fillRect(0, 0, 64, 64);
        for (let i = 0; i < 64; i += 2) {
          ctx.fillStyle = i % 4 ? '#ddddda' : '#eeeeea';
          ctx.fillRect(i, 0, 1, 64);
          ctx.fillRect(0, i, 64, 1);
        }
        const map = new THREE.CanvasTexture(canvas);
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        map.repeat.set(12, 12);
        m.map = map;
      }
    } catch {}
  }
  return m;
}

function pointSegmentDistance(p, a, b) {
  const delta = b.clone().sub(a);
  const lenSq = delta.lengthSq();
  if (lenSq < 1e-8) return p.distanceTo(a);
  const t = THREE.MathUtils.clamp(p.clone().sub(a).dot(delta) / lenSq, 0, 1);
  return p.distanceTo(a.clone().addScaledVector(delta, t));
}

const BONE_DEFS = [
  { name: 'Hips', parent: null, joint: 'pelvis', end: 'spine-4' },
  { name: 'Spine', parent: 'Hips', joint: 'spine-4', end: 'spine-2' },
  { name: 'Spine1', parent: 'Spine', joint: 'spine-2', end: 'spine-1' },
  { name: 'Spine2', parent: 'Spine1', joint: 'spine-1', end: 'neck' },
  { name: 'Neck', parent: 'Spine2', joint: 'neck', end: 'head' },
  { name: 'Head', parent: 'Neck', joint: 'head', end: 'head-2' },
  { name: 'LeftShoulder', parent: 'Spine2', joint: 'l-clavicle', end: 'l-shoulder' },
  { name: 'LeftArm', parent: 'LeftShoulder', joint: 'l-shoulder', end: 'l-elbow' },
  { name: 'LeftForeArm', parent: 'LeftArm', joint: 'l-elbow', end: 'l-hand' },
  { name: 'LeftHand', parent: 'LeftForeArm', joint: 'l-hand', end: 'l-hand-2' },
  { name: 'RightShoulder', parent: 'Spine2', joint: 'r-clavicle', end: 'r-shoulder' },
  { name: 'RightArm', parent: 'RightShoulder', joint: 'r-shoulder', end: 'r-elbow' },
  { name: 'RightForeArm', parent: 'RightArm', joint: 'r-elbow', end: 'r-hand' },
  { name: 'RightHand', parent: 'RightForeArm', joint: 'r-hand', end: 'r-hand-2' },
  { name: 'LeftUpLeg', parent: 'Hips', joint: 'l-upper-leg', end: 'l-knee' },
  { name: 'LeftLeg', parent: 'LeftUpLeg', joint: 'l-knee', end: 'l-ankle' },
  { name: 'LeftFoot', parent: 'LeftLeg', joint: 'l-ankle', end: 'l-foot-1' },
  { name: 'LeftToeBase', parent: 'LeftFoot', joint: 'l-foot-1', end: 'l-foot-2' },
  { name: 'RightUpLeg', parent: 'Hips', joint: 'r-upper-leg', end: 'r-knee' },
  { name: 'RightLeg', parent: 'RightUpLeg', joint: 'r-knee', end: 'r-ankle' },
  { name: 'RightFoot', parent: 'RightLeg', joint: 'r-ankle', end: 'r-foot-1' },
  { name: 'RightToeBase', parent: 'RightFoot', joint: 'r-foot-1', end: 'r-foot-2' }
];

export class Avatar {
  constructor(data) {
    this.data = data;
    this.look = { ...DEFAULT_LOOK };
    this.animation = 'idle';
    this.clips = [];
    this.bonesMap = new Map();
    this.selfie = null;

    this.originalGeometry = new THREE.BufferGeometry();
    this.originalGeometry.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3));
    this.originalGeometry.setIndex(data.indices);
    this.originalGeometry.computeVertexNormals();

    this.setupSkeleton();

    this.root = new THREE.Group();
    this.root.name = 'AvatarRoot';
    this.root.add(this.bones[0]);

    this.headMount = new THREE.Group();
    this.headMount.name = 'HeadMount';
    this.bone('Head').add(this.headMount);

    this.setupBody();

    this.parts = new THREE.Group();
    this.parts.name = 'Parts';
    this.root.add(this.parts);

    this.setupAnimations();
    this.build();
    this.animate('idle');
  }

  setupSkeleton() {
    const worldPos = {};
    for (const [k, v] of Object.entries(this.data.joints || {})) {
      worldPos[k] = new THREE.Vector3(v[0], v[1], v[2]);
    }
    this.worldJoints = worldPos;

    this.bones = [];
    this.bonesMap.clear();
    for (const def of BONE_DEFS) {
      const b = new THREE.Bone();
      b.name = def.name;
      this.bonesMap.set(def.name, b);
      this.bones.push(b);
    }

    for (const def of BONE_DEFS) {
      const b = this.bonesMap.get(def.name);
      const pos = worldPos[def.joint] || new THREE.Vector3();
      if (def.parent) {
        const parent = this.bonesMap.get(def.parent);
        parent.add(b);
        const parentDef = BONE_DEFS.find(d => d.name === def.parent);
        const parentPos = worldPos[parentDef.joint] || new THREE.Vector3();
        b.position.copy(pos).sub(parentPos);
      } else {
        b.position.copy(pos);
      }
    }

    this.skeleton = new THREE.Skeleton(this.bones);
  }

  bone(name) {
    return this.bonesMap.get(name) || this.root?.getObjectByName(name);
  }

  computeSkinWeights(positions) {
    const count = positions.count;
    const skinIndices = new Uint16Array(count * 4);
    const skinWeights = new Float32Array(count * 4);
    const p = new THREE.Vector3();
    const vWeights = [];

    const joints = this.worldJoints || {};

    for (let i = 0; i < count; i++) {
      p.fromBufferAttribute(positions, i);
      vWeights.length = 0;
      for (let b = 0; b < BONE_DEFS.length; b++) {
        const def = BONE_DEFS[b];
        const start = joints[def.joint] || new THREE.Vector3();
        const end = joints[def.end] || start;
        const d = pointSegmentDistance(p, start, end);
        vWeights.push({ index: b, w: 1 / Math.pow(d + 0.015, 3) });
      }
      vWeights.sort((a, b) => b.w - a.w);
      let sum = vWeights[0].w + vWeights[1].w + vWeights[2].w + vWeights[3].w;
      if (sum <= 0) sum = 1;

      for (let j = 0; j < 4; j++) {
        skinIndices[i * 4 + j] = vWeights[j].index;
        skinWeights[i * 4 + j] = vWeights[j].w / sum;
      }
    }

    return { skinIndices, skinWeights };
  }

  setupBody() {
    const geom = this.originalGeometry.clone();
    const { skinIndices, skinWeights } = this.computeSkinWeights(geom.getAttribute('position'));
    geom.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
    geom.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

    this.bodyMaterial = new THREE.MeshStandardMaterial({
      color: this.look.skin || '#b98c70',
      roughness: 0.8
    });
    this.body = new THREE.SkinnedMesh(geom, this.bodyMaterial);
    this.body.name = 'Body';
    this.body.castShadow = true;
    this.body.receiveShadow = true;
    this.root.add(this.body);
    this.body.bind(this.skeleton);
  }

  setupAnimations() {
    const timesIdle = [0, 1.5, 3];
    const q0 = new THREE.Quaternion();
    const q1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.02, 0, 0));
    const idleVals = [q0.x, q0.y, q0.z, q0.w, q1.x, q1.y, q1.z, q1.w, q0.x, q0.y, q0.z, q0.w];
    const idleTrack = new THREE.QuaternionKeyframeTrack('Spine1.quaternion', timesIdle, idleVals);
    const idleClip = new THREE.AnimationClip('Idle', 3, [idleTrack]);

    const timesWalk = [0, 0.4, 0.8, 1.2];
    const qL0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.3, 0, 0));
    const qL1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.3, 0, 0));
    const qR0 = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.3, 0, 0));
    const qR1 = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.3, 0, 0));
    const valL = [qL0.x, qL0.y, qL0.z, qL0.w, qL1.x, qL1.y, qL1.z, qL1.w, qL0.x, qL0.y, qL0.z, qL0.w, qL1.x, qL1.y, qL1.z, qL1.w];
    const valR = [qR0.x, qR0.y, qR0.z, qR0.w, qR1.x, qR1.y, qR1.z, qR1.w, qR0.x, qR0.y, qR0.z, qR0.w, qR1.x, qR1.y, qR1.z, qR1.w];
    const trackL = new THREE.QuaternionKeyframeTrack('LeftUpLeg.quaternion', timesWalk, valL);
    const trackR = new THREE.QuaternionKeyframeTrack('RightUpLeg.quaternion', timesWalk, valR);
    const walkClip = new THREE.AnimationClip('Walk', 1.2, [trackL, trackR]);

    this.clips = [idleClip, walkClip];
    this.mixer = new THREE.AnimationMixer(this.root);
  }

  topField(v, kind = 'tee') {
    const lower = v.y - 1.055;
    const upper = 1.52 - v.y;
    const armMaxX = (kind === 'hoodie' || kind === 'sweater' || kind === 'jacket' || kind === 'denim') ? 0.48 : 0.35;
    const arm = armMaxX - Math.abs(v.x);
    return Math.min(lower, upper, Math.max(arm, 0.22 - Math.abs(v.x)));
  }

  surface(field, offset = 0.016, type = 'top') {
    const origPos = this.originalGeometry.getAttribute('position');
    const origNorm = this.originalGeometry.getAttribute('normal');
    const origIndices = this.originalGeometry.getIndex().array;
    const vertCount = origPos.count;

    const fVals = new Float32Array(vertCount);
    const v = new THREE.Vector3();
    for (let i = 0; i < vertCount; i++) {
      v.fromBufferAttribute(origPos, i);
      fVals[i] = field(v);
    }

    const outPositions = [];
    const outNormals = [];
    const outIndices = [];
    const vertMap = new Map();

    function addVertex(pos, norm, isHemMin = false, isHemMax = false, hemMinY = 0, hemMaxY = 0) {
      const p = pos.clone();
      const n = norm.clone().normalize();

      if (type === 'bottom') {
        p.x += n.x * offset;
        p.z += n.z * offset;
        if (isHemMin) p.y = hemMinY;
        else if (isHemMax) p.y = hemMaxY;
        else p.y = Math.max(hemMinY, Math.min(hemMaxY, p.y));
      } else if (type === 'top') {
        if (isHemMin) {
          p.y = 1.055;
          p.x += n.x * offset;
          p.z += n.z * offset;
        } else {
          if (p.y > 1.35) {
            p.addScaledVector(n, offset);
          } else {
            p.x += n.x * offset;
            p.z += n.z * offset;
          }
          if (p.y < 1.055) p.y = 1.055;
        }
      } else {
        p.addScaledVector(n, offset);
      }

      const key = `${p.x.toFixed(5)},${p.y.toFixed(5)},${p.z.toFixed(5)}`;
      if (vertMap.has(key)) return vertMap.get(key);

      const idx = outPositions.length / 3;
      outPositions.push(p.x, p.y, p.z);
      outNormals.push(n.x, n.y, n.z);
      vertMap.set(key, idx);
      return idx;
    }

    const edgeCutCache = new Map();
    function getEdgeCut(i1, i2) {
      const edgeKey = i1 < i2 ? `${i1}:${i2}` : `${i2}:${i1}`;
      if (edgeCutCache.has(edgeKey)) return edgeCutCache.get(edgeKey);

      const f1 = fVals[i1], f2 = fVals[i2];
      const t = f1 / (f1 - f2);
      const p1 = new THREE.Vector3().fromBufferAttribute(origPos, i1);
      const p2 = new THREE.Vector3().fromBufferAttribute(origPos, i2);
      const n1 = new THREE.Vector3().fromBufferAttribute(origNorm, i1);
      const n2 = new THREE.Vector3().fromBufferAttribute(origNorm, i2);

      const p = new THREE.Vector3().copy(p1).lerp(p2, t);
      const n = new THREE.Vector3().copy(n1).lerp(n2, t);

      let isHemMin = false, isHemMax = false, hemMinY = 0, hemMaxY = 0;
      if (type === 'bottom') {
        hemMinY = 0.105;
        hemMaxY = 1.08;
        if (Math.abs(p.y - 0.105) < 1e-4) isHemMin = true;
        if (Math.abs(p.y - 1.08) < 1e-4) isHemMax = true;
      } else if (type === 'top') {
        hemMinY = 1.055;
        if (Math.abs(p.y - 1.055) < 1e-4) isHemMin = true;
      }

      const idx = addVertex(p, n, isHemMin, isHemMax, hemMinY, hemMaxY);
      edgeCutCache.set(edgeKey, idx);
      return idx;
    }

    const origVertCache = new Map();
    function getOrigVert(i) {
      if (origVertCache.has(i)) return origVertCache.get(i);
      const p = new THREE.Vector3().fromBufferAttribute(origPos, i);
      const n = new THREE.Vector3().fromBufferAttribute(origNorm, i);
      let hemMinY = 0, hemMaxY = 0;
      if (type === 'bottom') { hemMinY = 0.105; hemMaxY = 1.08; }
      else if (type === 'top') { hemMinY = 1.055; }
      const idx = addVertex(p, n, false, false, hemMinY, hemMaxY);
      origVertCache.set(i, idx);
      return idx;
    }

    for (let t = 0; t < origIndices.length; t += 3) {
      const i0 = origIndices[t], i1 = origIndices[t + 1], i2 = origIndices[t + 2];
      const in0 = fVals[i0] >= 0, in1 = fVals[i1] >= 0, in2 = fVals[i2] >= 0;
      const count = (in0 ? 1 : 0) + (in1 ? 1 : 0) + (in2 ? 1 : 0);
      if (count === 3) {
        outIndices.push(getOrigVert(i0), getOrigVert(i1), getOrigVert(i2));
      } else if (count === 1) {
        if (in0) {
          outIndices.push(getOrigVert(i0), getEdgeCut(i0, i1), getEdgeCut(i0, i2));
        } else if (in1) {
          outIndices.push(getOrigVert(i1), getEdgeCut(i1, i2), getEdgeCut(i1, i0));
        } else {
          outIndices.push(getOrigVert(i2), getEdgeCut(i2, i0), getEdgeCut(i2, i1));
        }
      } else if (count === 2) {
        if (!in0) {
          const v1 = getOrigVert(i1), v2 = getOrigVert(i2);
          const e10 = getEdgeCut(i1, i0), e20 = getEdgeCut(i2, i0);
          outIndices.push(v1, v2, e20);
          outIndices.push(v1, e20, e10);
        } else if (!in1) {
          const v0 = getOrigVert(i0), v2 = getOrigVert(i2);
          const e01 = getEdgeCut(i0, i1), e21 = getEdgeCut(i2, i1);
          outIndices.push(v2, v0, e01);
          outIndices.push(v2, e01, e21);
        } else {
          const v0 = getOrigVert(i0), v1 = getOrigVert(i1);
          const e02 = getEdgeCut(i0, i2), e12 = getEdgeCut(i1, i2);
          outIndices.push(v0, v1, e12);
          outIndices.push(v0, e12, e02);
        }
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(outPositions, 3));
    geom.setAttribute('normal', new THREE.Float32BufferAttribute(outNormals, 3));
    geom.setIndex(outIndices);
    return geom;
  }

  createGarment(geom, mat, name) {
    const { skinIndices, skinWeights } = this.computeSkinWeights(geom.getAttribute('position'));
    geom.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
    geom.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));
    const mesh = new THREE.SkinnedMesh(geom, mat);
    mesh.name = name;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.parts.add(mesh);
    mesh.bind(this.skeleton);
    return mesh;
  }

  buildTop() {
    const product = item('tops', this.look.tops);
    const geom = this.surface(v => this.topField(v, product.kind), 0.016, 'top');
    const mat = material(product.color, true);
    return this.createGarment(geom, mat, 'Garment_' + product.id);
  }

  buildBottom() {
    const product = item('bottoms', this.look.bottoms);
    let field;
    if (product.kind === 'shorts') {
      field = v => Math.min(v.y - 0.58, 1.08 - v.y, 0.32 - Math.abs(v.x));
    } else if (product.kind === 'skirt') {
      field = v => Math.min(v.y - 0.48, 1.08 - v.y, 0.38 - Math.abs(v.x));
    } else if (product.id === 'midi') {
      field = v => Math.min(v.y - 0.30, 1.08 - v.y, 0.38 - Math.abs(v.x));
    } else if (product.id === 'bermuda') {
      field = v => Math.min(v.y - 0.48, 1.08 - v.y, 0.32 - Math.abs(v.x));
    } else {
      field = v => Math.min(v.y - 0.105, 1.08 - v.y, 0.32 - Math.abs(v.x));
    }
    const geom = this.surface(field, 0.016, 'bottom');
    const mat = material(product.color, true);
    return this.createGarment(geom, mat, 'Garment_' + product.id);
  }

  buildShoes() {
    const product = item('shoes', this.look.shoes);
    const topY = (product.kind === 'boots') ? 0.22 : 0.12;
    const field = v => Math.min(topY - v.y, v.y + 0.02, 0.32 - Math.abs(v.x));
    const geom = this.surface(field, 0.018, 'shoes');
    const mat = material(product.color, false);
    return this.createGarment(geom, mat, 'Garment_' + product.id);
  }

  buildHair() {
    const product = item('hair', this.look.hair);
    if (!product || product.id === 'none') return null;
    let field;
    if (product.kind === 'long') {
      field = v => Math.min(v.y - 1.35, 1.82 - v.y, 0.18 - Math.abs(v.x));
    } else if (product.kind === 'bob') {
      field = v => Math.min(v.y - 1.48, 1.82 - v.y, 0.18 - Math.abs(v.x));
    } else {
      field = v => Math.min(v.y - 1.58, 1.82 - v.y, 0.16 - Math.abs(v.x));
    }
    const geom = this.surface(field, 0.02, 'hair');
    const mat = material(product.color, false);
    return this.createGarment(geom, mat, 'Hair_' + product.id);
  }

  buildAccessories() {
    const product = item('accessories', this.look.accessories);
    if (!product || product.id === 'none') return null;
    const group = new THREE.Group();
    group.name = 'Accessory_' + product.id;
    const mat = material(product.color, false);

    const isRound = product.kind === 'round';
    const leftFrameGeom = isRound
      ? new THREE.TorusGeometry(0.025, 0.003, 16, 32)
      : new THREE.BoxGeometry(0.045, 0.035, 0.005);
    const rightFrameGeom = isRound
      ? new THREE.TorusGeometry(0.025, 0.003, 16, 32)
      : new THREE.BoxGeometry(0.045, 0.035, 0.005);

    const left = new THREE.Mesh(leftFrameGeom, mat);
    left.position.set(0.035, 0.03, 0.14);
    const right = new THREE.Mesh(rightFrameGeom, mat);
    right.position.set(-0.035, 0.03, 0.14);

    const bridgeGeom = new THREE.CylinderGeometry(0.002, 0.002, 0.02);
    const bridge = new THREE.Mesh(bridgeGeom, mat);
    bridge.rotation.z = Math.PI / 2;
    bridge.position.set(0, 0.03, 0.14);

    group.add(left, right, bridge);
    this.headMount.add(group);
    return group;
  }

  build() {
    const existing = [...this.parts.children];
    for (const child of existing) {
      if (child.isSkinnedMesh) {
        child.geometry?.dispose();
        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
        else child.material?.dispose();
        child.removeFromParent();
      }
    }

    const existingAcc = this.headMount.children.filter(c => c.name.startsWith('Accessory_'));
    for (const acc of existingAcc) {
      acc.traverse(o => { o.geometry?.dispose(); o.material?.dispose(); });
      acc.removeFromParent();
    }

    this.buildTop();
    this.buildBottom();
    this.buildShoes();
    this.buildHair();
    this.buildAccessories();

    if (this.bodyMaterial && this.look.skin) {
      this.bodyMaterial.color.set(this.look.skin);
    }

    this.root.scale.set(this.look.width || 1, this.look.height || 1, this.look.width || 1);
  }

  setLook(patch) {
    const prevTops = this.look.tops;
    const prevBottoms = this.look.bottoms;
    const prevShoes = this.look.shoes;
    const prevHair = this.look.hair;
    const prevAcc = this.look.accessories;

    Object.assign(this.look, patch);

    if (patch.skin && this.bodyMaterial) {
      this.bodyMaterial.color.set(patch.skin);
    }
    if (patch.width !== undefined || patch.height !== undefined) {
      this.root.scale.set(this.look.width || 1, this.look.height || 1, this.look.width || 1);
    }

    if (patch.tops && patch.tops !== prevTops) {
      const old = this.parts.getObjectByName('Garment_' + prevTops);
      if (old) {
        old.geometry?.dispose();
        if (Array.isArray(old.material)) old.material.forEach(m => m.dispose());
        else old.material?.dispose();
        old.removeFromParent();
      }
      this.buildTop();
    }

    if (patch.bottoms && patch.bottoms !== prevBottoms) {
      const old = this.parts.getObjectByName('Garment_' + prevBottoms);
      if (old) {
        old.geometry?.dispose();
        if (Array.isArray(old.material)) old.material.forEach(m => m.dispose());
        else old.material?.dispose();
        old.removeFromParent();
      }
      this.buildBottom();
    }

    if (patch.shoes && patch.shoes !== prevShoes) {
      const old = this.parts.getObjectByName('Garment_' + prevShoes);
      if (old) {
        old.geometry?.dispose();
        if (Array.isArray(old.material)) old.material.forEach(m => m.dispose());
        else old.material?.dispose();
        old.removeFromParent();
      }
      this.buildShoes();
    }

    if (patch.hair && patch.hair !== prevHair) {
      const old = this.parts.getObjectByName('Hair_' + prevHair);
      if (old) {
        old.geometry?.dispose();
        if (Array.isArray(old.material)) old.material.forEach(m => m.dispose());
        else old.material?.dispose();
        old.removeFromParent();
      }
      this.buildHair();
    }

    if (patch.accessories && patch.accessories !== prevAcc) {
      const old = this.headMount.getObjectByName('Accessory_' + prevAcc);
      if (old) {
        old.traverse(o => { o.geometry?.dispose(); o.material?.dispose(); });
        old.removeFromParent();
      }
      this.buildAccessories();
    }
  }

  setSelfie(group) {
    if (this.selfie) {
      this.selfie.traverse(o => {
        o.geometry?.dispose();
        o.material?.map?.dispose();
        o.material?.dispose();
      });
      this.selfie.removeFromParent();
    }
    this.selfie = group;
    // Position and scale to fit avatar head
    group.position.set(0, 0.015, 0.035);
    group.scale.setScalar(0.182);
    this.headMount.add(group);

    // Hide original head of the body if present
    const origHead = this.root.getObjectByName('Generic_inferred_back_of_head');
    if (origHead && origHead !== group.getObjectByName('Generic_inferred_back_of_head')) {
      origHead.removeFromParent();
    }
  }

  animate(name) {
    this.animation = name;
    if (!this.mixer) return;
    if (name === 'rest') {
      this.mixer.stopAllAction();
      for (const def of BONE_DEFS) {
        const b = this.bonesMap.get(def.name);
        if (b) {
          b.rotation.set(0, 0, 0);
          b.quaternion.identity();
        }
      }
      this.root.updateMatrixWorld(true);
      this.skeleton.update();
    } else {
      this.mixer.stopAllAction();
      const clipName = (name === 'walk') ? 'Walk' : 'Idle';
      const clip = this.clips.find(c => c.name === clipName);
      if (clip) {
        const action = this.mixer.clipAction(clip);
        action.play();
      }
    }
  }

  tick(delta) {
    if (this.mixer) {
      this.mixer.update(delta);
    }
  }
}
