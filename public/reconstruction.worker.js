// A classic worker is required because MediaPipe's WASM loader uses importScripts.
const modules=Promise.all([import('/vision/vision_bundle.mjs'),import('./face-geometry.js')]);
let enginePromise;
async function engine(){
 if(!enginePromise)enginePromise=(async()=>{const [{FaceLandmarker,FilesetResolver}]=await modules;const files=await FilesetResolver.forVisionTasks('/vision/wasm');return FaceLandmarker.createFromOptions(files,{baseOptions:{modelAssetPath:'/models/face_landmarker.task',delegate:'CPU'},runningMode:'IMAGE',numFaces:2,minFaceDetectionConfidence:.6,minFacePresenceConfidence:.6});})().catch(error=>{enginePromise=undefined;throw error;});
 return enginePromise;
}
self.onmessage=async({data})=>{
 const {bitmap,jobId}=data;
 try{
  self.postMessage({jobId,stage:'Loading local face model…'});
  const model=await engine();
  self.postMessage({jobId,stage:'Detecting facial landmarks and estimating depth…'});
  const result=model.detect(bitmap);
  if(result.faceLandmarks.length===0)throw new Error('No face detected. Use a well-lit, front-facing portrait without an obstructed face.');
  if(result.faceLandmarks.length>1)throw new Error('More than one face detected. Use a photo of one person.');
  const points=result.faceLandmarks[0];
  const eyeMid=(points[33].x+points[263].x)/2,eyeSpan=Math.abs(points[33].x-points[263].x);
  if(Math.abs(points[1].x-eyeMid)>eyeSpan*.38)throw new Error('Turn toward the camera. Strong side profiles cannot be reconstructed reliably.');
  self.postMessage({jobId,stage:'Building photo-textured face geometry…'});
  const response=await fetch('/models/face-topology.json');if(!response.ok)throw new Error('Face topology is unavailable.');
  const topology=await response.json();
  const [, {reconstructGeometry}]=await modules;
  const geometry=reconstructGeometry(points,topology.indices,bitmap.width,bitmap.height);
  self.postMessage({jobId,stage:'ready',geometry,cheek:points[205]},[geometry.positions.buffer,geometry.uvs.buffer,geometry.indices.buffer,geometry.skullPositions.buffer,geometry.skullIndices.buffer]);
 }catch(error){self.postMessage({jobId,stage:'error',message:error.message||'Face reconstruction failed.'});}
 finally{bitmap?.close();}
};
