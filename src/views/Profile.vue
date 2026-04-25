<template>
  <div class="profile-page">
    <div v-if="store.isAuthenticated" class="dashboard">

      <div class="user-info surface-box">
        <div class="avatar"><IconUser /></div>
        <h2>Привет, {{ store.currentUser.name }}!</h2>
        <p class="email">{{ store.currentUser.email }}</p>
      </div>

      <div class="profile-tabs surface-box">
        <button :class="{ active: activeTab === 'purchases' }" @click="activeTab = 'purchases'">
          Мои покупки ({{ store.userPurchases.length }})
        </button>
        <button :class="{ active: activeTab === 'favorites' }" @click="activeTab = 'favorites'">
          Избранное ({{ store.favorites.length }})
        </button>
        <button :class="{ active: activeTab === 'my-products' }" @click="activeTab = 'my-products'">
          Мои товары ({{ store.userCustomProducts.length }})
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

        <div v-if="activeTab === 'my-products'" class="dash-card surface-box">

          <div v-if="store.userCustomProducts.length === 0" class="empty-state">
            <p>Вы еще не выставили ни одного товара на продажу.</p>
            <router-link to="/products" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">
              Разместить товар
            </router-link>
          </div>

          <div v-else class="purchases-list">
            <div v-for="item in store.userCustomProducts" :key="item.id" class="purchase-item">
              <img :src="item.image" class="purchase-img" />
              <div class="purchase-info">
                <h4>{{ item.name }}</h4>
                <p class="purchase-date">Категория: {{ item.category }}</p>
                <div class="qty-badge" style="margin-left: 0; margin-top: 0.5rem; display: inline-block;">
                  Осталось ключей: {{ item.keysAvailable }}
                </div>
              </div>
              <div class="purchase-price">{{ item.price }} ₽</div>

              <button @click="confirmDeleteProduct(item.id)" class="btn-delete" title="Снять с продажи">
                Удалить
              </button>
            </div>
          </div>

        </div>
      </div>

      <button @click="store.openLogoutModal()" class="logout-btn">
        Выйти из аккаунта
      </button>
    </div>

    <div v-else class="auth-wrapper">
      <div class="auth-container surface-box">

        <div class="auth-header">
          <div class="logo-circle">🔑</div>
          <h2>{{ isLoginTab ? 'С возвращением!' : 'Создать аккаунт' }}</h2>
          <p class="auth-subtitle">
            {{ isLoginTab ? 'Рады видеть вас снова. Войдите, чтобы продолжить.' : 'Присоединяйтесь к AllKeys и покупайте выгодно.' }}
          </p>
        </div>

        <div class="auth-tabs-modern">
          <div class="tab-slider" :class="{ 'right': !isLoginTab }"></div>
          <button :class="{ active: isLoginTab }" @click="isLoginTab = true">Вход</button>
          <button :class="{ active: !isLoginTab }" @click="isLoginTab = false">Регистрация</button>
        </div>

        <transition name="fade">
          <div v-if="errorMessage" class="error-msg">⚠️ {{ errorMessage }}</div>
        </transition>

        <form v-if="isLoginTab" @submit.prevent="handleLogin" class="auth-form">
          <div class="input-group">
            <span class="input-icon"><IconMail /></span>
            <input type="email" v-model="loginData.email" required placeholder="Ваш Email">
          </div>

          <div class="input-group">
            <span class="input-icon"><IconLock /></span>
            <input type="password" v-model="loginData.password" required placeholder="Пароль">
          </div>

          <div class="form-options">
            <label class="remember-me"><input type="checkbox"> Запомнить меня</label>
            <a href="#" class="forgot-password" @click.prevent="showResetModal = true">Забыли пароль?</a>
          </div>

          <button type="submit" class="btn btn-primary w-100">Войти в аккаунт</button>
        </form>

        <form v-else @submit.prevent="handleRegister" class="auth-form">
          <div class="input-group">
            <span class="input-icon"><IconMail /></span>
            <input type="email" v-model="loginData.email" required placeholder="Ваш Email">
          </div>

          <div class="input-group">
            <span class="input-icon"><IconLock /></span>
            <input type="password" v-model="loginData.password" required placeholder="Пароль">
          </div>

          <div class="input-group">
            <span class="input-icon"><IconUser /></span>
            <input type="text" v-model="registerData.name" required placeholder="Как к вам обращаться?">
          </div>

          <button type="submit" class="btn btn-primary w-100">Зарегистрироваться</button>
        </form>

      </div>
    </div>
    <ResetPasswordModal
        v-if="showResetModal"
        @close="showResetModal = false"
    />
    <ConfirmDeleteModal
        v-if="showDeleteModal"
        @confirm="executeDelete"
        @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>

