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
