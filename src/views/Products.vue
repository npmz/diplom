<template>
  <div class="products-page">

    <div class="catalog-header">
      <div class="header-content">
        <h2>Каталог цифровых ключей</h2>
        <p>Выбирайте лучшее. Активируйте мгновенно.</p>
      </div>
      <button @click="handleAddClick" class="btn btn-primary add-btn">
        + Продать товар
      </button>
    </div>

    <div class="controls-container">
      <div class="search-wrapper">
        <span class="search-icon"><IconSearch /></span>
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Искать игры или софт..."
        />
      </div>

      <div class="filters">
        <button :class="{ active: currentFilter === 'All' }" @click="setFilter('All')">Все</button>
        <button :class="{ active: currentFilter === 'Games' }" @click="setFilter('Games')"><IconCube /> Игры</button>
        <button :class="{ active: currentFilter === 'Software' }" @click="setFilter('Software')"><IconLaptop /> Софт</button>
      </div>
    </div>

    <div v-if="filteredProducts.length === 0" class="no-results">
      <div class="empty-icon"><IconArchive />️</div>
      <h3>Ничего не найдено</h3>
      <p>Мы не нашли товары по запросу "<strong>{{ searchQuery }}</strong>".</p>
      <button @click="resetSearch" class="reset-btn">Показать все товары</button>
    </div>

    <transition-group name="grid" tag="div" class="product-grid" v-else>
      <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @openDetails="openProductModal"
      />
    </transition-group>

    <ProductModal
        v-if="selectedProduct"
        :product="selectedProduct"
        @close="selectedProduct = null"
    />

    <AddProductModal
        v-if="showAddModal"
        @close="showAddModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'
import ProductCard from '../components/ProductCard.vue'
import ProductModal from '../components/ProductModal.vue'
import AddProductModal from '../components/AddProductModal.vue'
import IconSearch from '../components/icons/IconSearch.vue'
import IconArchive from '../components/icons/IconArchive.vue'
import IconCube from '../components/icons/IconCube.vue'
import IconLaptop from '../components/icons/IconLaptop.vue'

const router = useRouter()
const showAddModal = ref(false)

const currentFilter = ref('All')
const selectedProduct = ref(null)
const searchQuery = ref('')

const openProductModal = (product) => {
  selectedProduct.value = product
}

const openAddProduct = () => {
  if (store.isAuthenticated) {
    showAddModal.value = true
  } else {
    router.push('/profile')
  }
}

const baseProducts =[
  {
    id: 1,
    name: 'Windows 11 Pro (OEM)',
    category: 'Software',
    price: 1500,
    image: '/images/w11pro.png',
    description: 'Оригинальный ключ активации для Windows 11 Pro. Идеально подходит для бизнеса и продвинутых пользователей. Привязывается к материнской плате.',
    benefits: ['Бессрочная лицензия', 'Поддержка BitLocker', 'Удаленный рабочий стол']
  },
  {
    id: 2,
    name: 'Windows 10 Home',
    category: 'Software',
    price: 1200,
    image: '/images/w10h.png'
  },
  {
    id: 3,
    name: 'Microsoft Office 2021 Pro Plus',
    category: 'Software',
    price: 2500,
    image: '/images/mo21pp.png'
  },
  {
    id: 4,
    name: 'Kaspersky Internet Security (1 год)',
    category: 'Software',
    price: 1100,
    image: '/images/kis.jpg'
  },
  {
    id: 5,
    name: 'Dr.Web Security Space',
    category: 'Software',
    price: 950,
    image: '/images/dws.jfif'
  },
  {
    id: 6,
    name: 'Adobe Creative Cloud (1 месяц)',
    category: 'Software',
    price: 3200,
    image: '/images/acc.jfif',
    description: 'Полный доступ ко всем приложениям Adobe, включая Photoshop, Illustrator, Premiere Pro и After Effects на 1 месяц.'
  },
  {
    id: 7,
    name: 'JetBrains All Products Pack (1 год)',
    category: 'Software',
    price: 8500,
    image: '/images/jbapp.jfif'
  },
  {
    id: 8,
    name: 'AIDA64 Extreme Edition',
    category: 'Software',
    price: 800,
    image: '/images/aee.png'
  },

  {
    id: 9,
    name: 'Cyberpunk 2077 (Steam)',
    category: 'Games',
    price: 2100,
    image: '/images/c77.jpg',
    description: 'Приключенческая ролевая игра, действие которой происходит в мегаполисе Найт-Сити. Станьте киберпанком-наемником и найдите ключ к бессмертию.',
    benefits: ['Ключ для Steam (Region Free)', 'Включает все патчи', 'Одиночная кампания']
  },
  {
    id: 10,
    name: 'Minecraft: Java & Bedrock Edition',
    category: 'Games',
    price: 1800,
    image: '/images/mjb.jpg'
  },
  {
    id: 11,
    name: 'Grand Theft Auto V (Rockstar)',
    category: 'Games',
    price: 1400,
    image: '/images/gta5.jfif'
  },
  {
    id: 12,
    name: 'Red Dead Redemption 2 (Steam)',
    category: 'Games',
    price: 2400,
    image: '/images/rdr2.avif'
  },
  {
    id: 13,
    name: 'Elden Ring (Steam)',
    category: 'Games',
    price: 3500,
    image: '/images/er.jpeg'
  },
  {
    id: 14,
    name: 'The Witcher 3: Wild Hunt',
    category: 'Games',
    price: 900,
    image: '/images/tw3.avif'
  },
  {
    id: 15,
    name: 'Baldur’s Gate 3 (Steam)',
    category: 'Games',
    price: 3200,
    image: '/images/bg3.jfif'
  },
  {
    id: 16,
    name: 'EA SPORTS FC 24 (Origin)',
    category: 'Games',
    price: 4500,
    image: '/images/eafc.jfif'
  },
  {
    id: 17,
    name: 'Hogwarts Legacy (Steam)',
    category: 'Games',
    price: 2800,
    image: '/images/hleg.png'
  },
  {
    id: 18,
    name: 'Rust (Steam)',
    category: 'Games',
    price: 1100,
    image: '/images/rust.jfif'
  },
  {
    id: 19,
    name: 'Counter-Strike 2 Prime Status',
    category: 'Games',
    price: 1350,
    image: '/images/cs2p.png',
    description: 'Получите Prime-статус в CS2 для матчмейкинга с другими Prime-игроками, а также эксклюзивные сувениры и еженедельный дроп.'
  },
  {
    id: 20,
    name: 'Terraria (Steam)',
    category: 'Games',
    price: 350,
    image: '/images/ter.jpg'
  }
]
const allProducts = computed(() => {
  return [...baseProducts, ...store.customProducts]
})

