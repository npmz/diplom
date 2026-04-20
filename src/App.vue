<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />

    <AuthPromptModal v-if="store.isAuthModalOpen" />
    <LogoutModal v-if="store.isLogoutModalOpen" /> </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import AuthPromptModal from './components/AuthPromptModal.vue'
import LogoutModal from './components/LogoutModal.vue'
import { store } from './store.js'
</script>

<style scoped>
/* Оставляем только то, что касается структуры самого App.vue */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>