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

/* ══ Video Intro Logic ══ */
(function() {
  const overlay = document.getElementById('video-intro-overlay');
  if (!overlay) return;

  const video = document.getElementById('intro-video');
  let revealed = false;

  function playAnimation() {
    if (video.paused) {
      video.play().then(() => {
        const tapInstruction = document.querySelector('.video-tap-instruction');
        if (tapInstruction) {
          tapInstruction.style.opacity = '0';
          tapInstruction.style.transform = 'translate(-50%, 10px) scale(0.95)';
          tapInstruction.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          setTimeout(() => tapInstruction.remove(), 500);
        }
      }).catch(err => {
        console.error("Playback failed, bypassing intro video:", err);
        revealInvitation();
      });
    }
  }

  function revealInvitation() {
    if (revealed) return;
    revealed = true;

    // Pause video
    video.pause();

    // Add fade-out classes
    overlay.classList.add('fade-out');
    document.body.classList.remove('no-scroll');

    // Clean up DOM after transition
    setTimeout(() => {
      overlay.remove();
    }, 1000);
  }

  // Tap anywhere on the overlay to start/play the animation (click + touchstart for fast response)
  overlay.addEventListener('click', playAnimation);
  overlay.addEventListener('touchstart', playAnimation, { passive: true });

  // Automatically transition when video ends
  video.addEventListener('ended', revealInvitation);

  // Fallback: If video error occurs (e.g. unsupported codec), skip overlay immediately
  video.addEventListener('error', revealInvitation);
})();



