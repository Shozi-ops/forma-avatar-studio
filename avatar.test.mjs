import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as THREE from 'three';
import {Avatar,DEFAULT_LOOK} from './public/avatar.js';
const data=JSON.parse(await readFile(new URL('./public/models/human-base.json',import.meta.url)));
function fixture(){const avatar=Object.create(Avatar.prototype);avatar.data=data;avatar.look={...DEFAULT_LOOK};avatar.originalGeometry=new THREE.BufferGeometry();avatar.originalGeometry.setAttribute('position',new THREE.Float32BufferAttribute(data.positions,3));avatar.originalGeometry.setIndex(data.indices);avatar.originalGeometry.computeVertexNormals();return avatar;}
test('fitted trousers retain continuous indexed anatomy and exact hems',()=>{const a=fixture(),g=a.surface(v=>Math.min(v.y-.105,1.08-v.y,.32-Math.abs(v.x)),.016,'bottom');g.computeBoundingBox();assert.ok(Math.abs(g.boundingBox.min.y-.105)<1e-6);assert.ok(Math.abs(g.boundingBox.max.y-1.08)<1e-6);assert.ok(g.index.count>g.getAttribute('position').count*2);for(const v of g.getAttribute('normal').array)assert.ok(Number.isFinite(v));});
test('tee has shared smooth vertices and a horizontal hem',()=>{const a=fixture(),g=a.surface(v=>a.topField(v),.016,'top');g.computeBoundingBox();assert.ok(Math.abs(g.boundingBox.min.y-1.055)<1e-6);assert.ok(g.getAttribute('position').count>1000);assert.ok(g.index.count>g.getAttribute('position').count*2);});
