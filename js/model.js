// model.js

export const model = {
    quantity: 0,
    cart: [],
    currentImageIndex: 0,

    setCurrentImageIndex(index) {
        this.currentImageIndex = index;
    },

    getNextImageIndex(direction) {
        const thumbnails = document.querySelectorAll('.thumbnail');
        let newIndex = this.currentImageIndex + direction;
        if (newIndex < 0) newIndex = thumbnails.length - 1;
        if (newIndex >= thumbnails.length) newIndex = 0;
        this.currentImageIndex = newIndex;
        return newIndex;
    },

    getImageUrlAtIndex(index) {
        return document.querySelectorAll('.thumbnail')[index].getAttribute('data-full');
    },

    getQuantity() {
        return this.quantity;
    },

    updateQuantity(change) {
        this.quantity = Math.max(0, this.quantity + change);
    },

    resetQuantity() {
        this.quantity = 0;
    },

    addToCart(name, price, quantity) {
        const item = this.cart.find(item => item.name === name);
        if (item) {
            item.quantity += quantity;
        } else {
            this.cart.push({ name, price, quantity });
        }
    },

    getCartItems() {
        return this.cart;
    },

    getTotalPrice() {
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
};

