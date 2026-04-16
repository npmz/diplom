<template>
  <div class="cart-page">
    <h2>Корзина</h2>

    <div v-if="store.cart.length === 0" class="empty-cart">
      <p>Ваша корзина пуста.</p>
      <router-link to="/products">Перейти к покупкам</router-link>
    </div>

    <div v-else>
      <ul class="cart-list">
        <li v-for="item in store.cart" :key="item.id" class="cart-item">
          <span>{{ item.name }} (x{{ item.quantity }})</span>
          <span>{{ item.price * item.quantity }} ₽</span>
          <button class="remove-btn" @click="store.removeFromCart(item.id)">Удалить</button>
        </li>
      </ul>
      <div class="cart-total">
        <h3>Итого: {{ store.cartTotal }} ₽</h3>
        <button class="checkout-btn" @click="showCheckout = true">Продолжить</button>
      </div>
    </div>

    <CheckoutModal
        v-if="showCheckout"
        @close="showCheckout = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../store.js'
import CheckoutModal from '../components/CheckoutModal.vue'

const showCheckout = ref(false)
</script>

<style scoped>
.cart-list {
  list-style: none;
  padding: 0;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  margin-bottom: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.remove-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 3px;
}
.cart-total {
  text-align: right;
  margin-top: 2rem;
}
.checkout-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
}
</style>