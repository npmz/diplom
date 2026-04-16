<template>
  <div class="products-page">
    <h2>Каталог товаров</h2>

    <div class="filters">
      <button :class="{ active: currentFilter === 'All' }" @click="setFilter('All')">Все</button>
      <button :class="{ active: currentFilter === 'Games' }" @click="setFilter('Games')">Игры</button>
      <button :class="{ active: currentFilter === 'Software' }" @click="setFilter('Software')">Софт</button>
    </div>

    <div class="product-grid">
      <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'

const currentFilter = ref('All')

// Имитация базы данных товаров
// Имитация базы данных товаров со стабильными картинками
const allProducts = ref([
  {
    id: 1,
    name: 'Windows 11 Pro',
    category: 'Software',
    price: 1500,
    image: 'https://placehold.co/400x300/2c3e50/FFF?text=Windows+11'
  },
  {
    id: 2,
    name: 'Cyberpunk 2077 (Steam)',
    category: 'Games',
    price: 2000,
    image: 'https://placehold.co/400x300/e74c3c/FFF?text=Cyberpunk+2077'
  },
  {
    id: 3,
    name: 'Kaspersky Internet Security',
    category: 'Software',
    price: 900,
    image: 'https://placehold.co/400x300/27ae60/FFF?text=Kaspersky'
  },
  {
    id: 4,
    name: 'Minecraft Java Edition',
    category: 'Games',
    price: 1800,
    image: 'https://placehold.co/400x300/8e44ad/FFF?text=Minecraft'
  },
  {
    id: 5,
    name: 'Microsoft Office 2021',
    category: 'Software',
    price: 2500,
    image: 'https://placehold.co/400x300/e67e22/FFF?text=MS+Office'
  },
])

const setFilter = (category) => {
  currentFilter.value = category
}

const filteredProducts = computed(() => {
  if (currentFilter.value === 'All') return allProducts.value
  return allProducts.value.filter(p => p.category === currentFilter.value)
})
</script>

<style scoped>
.filters {
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
}
.filters button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}
.filters button.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}
</style>