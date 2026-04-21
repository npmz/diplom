<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section about">
        <div class="logo">
          <span class="logo-icon">🔑</span>
          <span class="logo-text">All<span class="accent">Keys</span></span>
        </div>
        <p class="description">
          Лучший маркетплейс цифровых товаров. Мы предлагаем лицензионные ключи для игр и софта с мгновенной доставкой и гарантией качества.
        </p>
        <div class="social-links">
          <a href="#" class="social-icon">✈️</a>
          <a href="#" class="social-icon">💬</a>
          <a href="#" class="social-icon">🎮</a>
        </div>
      </div>

      <div class="footer-section links">
        <h4>Навигация</h4>
        <ul>
          <li><router-link to="/">Главная страница</router-link></li>
          <li><router-link to="/products">Каталог товаров</router-link></li>
          <li><router-link to="/cart">Корзина покупок</router-link></li>
        </ul>
      </div>

      <div class="footer-section support">
        <h4>Помощь</h4>
        <ul>
          <li><a href="#">Как активировать</a></li>
          <li><a href="#">Гарантии</a></li>
          <li><a href="#">Техподдержка</a></li>
          <li><a href="#">Публичная оферта</a></li>
        </ul>
      </div>

      <div class="footer-section contacts">
        <h4>Контакты</h4>
        <p>Email: support@allkeys.ru</p>
        <p>Режим работы: 24/7</p>
        <div class="payment-methods">
          <span title="Visa">💳</span>
          <span title="Mastercard">🅿️</span>
          <span title="Mir">🇷🇺</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="bottom-container">
        <p>&copy; 2026 AllKeys Store. Все права защищены. Все названия продуктов и логотипы являются собственностью их владельцев.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #1a252f;
  color: #ecf0f1;
  padding-top: 4rem;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 3rem 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
}
.logo-text .accent {
  color: #42b983;
}

.description {
  color: #bdc3c7;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

h4 {
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  position: relative;
}
h4::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: #42b983;
}

ul {
  list-style: none;
  padding: 0;
}
ul li {
  margin-bottom: 0.8rem;
}
ul li a {
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 0.95rem;
}
ul li a:hover {
  color: #42b983;
  padding-left: 5px;
}

.social-links {
  display: flex;
  gap: 1rem;
}
.social-icon {
  font-size: 1.5rem;
  text-decoration: none;
  transition: transform 0.3s;
}
.social-icon:hover {
  transform: translateY(-5px);
}

.payment-methods {
  margin-top: 1rem;
  display: flex;
  gap: 0.8rem;
  font-size: 1.5rem;
  filter: grayscale(0.5);
  transition: filter 0.3s;
}
.payment-methods:hover {
  filter: grayscale(0);
}

.footer-bottom {
  background-color: #141d26;
  padding: 1.5rem 0;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.bottom-container p {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 992px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}
@media (max-width: 600px) {
  .footer-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  h4::after {
    left: 50%;
    transform: translateX(-50%);
  }
  .social-links, .payment-methods {
    justify-content: center;
  }
}
</style>