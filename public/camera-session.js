/** Owns camera streams, including permission requests that finish after cancellation. */
export class CameraSession {
 constructor(request){this.request=request;this.generation=0;this.stream=null;}
 stop(){this.generation++;const stream=this.stream;this.stream=null;stream?.getTracks().forEach(track=>track.stop());}
 async start(){this.stop();const current=this.generation;const stream=await this.request();if(current!==this.generation){stream.getTracks().forEach(track=>track.stop());return null;}this.stream=stream;return stream;}
}
