import { reactive } from 'vue'

const savedUser = JSON.parse(localStorage.getItem('allkeys_session') || 'null')
const savedCart = JSON.parse(localStorage.getItem('allkeys_cart') || '[]')
const savedTheme = localStorage.getItem('allkeys_theme') || 'dark'
const savedCustomProducts = JSON.parse(localStorage.getItem('allkeys_custom_products') || '[]')
const savedPurchases = JSON.parse(localStorage.getItem('allkeys_purchases') || '[]')
const savedFavorites = JSON.parse(localStorage.getItem('allkeys_favorites') || '[]')

document.documentElement.setAttribute('data-theme', savedTheme)

export const store = reactive({
    theme: savedTheme,
    currentUser: savedUser,
    cart: savedCart,
    customProducts: savedCustomProducts,
    purchases: savedPurchases,
    favorites: savedFavorites,

    // Геттер для получения покупок именно текущего пользователя
    get userPurchases() {
        if (!this.currentUser) return []
        return this.purchases.filter(p => p.userEmail === this.currentUser.email)
    },

    // --- ТОВАРЫ ПОЛЬЗОВАТЕЛЯ НА ПРОДАЖЕ ---

    // Получаем список товаров, которые продает текущий юзер
    get userCustomProducts() {
        if (!this.currentUser) return []
        return this.customProducts.filter(p => p.sellerEmail === this.currentUser.email)
    },

    // Функция для удаления своего товара из каталога
    deleteCustomProduct(productId) {
        // Оставляем в массиве только те товары, ID которых НЕ совпадает с удаляемым
        this.customProducts = this.customProducts.filter(p => p.id !== productId)

        // Перезаписываем обновленный массив в память браузера
        localStorage.setItem('allkeys_custom_products', JSON.stringify(this.customProducts))

        // Заодно удаляем этот товар из избранного (чтобы не было "битых" ссылок)
        this.favorites = this.favorites.filter(p => p.id !== productId)
        localStorage.setItem('allkeys_favorites', JSON.stringify(this.favorites))
    },

    confirmPurchase(cartItems) {
        if (!this.currentUser) return;

        const generateRandomKey = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            return Array.from({length: 3}, () =>
                Array.from({length: 5}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
            ).join('-');
        };

        const newPurchases = cartItems.map(item => ({
            id: Date.now() + Math.random(),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            date: new Date().toLocaleDateString(),
            userEmail: this.currentUser.email, // КРИТИЧНО: привязка к текущему юзеру
            keys: Array.from({length: item.quantity}, () => generateRandomKey())
        }))

        this.purchases.push(...newPurchases)
        localStorage.setItem('allkeys_purchases', JSON.stringify(this.purchases))
        this.clearCart()
    },

    toggleFavorite(product) {
        const index = this.favorites.findIndex(p => p.id === product.id)
        if (index > -1) {
            // Если уже в избранном — удаляем
            this.favorites.splice(index, 1)
        } else {
            // Если нет — добавляем
            this.favorites.push(product)
        }
        localStorage.setItem('allkeys_favorites', JSON.stringify(this.favorites))
    },

    isFavorite(productId) {
        return this.favorites.some(p => p.id === productId)
    },

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light'
        localStorage.setItem('allkeys_theme', this.theme)
        document.documentElement.setAttribute('data-theme', this.theme)
    },

    addCustomProduct(product) {
        // Добавляем флаг isCustom, чтобы отличать товар в интерфейсе
        const newProduct = {
            ...product,
            id: Date.now(),
            isCustom: true
        }
        this.customProducts.push(newProduct)
        localStorage.setItem('allkeys_custom_products', JSON.stringify(this.customProducts))
    },
    // Ниже оставляем существующий код корзины:
    saveCart() {
        localStorage.setItem('allkeys_cart', JSON.stringify(this.cart))
    },
    // ... весь остальной код ...

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

    // --- НОВАЯ ФУНКЦИЯ ДЛЯ СБРОСА ПАРОЛЯ ---
    resetPassword(email, newPassword) {
        const users = JSON.parse(localStorage.getItem('allkeys_users') || '[]')
        const userIndex = users.findIndex(u => u.email === email)

        if (userIndex > -1) {
            users[userIndex].password = newPassword
            localStorage.setItem('allkeys_users', JSON.stringify(users))
            return { success: true }
        }
        return { success: false, message: 'Пользователь с таким email не найден.' }
    },

    // --- ОБНОВЛЕННЫЙ МЕТОД ВЫХОДА ---
    logoutUser() {
        this.currentUser = null
        localStorage.removeItem('allkeys_session')

        // Очищаем корзину при выходе
        this.clearCart()
    },

    // --- УПРАВЛЕНИЕ ГЛОБАЛЬНЫМИ ОКНАМИ ---
    isAuthModalOpen: false,
    isLogoutModalOpen: false, // Состояние для окна выхода

    openAuthModal() { this.isAuthModalOpen = true; },
    closeAuthModal() { this.isAuthModalOpen = false; },

    // Функции для окна выхода
    openLogoutModal() { this.isLogoutModalOpen = true; },
    closeLogoutModal() { this.isLogoutModalOpen = false; },
})