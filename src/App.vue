<template>
  <div class="app-container">
    <Header />

    <main class="main-content">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue' // Импорт
</script>

<style>
/* Эти стили гарантируют, что если на странице мало контента,
   подвал все равно будет прижат к низу экрана. */
html, body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Минимальная высота - весь экран */
}

.main-content {
  flex: 1; /* Этот блок растягивается, заполняя пустое место */
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f4f9;
  color: #333;
}
</style>