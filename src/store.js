import { reactive } from 'vue'

// Загружаем сохраненную сессию пользователя
const savedUser = JSON.parse(localStorage.getItem('allkeys_session') || 'null')

// Загружаем сохраненную корзину
const savedCart = JSON.parse(localStorage.getItem('allkeys_cart') || '[]')

export const store = reactive({
    // --- КОРЗИНА ---
    cart: savedCart,

    saveCart() {
        localStorage.setItem('allkeys_cart', JSON.stringify(this.cart))
    },

    addToCart(product) {
        const existing = this.cart.find(item => item.id === product.id)
        if (existing) {
            existing.quantity++
        } else {
            this.cart.push({ ...product, quantity: 1 })
        }
        this.saveCart()
    },

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId)
        this.saveCart()
    },

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId)
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId)
            } else {
                item.quantity = quantity
                this.saveCart()
            }
        }
    },

    clearCart() {
        this.cart = []
        this.saveCart()
    },

    get cartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    get cartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0)
    },

    // --- АВТОРИЗАЦИЯ И ПРОФИЛЬ ---
    currentUser: savedUser,

    get isAuthenticated() {
        return this.currentUser !== null
    },

    registerUser(name, email, password) {
        const users = JSON.parse(localStorage.getItem('allkeys_users') || '[]')
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Пользователь с таким email уже существует!' }
        }
        const newUser = { id: Date.now(), name, email, password }
        users.push(newUser)
        localStorage.setItem('allkeys_users', JSON.stringify(users))

        this.currentUser = { name: newUser.name, email: newUser.email }
        localStorage.setItem('allkeys_session', JSON.stringify(this.currentUser))
        return { success: true }
    },

    loginUser(email, password) {
        const users = JSON.parse(localStorage.getItem('allkeys_users') || '[]')
        const user = users.find(u => u.email === email && u.password === password)
        if (user) {
            this.currentUser = { name: user.name, email: user.email }
            localStorage.setItem('allkeys_session', JSON.stringify(this.currentUser))
            return { success: true }
        }
        return { success: false, message: 'Неверный email или пароль.' }
    },

    // --- ОБНОВЛЕННЫЙ МЕТОД ВЫХОДА ---
    logoutUser() {
        this.currentUser = null
        localStorage.removeItem('allkeys_session')

        // Очищаем корзину при выходе
        this.clearCart()
    }
})