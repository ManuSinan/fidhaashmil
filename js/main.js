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
const card = document.getElementById('letter-card');
const envelope = document.getElementById('envelope');

function calculateCardTransform() {
  const heroImg = document.querySelector('.hero-poster__img');
  if (heroImg && card && envelope && envelopeContainer) {
    const heroRect = heroImg.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const envelopeRect = envelope.getBoundingClientRect();
    
    // The target width of the card is the hero image width
    const targetWidth = heroRect.width;
    const scale = targetWidth / cardRect.width;
    
    // Compute card's initial viewport top position
    const cardStyleTop = parseFloat(window.getComputedStyle(card).top) || 16;
    const cardInitialViewportTop = envelopeRect.top + cardStyleTop;
    
    // The hero image's viewport top is 0 (since scroll is locked at 0)
    const targetViewportTop = heroRect.top;
    
    // With transform-origin: top center, translateY is the distance from card's initial viewport top to target viewport top
    const translateY = targetViewportTop - cardInitialViewportTop;
    
    envelopeContainer.style.setProperty('--card-translate-y', `${translateY}px`);
    envelopeContainer.style.setProperty('--card-scale', `${scale}`);
  }
}

// Calculate on load and resize
window.addEventListener('load', calculateCardTransform);
window.addEventListener('resize', calculateCardTransform);

if (envelopeContainer) {
  envelopeContainer.addEventListener('click', () => {
    // Prevent double triggers
    if (envelopeContainer.classList.contains('open')) return;
    
    // Recalculate layout metrics right before animation to be perfectly accurate
    calculateCardTransform();
    
    envelopeContainer.classList.add('open');
    
    // Coordination of transitions:
    // 1. Seal fades/scales to 0 (0s -> 0.4s)
    // 2. Top flap opens/rotates 180deg (0.4s -> 1.0s)
    // 3. Inner card slides upwards and scales to fit the hero image (1.0s -> 2.0s)
    
    // Step 4: Fade out the entire envelope container to reveal the identical hero card underneath (takes 0.6s)
    setTimeout(() => {
      envelopeContainer.classList.add('fade-out');
    }, 2000);
    
    // Step 5: Clean up after fade-out is fully complete (2.0s + 0.6s = 2.6s)
    setTimeout(() => {
      envelopeContainer.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }, 2600);
  });
}