import { ref, reactive } from 'vue'
import { store } from '../store.js'
import ProductCard from '../components/ProductCard.vue'
import ResetPasswordModal from '../components/ResetPasswordModal.vue'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue'

import IconUser from '../components/icons/IconUser.vue'
import IconLock from '../components/icons/IconLock.vue'
import IconMail from '../components/icons/IconMail.vue'

const activeTab = ref('purchases')
const isLoginTab = ref(true)
const errorMessage = ref('')
const showResetModal = ref(false)
const loginData = reactive({ email: '', password: '' })
const registerData = reactive({ name: '', email: '', password: '' })
const showDeleteModal = ref(false)
const productToDelete = ref(null)

const confirmDeleteProduct = (productId) => {
  productToDelete.value = productId
  showDeleteModal.value = true
}

const executeDelete = () => {
  if (productToDelete.value) {
    store.deleteCustomProduct(productToDelete.value)
    showDeleteModal.value = false
    productToDelete.value = null
  }
}

const handleLogin = () => {
  errorMessage.value = ''
  const result = store.loginUser(loginData.email, loginData.password)
  if (!result.success) {
    errorMessage.value = result.message
  } else {
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


.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
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

.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
}

.auth-container {
  width: 100%;
  max-width: 450px;
  padding: 3rem 2.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  text-align: center;
}

.logo-circle {
  font-size: 3rem;
  background: rgba(66, 185, 131, 0.1);
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  margin: 0 auto 1.5rem auto;
  box-shadow: 0 0 20px rgba(66, 185, 131, 0.2);
}

.auth-header h2 {
  color: var(--color-text-main);
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.auth-subtitle {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  margin-bottom: 2rem;
}

.auth-tabs-modern {
  display: flex;
  position: relative;
  background: var(--color-bg-body);
  border-radius: var(--radius-pill);
  padding: 0.3rem;
  margin-bottom: 2rem;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
}

.tab-slider {
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  width: calc(50% - 0.3rem);
  height: calc(100% - 0.6rem);
  background: var(--color-surface);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
}

.tab-slider.right {
  transform: translateX(100%);
}

.auth-tabs-modern button {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.8rem 0;
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-text-muted);
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s;
}

.auth-tabs-modern button.active {
  color: var(--color-text-main);
}


.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  text-align: left;
}

.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: var(--color-text-muted);
  pointer-events: none;
}

.input-group input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: var(--color-bg-body);
  border: 2px solid transparent;
  color: var(--color-text-main);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: var(--color-surface);
  box-shadow: 0 0 0 4px rgba(66, 185, 131, 0.1);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}

.remember-me {
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.forgot-password {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

.error-msg {
  background: rgba(231, 76, 60, 0.1);
  color: var(--color-danger);
  padding: 0.8rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  font-weight: bold;
}

.w-100 { width: 100%; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

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

.avatar .icon {
  width: 40px;
  height: 40px;
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
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.key-box {
  background: var(--color-surface);
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-sm);
  display: inline-block;
  border: 1px dashed var(--color-primary);
  width: fit-content;
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

.profile-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
}
.profile-tabs button {
  padding: 0.8rem;
  font-size: 0.95rem;
}

.btn-delete {
  background: rgba(231, 76, 60, 0.1);
  color: var(--color-danger);
  border: 1px solid rgba(231, 76, 60, 0.3);
  padding: 0.6rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  margin-left: 1rem;
}

.btn-delete:hover {
  background: var(--color-danger);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(231, 76, 60, 0.2);
}
</style>