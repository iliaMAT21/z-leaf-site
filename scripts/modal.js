function openModal(strain) {
    document.getElementById("modal-image").src = `images/${strain.image}`;
    document.getElementById("modal-title").textContent = strain.name;
    document.getElementById("modal-type").textContent = `Type: ${strain.type}`;
    document.getElementById("modal-origin").textContent = `Origin: ${strain.origin}`;
    document.getElementById("modal-rating").textContent = `Rating: ${strain.rating}★`;
    document.getElementById("modal-description").textContent = strain.description;
    document.getElementById("strain-modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("strain-modal").classList.add("hidden");
}
