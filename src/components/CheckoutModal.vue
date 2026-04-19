<template>
  <div class="modal-overlay" @click.self="!paymentSuccess && $emit('close')">
    <div class="modal-content">

      <template v-if="!paymentSuccess">
        <h2>Оформление заказа</h2>
        <p>К оплате: <strong>{{ store.cartTotal }} ₽</strong></p>

        <form @submit.prevent="processPayment">
          <div class="form-group">
            <label>Email (для получения ключей)</label>
            <input type="email" v-model="formData.email" required placeholder="example@mail.com" />
          </div>

          <div class="form-group">
            <label>Номер карты</label>
            <input type="text" v-model="formData.cardNumber" required placeholder="0000 0000 0000 0000" maxlength="19" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Срок действия</label>
              <input type="text" v-model="formData.expiry" required placeholder="MM/YY" maxlength="5" />
            </div>
            <div class="form-group">
              <label>CVC</label>
              <input type="password" v-model="formData.cvc" required placeholder="***" maxlength="3" />
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isProcessing">
            {{ isProcessing ? 'Обработка платежа...' : 'Оплатить' }}
          </button>
          <button type="button" class="cancel-btn" @click="$emit('close')" :disabled="isProcessing">Отмена</button>
        </form>
      </template>

      <template v-else>
        <div class="success-screen">
          <div class="success-icon">✨</div>
          <h2>Оплата прошла успешно!</h2>
          <p class="success-desc">
            Ваш цифровой ключ отправлен на почту:<br>
            <strong>{{ formData.email }}</strong>
          </p>
          <div class="info-box">
            <span class="info-icon">⏱️</span>
            <p>Примерное время ожидания письма: <strong>5-10 минут</strong>. Не забудьте проверить папку "Спам".</p>
          </div>
          <button class="submit-btn" @click="finishAndRedirect">Вернуться на главную</button>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { store } from '../store.js'
import { useRouter } from 'vue-router'

const emit = defineEmits(['close'])
const router = useRouter()

const paymentSuccess = ref(false)
const isProcessing = ref(false)

const formData = reactive({
  email: '',
  cardNumber: '',
  expiry: '',
  cvc: ''
})

onMounted(() => {
  if (store.currentUser) {
    formData.email = store.currentUser.email
  }
})

const processPayment = () => {
  // Включаем состояние загрузки (для красоты)
  isProcessing.value = true

  // Имитируем задержку банка (1.5 секунды)
  setTimeout(() => {
    isProcessing.value = false
    paymentSuccess.value = true // Переключаем экран на "Успешно"
  }, 1500)
}

const finishAndRedirect = () => {
  store.clearCart()
  emit('close')
  router.push('/')
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
  backdrop-filter: blur(5px); /* Легкое размытие фона */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
}

.modal-content {
  background-color: var(--color-surface);
  padding: 2.5rem 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  position: relative;
  overflow: hidden;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #42b983;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #3aa876;
}

.submit-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.cancel-btn {
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  color: var(--color-text-muted);
  border: none;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 1rem;
}

.cancel-btn:hover:not(:disabled) {
  color: #e74c3c;
}

/* --- СТИЛИ ЭКРАНА УСПЕХА --- */
.success-screen {
  text-align: center;
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  background-color: var(--color-surface);;
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  display: inline-block;
}

.success-screen h2 {
  color: var(--color-text-main);
  margin-bottom: 1rem;
}

.success-desc {
  color: #555;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.info-box {
  background: #fdf2e9;
  border: 1px solid #f9e79f;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  text-align: left;
  margin-bottom: 2rem;
}

.info-icon {
  font-size: 1.5rem;
}

.info-box p {
  margin: 0;
  color: #d35400;
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>