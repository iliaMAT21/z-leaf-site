document.querySelectorAll(".strain-card").forEach(card => {
    card.addEventListener("mouseover", () => {
        card.style.transform = "scale(1.05)";
        card.style.boxShadow = "0 0 15px gold";
    });
    card.addEventListener("mouseout", () => {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "none";
    });
});
