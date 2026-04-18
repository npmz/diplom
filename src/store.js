import { reactive } from 'vue'

// Пытаемся загрузить текущую сессию пользователя при старте приложения
const savedUser = JSON.parse(localStorage.getItem('allkeys_session') || 'null')

export const store = reactive({
    // --- КОРЗИНА ---
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
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId)
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId)
            } else {
                item.quantity = quantity
            }
        }
    },
    clearCart() {
        this.cart = []
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
        // Получаем базу пользователей из localStorage
        const users = JSON.parse(localStorage.getItem('allkeys_users') || '[]')

        // Проверяем, не занят ли email
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Пользователь с таким email уже существует!' }
        }

        // Создаем и сохраняем нового пользователя
        const newUser = { id: Date.now(), name, email, password }
        users.push(newUser)
        localStorage.setItem('allkeys_users', JSON.stringify(users))

        // Автоматически логиним после регистрации
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

    logoutUser() {
        this.currentUser = null
        localStorage.removeItem('allkeys_session')
    }
})