// Récupération des éléments
const mainImage = document.getElementById('main-image');
const thumbnails = document.querySelectorAll('.thumbnail');

// Ajout de l'événement de clic sur chaque vignette
thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', function() {
    // Mise à jour de l'image principale avec l'image pleine résolution
    const fullImageUrl = thumbnail.getAttribute('data-full');
    mainImage.src = fullImageUrl;

    // Mettre à jour la bordure active sur la vignette sélectionnée
    thumbnails.forEach(tn => tn.style.border = "2px solid transparent");
    thumbnail.style.border = "2px solid hsl(26, 100%, 55%)";
  });
});


let quantity = 0;
  let cart = [];

  // Fonction pour mettre à jour la quantité d'articles
  function updateQuantity(change) {
    quantity = Math.max(0, quantity + change); // Assure que la quantité ne descend pas en-dessous de 0
    document.getElementById("quantity-Sneakers").textContent = quantity; // Mettre à jour le texte de l'élément
  }

  // Fonction pour ajouter au panier
  function addToCart() {
    if (quantity === 0) {
      alert("Please select a quantity before adding to cart.");
      return; // Ne rien faire si la quantité est 0
    }

    const productName = "Fall Limited Edition Sneakers";
    const productPrice = 125.00;

    // Vérifier si l'article est déjà dans le panier
    const itemInCart = cart.find(item => item.name === productName);

    if (itemInCart) {
      // Si l'article est déjà dans le panier, mettre à jour la quantité
      itemInCart.quantity += quantity;
    } else {
      // Ajouter un nouvel article dans le panier
      cart.push({ name: productName, price: productPrice, quantity: quantity });
    }

    // Réinitialiser la quantité après ajout au panier
    quantity = 0;
    document.getElementById("quantity-Sneakers").textContent = quantity;

    // Mettre à jour l'affichage du panier
    updateCartDisplay();
  }

  // Fonction pour mettre à jour l'affichage du panier
  function updateCartDisplay() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotalElement = document.querySelector(".cart-total");

    // Vider le contenu du panier
    cartItemsContainer.innerHTML = "";

    let total = 0;

    // Afficher chaque article dans le panier
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    // Mettre à jour le total
    cartTotalElement.textContent = total.toFixed(2);
  }

  // Afficher/masquer le panier lors du clic sur l'icône du panier
  document.querySelector(".cart-icon").addEventListener("click", function() {
    const cartDetails = document.querySelector(".cart-details");
    cartDetails.style.display = cartDetails.style.display === "none" ? "block" : "none";
  });
