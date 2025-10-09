document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("chars");
  const modal = document.getElementById("charModal");
  const modalTitle = modal.querySelector(".modal__title");
  const modalBody = modal.querySelector(".modal__body");
  const modalClose = modal.querySelector(".modal__close");

  fetch("assets/characters.json")
    .then(res => {
      if (!res.ok) throw new Error("Не удалось загрузить characters.json");
      return res.json();
    })
    .then(data => {
      data.forEach(char => {
        const card = document.createElement("div");
        card.className = "char-card";
        card.style.cssText = `
          background: var(--panel);
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          text-align: center;
          transition: transform .2s ease;
        `;

        card.innerHTML = `
          <img src="${char.image}" alt="${char.name}" style="max-width:100%;border-radius:8px;margin-bottom:8px">
          <h4>${char.name}</h4>
          <p style="color:var(--muted);margin:4px 0">${char.role}</p>
          <button class="btn-more" style="
            margin-top:8px;
            background:linear-gradient(90deg, var(--accent-2), rgba(0, 0, 0, 0));;
            color:white;
            border:none;
            padding:8px 12px;
            border-radius:8px;
            cursor:pointer;
          ">Подробнее</button>
        `;

        card.querySelector(".btn-more").addEventListener("click", () => {
          modalTitle.textContent = char.name;
          modalBody.innerHTML = `
            <img src="${char.image}" alt="${char.name}" style="max-width:100%;border-radius:10px;margin-bottom:10px;">
            <p><strong>Роль:</strong> ${char.role}</p>
            <p>${char.bio}</p>
          `;
          modal.style.display = "flex";
        });

        card.addEventListener("mouseenter", () => { card.style.transform = "scale(1.05)"; });
        card.addEventListener("mouseleave", () => { card.style.transform = "scale(1)"; });

        container.appendChild(card);
      });
    })
    .catch(err => {
      container.innerHTML = `<p style="color:red">Ошибка: ${err.message}</p>`;
      console.error(err);
    });

  modalClose.addEventListener("click", () => { modal.style.display = "none"; });
  modal.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
});
