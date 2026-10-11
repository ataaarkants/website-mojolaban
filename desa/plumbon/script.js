// tanggal & jam (WIB)
function tick(){
  const d=new Date();
  const p=n=>String(n).padStart(2,'0');
  const tglEl = document.getElementById('tgl');
  const jamEl = document.getElementById('jam');
  if (tglEl) tglEl.textContent='Tanggal: '+p(d.getDate())+'-'+p(d.getMonth()+1)+'-'+d.getFullYear();
  if (jamEl) jamEl.textContent='Pukul: '+p(d.getHours())+':'+p(d.getMinutes())+':'+p(d.getSeconds())+' WIB';
}
tick();
setInterval(tick,1000);

// filter galeri (Semua / Foto / Video)
const fbtns=document.querySelectorAll('#filters button');
fbtns.forEach(b=>b.addEventListener('click',()=>{
  fbtns.forEach(x=>x.classList.remove('on'));
  b.classList.add('on');
  const f=b.dataset.f;
  let shown=0;
  document.querySelectorAll('#galeri-grid .gcard').forEach(c=>{
    const ok=f==='all'||c.dataset.t===f;
    c.style.display=ok?'':'none';
    if(ok) shown++;
  });
  const emptyEl = document.getElementById('galeri-empty');
  if (emptyEl) emptyEl.hidden=shown>0;
}));

// menu mobile
const menu=document.getElementById('menu');
const burger=document.getElementById('burger');
if (burger && menu) {
  burger.onclick=()=>menu.classList.toggle('open');
}
document.querySelectorAll('.has-sub>a').forEach(a=>a.addEventListener('click',e=>{
  if(window.innerWidth<=1180){
    e.preventDefault();
    a.parentElement.classList.toggle('open');
  }
}));

// Tautan kembali ke Portal Kecamatan Mojolaban dan Desa Lainnya
(function initPortalBackLink(){
  const topbar = document.querySelector('.topbar .container');
  if (topbar && !document.getElementById('portal-kecamatan-link')) {
    const portalDiv = document.createElement('div');
    portalDiv.id = 'portal-kecamatan-link';
    portalDiv.style.display = 'inline-flex';
    portalDiv.style.alignItems = 'center';
    portalDiv.style.gap = '14px';
    portalDiv.style.flexWrap = 'wrap';
    portalDiv.innerHTML = `
      <a href="../../index.html" style="color:#ffd54f;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:4px">Portal Kecamatan</a>
      <span style="opacity:0.5">|</span>
      <a href="../palur/index.html" style="color:#fff;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:4px">Ke Desa Palur</a>
      <span style="opacity:0.5">|</span>
      <a href="../gadingan/index.html" style="color:#fff;font-weight:500;text-decoration:none;display:inline-flex;align-items:center;gap:4px">Ke Desa Gadingan</a>
    `;
    topbar.insertBefore(portalDiv, topbar.firstChild);
  }
})();
