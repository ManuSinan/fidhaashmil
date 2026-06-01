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

/* ══ Interactive Video Curtain ══ */
const playOverlay = document.getElementById('play-overlay');
const heroVideo = document.getElementById('hero-video');

let videoEnded = false;

// Start unmuted when user initiates interaction
if (heroVideo) {
  heroVideo.muted = false;
  
  // Prevent replay once video ends
  heroVideo.addEventListener('ended', () => {
    videoEnded = true;
  });
}

if (playOverlay && heroVideo) {
  playOverlay.addEventListener('click', () => {
    if (!playOverlay.classList.contains('opened')) {
      playOverlay.classList.add('opened');
      
      // Play video with audio
      heroVideo.play().catch(err => {
        console.warn('Playback failed. Retrying muted...', err);
        heroVideo.muted = true;
        heroVideo.play().catch(e => console.error('Muted playback failed:', e));
      });

      // Disable interaction on play overlay after it fades out
      setTimeout(() => {
        playOverlay.style.pointerEvents = 'none';
      }, 800);
    }
  });

  // Tap video to play/pause after opened (only if it hasn't ended)
  heroVideo.addEventListener('click', () => {
    if (playOverlay.classList.contains('opened') && !videoEnded) {
      if (heroVideo.paused) {
        heroVideo.play().catch(e => console.error(e));
      } else {
        heroVideo.pause();
      }
    }
  });
}

