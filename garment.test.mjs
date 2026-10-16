import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as THREE from 'three';
import {Avatar,CATALOG} from './public/avatar.js';
const data=JSON.parse(await readFile(new URL('./public/models/human-base.json',import.meta.url)));
globalThis.document={createElement:()=>({width:64,height:64,getContext:()=>({fillRect(){},fillStyle:''})})};
test('all top styles have normalized skin weights and move with the arm rig',()=>{
 const avatar=new Avatar(data);avatar.animate('rest');
 for(const top of CATALOG.tops){
  avatar.setLook({tops:top.id});const mesh=avatar.parts.getObjectByName('Garment_'+top.id);assert.ok(mesh?.isSkinnedMesh,top.id);
  const p=mesh.geometry.getAttribute('position'),w=mesh.geometry.getAttribute('skinWeight');let sleeve=-1;
  for(let i=0;i<p.count;i++){assert.ok(Math.abs(w.getX(i)+w.getY(i)+w.getZ(i)+w.getW(i)-1)<1e-5);if(p.getX(i)>.24&&p.getY(i)>1.1)sleeve=i;}
  assert.ok(sleeve>=0,'sleeve geometry is present');avatar.root.updateMatrixWorld(true);mesh.skeleton.update();const before=mesh.getVertexPosition(sleeve,new THREE.Vector3());
  avatar.bone('LeftArm').rotation.z=-.65;avatar.root.updateMatrixWorld(true);mesh.skeleton.update();const after=mesh.getVertexPosition(sleeve,new THREE.Vector3());assert.ok(before.distanceTo(after)>.03,top.id+' must deform');
  avatar.animate('rest');
 }
});
test('rebuilding clothes retains a single selfie shell and disposes old garments',()=>{
 const avatar=new Avatar(data);const selfie=new THREE.Group();selfie.add(new THREE.Mesh(new THREE.SphereGeometry(.1),new THREE.MeshBasicMaterial()));avatar.setSelfie(selfie);
 const old=avatar.parts.getObjectByName('Garment_tee');let disposed=0;old.geometry.addEventListener('dispose',()=>disposed++);
 avatar.setLook({tops:'hoodie'});assert.equal(disposed,1);assert.equal(selfie.parent,avatar.headMount);assert.equal(avatar.root.getObjectByName('Generic_inferred_back_of_head'),undefined);
 assert.ok(avatar.root.getObjectByName('Garment_hoodie'));
});
