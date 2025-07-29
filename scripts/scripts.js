let strainsData = [];
let compareList = [];

function renderStrains(data) {
  const container = document.getElementById('strains-container');
  container.innerHTML = '';
  data.forEach(strain => {
    container.innerHTML += `
      <div class="strain-card" onclick="openModal('${strain.name}')">
        <img src="${strain.image}" alt="${strain.name}">
        <h2>${strain.name}</h2>
        <p>${strain.effects ? strain.effects.join(', ') : ''}</p>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
    fetch('strains.json')
        .then(res => res.json())
        .then(data => {
            strainsData = data;
            renderAll(data);
            renderFilters(data);
            renderTopRated(data);
            initAnimations();
        });

    document.getElementById("search").addEventListener("input", searchStrains);
    document.getElementById("random-btn").addEventListener("click", randomStrain);
});

function renderAll(data) {
    const container = document.getElementById("strains-container");
    container.innerHTML = "";

    data.forEach(strain => {
        const card = document.createElement("div");
        card.className = "strain-card";
        card.innerHTML = `
            <img src="images/${strain.image}" alt="${strain.name}">
            <h2>${strain.name}</h2>
            <p class="rating">${"★".repeat(strain.rating)}</p>
            <p class="short-desc">${strain.short}</p>
            <div class="effects">${strain.effects.map(e => `<span>${e}</span>`).join(", ")}</div>
        `;
        card.addEventListener("click", () => openModal(strain));
        container.appendChild(card);
    });
    initAnimations();
}

function renderFilters(data) {
    const types = [...new Set(data.map(s => s.type))];
    const regions = [...new Set(data.map(s => s.origin))];
    const effects = [...new Set(data.flatMap(s => s.effects))];

    makeFilterButtons("type-filters", types, "type");
    makeFilterButtons("region-filters", regions, "origin");
    makeFilterButtons("effect-filters", effects, "effects");
}

function makeFilterButtons(id, items, key) {
    const container = document.getElementById(id);
    container.innerHTML = "";
    items.forEach(item => {
        const btn = document.createElement("button");
        btn.textContent = item;
        btn.addEventListener("click", () => filterBy(key, item, btn));
        container.appendChild(btn);
    });
}

function filterBy(key, value, btn) {
    document.querySelectorAll(`#${btn.parentElement.id} button`).forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    let filtered;
    if (key === "effects") {
        filtered = strainsData.filter(s => s.effects.includes(value));
    } else {
        filtered = strainsData.filter(s => s[key] === value);
    }
    renderAll(filtered);
}

function searchStrains(e) {
    const q = e.target.value.toLowerCase();
    renderAll(strainsData.filter(s => s.name.toLowerCase().includes(q) || s.type.toLowerCase().includes(q) || s.origin.toLowerCase().includes(q)));
}

function randomStrain() {
    const strain = strainsData[Math.floor(Math.random() * strainsData.length)];
    openModal(strain);
}

function openModal(strain) {
    document.getElementById("modal-image").src = `images/${strain.image}`;
    document.getElementById("modal-title").textContent = strain.name;
    document.getElementById("modal-type").textContent = `Type: ${strain.type}`;
    document.getElementById("modal-origin").textContent = `Origin: ${strain.origin}`;
    document.getElementById("modal-rating").textContent = `Rating: ${strain.rating}★`;
    document.getElementById("modal-effects").textContent = `Effects: ${strain.effects.join(", ")}`;
    document.getElementById("modal-description").textContent = strain.description;
    document.getElementById("strain-modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("strain-modal").classList.add("hidden");
}

function renderTopRated(data) {
    const top3 = [...data].sort((a,b) => b.rating - a.rating).slice(0,3);
    const container = document.getElementById("top-rated-container");
    container.innerHTML = "";
    top3.forEach(strain => {
        const card = document.createElement("div");
        card.className = "strain-card";
        card.innerHTML = `
            <img src="images/${strain.image}" alt="${strain.name}">
            <h2>${strain.name}</h2>
            <p class="rating">${"★".repeat(strain.rating)}</p>
        `;
        card.addEventListener("click", () => openModal(strain));
        container.appendChild(card);
    });
}

function toggleTheme() {
    document.body.classList.toggle("light-theme");
}

function initAnimations() {
    const cards = document.querySelectorAll(".strain-card");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: 0.2 });
    cards.forEach(card => observer.observe(card));
}

fetch('strains.json')
  .then(res => res.json())
  .then(data => {
    renderStrains(data); // имя функции должно совпадать с определением
  });
