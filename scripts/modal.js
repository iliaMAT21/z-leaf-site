// modal.js
// Модальное окно для сортов или истории (если будет нужно)

function closeModal() {
  document.getElementById('strain-modal').classList.add('hidden');
}

function openModal(data) {
  document.getElementById('modal-image').src = `images/${data.image}`;
  document.getElementById('modal-title').textContent = data.name;
  document.getElementById('modal-type').textContent = `Type: ${data.type}`;
  document.getElementById('modal-origin').textContent = `Origin: ${data.origin}`;
  document.getElementById('modal-rating').textContent = `Rating: ${data.rating}★`;
  document.getElementById('modal-description').textContent = data.description;
  document.getElementById('strain-modal').classList.remove('hidden');
}
