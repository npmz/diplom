<template>
  <div class="cart-page">
    <h2>Корзина</h2>

    <div v-if="store.cart.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h3>Здесь пока ничего нет</h3>
      <p>Вы еще ничего не добавили в корзину. <br>Перейдите в каталог, чтобы найти лучшие ключи для игр и софта!</p>
      <router-link to="/products" class="go-shop-btn">В каталог товаров</router-link>
    </div>

    <div v-else>
      <div class="cart-header">
        <span class="header-name">Наименование товара</span>
        <span class="header-qty">Количество</span>
        <span class="header-price">Стоимость</span>
        <span class="header-action"></span>
      </div>

      <transition-group name="list" tag="ul" class="cart-list">
        <li v-for="item in store.cart" :key="item.id" class="cart-item">
          <span class="item-name">{{ item.name }}</span>

          <div class="item-qty-controls">
            <button
                class="qty-btn"
                @click="store.updateQuantity(item.id, item.quantity - 1)"
            >−</button>
            <span class="qty-number">{{ item.quantity }}</span>
            <button
                class="qty-btn"
                @click="store.updateQuantity(item.id, item.quantity + 1)"
            >+</button>
          </div>

          <span class="item-price">{{ item.price * item.quantity }} ₽</span>
          <button class="remove-btn" @click="store.removeFromCart(item.id)">Удалить</button>
        </li>
      </transition-group>

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
.empty-cart {
  background: white;
  padding: 4rem 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  opacity: 0.8;
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
.empty-cart h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}
.empty-cart p {
  color: #7f8c8d;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
}
.go-shop-btn {
  background-color: #42b983;
  color: white;
  text-decoration: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(66, 185, 131, 0.3);
}
.go-shop-btn:hover {
  background-color: #3aa876;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(66, 185, 131, 0.4);
}

/* --- ОБНОВЛЕННАЯ СЕТКА --- */
.cart-header, .cart-item {
  display: grid;
  /* Слегка расширили колонку "Количество" (было 1fr, стало 120px) */
  grid-template-columns: 3fr 120px 1fr 100px;
  align-items: center;
  gap: 1.5rem;
}

.cart-header {
  padding: 1rem 1rem 1rem 1rem;
  font-weight: bold;
  color: #7f8c8d;
  font-size: 0.9rem;
  text-transform: uppercase;
  border-bottom: 2px solid #ecf0f1;
  margin-bottom: 1rem;
}

.cart-list {
  list-style: none;
  padding: 0;
  position: relative;
}

.cart-item {
  padding: 1rem;
  background: white;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.item-name {
  font-weight: bold;
  color: #2c3e50;
}

/* --- СТИЛИ ДЛЯ КНОПОК КОЛИЧЕСТВА --- */
.header-qty {
  text-align: center;
}

.item-qty-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.qty-btn {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #495057;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  user-select: none; /* Чтобы текст на кнопке не выделялся при быстрых кликах */
}

.qty-btn:hover {
  background: #e9ecef;
  border-color: #ced4da;
}

.qty-btn:active {
  background: #dee2e6;
}

.qty-number {
  font-weight: bold;
  min-width: 24px;
  text-align: center;
  color: #2c3e50;
}

/* ---------------------------------- */

.header-price, .item-price {
  text-align: right;
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
}

/* Адаптивность для телефонов */
@media (max-width: 600px) {
  .cart-header {
    display: none;
  }
  .cart-item {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.75rem;
  }
  .header-price, .item-price {
    text-align: center;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
  width: calc(100% - 2rem);
}

.remove-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
  width: 100%;
}
.remove-btn:hover {
  background: #c0392b;
}
.cart-total {
  text-align: right;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #ecf0f1;
}
.cart-total h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}
.checkout-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
}
.checkout-btn:hover {
  background: #3aa876;
}
</style>