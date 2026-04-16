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
          @openDetails="openProductModal"
      />
    </div>
    <ProductModal
        v-if="selectedProduct"
        :product="selectedProduct"
        @close="selectedProduct = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import ProductModal from '../components/ProductModal.vue' // Импортируем модалку

const currentFilter = ref('All')
const selectedProduct = ref(null)

const openProductModal = (product) => {
  selectedProduct.value = product
}
// Имитация базы данных товаров
// Имитация базы данных товаров со стабильными картинками
const allProducts = ref([
  {
    id: 1,
    name: 'Windows 11 Pro (OEM)',
    category: 'Software',
    price: 1500,
    image: 'https://placehold.co/400x300/0078D7/FFF?text=Windows+11+Pro'
  },
  {
    id: 2,
    name: 'Windows 10 Home',
    category: 'Software',
    price: 1200,
    image: 'https://placehold.co/400x300/0078D7/FFF?text=Windows+10'
  },
  {
    id: 3,
    name: 'Microsoft Office 2021 Pro Plus',
    category: 'Software',
    price: 2500,
    image: 'https://placehold.co/400x300/D83B01/FFF?text=MS+Office+2021'
  },
  {
    id: 4,
    name: 'Kaspersky Internet Security (1 год)',
    category: 'Software',
    price: 1100,
    image: 'https://placehold.co/400x300/00A88E/FFF?text=Kaspersky'
  },
  {
    id: 5,
    name: 'Dr.Web Security Space',
    category: 'Software',
    price: 950,
    image: 'https://placehold.co/400x300/4CAF50/FFF?text=Dr.Web'
  },
  {
    id: 6,
    name: 'Adobe Creative Cloud (1 месяц)',
    category: 'Software',
    price: 3200,
    image: 'https://placehold.co/400x300/FF0000/FFF?text=Adobe+CC'
  },
  {
    id: 7,
    name: 'JetBrains All Products Pack (1 год)',
    category: 'Software',
    price: 8500,
    image: 'https://placehold.co/400x300/000000/FFF?text=JetBrains'
  },
  {
    id: 8,
    name: 'AIDA64 Extreme Edition',
    category: 'Software',
    price: 800,
    image: 'https://placehold.co/400x300/E67E22/FFF?text=AIDA64'
  },

  // --- ИГРЫ (Games) ---
  {
    id: 9,
    name: 'Cyberpunk 2077 (Steam)',
    category: 'Games',
    price: 2100,
    image: 'https://placehold.co/400x300/F1C40F/000?text=Cyberpunk+2077'
  },
  {
    id: 10,
    name: 'Minecraft: Java & Bedrock Edition',
    category: 'Games',
    price: 1800,
    image: 'https://placehold.co/400x300/27AE60/FFF?text=Minecraft'
  },
  {
    id: 11,
    name: 'Grand Theft Auto V (Rockstar)',
    category: 'Games',
    price: 1400,
    image: 'https://placehold.co/400x300/2ECC71/FFF?text=GTA+V'
  },
  {
    id: 12,
    name: 'Red Dead Redemption 2 (Steam)',
    category: 'Games',
    price: 2400,
    image: 'https://placehold.co/400x300/C0392B/FFF?text=RDR+2'
  },
  {
    id: 13,
    name: 'Elden Ring (Steam)',
    category: 'Games',
    price: 3500,
    image: 'https://placehold.co/400x300/D35400/FFF?text=Elden+Ring'
  },
  {
    id: 14,
    name: 'The Witcher 3: Wild Hunt',
    category: 'Games',
    price: 900,
    image: 'https://placehold.co/400x300/8E44AD/FFF?text=The+Witcher+3'
  },
  {
    id: 15,
    name: 'Baldur’s Gate 3 (Steam)',
    category: 'Games',
    price: 3200,
    image: 'https://placehold.co/400x300/8B0000/FFF?text=Baldurs+Gate+3'
  },
  {
    id: 16,
    name: 'EA SPORTS FC 24 (Origin)',
    category: 'Games',
    price: 4500,
    image: 'https://placehold.co/400x300/2980B9/FFF?text=EA+FC+24'
  },
  {
    id: 17,
    name: 'Hogwarts Legacy (Steam)',
    category: 'Games',
    price: 2800,
    image: 'https://placehold.co/400x300/1ABC9C/FFF?text=Hogwarts+Legacy'
  },
  {
    id: 18,
    name: 'Rust (Steam)',
    category: 'Games',
    price: 1100,
    image: 'https://placehold.co/400x300/A63A00/FFF?text=Rust'
  },
  {
    id: 19,
    name: 'Counter-Strike 2 Prime Status',
    category: 'Games',
    price: 1350,
    image: 'https://placehold.co/400x300/F39C12/FFF?text=CS2+Prime'
  },
  {
    id: 20,
    name: 'Terraria (Steam)',
    category: 'Games',
    price: 350,
    image: 'https://placehold.co/400x300/228B22/FFF?text=Terraria'
  }
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