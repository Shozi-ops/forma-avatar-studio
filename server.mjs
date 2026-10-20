import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.wasm':'application/wasm','.jpg':'image/jpeg','.png':'image/png','.task':'application/octet-stream'};
export const server=http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');
 res.setHeader('X-Content-Type-Options','nosniff');
 if(url.pathname==='/api/health'){res.setHeader('Content-Type','application/json');return res.end(JSON.stringify({status:'ok',engine:'mediapipe-local-face-mesh',generationAvailable:true,inferenceLocation:'browser',output:'textured-face-with-inferred-cranium',fullAvatarReconstruction:false}));}
 if(url.pathname==='/api/avatars'&&req.method==='POST'){res.writeHead(409,{'Content-Type':'application/json'});return res.end(JSON.stringify({error:'LOCAL_INFERENCE',message:'Use the browser reconstruction worker. Photos are not sent to this server.'}));}
 if(req.method!=='GET'){res.writeHead(405);return res.end();}
 const vision=url.pathname.startsWith('/vision/');
 const relative=vision?'node_modules/@mediapipe/tasks-vision/'+url.pathname.slice(8):url.pathname.startsWith('/vendor/')?'node_modules/three/'+url.pathname.slice(8):'public/'+(url.pathname==='/'?'index.html':url.pathname.slice(1));
 const target=path.resolve(root,relative);
 const base=path.resolve(root,vision?'node_modules/@mediapipe/tasks-vision':url.pathname.startsWith('/vendor/')?'node_modules/three':'public');
 if(!target.startsWith(base+path.sep)){res.writeHead(403);return res.end();}
 try{const data=await readFile(target);res.setHeader('Content-Type',types[path.extname(target)]||'application/octet-stream');res.end(data);}catch{res.writeHead(404);res.end('Not found');}
});
const PORT=process.env.PORT||3000;
const HOST='0.0.0.0';
if(process.argv[1]===fileURLToPath(import.meta.url))server.listen(PORT,HOST,()=>console.log(`Avatar Studio: http://${HOST}:${PORT}`));
