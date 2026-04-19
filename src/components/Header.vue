<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/">
          <span class="logo-icon">🔑</span>
          <span class="logo-text">All<span class="accent">Keys</span></span>
        </router-link>
      </div>

      <nav class="nav">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/products" class="nav-link">Каталог</router-link>

        <router-link to="/profile" class="nav-link profile-link">
          👤 {{ store.isAuthenticated ? store.currentUser.name : 'Войти' }}
        </router-link>

        <router-link to="/cart" class="cart-link nav-link">
          <span class="cart-icon">🛒</span>
          <span class="cart-text">Корзина</span>
          <span class="badge" :class="{ 'bump': isBumping }" v-if="store.cartCount > 0">
            {{ store.cartCount }}
          </span>
        </router-link>

        <button @click="store.toggleTheme" class="theme-toggle">
          {{ store.theme === 'dark' ? '☀️' : '🌙' }}
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { store } from '../store.js'

const isBumping = ref(false)

// Анимация счетчика при добавлении товара
watch(() => store.cartCount, (newCount, oldCount) => {
  if (newCount > oldCount) {
    isBumping.value = true
    setTimeout(() => {
      isBumping.value = false
    }, 300)
  }
})
</script>

<style scoped>
.header {
  /* ЭФФЕКТ СТЕКЛА (Glassmorphism) */
  background: rgba(44, 62, 80, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* --- СТИЛИ ЛОГОТИПА --- */
.logo a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  color: white;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.logo-text .accent {
  background: linear-gradient(45deg, #42b983, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* --- НАВИГАЦИЯ И ССЫЛКИ --- */
.nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #42b983;
}

/* Анимированная линия под ссылкой */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #42b983;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: white;
}

/* --- КОРЗИНА --- */
.cart-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1.2rem !important;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.cart-link:hover {
  background: rgba(66, 185, 131, 0.2);
}

.cart-link::after {
  display: none; /* Убираем линию под кнопкой корзины */
}

.badge {
  background: linear-gradient(45deg, #e74c3c, #ff5e57);
  color: white;
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(231, 76, 60, 0.4);
}

/* --- АНИМАЦИЯ --- */
@keyframes bump {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.badge.bump {
  animation: bump 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* АДАПТИВНОСТЬ */
@media (max-width: 600px) {
  .header-container {
    padding: 0 1rem;
  }
  .cart-text {
    display: none; /* Прячем текст на мобильных, оставляем иконку */
  }
  .nav {
    gap: 1rem;
  }
}

.theme-toggle {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  transform: rotate(15deg) scale(1.1);
  background: rgba(255, 255, 255, 0.1);
}
</style>