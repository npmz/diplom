<template>
  <div class="product-card" @click="$emit('openDetails', product)">
    <div class="image-container">
      <img :src="product.image" :alt="product.name" />

      <div v-if="product.isCustom" class="user-badge">Добавлено пользователем</div>

      <button
          class="favorite-btn"
          :class="{ 'is-active': store.isFavorite(product.id) }"
          @click.stop="handleFavoriteClick"
      >
        <span v-if="store.isFavorite(product.id)">❤️</span>
        <span v-else>🤍</span>
      </button>
    </div>

    <h3>{{ product.name }}</h3>
    <p class="price">{{ product.price }} ₽</p>

    <button @click.stop="addToCart" class="add-btn" :class="{ 'added': isAdded }">
      {{ isAdded ? 'Добавлено ✔' : 'В корзину' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../store.js'


const props = defineProps(['product'])


const handleFavoriteClick = () => {
  if (store.isAuthenticated) {
    store.toggleFavorite(props.product)
  } else {
    store.openAuthModal()
  }
}

defineEmits(['openDetails'])

const isAdded = ref(false)

const addToCart = () => {
  store.addToCart(props.product)

  isAdded.value = true

  setTimeout(() => {
    isAdded.value = false
  }, 1000)
}
</script>

<style scoped>
.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--color-surface);
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  z-index: 3;
  font-size: 1.2rem;
  line-height: 1;
}

.favorite-btn:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-md);
}

.favorite-btn.is-active {
  background: var(--color-surface);
}
.product-card {
  background-color: var(--color-surface);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.15);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
}

h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--color-text-main);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-text-main);
  margin-bottom: 1.5rem;
  margin-top: auto;
}

.add-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.add-btn:hover {
  background-color: #2980b9;
}

.add-btn.added {
  background-color: #27ae60;
  transform: scale(1.05);
}

.image-container {
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
  overflow: hidden;
  border-radius: var(--radius-sm);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .image-container img {
  transform: scale(1.1);
}

.user-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(52, 152, 219, 0.9);
  color: white;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: var(--radius-sm);
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 2;
}
</style>