function openModal(strain) {
    document.getElementById("modal-image").src = `images/${strain.image}`;
    document.getElementById("modal-title").textContent = strain.name;
    document.getElementById("modal-type").textContent = `Type: ${strain.type}`;
    document.getElementById("modal-origin").textContent = `Origin: ${strain.origin}`;
    document.getElementById("modal-rating").textContent = `Rating: ${strain.rating}★`;

    // Обрезка описания для удобства чтения
    let desc = strain.description;
    if (desc.length > 800) {
        desc = desc.slice(0, 800) + "...";
    }
    document.getElementById("modal-description").textContent = desc;

    document.getElementById("strain-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden"; // чтобы не скроллился фон
}

function closeModal() {
    document.getElementById("strain-modal").classList.add("hidden");
    document.body.style.overflow = "auto";
}
