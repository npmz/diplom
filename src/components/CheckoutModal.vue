<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
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

        <button type="submit" class="submit-btn">Оплатить</button>
        <button type="button" class="cancel-btn" @click="$emit('close')">Отмена</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { store } from '../store.js'
import { useRouter } from 'vue-router'

const emit = defineEmits(['close'])
const router = useRouter()

const formData = reactive({
  email: '',
  cardNumber: '',
  expiry: '',
  cvc: ''
})

const processPayment = () => {
  // Имитация обработки платежа
  alert(`Оплата прошла успешно! Цифровые ключи отправлены на почту: ${formData.email}`)
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
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}
.form-group {
  margin-bottom: 1rem;
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
}
input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1rem;
}
.cancel-btn {
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  color: #888;
  border: none;
  cursor: pointer;
  margin-top: 0.5rem;
}
</style>