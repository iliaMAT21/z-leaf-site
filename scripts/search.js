document.getElementById("search").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    document.querySelectorAll(".strain-card").forEach(card => {
        const title = card.querySelector("h2").textContent.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
    });
});
