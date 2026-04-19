<template>
  <div class="home-page">

    <section class="hero surface-box">
      <div class="hero-content">
        <h1 class="hero-title">Цифровые ключи <br><span class="accent">без переплат</span></h1>
        <p class="hero-subtitle">
          Лицензионные игры, софт и подписки с моментальной доставкой.
          Покупай безопасно, играй сразу.
        </p>
        <div class="hero-actions">
          <router-link to="/products" class="btn btn-primary">Перейти в каталог</router-link>
        </div>
      </div>
      <div class="hero-graphics">
        <div class="floating-icon icon-1">🎮</div>
        <div class="floating-icon icon-2">💻</div>
        <div class="floating-icon icon-3">🔑</div>
      </div>
    </section>

    <section class="seller-banner">
      <div class="seller-content surface-box">
        <div class="seller-text">
          <div class="badge">Новинка</div>
          <h2>Зарабатывай вместе с AllKeys 💸</h2>
          <p class="seller-desc">
            Теперь мы работаем как полноценный P2P-маркетплейс! У вас завалялся лишний ключ от игры или программы?
            Не дайте ему пропасть — выставьте его на продажу в нашем каталоге и получите деньги на карту.
          </p>
          <ul class="benefits-list">
            <li><span>⚡</span> Быстрая модерация (до 24 часов)</li>
            <li><span>🛡️</span> Безопасные сделки и гарантия выплат</li>
            <li><span>👥</span> Тысячи потенциальных покупателей каждый день</li>
          </ul>
          <button @click="handleSellClick" class="btn btn-sell">
            Разместить товар
          </button>
        </div>
        <div class="seller-visual">
          <div class="mockup-card">
            <span class="mockup-icon">🤝</span>
            <h3>P2P Платформа</h3>
            <p>От игрока к игроку</p>
          </div>
        </div>
      </div>
    </section>

    <section class="features-grid">
      <div class="feature-card surface-box">
        <div class="feature-icon">🚀</div>
        <h3>Мгновенная доставка</h3>
        <p>Ключ автоматически отправляется на вашу почту и в личный кабинет сразу после оплаты.</p>
      </div>
      <div class="feature-card surface-box">
        <div class="feature-icon">🔒</div>
        <h3>Гарантия качества</h3>
        <p>Все продавцы проходят проверку, а ключи валидируются перед публикацией в каталоге.</p>
      </div>
      <div class="feature-card surface-box">
        <div class="feature-icon">🎧</div>
        <h3>Поддержка 24/7</h3>
        <p>Наша команда всегда готова помочь вам с активацией или решением любых спорных вопросов.</p>
      </div>
    </section>

  </div>
</template>

<script setup>
import { store } from '../store.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSellClick = () => {
  if (store.isAuthenticated) {
    // Если авторизован — отправляем в каталог, где он сможет нажать "Продать"
    router.push('/products')
  } else {
    // Если не авторизован — открываем наше новое глобальное окно
    store.openAuthModal()
  }
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-bottom: 2rem;
}

/* --- HERO SECTION --- */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
  background-image: radial-gradient(circle at right top, rgba(66, 185, 131, 0.1), transparent 50%);
}

.hero-content {
  max-width: 600px;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--color-text-main);
}

.hero-title .accent {
  background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Анимация иконок на главном экране */
.hero-graphics {
  position: relative;
  width: 300px;
  height: 300px;
  display: none;
}

@media (min-width: 900px) {
  .hero-graphics {
    display: block;
  }
}

.floating-icon {
  position: absolute;
  font-size: 4rem;
  background: var(--color-bg-body);
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: var(--shadow-lg);
  animation: float 6s ease-in-out infinite;
}

.icon-1 { top: 0; right: 20px; animation-delay: 0s; }
.icon-2 { bottom: 20px; left: 0; font-size: 3rem; width: 80px; height: 80px; animation-delay: 2s; }
.icon-3 { bottom: 60px; right: 0; font-size: 3.5rem; width: 90px; height: 90px; animation-delay: 4s; }

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

/* --- SELLER BANNER --- */
.seller-banner {
  width: 100%;
}

.seller-content {
  display: flex;
  flex-direction: column;
  padding: 3rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 2px solid rgba(241, 196, 15, 0.3);
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(135deg, transparent 0%, rgba(241, 196, 15, 0.05) 100%);
}

@media (min-width: 900px) {
  .seller-content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
  }
}

.badge {
  background: #f1c40f;
  color: #2c3e50;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.seller-text h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: var(--color-text-main);
}

.seller-desc {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.benefits-list li {
  margin-bottom: 0.8rem;
  color: var(--color-text-main);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.btn-sell {
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: #f1c40f;
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
  border-radius: var(--radius-md);
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(241, 196, 15, 0.3);
}

.btn-sell:hover {
  background-color: #f39c12;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(241, 196, 15, 0.4);
}

.seller-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

@media (min-width: 900px) {
  .seller-visual {
    margin-top: 0;
    flex-shrink: 0;
  }
}

.mockup-card {
  background: var(--color-bg-body);
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  transform: rotate(3deg);
  transition: transform 0.3s ease;
}

.mockup-card:hover {
  transform: rotate(0deg) scale(1.05);
}

.mockup-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.mockup-card h3 {
  color: var(--color-text-main);
  margin-bottom: 0.5rem;
}

.mockup-card p {
  color: var(--color-text-muted);
}

/* --- FEATURES GRID --- */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2.5rem 2rem;
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  color: var(--color-text-main);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.feature-card p {
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .hero {
    padding: 2rem;
    text-align: center;
  }
  .hero-title {
    font-size: 2.5rem;
  }
  .seller-content {
    padding: 2rem;
    text-align: center;
  }
  .benefits-list li {
    justify-content: center;
  }
}
</style>