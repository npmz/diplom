<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">AllKeys</router-link>
    </div>
    <nav class="nav">
      <router-link to="/">Главная</router-link>
      <router-link to="/products">Каталог ключей</router-link>
      <router-link to="/cart" class="cart-link">
        Корзина <span class="badge" v-if="store.cartCount > 0">{{ store.cartCount }}</span>
      </router-link>
    </nav>
  </header>
</template>

<script setup>
import { store } from '../store.js'
</script>

<style scoped>
.header {
  background-color: #2c3e50;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo a {
  color: #42b983;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}
.nav a {
  color: white;
  text-decoration: none;
  margin-left: 1.5rem;
  font-size: 1.1rem;
  transition: color 0.3s;
}
.nav a:hover, .nav a.router-link-active {
  color: #42b983;
}
.cart-link {
  position: relative;
}
.badge {
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  position: absolute;
  top: -10px;
  right: -15px;
}
</style>