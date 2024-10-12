// controller.js

import { model } from './model.js';
import { view } from './view.js';

export const controller = {
    init() {
        view.setupThumbnails(this.handleThumbnailClick.bind(this));
        view.setupModalNavigation(this.changeModalImage.bind(this));
        view.setupCloseModal(this.closeModal.bind(this));
        view.setupCartIcon(this.toggleCartDisplay.bind(this));
        view.setupAddToCart(this.addToCart.bind(this));
        view.setupQuantityButtons(this.updateQuantity.bind(this));
        view.updateCartCount(model.getTotalItems());
    },

    handleThumbnailClick(index, fullImageUrl) {
        model.setCurrentImageIndex(index);
        view.setMainImage(fullImageUrl);
        view.openModal(fullImageUrl);
        view.highlightThumbnail(index);
    },

    changeModalImage(direction) {
        const newIndex = model.getNextImageIndex(direction);
        const newImageSrc = model.getImageUrlAtIndex(newIndex);
        view.setModalImage(newImageSrc);
        view.setMainImage(newImageSrc);
    },

    closeModal() {
        view.closeModal();
    },

    toggleCartDisplay() {
        view.toggleCartDisplay();
    },

    addToCart() {
        const quantity = model.getQuantity();
        if (quantity === 0) {
            alert("Please select a quantity before adding to cart.");
            return;
        }

        model.addToCart("Fall Limited Edition Sneakers", 125.00, quantity);
        model.resetQuantity();
        view.updateQuantityDisplay(0);
        view.updateCartDisplay(model.getCartItems(), model.getTotalPrice());
        view.updateCartCount(model.getTotalItems());
    },

    updateQuantity(change) {
        model.updateQuantity(change);
        view.updateQuantityDisplay(model.getQuantity());
    }
};


