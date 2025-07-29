document.addEventListener("DOMContentLoaded", () => {
    fetch('strains.json')
        .then(response => response.json())
        .then(strains => renderStrains(strains));

    function renderStrains(strains) {
        const container = document.getElementById("strains-container");
        container.innerHTML = "";

        strains.forEach(strain => {
            const card = document.createElement("div");
            card.className = "strain-card";
            card.innerHTML = `
                <img src="images/${strain.image}" alt="${strain.name}">
                <h2>${strain.name}</h2>
                <p class="rating">${"★".repeat(strain.rating)}</p>
                <p class="short-desc">${strain.short}</p>
            `;
            card.addEventListener("click", () => openModal(strain));
            container.appendChild(card);
        });
    }
});
