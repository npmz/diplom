<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">&times;</button>

      <div class="modal-body">
        <div class="image-container">
          <img :src="product.image" :alt="product.name" />
        </div>

        <div class="info-container">
          <h2>{{ product.name }}</h2>
          <span class="category-badge">{{ product.category === 'Games' ? 'Игра' : 'Софт' }}</span>
          <p class="price">{{ product.price }} ₽</p>

          <div class="description-block">
            <h3>Описание</h3>
            <p>{{ product.description || 'Официальный цифровой ключ активации. Мгновенная доставка на вашу электронную почту сразу после оплаты.' }}</p>
          </div>

          <div class="benefits-block">
            <h3>Преимущества</h3>
            <ul>
              <li v-for="(benefit, index) in (product.benefits || defaultBenefits)" :key="index">
                {{ benefit }}
              </li>
            </ul>
          </div>

          <button class="add-btn" @click="addToCartAndClose">В корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { store } from '../store.js'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const defaultBenefits = [
  'Мгновенная доставка на email',
  'Гарантия работоспособности 100%',
  'Бесплатная техническая поддержка'
]

const addToCartAndClose = () => {
  store.addToCart(props.product)
  emit('close') // Закрываем окно после добавления товара
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
}

.modal-content {
  background-color: var(--color-surface);
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: var(--color-surface);
  border: none;
  font-size: 1.5rem;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.close-btn:hover {
  background-color: var(--color-surface);
}

.modal-body {
  display: flex;
  flex-direction: column;
}

@media (min-width: 600px) {
  .modal-body {
    flex-direction: row;
  }
}

.image-container {
  flex: 1;
  background-color: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.image-container img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.info-container {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
  color: var(--color-text-main);
}

.category-badge {
  display: inline-block;
  background-color: var(--color-surface);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 1rem;
  align-self: flex-start;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e74c3c;
  margin: 0 0 1.5rem 0;
}

.description-block h3, .benefits-block h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-main);
}

.description-block p {
  color: #555;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.benefits-block ul {
  padding-left: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.benefits-block li {
  margin-bottom: 0.3rem;
}

.add-btn {
  margin-top: auto;
  background-color: #42b983;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.add-btn:hover {
  background-color: #3aa876;
}
</style>