let allStrains = [];

// Загружаем JSON и рендерим
fetch('strains.json')
  .then(res => res.json())
  .then(data => {
    allStrains = data;
    renderStrains(allStrains);
  })
  .catch(err => console.error('Ошибка загрузки strains.json:', err));

// Функция рендера сортов
function renderStrains(data) {
  const container = document.getElementById('strains-container');
  container.innerHTML = '';

  data.forEach(strain => {
    container.innerHTML += `
      <div class="strain-card" onclick="openModal('${strain.name}')">
        <img src="${strain.image}" alt="${strain.name}">
        <h2>${strain.name}</h2>
        <p>${strain.effects ? strain.effects.join(', ') : 'No effects listed'}</p>
      </div>
    `;
  });
}

// Поиск
document.getElementById('search').addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = allStrains.filter(s => 
    s.name.toLowerCase().includes(query) ||
    (s.effects && s.effects.some(eff => eff.toLowerCase().includes(query))) ||
    (s.type && s.type.toLowerCase().includes(query)) ||
    (s.origin && s.origin.toLowerCase().includes(query))
  );
  renderStrains(filtered);
});

// Открытие модалки
function openModal(name) {
  const strain = allStrains.find(s => s.name === name);
  if (!strain) return;

  document.getElementById('modal-image').src = strain.image;
  document.getElementById('modal-title').innerText = strain.name;
  document.getElementById('modal-type').innerText = `Type: ${strain.type || 'Unknown'}`;
  document.getElementById('modal-origin').innerText = `Origin: ${strain.origin || 'Unknown'}`;
  document.getElementById('modal-rating').innerText = `Rating: ${strain.rating || '?'}★`;
  document.getElementById('modal-description').innerText = strain.description || (strain.effects ? strain.effects.join(', ') : 'No description');

  document.getElementById('strain-modal').classList.remove('hidden');
}

// Закрытие модалки
function closeModal() {
  document.getElementById('strain-modal').classList.add('hidden');
}

// Random Strain
function randomStrain() {
  if (allStrains.length === 0) return;
  const random = allStrains[Math.floor(Math.random() * allStrains.length)];
  openModal(random.name);
}
