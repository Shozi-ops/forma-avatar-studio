import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const filename=process.argv[2];
if(!filename)throw new Error('Usage: node verify-glb.mjs /path/to/export.glb');
const bytes=await readFile(filename);
assert.equal(bytes.toString('ascii',0,4),'glTF');assert.equal(bytes.readUInt32LE(4),2);assert.equal(bytes.readUInt32LE(8),bytes.length);
assert.equal(bytes.readUInt32LE(16),0x4e4f534a);const jsonLength=bytes.readUInt32LE(12);const gltf=JSON.parse(bytes.toString('utf8',20,20+jsonLength));
const faceNode=gltf.nodes.find(node=>node.name==='Photo_textured_estimated_face');const face=faceNode&&gltf.meshes[faceNode.mesh];assert.ok(face,'Reconstructed face mesh must exist');
const primitive=face.primitives[0],position=gltf.accessors[primitive.attributes.POSITION],uv=gltf.accessors[primitive.attributes.TEXCOORD_0],indices=gltf.accessors[primitive.indices];
assert.ok(position.count>=468);assert.equal(position.count,uv.count);assert.ok(indices.count>2000);assert.ok(position.max[2]-position.min[2]>.1,'Face must have real depth');
assert.ok(gltf.images?.length>0,'Photo texture must be embedded');assert.ok(gltf.images.every(img=>img.bufferView!==undefined&&!img.uri));
assert.ok(gltf.skins?.length,'Avatar must be rigged');assert.equal(gltf.skins[0].joints.length,22);assert.deepEqual(gltf.animations.map(a=>a.name).sort(),['Idle','Walk']);for(const mesh of gltf.meshes)for(const p of mesh.primitives)if(p.attributes.JOINTS_0!==undefined)assert.ok(p.attributes.WEIGHTS_0!==undefined);
const binaryOffset=20+jsonLength;assert.equal(bytes.readUInt32LE(binaryOffset+4),0x004e4942);const binary=bytes.subarray(binaryOffset+8);
for(const image of gltf.images){const view=gltf.bufferViews[image.bufferView];assert.equal(image.mimeType,'image/png');assert.equal(binary.subarray(view.byteOffset||0,(view.byteOffset||0)+8).toString('hex'),'89504e470d0a1a0a');}
console.log(JSON.stringify({file:filename,bytes:bytes.length,faceVertices:position.count,faceTriangles:indices.count/3,depth:position.max[2]-position.min[2],embeddedTextures:gltf.images.length,rigged:true,bones:gltf.skins[0].joints.length,animations:gltf.animations.map(a=>a.name)},null,2));
