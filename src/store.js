import { reactive } from 'vue'

export const store = reactive({
    cart: [],
    addToCart(product) {
        const existing = this.cart.find(item => item.id === product.id)
        if (existing) {
            existing.quantity++
        } else {
            this.cart.push({ ...product, quantity: 1 })
        }
    },
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId)
    },
    clearCart() {
        this.cart = []
    },
    get cartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    get cartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0)
    }
})