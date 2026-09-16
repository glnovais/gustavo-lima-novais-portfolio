import { useEffect, useState } from 'react';
export default function ScrollProgress(){
  const [p,setP]=useState(0);
  useEffect(()=>{const fn=()=>{const d=document.documentElement; const max=d.scrollHeight-d.clientHeight; setP(max>0?(d.scrollTop/max)*100:0)}; fn(); addEventListener('scroll',fn,{passive:true}); return()=>removeEventListener('scroll',fn)},[]);
  return <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-300 z-[90]" style={{width:`${p}%`}} aria-hidden="true"/>;
}
