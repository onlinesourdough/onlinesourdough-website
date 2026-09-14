import { useEffect, useRef, useState } from 'react';
import './design-addition.css';

/** Original animated glyph sculpture, authored for this design exploration. */
export function HeroField(){
  const element=useRef<HTMLDivElement>(null);
  const canvas=useRef<HTMLCanvasElement>(null);
  const elapsed=useRef(4);
  const [paused,setPaused]=useState(false);
  const active=new URLSearchParams(location.search).get('variant')==='hero';
  useEffect(()=>{
    const host=element.current, surface=canvas.current;
    if(!host||!surface||!active)return;
    const ctx=surface.getContext('2d');if(!ctx)return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const still=new URLSearchParams(location.search).has('capture')||paused;
    let frame=0,visible=false,w=400,h=280,t=elapsed.current,last=0,pointerX=0,pointerY=0,tiltX=0,tiltY=0;
    const glyphs='·.:+=x*#%';
    function render(now:number){
      if(!ctx||!surface)return;
      if(last&&!still&&!reduced.matches)t+=Math.min((now-last)/1000,.04);
      elapsed.current=t;last=now;tiltX+=(pointerX-tiltX)*.035;tiltY+=(pointerY-tiltY)*.035;
      ctx.clearRect(0,0,w,h);
      const dark=document.documentElement.dataset.theme==='dark';
      const rotation=t*.18+tiltX*.28,lean=.55+Math.sin(t*.35)*.42+tiltY*.2;
      const points=[];
      for(let i=0;i<1680;i++){
        const u=(i%56)/56*Math.PI*2,v=Math.floor(i/56)/30*Math.PI*2;
        const ripple=Math.sin(u*3+t*.65)*.035+Math.cos(v*2-u+t*.4)*.018;
        const r=.34+ripple,ring=.79+Math.sin(t*.35)*.015;
        let x=(ring+r*Math.cos(v))*Math.cos(u),y=r*Math.sin(v),z=(ring+r*Math.cos(v))*Math.sin(u);
        const x1=x*Math.cos(rotation)+z*Math.sin(rotation),z1=-x*Math.sin(rotation)+z*Math.cos(rotation);
        const y1=y*Math.cos(lean)-z1*Math.sin(lean),z2=y*Math.sin(lean)+z1*Math.cos(lean);
        const perspective=3.8/(3.8-z2),scale=Math.min(w*.35,h*.42);
        const glint=(Math.sin(u*1.4+v*.85+t*.22)+1)/2;
        const depth=(z2+1.2)/2.4;
        points.push({x:w/2+x1*scale*perspective,y:h*.48+y1*scale*perspective,z:z2,alpha:.08+depth*.57,font:5.5+depth*3.3,char:glyphs[Math.min(glyphs.length-1,Math.floor(glint*glyphs.length))],warm:glint>.74});
      }
      points.sort((a,b)=>a.z-b.z);
      ctx.textAlign='center';ctx.textBaseline='middle';
      for(const p of points){ctx.font=`${p.font}px "Geist Mono", monospace`;ctx.fillStyle=dark?`rgba(${p.warm?'213,153,100':'223,208,186'},${p.alpha})`:`rgba(${p.warm?'160,98,54':'55,39,27'},${p.alpha})`;ctx.fillText(p.char,p.x,p.y);}
      for(let j=0;j<14;j++){const a=j*2.399+t*.08,rad=Math.min(w*.43,h*.54);const x=w/2+Math.cos(a)*rad,y=h*.48+Math.sin(a)*rad*.45;ctx.fillStyle=dark?'#c9ab8235':'#89644235';ctx.fillRect(x,y,1.4,1.4);}
      if(visible&&!reduced.matches&&!still&&document.visibilityState==='visible')frame=requestAnimationFrame(render);
    }
    function restart(){cancelAnimationFrame(frame);last=0;frame=requestAnimationFrame(render);}
    const size=new ResizeObserver(([entry])=>{w=entry.contentRect.width;h=entry.contentRect.height;const ratio=Math.min(devicePixelRatio||1,2);surface.width=Math.round(w*ratio);surface.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);restart();});
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)restart();else{cancelAnimationFrame(frame);last=0;}},{threshold:.08});
    function move(event:PointerEvent){const r=host!.getBoundingClientRect();pointerX=(event.clientX-r.left)/r.width-.5;pointerY=(event.clientY-r.top)/r.height-.5;}
    function leave(){pointerX=0;pointerY=0;}
    function visibility(){if(document.visibilityState==='visible'&&visible)restart();else cancelAnimationFrame(frame);}
    size.observe(host);observer.observe(host);host.addEventListener('pointermove',move);host.addEventListener('pointerleave',leave);document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',restart);
    return()=>{cancelAnimationFrame(frame);size.disconnect();observer.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',restart);};
  },[active,paused]);
  if(!active)return null;
  return <div ref={element} className="da-hero-field"><canvas ref={canvas} aria-hidden="true"/><button className="da-hero-pause" aria-label={paused?"Play hero animation":"Pause hero animation"} onClick={()=>setPaused(!paused)}>{paused?"▶":"Ⅱ"}</button></div>;
}
