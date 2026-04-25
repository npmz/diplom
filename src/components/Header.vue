<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/" class="logo">
          <IconKey class="logo-icon" /> <span class="logo-text">AllKeys</span>
        </router-link>
      </div>

      <nav class="nav">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/products" class="nav-link">Каталог</router-link>

        <router-link to="/profile" class="profile-btn" :title="store.currentUser ? 'Перейти в профиль' : 'Войти в аккаунт'">
          <IconUser />

          <span class="profile-text">
            {{ store.currentUser ? store.currentUser.name : 'Войти' }}
          </span>
        </router-link>

        <button class="cart-btn" @click="store.toggleCart()">
          <IconCart />

          <span v-if="store.cartTotalItems > 0" class="cart-badge">
            {{ store.cartTotalItems }}
          </span>
        </button>

        <button class="theme-btn" @click="store.toggleTheme()" title="Сменить тему">
          <IconSun v-if="store.theme === 'dark'" />
          <IconMoon v-else />
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { store } from '../store.js'
import IconCart from './icons/IconCart.vue'
import IconUser from './icons/IconUser.vue'
import IconKey from './icons/IconKey.vue'
import IconSun from './icons/IconSun.vue'
import IconMoon from './icons/IconMoon.vue'
import { ref, watch } from 'vue'


const isBumping = ref(false)

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

.logo a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text-main);
}

.logo-icon {
  width: 32px !important;
  height: 32px !important;
  color: var(--color-primary);
}

.theme-btn {
  background: transparent;
  border: none;
  color: var(--color-text-main);
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease, transform 0.2s ease;
}

.theme-btn:hover {
  background: rgba(66, 185, 131, 0.1);
  transform: rotate(15deg);
}

.theme-btn .icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: inherit;
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

.profile-btn {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  color: var(--color-text-main);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-pill);
  transition: all 0.2s ease;
}

.profile-btn:hover {
  background: rgba(66, 185, 131, 0.1);
  transform: translateY(-1px);
}

.profile-text {
  font-weight: 600;
  font-size: 0.95rem;
}

.profile-btn .icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: inherit;
}

@media (max-width: 480px) {
  .profile-text {
    display: none;
  }
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

@keyframes bump {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.badge.bump {
  animation: bump 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cart-btn {
  position: relative;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.cart-btn:hover {
  transform: scale(1.1);
}

.cart-btn .icon {
  width: 28px;
  height: 28px;
  color: var(--color-text-main);
}


.cart-badge {
  position: absolute;
  top: 0px;
  right: -5px;
  background-color: var(--color-danger, #e74c3c);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 3px 6px;
  border-radius: 50px;
  line-height: 1;
  box-shadow: 0 2px 5px rgba(231, 76, 60, 0.4);
  pointer-events: none;
  animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}


@keyframes pop {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}


@media (max-width: 600px) {
  .header-container {
    padding: 0 1rem;
  }
  .cart-text {
    display: none;
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