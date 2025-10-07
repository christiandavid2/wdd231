async function loadDiscover() {
  const response = await fetch("data/discover.json");
  const items = await response.json();
  const container = document.getElementById("discover-cards");

  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.name}">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>     
    `;     
    container.appendChild(card);
  });
}

const MoreDetails = document.getElementById('more-details');
 


// Handle last visit message
function visitMessage() {
  const message = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    message.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysBetween < 1) {
      message.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      message.textContent = "You last visited 1 day ago.";
    } else {
      message.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }
  localStorage.setItem("lastVisit", now);
}

loadDiscover();
visitMessage();
