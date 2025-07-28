fetch('strains.json')
  .then(res => res.json())
  .then(data => {
    window.strainsData = data;
    renderStrains(data);
  })
  .catch(err => {
    console.error('Ошибка при загрузке strains.json:', err);
  });

function renderStrains(strains) {
  const grid = document.getElementById('strain-grid');
  grid.innerHTML = '';

  for (const strain of strains) {
    const card = document.createElement('div');
    card.className = 'strain-card';
    card.innerHTML = `
      <img src="images/${strain.image}" alt="${strain.name}">
      <h2>${strain.name}</h2>
      <div class="strain-description">${strain.shortDescription}</div>
    `;
    card.onclick = () => showStrain(strain);
    grid.appendChild(card);
  }
}

function filterStrains() {
  const search = document.getElementById('search').value.toLowerCase();
  const filtered = window.strainsData.filter(strain =>
    strain.name.toLowerCase().includes(search)
  );
  renderStrains(filtered);
}

function showStrain(strain) {
  document.getElementById('modal-title').innerText = strain.name;
  document.getElementById('modal-desc').innerText = strain.description;
  document.getElementById('modal-img').src = `images/${strain.image}`;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function toggleMenu() {
  const nav = document.getElementById('nav-links');
  nav.classList.toggle('open');
}
