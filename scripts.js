const strains = {
  'Gusher': {
    en: "Type: Hybrid\nTHC: ~22–24%\nRegion: California, USA\nRating: ⭐⭐⭐⭐☆\n\n🍇 Gusher is a potent hybrid bred from Gelato #41 and Triangle Kush. Known for its delicious tropical-fruit and creamy taste, it delivers a relaxing yet euphoric body high. Perfect for evening wind-downs and pain relief, it's also visually striking with purple hues and frosty trichomes. Highly praised in California dispensaries, users report reduced anxiety, improved mood, and creative bursts. A top-shelf favorite, Gusher is ideal for users seeking flavor and mellow vibes."
  },
  'Amnesia': {
    en: "Type: Sativa\nTHC: ~20–22%\nRegion: Netherlands\nRating: ⭐⭐⭐⭐⭐\n\n🧠 Amnesia is a legendary sativa strain born in Amsterdam. It merges Super Silver Haze and Afghan genetics, giving a long-lasting cerebral buzz. Users love its lemony flavor, creative stimulation, and uplifting euphoria. This strain is great for daytime use, mental clarity, and staying focused. Artists and thinkers especially favor Amnesia for its sharp high and flow-state experience."
  },
  'Lemon Cherry': {
    en: "Type: Hybrid\nTHC: ~25–27%\nRegion: California, USA\nRating: ⭐⭐⭐⭐⭐\n\n🍒 Lemon Cherry Gelato combines Sunset Sherbet and Girl Scout Cookies to create a rich, fruity delight. Its high THC levels deliver a full-body relaxation while still uplifting your spirits. This strain is both social and soothing, recommended for anxiety, insomnia, or just a flavorful smoke. Extremely popular across California, Lemon Cherry is a modern icon of West Coast cannabis."
  },
  'Sacitrus': {
    en: "Type: Sativa-Dominant Hybrid\nTHC: ~19–21%\nRegion: Oregon, USA\nRating: ⭐⭐⭐⭐☆\n\n🍊 Sacitrus offers a bright citrus burst on each inhale, making it an ideal pick-me-up strain. Commonly used in the mornings, it improves mood, brings energy, and sharpens focus. Users report better productivity, clearer thoughts, and reduced stress. Grown in the fresh climates of Oregon, Sacitrus is great for creative work, light exercise, or conversations."
  },
  'Tangie': {
    en: "Type: Sativa\nTHC: ~20–23%\nRegion: Southern California, USA\nRating: ⭐⭐⭐⭐⭐\n\n🍊 Tangie reinvents the beloved Tangerine Dream with intense citrus aroma and a euphoric, focused high. A daytime favorite, it sparks energy, creativity, and conversation. With a strong terpene profile, Tangie is a go-to for musicians, designers, and outdoor enthusiasts. Its uplifting buzz makes it one of California's top-rated citrus strains."
  }
};

function showStrain(strainName) {
  const desc = strains[strainName].en;
  document.getElementById('modal-title').innerText = strainName;
  document.getElementById('modal-desc').innerText = desc;
  document.getElementById('modal-img').src = `images/${strainName.toLowerCase().replace(/ /g, '')}.jpg`;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function filterStrains() {
  const search = document.getElementById('search').value.toLowerCase();
  const cards = document.querySelectorAll('.strain-card');
  cards.forEach(card => {
    const title = card.querySelector('h2').innerText.toLowerCase();
    card.style.display = title.includes(search) ? 'block' : 'none';
  });
}
let strains = [];

fetch('strains.json')
  .then(res => res.json())
  .then(data => {
    strains = data;
    renderStrains(strains);
  });

function renderStrains(strains) {
  const container = document.getElementById('strain-grid');
  container.innerHTML = '';
  strains.forEach(strain => {
    const card = document.createElement('div');
    card.className = 'strain-card';
    card.innerHTML = `
      <img src="images/${strain.image}" alt="${strain.name}">
      <h2>${strain.name}</h2>
      <div class="strain-description">
        ${strain.emoji} ${strain.type} | 📍 ${strain.region} | ${'⭐'.repeat(strain.rating)}${'☆'.repeat(5 - strain.rating)}<br>
        ${strain.effect}
      </div>
    `;
    card.onclick = () => showModal(strain);
    container.appendChild(card);
  });
}

function showModal(strain) {
  document.getElementById('modal-title').innerText = strain.name;
  document.getElementById('modal-img').src = `images/${strain.image}`;
  document.getElementById('modal-desc').innerText = strain.desc;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function filterStrains() {
  const val = document.getElementById('search').value.toLowerCase();
  const filtered = strains.filter(s => s.name.toLowerCase().includes(val));
  renderStrains(filtered);
}

function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('active');
}


