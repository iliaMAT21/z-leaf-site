document.addEventListener("DOMContentLoaded", () => {
  fetch("strains.json")
    .then(res => res.json())
    .then(data => renderStrains(data))
    .catch(err => console.error("Ошибка загрузки strains.json:", err));
});

function renderStrains(strains) {
  const container = document.getElementById("strain-grid");
  strains.forEach(strain => {
    const card = document.createElement("div");
    card.className = "strain-card";
    card.onclick = () => showStrainModal(strain);
    card.innerHTML = `
      <img src="${strain.image}" alt="${strain.name}">
      <h2>${strain.name}</h2>
      <div class="strain-description">
        ${strain.emoji} ${strain.type} | 📍 ${strain.region} | ${"⭐".repeat(strain.rating)}<br>
        ${strain.highlight}
      </div>
    `;
    container.appendChild(card);
  });
}

function showStrainModal(strain) {
  document.getElementById("modal-title").innerText = strain.name;
  document.getElementById("modal-img").src = strain.image;
  document.getElementById("modal-desc").innerText = strain.description;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function filterStrains() {
  const search = document.getElementById("search").value.toLowerCase();
  const cards = document.querySelectorAll(".strain-card");
  cards.forEach(card => {
    const title = card.querySelector("h2").innerText.toLowerCase();
    card.style.display = title.includes(search) ? "block" : "none";
  });
}

function toggleMenu() {
  const nav = document.getElementById("nav-links");
  nav.classList.toggle("active");
}
