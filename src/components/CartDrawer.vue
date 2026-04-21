<template>
  <div class="cart-backdrop" :class="{ 'is-open': store.isCartOpen }" @click.self="store.toggleCart()">
    <div class="cart-drawer surface-box" :class="{ 'is-open': store.isCartOpen }">

      <div class="cart-header">
        <h2>Корзина <span v-if="store.cartTotalItems" class="count-badge">{{ store.cartTotalItems }}</span></h2>
        <button class="close-btn" @click="store.toggleCart()">✖</button>
      </div>

      <div v-if="store.cart.length === 0" class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h3>Ваша корзина пуста</h3>
        <p>Загляните в каталог, чтобы выбрать отличные товары.</p>
        <router-link to="/products" class="btn btn-primary" @click="store.toggleCart()">Перейти в каталог</router-link>
      </div>

      <div v-else class="cart-items">
        <div v-for="item in store.cart" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="item-image" />

          <div class="item-details">
            <h4 class="item-title">{{ item.name }}</h4>
            <div class="item-price">{{ item.price }} ₽</div>

            <div class="item-controls">
              <div class="qty-selector">
                <button @click="store.decreaseQuantity(item.id)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="store.increaseQuantity(item.id)">+</button>
              </div>
              <button class="remove-btn" @click="store.removeFromCart(item.id)" title="Удалить">🗑️</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="store.cart.length > 0" class="cart-footer">
        <div class="total-row">
          <span>Итого:</span>
          <span class="total-price">{{ store.cartTotalPrice }} ₽</span>
        </div>

        <button v-if="store.isAuthenticated" class="btn btn-primary w-100 btn-checkout" @click="store.openCheckout()">
          Перейти к оформлению
        </button>
        <button v-else class="btn btn-secondary w-100" @click="promptAuth">
          Войти для оформления
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { store } from '../store.js'

const promptAuth = () => {
  store.toggleCart()
  store.openAuthModal()
}
</script>

<style scoped>
.cart-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 4000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.cart-backdrop.is-open {
  opacity: 1;
  pointer-events: auto;
}

.cart-drawer {
  position: absolute;
  top: 0;
  right: -100%;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 25px rgba(0,0,0,0.2);
  transition: right 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.cart-drawer.is-open { right: 0; }

.cart-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}

.cart-header h2 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--color-text-main);
}
.count-badge {
  background: var(--color-primary);
  color: white;
  font-size: 0.9rem;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-text-muted);
  cursor: pointer;
}
.close-btn:hover {
  color: var(--color-danger);
}

.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  color: var(--color-text-muted);
}
.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}
.empty-cart h3 {
  color: var(--color-text-main);
  margin-bottom: 0.5rem;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.cart-item {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed var(--color-border);
}
.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}
.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.item-title {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text-main);
  line-height: 1.3;
}
.item-price {
  font-weight: bold;
  color: var(--color-primary);
}

.item-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}
.qty-selector {
  display: flex;
  align-items: center;
  background: var(--color-bg-body);
  border-radius: var(--radius-pill);
  overflow: hidden;
  border: 1px solid var(--color-border);
}
.qty-selector button {
  background: none;
  border: none;
  padding: 0.2rem 0.6rem;
  cursor: pointer;
  color: var(--color-text-main);
  font-weight: bold;
  transition: background 0.2s;
}
.qty-selector button:hover {
  background: rgba(66, 185, 131, 0.1);
}
.qty-selector span {
  padding: 0 0.8rem;
  font-size: 0.9rem;
  font-weight: bold;
}
.remove-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 1.1rem;
  transition: color 0.2s;
}
.remove-btn:hover {
  color: var(--color-danger);
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-body);
}
.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-text-main);
  margin-bottom: 1rem;
}
.w-100 {
  width: 100%;
}
.btn-checkout {
  padding: 1rem;
  font-size: 1.1rem;
}
</style>