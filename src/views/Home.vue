<template>
  <div class="home">
    <h1>Добро пожаловать в AllKeys!</h1>
    <p>Лучший маркетплейс цифровых ключей для игр, софта и операционных систем.</p>
    <router-link to="/products" class="btn">Перейти к покупкам</router-link>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  margin-top: 4rem;
}
.home h1 {
  font-size: 3rem;
  color: #2c3e50;
}
.btn {
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: background 0.3s;
}
.btn:hover {
  background-color: #3aa876;
}
</style>