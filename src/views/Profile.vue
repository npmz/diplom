<template>
  <div class="profile-page">
    <div v-if="store.isAuthenticated" class="dashboard">

      <div class="user-info surface-box">
        <div class="avatar">👤</div>
        <h2>Привет, {{ store.currentUser.name }}!</h2>
        <p class="email">{{ store.currentUser.email }}</p>
      </div>

      <div class="profile-tabs surface-box">
        <button :class="{ active: activeTab === 'purchases' }" @click="activeTab = 'purchases'">
          📦 Мои покупки ({{ store.userPurchases.length }})
        </button>
        <button :class="{ active: activeTab === 'favorites' }" @click="activeTab = 'favorites'">
          ❤️ Избранное ({{ store.favorites.length }})
        </button>
      </div>

      <div class="tab-content">
        <div v-if="activeTab === 'purchases'" class="dash-card purchases-section surface-box">
          <div v-if="store.userPurchases.length === 0" class="empty-state">
            <p>У вас еще нет покупок.</p>
            <router-link to="/products" class="btn-link">В каталог</router-link>
          </div>
          <div v-else class="purchases-list">
            <div v-for="item in store.userPurchases" :key="item.id" class="purchase-item">
              <img :src="item.image" class="purchase-img" />
              <div class="purchase-info">
                <h4>{{ item.name }} <span class="qty-badge">x{{ item.quantity }}</span></h4>
                <p class="purchase-date">Куплено: {{ item.date }}</p>
                <div class="keys-container">
                  <div v-for="(key, index) in item.keys" :key="index" class="key-box">
                    <code>{{ key }}</code>
                  </div>
                </div>
              </div>
              <div class="purchase-price">{{ item.price * item.quantity }} ₽</div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'favorites'" class="favorites-grid">
          <div v-if="store.favorites.length === 0" class="empty-state surface-box">
            <p>В списке избранного пока пусто.</p>
          </div>
          <div v-else class="product-grid">
            <ProductCard v-for="p in store.favorites" :key="p.id" :product="p" />
          </div>
        </div>
      </div>

      <button @click="store.logoutUser()" class="logout-btn">Выйти из аккаунта</button>
    </div>

    <div v-else class="auth-container surface-box">
      <p>Пожалуйста, войдите, чтобы увидеть профиль.</p>
      <router-link to="/login" class="btn btn-primary">Войти</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { store } from '../store.js'
import ProductCard from '../components/ProductCard.vue'

const activeTab = ref('purchases') // Текущая активная вкладка

const isLoginTab = ref(true)
const errorMessage = ref('')

const loginData = reactive({ email: '', password: '' })
const registerData = reactive({ name: '', email: '', password: '' })

const handleLogin = () => {
  errorMessage.value = ''
  const result = store.loginUser(loginData.email, loginData.password)
  if (!result.success) {
    errorMessage.value = result.message
  } else {
    // Очистка формы
    loginData.email = ''
    loginData.password = ''
  }
}

const handleRegister = () => {
  errorMessage.value = ''
  const result = store.registerUser(registerData.name, registerData.email, registerData.password)
  if (!result.success) {
    errorMessage.value = result.message
  } else {
    registerData.name = ''
    registerData.email = ''
    registerData.password = ''
  }
}

const handleLogout = () => {
  store.logoutUser()
}
</script>

<style scoped>
.profile-tabs {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: var(--radius-lg);
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.profile-tabs button {
  flex: 1;
  padding: 1rem;
  border: none;
  background: var(--color-bg-body);
  color: var(--color-text-main);
  border-radius: var(--radius-md);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.profile-tabs button.active {
  background: var(--color-primary);
  color: white;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
  border-radius: var(--radius-lg);
}

/* Сетка для избранного — такая же как в каталоге */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}
/* Добавьте эти стили для красивого списка покупок */
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr; /* Покупки шире, чем настройки */
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 900px) {
  .dashboard-grid { grid-template-columns: 1fr; }
}

.purchases-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.purchase-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-bg-body);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.purchase-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.purchase-info {
  flex: 1;
}

.purchase-info h4 {
  margin: 0 0 0.3rem 0;
  font-size: 1rem;
}

.purchase-date {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.key-box {
  background: var(--color-surface);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  display: inline-block;
  border: 1px dashed var(--color-primary);
}

.key-box code {
  font-family: monospace;
  color: var(--color-primary);
  font-weight: bold;
}

.purchase-price {
  font-weight: bold;
  font-size: 1.1rem;
}

.btn-link {
  background: none;
  border: none;
  color: var(--color-primary);
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.95rem;
  padding: 0;
}

.empty-purchases {
  text-align: center;
  padding: 2rem;
  color: var(--color-text-muted);
}

.profile-page {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

/* --- СТИЛИ АВТОРИЗАЦИИ --- */
.auth-container {
  background-color: var(--color-surface);
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.05);
  overflow: hidden;
}

.auth-tabs {
  display: flex;
  border-bottom: 2px solid #ecf0f1;
}

.auth-tabs button {
  flex: 1;
  padding: 1.2rem;
  background: transparent;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.3s;
}

.auth-tabs button.active {
  color: #42b983;
  border-bottom: 2px solid #42b983;
  background: #fdfdfd;
}

.auth-form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text-main);
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
}

.submit-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;
}

.submit-btn:hover {
  background-color: #3aa876;
}

.error-msg {
  background: #ffeaa7;
  color: #d63031;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #ecf0f1;
}

/* --- СТИЛИ КАБИНЕТА --- */
.dashboard {
  width: 100%;
  max-width: 800px;
}

.user-info {
  background-color: var(--color-surface);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

.avatar {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.user-info h2 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.email {
  color: var(--color-text-muted);
  font-size: 1.1rem;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.dash-card {
  background-color: var(--color-surface);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.dash-card h3 {
  margin: 0 0 1rem 0;
  color: var(--color-text-main);
}

.dash-card p {
  color: var(--color-text-muted);
  line-height: 1.5;
}

.logout-btn {
  background: transparent;
  color: #e74c3c;
  border: 2px solid #e74c3c;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  display: block;
  margin: 0 auto;
}

.logout-btn:hover {
  background: #e74c3c;
  color: white;
}

/* --- СТИЛИ ДЛЯ КЛЮЧЕЙ И КОЛИЧЕСТВА --- */
.qty-badge {
  color: var(--color-primary);
  font-size: 0.85rem;
  background: rgba(66, 185, 131, 0.1);
  padding: 0.2rem 0.5rem;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.keys-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Отступ между ключами, если их несколько */
  margin-top: 0.5rem;
}

.key-box {
  background: var(--color-surface);
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-sm);
  display: inline-block;
  border: 1px dashed var(--color-primary);
  width: fit-content; /* Чтобы рамка облегала сам ключ */
}

.key-box code {
  font-family: monospace;
  color: var(--color-primary);
  font-weight: bold;
  font-size: 0.95rem;
}

.tab-content {
  margin-bottom: 1rem;
}
</style>