// Récupération des éléments
const mainImage = document.getElementById('main-image'); // Élément de l'image principale
const thumbnails = document.querySelectorAll('.thumbnail'); // Tous les éléments avec la classe 'thumbnail'
const modal = document.getElementById("image-modal"); // Élément du modal pour afficher l'image
const modalImage = document.getElementById("modal-image"); // Élément pour afficher l'image dans le modal
const closeModal = document.getElementsByClassName("close")[0]; // Premier élément avec la classe 'close'
let quantity = 0; // Variable pour suivre la quantité (par exemple, pour un panier d'achats)
let cart = []; // Tableau pour stocker les articles dans le panier
let currentImageIndex = 0; // Suivre l'index de l'image actuellement affichée
// Récupération de l'élément pour afficher le nombre d'articles dans le panier
const cartCountElement = document.querySelector('.cart-count');

// Ajout de l'événement de clic sur chaque vignette
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
        // Mise à jour de l'image principale avec l'image pleine résolution
        const fullImageUrl = thumbnail.getAttribute('data-full');
        mainImage.src = fullImageUrl;

        // Ouvrir le modal avec l'image sélectionnée
        openModal(fullImageUrl);
        currentImageIndex = index; // Enregistrer l'index de l'image actuelle

        // Mettre à jour la bordure active sur la vignette sélectionnée
        thumbnails.forEach(tn => tn.style.border = "2px solid transparent");
        thumbnail.style.border = "2px solid hsl(26, 100%, 55%)";
    });
});

// Fonction pour ouvrir le modal avec l'image sélectionnée
function openModal(imageSrc) {
    modalImage.src = imageSrc; // Mettre à jour la source de l'image dans le modal
    modal.style.display = "block"; // Afficher le modal
}

// Fermer le modal lorsque l'utilisateur clique sur le bouton de fermeture
closeModal.onclick = function() {
    modal.style.display = "none"; // Cacher le modal lorsque l'utilisateur clique sur le bouton de fermeture
};

// Fermer le modal si l'utilisateur clique en dehors de l'image
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Fonction pour changer d'image avec les flèches
function changeModalImage(direction) {
    currentImageIndex += direction;

    // Boucle si on dépasse les limites
    if (currentImageIndex < 0) {
        currentImageIndex = thumbnails.length - 1;
    } else if (currentImageIndex >= thumbnails.length) {
        currentImageIndex = 0;
    }

    // Mettre à jour l'image du modal
    const newImageSrc = thumbnails[currentImageIndex].getAttribute('data-full');
    modalImage.src = newImageSrc;
}

// Variables pour le panier
function updateQuantity(change) {
    quantity = Math.max(0, quantity + change); // Assure que la quantité ne descend pas en-dessous de 0
    document.getElementById("quantity-Sneakers").textContent = quantity; // Mettre à jour le texte de l'élément
}

// Fonction pour ajouter au panier
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

    // Mettre à jour l'affichage du nombre d'articles dans le panier
    updateCartCount();
}

// Fonction pour mettre à jour le nombre d'articles dans le badge du panier
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); // Calculer le nombre total d'articles

    if (totalItems > 0) {
        cartCountElement.textContent = totalItems; // Mettre à jour le badge avec le nombre d'articles
        cartCountElement.style.visibility = 'visible';  // Afficher le badge
    } else {
        cartCountElement.style.visibility = 'hidden';   // Cacher le badge si le panier est vide
    }
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
        <p><img src="./images/image-product-1-thumbnail.jpg" class="cart-item-img" > ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
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

// Ajout d'événements de clic sur les flèches dans le modal pour changer d'image
document.querySelector('.prev').addEventListener('click', function() {
    changeModalImage(-1);
});
document.querySelector('.next').addEventListener('click', function() {
    changeModalImage(1);
});
