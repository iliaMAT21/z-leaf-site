// init.js
// Инициализация всех функций при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing all features...");
});

fetch('strains.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('strains-container');
    data.forEach(strain => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="images/${strain.image}" alt="${strain.name}">
        <h3>${strain.name}</h3>
        <p>${'★'.repeat(Math.floor(strain.rating))}</p>
        <p>${strain.description.slice(0, 100)}...</p>
      `;
      card.addEventListener('click', () => openModal(strain));
      container.appendChild(card);
    });
  });