const setFilter = (category) => {
  currentFilter.value = category
}

const resetSearch = () => {
  searchQuery.value = ''
  currentFilter.value = 'All'
}

const filteredProducts = computed(() => {
  let result = allProducts.value

  if (currentFilter.value !== 'All') {
    result = result.filter(p => p.category === currentFilter.value)
  }

  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => p.name.toLowerCase().includes(query))
  }

  return result.reverse()
})
</script>

<style scoped>
.products-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.catalog-header {
  background-color: var(--color-surface);

  background-image: linear-gradient(135deg, rgba(66, 185, 131, 0.1) 0%, rgba(52, 152, 219, 0.1) 100%);

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 3rem 2rem;
  box-shadow: var(--shadow-sm);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  transition: background-color 0.3s ease, border-color 0.3s ease;
}

@media (min-width: 768px) {
  .catalog-header {
    flex-direction: row;
    text-align: left;
  }
}

.header-content h2 {
  font-size: 2.2rem;
  margin: 0 0 0.5rem 0;
  color: var(--color-text-main);
}

.header-content p {
  font-size: 1.1rem;
  margin: 0;
  color: var(--color-text-muted);
}

.sell-btn {
  background-color: var(--color-primary);
  color: white;
  box-shadow: 0 4px 15px rgba(66, 185, 131, 0.3);
  white-space: nowrap;
}

.sell-btn:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
}

.controls-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: var(--color-surface);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.03);
}

@media (min-width: 768px) {
  .controls-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.search-wrapper {

  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-wrapper input {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.8rem;

  background-color: var(--color-bg-body);
  color: var(--color-text-main);
  border: 2px solid var(--color-border);

  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
  display: flex;
}

.search-wrapper input:focus {
  outline: none;
  border-color: var(--color-primary);
  background-color: var(--color-surface);
  box-shadow: 0 0 0 4px rgba(66, 185, 131, 0.1);
}


.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.search-icon .icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filters button .icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: -2px;
}

.filters button {
  align-items: center;
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text-main);
  cursor: pointer;
  border-radius: 50px;
  font-weight: bold;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.filters button:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.filters button.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
  box-shadow: 0 4px 10px rgba(66, 185, 131, 0.3);
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--color-surface);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: shake 3s infinite ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

.no-results h3 {
  font-size: 1.5rem;
  color: var(--color-text-main);
  margin-bottom: 0.5rem;
}

.no-results p {
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
}

.reset-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s;
}

.reset-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
}

.grid-enter-active,
.grid-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
</style>