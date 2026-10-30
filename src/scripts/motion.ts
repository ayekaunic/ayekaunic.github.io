import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  if (document.querySelector('.hero')) {
    gsap.from('.hero-line', { y: 100, opacity: 0, duration: 1.2, stagger: .14, ease: 'power4.out' });
    gsap.from('.hero-kicker, .hero-baseline, .hero-rule', { opacity: 0, y: 15, duration: .9, stagger: .15, delay: .35 });
    gsap.to('.hero-asterisk', { rotation: 120, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  }
  document.querySelectorAll('[data-reveal]').forEach(el => gsap.from(el, { y: 28, opacity: 0, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 96%', once: true } }));
  if (document.querySelector('.belief-star')) gsap.to('.belief-star', { rotation: 160, scrollTrigger:{trigger:'.belief-section',start:'top bottom',end:'bottom top',scrub:1} });
});
const random = document.querySelector<HTMLButtonElement>('#random-thought');
random?.addEventListener('click', () => { const paths: string[] = JSON.parse(random.dataset.paths || '[]'); if(paths.length) window.location.href = paths[Math.floor(Math.random()*paths.length)]; });
document.querySelector('[data-top]')?.addEventListener('click', e=>{ e.preventDefault(); window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); });
const progress = document.querySelector<HTMLElement>('.reading-progress');
if(progress) { const update=()=>{ const article=document.querySelector('.prose'); if(!article)return; const rect=article.getBoundingClientRect(); const progressValue=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(rect.height+window.innerHeight))); progress.style.transform=`scaleX(${progressValue})`; }; window.addEventListener('scroll',update,{passive:true}); window.addEventListener('resize',update); update(); }
