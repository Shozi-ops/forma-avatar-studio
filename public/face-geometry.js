// Landmark coordinates use image-width units for x and z, image-height units for y.
export const OVAL=[10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,162,21,54,103,67,109];
export function reconstructGeometry(landmarks,indices,width,height){
 if(landmarks.length<468||!width||!height)throw new Error('Incomplete face landmarks.');
 if(landmarks.slice(0,468).some(p=>![p.x,p.y,p.z].every(Number.isFinite)))throw new Error('Invalid face coordinates.');
 const points=landmarks.slice(0,468),minX=Math.min(...points.map(p=>p.x)),maxX=Math.max(...points.map(p=>p.x));
 const minY=Math.min(...points.map(p=>p.y)),maxY=Math.max(...points.map(p=>p.y));
 if(maxX-minX<.06)throw new Error('Face is too small. Crop closer and try again.');
 if(minX<.002||maxX>.998||minY<.002||maxY>.998)throw new Error('Keep your entire face inside the photo.');
 const cx=(minX+maxX)/2,cy=(minY+maxY)/2,cz=points[168].z,scale=1/(maxX-minX),aspect=height/width;
 const positions=[],uvs=[];
 points.forEach(p=>{positions.push((p.x-cx)*scale,(cy-p.y)*aspect*scale,(cz-p.z)*scale*2.35);uvs.push(p.x,1-p.y);});
 const triangles=Array.from(indices);
 if(triangles.length%3||triangles.some(i=>!Number.isInteger(i)||i<0||i>=468))throw new Error('Invalid face topology.');
 // Close the inner boundary loops (eyes and mouth) with photo-textured fans.
 const edges=new Map();for(let i=0;i<triangles.length;i+=3){for(const [a,b] of [[triangles[i],triangles[i+1]],[triangles[i+1],triangles[i+2]],[triangles[i+2],triangles[i]]]){const k=a<b?`${a}:${b}`:`${b}:${a}`;const edge=edges.get(k);if(edge)edge.count++;else edges.set(k,{a,b,count:1});}}
 const graph=new Map();for(const edge of edges.values()){if(edge.count!==1)continue;for(const [a,b] of [[edge.a,edge.b],[edge.b,edge.a]]){if(!graph.has(a))graph.set(a,[]);graph.get(a).push(b);}}
 const visited=new Set();for(const start of graph.keys()){if(visited.has(start))continue;const loop=[];let previous=-1,current=start;while(!visited.has(current)){visited.add(current);loop.push(current);const next=graph.get(current)?.find(v=>v!==previous);previous=current;current=next;if(current===undefined)break;}if(loop.some(i=>OVAL.includes(i))||loop.length<3)continue;const center=positions.length/3;for(let axis=0;axis<3;axis++)positions.push(loop.reduce((sum,i)=>sum+positions[i*3+axis],0)/loop.length);for(let axis=0;axis<2;axis++)uvs.push(loop.reduce((sum,i)=>sum+uvs[i*2+axis],0)/loop.length);for(let i=0;i<loop.length;i++)triangles.push(loop[i],loop[(i+1)%loop.length],center);}
 // Make every face point toward the camera in the source projection.
 for(let i=0;i<triangles.length;i+=3){const a=triangles[i]*3,b=triangles[i+1]*3,c=triangles[i+2]*3;const cross=(positions[b]-positions[a])*(positions[c+1]-positions[a+1])-(positions[b+1]-positions[a+1])*(positions[c]-positions[a]);if(cross<0)[triangles[i+1],triangles[i+2]]=[triangles[i+2],triangles[i+1]];}
 // A separate, deliberately generic cranium shares the detected outer boundary.
 const skullPositions=[],skullIndices=[];const centerZ=OVAL.reduce((s,i)=>s+positions[i*3+2],0)/OVAL.length;
 for(const t of Array.from({length:16},(_,i)=>i/16)){const radius=Math.sqrt(1-t*t)* (1+t*0.08);for(const i of OVAL)skullPositions.push(positions[i*3]*radius,positions[i*3+1]*radius*(1+t*0.04),t===0?positions[i*3+2]:centerZ-1.05*t);}
 for(let ring=0;ring<15;ring++)for(let j=0;j<OVAL.length;j++){const a=ring*OVAL.length+j,b=ring*OVAL.length+(j+1)%OVAL.length,c=a+OVAL.length,d=b+OVAL.length;skullIndices.push(a,c,b,b,c,d);}
 const pole=skullPositions.length/3;skullPositions.push(0,0,centerZ-1.05);for(let j=0;j<OVAL.length;j++)skullIndices.push(15*OVAL.length+j,pole,15*OVAL.length+(j+1)%OVAL.length);
 return {positions:new Float32Array(positions),uvs:new Float32Array(uvs),indices:new Uint16Array(triangles),skullPositions:new Float32Array(skullPositions),skullIndices:new Uint16Array(skullIndices),landmarkCount:468,triangleCount:triangles.length/3};
}
