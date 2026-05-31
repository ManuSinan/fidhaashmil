/* ══ Scratch-card overlay ══ */
(function () {
  const overlay  = document.getElementById('scratch-overlay');
  const canvas   = document.getElementById('scratch-canvas');
  const hintEl   = document.getElementById('so-hint');
  const ringEl   = document.getElementById('so-seal-ring');
  const skipBtn  = document.getElementById('so-skip');
  if (!overlay || !canvas) return;

  /* Lock scroll on main page while overlay is visible */
  document.body.style.overflow = 'hidden';

  const SIZE = 200;
  canvas.width  = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  const CX = SIZE / 2, CY = SIZE / 2, R = SIZE / 2;

  /* ── Draw the golden wax seal ── */
  function drawSeal() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.clip();

    /* Gold radial gradient */
    const g = ctx.createRadialGradient(CX - 38, CY - 38, 8, CX, CY, R);
    g.addColorStop(0,    '#f6e98a');
    g.addColorStop(0.28, '#d4aa50');
    g.addColorStop(0.62, '#b8882a');
    g.addColorStop(1,    '#7a5010');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, SIZE, SIZE);

    /* Concentric rings */
    [R - 5, R - 14, R - 23].forEach((r, i) => {
      ctx.beginPath();
      ctx.arc(CX, CY, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,245,175,${0.3 - i * 0.07})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    /* 8-pointed star */
    const outerR = 34, innerR = 14, pts = 8;
    ctx.beginPath();
    for (let i = 0; i < pts * 2; i++) {
      const rad = i % 2 === 0 ? outerR : innerR;
      const ang = (i * Math.PI / pts) - Math.PI / 2;
      i === 0
        ? ctx.moveTo(CX + Math.cos(ang) * rad, CY + Math.sin(ang) * rad)
        : ctx.lineTo(CX + Math.cos(ang) * rad, CY + Math.sin(ang) * rad);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,245,175,0.28)';
    ctx.fill();

    /* Centre Arabic symbol */
    ctx.font = 'bold 48px serif';
    ctx.fillStyle = 'rgba(255,248,185,0.62)';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('و', CX, CY + 2);

    /* Instruction arc text */
    ctx.font = '9.5px sans-serif';
    ctx.fillStyle = 'rgba(255,248,190,0.88)';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('✦  SCRATCH TO REVEAL  ✦', CX, CY + 72);

    ctx.restore();
  }

  drawSeal();

  /* ── Interaction state ── */
  let isDown = false, revealed = false, scratches = 0, hasStarted = false;

  function getPos(e) {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = SIZE / rect.width;
    const scaleY = SIZE / rect.height;
    const src    = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top)  * scaleY
    };
  }

  function scratch(pos) {
    if (!hasStarted) {
      hasStarted = true;
      if (ringEl) ringEl.style.animation = 'none';
      if (hintEl) hintEl.classList.add('so-hint-fade');
    }
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    scratches++;
    if (scratches % 6 === 0) checkReveal();
  }

  function checkReveal() {
    if (revealed) return;
    const px = ctx.getImageData(0, 0, SIZE, SIZE).data;
    let transparent = 0;
    for (let i = 3; i < px.length; i += 4) {
      if (px[i] < 128) transparent++;
    }
    if (transparent / (SIZE * SIZE) * 100 > 40) dismiss();
  }

  function dismiss() {
    if (revealed) return;
    revealed = true;
    document.body.style.overflow = '';
    if (hintEl) hintEl.textContent = '✦  Alhamdulillah  ✦';
    if (hintEl) hintEl.style.opacity = '1';
    setTimeout(() => {
      overlay.classList.add('so-dismissed');
      overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    }, 550);
  }

  /* Mouse events */
  canvas.addEventListener('mousedown',  e => { isDown = true;  scratch(getPos(e)); });
  canvas.addEventListener('mousemove',  e => { if (isDown) scratch(getPos(e)); });
  window.addEventListener('mouseup',    ()  => { isDown = false; });

  /* Touch events */
  canvas.addEventListener('touchstart', e => { e.preventDefault(); isDown = true;  scratch(getPos(e)); }, { passive: false });
  canvas.addEventListener('touchmove',  e => { e.preventDefault(); if (isDown) scratch(getPos(e)); },    { passive: false });
  window.addEventListener('touchend',   () => { isDown = false; });

  /* Skip */
  if (skipBtn) skipBtn.addEventListener('click', dismiss);
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
