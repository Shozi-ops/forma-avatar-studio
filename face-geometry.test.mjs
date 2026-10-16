import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {reconstructGeometry} from './public/face-geometry.js';
const {indices}=JSON.parse(await readFile(new URL('./public/models/face-topology.json',import.meta.url)));
const portrait=()=>Array.from({length:468},(_,i)=>({x:.5+.13*Math.cos(i/468*Math.PI*2),y:.5+.2*Math.sin(i/468*Math.PI*2),z:-.02*Math.cos(i/468*Math.PI*2)}));
test('face mesh preserves photo coordinates and produces finite geometry',()=>{const points=portrait(),g=reconstructGeometry(points,indices,640,800);assert.ok(Math.abs(g.uvs[0]-points[0].x)<1e-6);assert.ok(Math.abs(g.uvs[1]-(1-points[0].y))<1e-6);for(const value of [...g.positions,...g.skullPositions,...g.uvs])assert.ok(Number.isFinite(value));assert.ok(g.indices.every(i=>i<g.positions.length/3));});
test('bad landmarks and topology are rejected with usable errors',()=>{assert.throws(()=>reconstructGeometry([],indices,640,800),/Incomplete/);const points=portrait();points[5].x=NaN;assert.throws(()=>reconstructGeometry(points,indices,640,800),/Invalid face/);assert.throws(()=>reconstructGeometry(portrait(),[0,1,900],640,800),/topology/);});
