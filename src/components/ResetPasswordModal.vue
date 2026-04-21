<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content surface-box">
      <button class="close-btn" @click="$emit('close')">✖</button>

      <div v-if="step === 1" class="modal-step">
        <div class="icon-circle">🔐</div>
        <h2>Восстановление пароля</h2>
        <p class="desc">Введите email, который вы использовали при регистрации.</p>

        <transition name="fade">
          <div v-if="error" class="error-msg">⚠️ {{ error }}</div>
        </transition>

        <form @submit.prevent="verifyEmail" class="reset-form">
          <div class="input-group">
            <span class="input-icon">✉️</span>
            <input type="email" v-model="email" required placeholder="Ваш Email">
          </div>
          <button type="submit" class="btn btn-primary w-100">Продолжить</button>
        </form>
      </div>

      <div v-else-if="step === 2" class="modal-step">
        <div class="icon-circle">🔑</div>
        <h2>Новый пароль</h2>
        <p class="desc">Придумайте надежный пароль для аккаунта <strong>{{ email }}</strong>.</p>

        <transition name="fade">
          <div v-if="error" class="error-msg">⚠️ {{ error }}</div>
        </transition>

        <form @submit.prevent="saveNewPassword" class="reset-form">
          <div class="input-group">
            <span class="input-icon">🔒</span>
            <input type="password" v-model="newPassword" required placeholder="Новый пароль" minlength="6">
          </div>

          <div class="input-group">
            <span class="input-icon">🛡️</span>
            <input type="password" v-model="confirmPassword" required placeholder="Повторите пароль" minlength="6">
          </div>

          <button type="submit" class="btn btn-primary w-100">Сохранить пароль</button>
        </form>
      </div>

      <div v-else-if="step === 3" class="modal-step success-screen">
        <div class="icon-circle success-color">✅</div>
        <h2>Пароль изменен!</h2>
        <p class="desc">Вы успешно обновили свой пароль. Теперь вы можете войти в свой аккаунт.</p>
        <button @click="$emit('close')" class="btn btn-primary w-100">Отлично</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../store.js'

const emit = defineEmits(['close'])

const step = ref(1)
const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')

const verifyEmail = () => {
  const users = JSON.parse(localStorage.getItem('allkeys_users') || '[]')
  const exists = users.some(u => u.email === email.value)

  if (exists) {
    error.value = ''
    step.value = 2
  } else {
    error.value = 'Аккаунт с таким email не найден.'
  }
}

const saveNewPassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Пароли не совпадают. Попробуйте еще раз.'
    return
  }

  const users = JSON.parse(localStorage.getItem('allkeys_users') || '[]')
  const userAccount = users.find(u => u.email === email.value)

  if (userAccount && userAccount.password === newPassword.value) {
    error.value = 'Новый пароль не должен совпадать с текущим.'
    return
  }

  error.value = ''
  store.resetPassword(email.value, newPassword.value)
  step.value = 3
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  padding: 1rem;
}

.modal-content {
  padding: 2.5rem 2rem;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 400px;
  box-shadow: var(--shadow-lg);
  position: relative;
  text-align: center;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color 0.3s;
}

.close-btn:hover { color: var(--color-danger); }

.icon-circle {
  font-size: 3rem;
  background: rgba(52, 152, 219, 0.1);
  color: var(--color-secondary);
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  margin: 0 auto 1.5rem auto;
}

.success-color {
  background: rgba(66, 185, 131, 0.1);
}

h2 {
  color: var(--color-text-main);
  margin-bottom: 0.5rem;
}
.desc {
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  position: relative;
  text-align: left;
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

.error-msg {
  background: rgba(231, 76, 60, 0.1);
  color: var(--color-danger);
  padding: 0.8rem;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-weight: bold;
}
.w-100 {
  width: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>