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

/* ── 3D Envelope Opening Animation Orchestration ── */
const envelopeContainer = document.getElementById('envelope-container');
const fadeOverlay = document.getElementById('fade-overlay');

if (envelopeContainer && fadeOverlay) {
  envelopeContainer.addEventListener('click', () => {
    // Prevent double triggers
    if (envelopeContainer.classList.contains('open')) return;
    
    envelopeContainer.classList.add('open');
    
    // Coordination of transitions:
    // 1. Seal fades/scales to 0 (0s -> 0.4s)
    // 2. Top flap opens/rotates 180deg (0.4s -> 1.0s)
    // 3. Inner card slides upwards out of the envelope (1.0s -> 1.8s)
    
    // Step 4: Fade in the solid white screen overlay (takes 0.6s)
    setTimeout(() => {
      fadeOverlay.classList.add('visible');
    }, 1800);
    
    // Step 5: Clean up after fade-in is fully complete (1.8s + 0.6s = 2.4s)
    setTimeout(() => {
      envelopeContainer.style.display = 'none';
      document.body.classList.remove('no-scroll');
      fadeOverlay.classList.remove('visible');
    }, 2400);
  });
}
