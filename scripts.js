let allStrains = [];

async function loadStrains() {
  const res = await fetch('strains.json');
  allStrains = await res.json();
  renderStrains(allStrains);
}

function createStrainCard(strain) {
  const card = document.createElement('div');
  card.className = 'strain-card';
  card.innerHTML = `
    <img src="${strain.image}" alt="${strain.name}" onerror="this.style.display='none';">
    <h3>${strain.name}</h3>
    <div class="stars">${'★'.repeat(Math.round(strain.rating))}</div>
    <p class="short-desc">${strain.effect.split('.')[0]}.</p>
  `;
  card.onclick = () => openModal(strain);
  return card;
}

function renderStrains(list) {
  const grid = document.getElementById('strain-grid');
  grid.innerHTML = '';
  list.forEach(strain => grid.appendChild(createStrainCard(strain)));
}

function filterStrains() {
  const query = document.getElementById('search').value.toLowerCase();
  const filtered = allStrains.filter(strain =>
    strain.name.toLowerCase().includes(query) ||
    strain.effect.toLowerCase().includes(query) ||
    strain.type.toLowerCase().includes(query) ||
    strain.origin.toLowerCase().includes(query)
  );
  renderStrains(filtered);
}

function openModal(strain) {
  document.getElementById('modal-title').textContent = strain.name;
  document.getElementById('modal-img').src = strain.image;
  document.getElementById('modal-desc').textContent = `Type: ${strain.type}\nOrigin: ${strain.origin}\nRating: ${strain.rating}★\n\n${strain.effect}`;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

loadStrains();
