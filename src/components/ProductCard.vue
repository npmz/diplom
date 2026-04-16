<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" />
    <h3>{{ product.name }}</h3>
    <p class="price">{{ product.price }} ₽</p>
    <button @click="addToCart" class="add-btn">В корзину</button>
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

const addToCart = () => {
  store.addToCart(props.product)
}
</script>

<style scoped>
.product-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.product-card:hover {
  transform: translateY(-5px);
}
.product-card img {
  max-width: 100%;
  border-radius: 4px;
}
.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2c3e50;
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
  transition: background 0.3s;
}
.add-btn:hover {
  background-color: #2980b9;
}
</style>