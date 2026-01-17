/* =====================================================
   Cakeschahiye – Main JS (FINAL STABLE)
===================================================== */

console.log("MAIN JS LOADED");

/* =====================================================
   DOM READY
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     OFFER SLIDER – HOME PAGE ONLY
  ===================================================== */
  const offerTrack = document.getElementById("offerTrack");

  if (offerTrack) {
    fetch("/data/offers.json")
      .then(res => res.json())
      .then(offers => {
        const activeOffers = offers.filter(o => o.active);
        if (!activeOffers.length) return;

        // Duplicate slides for infinite loop
        const slides = [...activeOffers, ...activeOffers];
        offerTrack.innerHTML = "";

        slides.forEach(offer => {
          const card = document.createElement("div");
          card.className = "offer-card";

          card.innerHTML = `
            <img src="${offer.image}" alt="${offer.title}">
            <div class="offer-text">
              <strong>${offer.title}</strong>
              <p>${offer.subtitle}</p>
            </div>
          `;

          // WhatsApp click
          card.addEventListener("click", () => {
            const msg = encodeURIComponent(
              `House of Flavours - Priyanshu Chauhan!\n Offers Enquiry\n${offer.title}\n${offer.subtitle}`
            );
            window.open(
              `https://wa.me/918126828609?text=${msg}`,
              "_blank"
            );
          });

          offerTrack.appendChild(card);
        });

        let index = 0;
        const slideGap = 16;
        const slideWidth =
          offerTrack.children[0].offsetWidth + slideGap;
        const total = activeOffers.length;

        setInterval(() => {
          index++;
          offerTrack.style.transition = "transform 0.6s ease";
          offerTrack.style.transform =
            `translateX(-${index * slideWidth}px)`;

          // Seamless reset
          if (index === total) {
            setTimeout(() => {
              offerTrack.style.transition = "none";
              offerTrack.style.transform = "translateX(0)";
              index = 0;
            }, 650);
          }
        }, 3000);
      })
      .catch(err => console.error("Offer slider error:", err));
  }

  /* =====================================================
     CART SYSTEM
  ===================================================== */
  window.addToCart = function (product) {
    let cart = JSON.parse(localStorage.getItem("cakes_cart")) || [];

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cakes_cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart`);
  };

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cakes_cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.qty, 0);

    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
      cartCountEl.textContent = count;
    }
  }

  updateCartCount();

  /* =====================================================
     WHATSAPP DIRECT ORDER
  ===================================================== */
  window.sendOrder = function (productName) {
    const ownerNumber = "918126828609";
    const message = encodeURIComponent(
      `New Cake Order:\n🍰 ${productName}\nPlease confirm availability.`
    );
    window.open(
      `https://wa.me/${ownerNumber}?text=${message}`,
      "_blank"
    );
  };

});
