
const cartIcon= document.createElement('div')
cartIcon.classList.add('cart-icon')
cartIcon.innerHTML = '🛒<span id="cart-count">0</span>';
document.querySelector('header').appendChild(cartIcon);

const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
 <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Your Cart</h2>
    <div id="cart-items"></div>
    <p id="cart-total"></p>
 </div>
`;
document.body.appendChild(modal);

const closeModal = modal.querySelector('.close');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');


let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartDisplay();


function addToCart(e){
    const id = e.target.dataset.id;
    fetch('data/products.json')
    .then(res => res.json())
    .then(products => {
        const product = products.find(p => p.id == id);
        const existing = cart.find(item => item.id == id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
    })
}
function updateCartDisplay() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalItems;
}


cartIcon.addEventListener('click', () => {
  displayCart();
  modal.style.display = 'block';
});


closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});


function displayCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    //cartTotal.textContent = '';
    return;
  }


    cartItemsContainer.innerHTML = cart.map(item => `
  //<div class="cart-item">
   //<p><strong>${item.name}</strong> (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}</p>
  //</div>
`).join('');


  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}
document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById('product-list');

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

