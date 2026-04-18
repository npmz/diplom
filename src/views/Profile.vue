<template>
  <div class="profile-page">

    <div v-if="store.isAuthenticated" class="dashboard">
      <div class="user-info">
        <div class="avatar">👤</div>
        <h2>Привет, {{ store.currentUser.name }}!</h2>
        <p class="email">{{ store.currentUser.email }}</p>
      </div>

      <div class="dashboard-cards">
        <div class="dash-card">
          <h3>📦 Мои покупки</h3>
          <p>Здесь будут отображаться купленные цифровые ключи.</p>
        </div>
        <div class="dash-card">
          <h3>⚙️ Настройки</h3>
          <p>Управление профилем и безопасность.</p>
        </div>
      </div>

      <button @click="handleLogout" class="logout-btn">Выйти из аккаунта</button>
    </div>

    <div v-else class="auth-container">
      <div class="auth-tabs">
        <button :class="{ active: isLoginTab }" @click="isLoginTab = true">Вход</button>
        <button :class="{ active: !isLoginTab }" @click="isLoginTab = false">Регистрация</button>
      </div>

      <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>

      <form v-if="isLoginTab" @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="loginData.email" required placeholder="Введите email">
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input type="password" v-model="loginData.password" required placeholder="Введите пароль">
        </div>
        <button type="submit" class="submit-btn">Войти</button>
      </form>

      <form v-else @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label>Имя</label>
          <input type="text" v-model="registerData.name" required placeholder="Как к вам обращаться?">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="registerData.email" required placeholder="Ваш email">
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input type="password" v-model="registerData.password" required placeholder="Придумайте пароль" minlength="6">
        </div>
        <button type="submit" class="submit-btn">Зарегистрироваться</button>
      </form>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { store } from '../store.js'

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
.profile-page {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

/* --- СТИЛИ АВТОРИЗАЦИИ --- */
.auth-container {
  background: white;
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
  color: #7f8c8d;
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
  color: #2c3e50;
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
  background: white;
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
  color: #7f8c8d;
  font-size: 1.1rem;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.dash-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.dash-card h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.dash-card p {
  color: #7f8c8d;
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
</style>