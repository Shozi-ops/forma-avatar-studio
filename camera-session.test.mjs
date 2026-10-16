import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CameraSession} from './public/camera-session.js';
const deferred=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b;});return {promise,resolve,reject};};
const stream=()=>{let stops=0;return {getTracks:()=>[{stop:()=>stops++}],get stops(){return stops;}};};
test('camera cancellation releases a stream delivered after cancellation',async()=>{const d=deferred(),s=stream(),session=new CameraSession(()=>d.promise);const pending=session.start();session.stop();d.resolve(s);assert.equal(await pending,null);assert.equal(s.stops,1);});
test('a stale camera stream cannot replace a newer stream',async()=>{const first=deferred(),second=deferred(),a=stream(),b=stream();let requests=0;const session=new CameraSession(()=>++requests===1?first.promise:second.promise);const old=session.start();session.stop();const recent=session.start();second.resolve(b);await recent;first.resolve(a);assert.equal(await old,null);assert.equal(session.stream,b);assert.equal(a.stops,1);assert.equal(b.stops,0);session.stop();assert.equal(b.stops,1);});
