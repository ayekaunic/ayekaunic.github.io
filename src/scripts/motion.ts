import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const media = gsap.matchMedia();
media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 801px)', pointer: '(hover: hover) and (pointer: fine)' }, context => {
  const { motion, desktop, pointer } = context.conditions!;
  if (!motion) return;
  const cleanups: (() => void)[] = [];
  const experiment = document.querySelector<HTMLElement>('.word-experiment');
  if (experiment) {
    // The document supplies a complete readable statement. Motion scatters it,
    // then lets native scrolling assemble it without scroll interception.
    experiment.classList.add('is-moving');
    const poses = desktop
      ? [[-6,-12,-12,.72],[19,-8,8,.95],[9,19,-9,1.2],[-12,15,8,.65],[17,-2,-7,.78],[5,18,12,.65],[34,7,-8,.56]]
      : [[-3,-8,-9,.8],[10,-6,7,.85],[2,12,-7,1.05],[-5,12,6,.8],[8,0,-6,.85],[0,10,8,.8],[17,6,-5,.7]];
    const sequence = gsap.timeline({ scrollTrigger: {trigger:experiment,start:'top top+=90',end:'bottom bottom',scrub:.7,invalidateOnRefresh:true} });
    gsap.utils.toArray<HTMLElement>('[data-word]').forEach((word,i) => {
      const [x,y,rotation,scale] = poses[i];
      sequence.from(word, {x:()=>innerWidth*x/100,y:()=>innerHeight*y/100,rotation,scale,opacity:.45 + (i%3)*.2,ease:'power2.inOut',duration:1},0);
    });
    sequence.to('.fragment', {opacity:0,y:-24,stagger:.03,duration:.45},0)
      .from('.statement-source',{opacity:0,y:15,duration:.35},.65)
      .to('.scroll-cue',{opacity:0,duration:.2},.8);
    cleanups.push(()=>experiment.classList.remove('is-moving'));
  }
  document.querySelectorAll<HTMLElement>('.index-row').forEach((row,i)=>{
    gsap.from(row,{x:(i%2?1:-1)*(desktop?65:15),y:25,rotation:(i%2?1:-1)*1.5,opacity:.3,ease:'power2.out',scrollTrigger:{trigger:row,start:'top 97%',end:'top 73%',scrub:.6}});
  });
  document.querySelectorAll('[data-reveal]').forEach(el => gsap.from(el, {y:20,opacity:0,duration:.65,scrollTrigger:{trigger:el,start:'top 95%',once:true}}));
  if (pointer) {
    document.querySelectorAll<HTMLElement>('.word-body').forEach(word=>{
      const letters = [...word.querySelectorAll<HTMLElement>('.glyph')];
      const setters = letters.map(letter=>({y:gsap.quickTo(letter,'y',{duration:.35,ease:'power3.out'}),rotation:gsap.quickTo(letter,'rotation',{duration:.35}),scaleY:gsap.quickTo(letter,'scaleY',{duration:.35})}));
      const move = (event:PointerEvent) => {
        const box=word.getBoundingClientRect();
        const position=(event.clientX-box.left)/box.width;
        setters.forEach((set,i)=>{const distance=Math.abs(position-(i+.5)/letters.length);const influence=Math.max(0,1-distance*3);set.y(-influence*18);set.rotation((position-.5)*influence*12);set.scaleY(1+influence*.22);});
      };
      const reset = ()=>setters.forEach(set=>{set.y(0);set.rotation(0);set.scaleY(1);});
      word.addEventListener('pointermove',move);word.addEventListener('pointerleave',reset);
      cleanups.push(()=>{word.removeEventListener('pointermove',move);word.removeEventListener('pointerleave',reset);});
    });
  }
  return ()=>cleanups.forEach(cleanup=>cleanup());
});

const random = document.querySelector<HTMLButtonElement>('#random-thought');
random?.addEventListener('click', () => { const paths: string[] = JSON.parse(random.dataset.paths || '[]'); if(paths.length) window.location.href = paths[Math.floor(Math.random()*paths.length)]; });
document.querySelector('[data-top]')?.addEventListener('click', event=>{ event.preventDefault(); window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); });
const progress = document.querySelector<HTMLElement>('.reading-progress');
if(progress) { const update=()=>{ const article=document.querySelector('.prose'); if(!article)return; const rect=article.getBoundingClientRect(); progress.style.transform=`scaleX(${Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(rect.height+window.innerHeight)))})`; }; window.addEventListener('scroll',update,{passive:true}); window.addEventListener('resize',update); update(); }
