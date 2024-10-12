// view.js

export const view = {
    setupThumbnails(clickHandler) {
        document.querySelectorAll('.thumbnail').forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                const fullImageUrl = thumbnail.getAttribute('data-full');
                clickHandler(index, fullImageUrl);
            });
        });
    },

    setupModalNavigation(changeImageHandler) {
        document.querySelector('.prev').addEventListener('click', () => changeImageHandler(-1));
        document.querySelector('.next').addEventListener('click', () => changeImageHandler(1));
    },

    setupCloseModal(closeHandler) {
        document.querySelector('.close').addEventListener('click', closeHandler);
    },

    setupCartIcon(toggleHandler) {
        document.querySelector('.cart-icon').addEventListener('click', toggleHandler);
    },

    setupAddToCart(addToCartHandler) {
        document.querySelector('.add-to-cart').addEventListener('click', addToCartHandler);
    },

    setupQuantityButtons(updateQuantityHandler) {
        document.querySelector('.increase').addEventListener('click', () => updateQuantityHandler(1));
        document.querySelector('.decrease').addEventListener('click', () => updateQuantityHandler(-1));
    },

    setMainImage(src) {
        document.getElementById('main-image').src = src;
    },

    openModal(imageSrc) {
        const modal = document.getElementById("image-modal");
        const modalImage = document.getElementById("modal-image");
        modalImage.src = imageSrc;
        modal.style.display = "block";
    },

    closeModal() {
        document.getElementById("image-modal").style.display = "none";
    },

    highlightThumbnail(index) {
        document.querySelectorAll('.thumbnail').forEach(tn => tn.style.border = "2px solid transparent");
        document.querySelectorAll('.thumbnail')[index].style.border = "2px solid hsl(26, 100%, 55%)";
    },

    setModalImage(src) {
        document.getElementById('modal-image').src = src;
    },

    updateQuantityDisplay(quantity) {
        document.getElementById("quantity-Sneakers").textContent = quantity;
    },

    updateCartCount(totalItems) {
        const cartCountElement = document.querySelector('.cart-count');
        if (totalItems > 0) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.visibility = 'visible';
        } else {
            cartCountElement.style.visibility = 'hidden';
        }
    },

    updateCartDisplay(cartItems, totalPrice) {
        const cartItemsContainer = document.querySelector(".cart-items");
        const cartTotalElement = document.querySelector(".cart-total");

        cartItemsContainer.innerHTML = "";
        cartItems.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p><img src="./images/image-product-1-thumbnail.jpg" class="cart-item-img"> 
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotalElement.textContent = totalPrice.toFixed(2);
    },

    toggleCartDisplay() {
        const cartDetails = document.querySelector(".cart-details");
        cartDetails.style.display = cartDetails.style.display === "none" ? "block" : "none";
    }
};


