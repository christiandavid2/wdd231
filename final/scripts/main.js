// Toggle mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const grid = document.querySelector('featuredContainer');

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Promo modal logic
const promoModal = document.getElementById("promoModal");
const closeModal = document.getElementById("closeModal");

// Show modal after 3 seconds
setTimeout(() => {
  promoModal.classList.remove("hidden");
}, 3000);

// Close modal when X is clicked
closeModal.addEventListener("click", () => {
  promoModal.classList.add("hidden");
});

  document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById('featuredContainer');

  fetch("data/products.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load products.json");
      }
      return response.json();
    })
    .then(products => {
      products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p class="price">₦${product.price.toLocaleString()}</p>
          <button class="add-cart">Add to Cart</button>
        `;

        productList.appendChild(card);
      });
    })
    .catch(error => {
      productList.innerHTML = `<p class="error">${error.message}</p>`;
      console.error(error);
    });
});


  // Add event listeners to cart buttons
  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', addToCart);
  });
