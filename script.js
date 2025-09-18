
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery__img').forEach(img => {
    img.addEventListener('click', (e) => {
      const lb = document.getElementById('lightbox');
      const lbImg = lb.querySelector('.lightbox__img');
      lbImg.src = e.currentTarget.dataset.full || e.currentTarget.src;
      lb.classList.add('open');
    });
  });
  document.getElementById('lightbox').addEventListener('click', (e)=>{
    if(e.target.id === 'lightbox' || e.target.classList.contains('lightbox__close')){
      e.currentTarget.classList.remove('open');
    }
  });

  fetch('assets/characters.json')
    .then(r=>r.json())
    .then(data=>{
      const wrap = document.getElementById('chars');
      data.forEach(ch => {
        const el = document.createElement('div');
        el.className = 'card char';
        el.innerHTML = `<div class="char__avatar">${ch.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
          <div class="char__meta">
            <div class="char__name">${ch.name}</div>
            <div class="char__role">${ch.role}</div>
            <div style="margin-top:8px;color:var(--muted)">${ch.bio}</div>
            <div style="margin-top:10px"><a class="btn btn--accent" href="#" data-id="${ch.id}">Подробнее</a></div>
          </div>`;
        wrap.appendChild(el);
      });

      wrap.addEventListener('click', (ev)=>{
        const btn = ev.target.closest('.btn');
        if(!btn) return;
        ev.preventDefault();
        const id = btn.dataset.id;
        const ch = data.find(x=>String(x.id) === String(id));
        if(!ch) return;

        const modal = document.getElementById('charModal');
        modal.querySelector('.modal__title').textContent = ch.name;
        modal.querySelector('.modal__body').textContent = ch.bio;
        modal.classList.add('open');
      });
    });

  document.querySelectorAll('.modal__close').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.currentTarget.closest('.modal').classList.remove('open');
    });
  });
});
