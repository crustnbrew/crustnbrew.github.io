function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = count;
}

updateCartCount();


console.log("CART JS LOADED");

/* ===============================
   SIMPLE CART USING LOCALSTORAGE
=============================== */

const CART_KEY = "cakes_cart";

// Get cart
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Save cart
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add to cart
function addToCart(product) {
  const cart = getCart();

 document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("qty-btn")) return;

  const index = e.target.closest(".cart-item").dataset.index;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (e.target.dataset.action === "plus") {
    cart[index].qty++;
  }

  if (e.target.dataset.action === "minus") {
    cart[index].qty--;
    if (cart[index].qty <= 0) cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
});


  saveCart(cart);
  alert("✅ Added to cart");
}

// Remove from cart (for later use)
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
}
