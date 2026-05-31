/* ══ Theatre Curtain Overlay ══ */
(function () {
  const overlay = document.getElementById('curtain-overlay');
  const hint    = document.getElementById('cv-hint');
  if (!overlay) return;

  /* Prevent main page from scrolling while curtain is up */
  document.body.style.overflow = 'hidden';

  let opened = false;

  function openCurtains() {
    if (opened) return;
    opened = true;
    /* Hide tap hint immediately */
    if (hint) hint.style.opacity = '0';
    /* Trigger curtain sweep */
    overlay.classList.add('cv-open');
    /* Restore scroll partway through so content is ready */
    setTimeout(() => { document.body.style.overflow = ''; }, 1000);
    /* Fade overlay once curtains are fully open */
    setTimeout(() => overlay.classList.add('cv-fade'), 1950);
    /* Remove overlay from DOM after fade */
    setTimeout(() => overlay.remove(), 2700);
  }

  /* Auto-open after delay */
  const autoTimer = setTimeout(openCurtains, 1500);

  /* Or tap / click anywhere to open immediately */
  overlay.addEventListener('click',      () => { clearTimeout(autoTimer); openCurtains(); }, { once: true });
  overlay.addEventListener('touchstart', () => { clearTimeout(autoTimer); openCurtains(); }, { once: true, passive: true });
})();

/* ══ Countdown timer ══ */
const wedding = new Date('2026-07-12T10:30:00');
function tick(){
  const diff = wedding - new Date();
  if(diff<=0){document.querySelector('.countdown-grid').innerHTML='<p style="color:#fff;font-family:Cinzel,serif;font-size:0.85rem;letter-spacing:0.15em;padding:1.5rem;text-align:center;width:100%">Alhamdulillah — The Big Day is Here!</p>';return;}
  const pad=n=>String(Math.floor(n)).padStart(2,'0');
  document.getElementById('cd-days').textContent=pad(diff/86400000);
  document.getElementById('cd-hours').textContent=pad((diff%86400000)/3600000);
  document.getElementById('cd-mins').textContent=pad((diff%3600000)/60000);
  document.getElementById('cd-secs').textContent=pad((diff%60000)/1000);
}
tick(); setInterval(tick,1000);

const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible');});},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
