<template>
  <div class="home">

    <section class="hero">
      <div class="hero-content">
        <h1>Твой портал в мир <span class="highlight">цифровых развлечений</span></h1>
        <p>Лучший маркетплейс ключей для игр, софта и операционных систем. Покупай выгодно, активируй мгновенно!</p>
        <router-link to="/products" class="cta-btn">Перейти к покупкам</router-link>
      </div>
    </section>

    <section class="features">
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Мгновенная доставка</h3>
        <p>Ключ автоматически отправляется на вашу почту сразу после успешной оплаты.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🛡️</div>
        <h3>100% Безопасность</h3>
        <p>Мы гарантируем работоспособность каждого ключа и безопасность ваших платежей.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🔥</div>
        <h3>Отличные цены</h3>
        <p>Регулярные скидки и акции позволяют покупать мировые хиты гораздо дешевле.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🎧</div>
        <h3>Поддержка 24/7</h3>
        <p>Наша команда всегда готова помочь вам с активацией и ответить на любые вопросы.</p>
      </div>
    </section>

  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 4rem; /* Отступ между баннером и карточками */
  padding-bottom: 2rem;
}

/* --- СТИЛИ ДЛЯ ГЛАВНОГО БАННЕРА --- */
.hero {
  /* Красивый современный градиент */
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  border-radius: 16px;
  padding: 5rem 2rem;
  text-align: center;
  color: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  position: relative;
  overflow: hidden; /* Чтобы круги не вылезали за края */
}

/* Декоративные полупрозрачные круги на фоне баннера */
.hero::before, .hero::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}
.hero::before {
  width: 400px;
  height: 400px;
  top: -150px;
  left: -100px;
}
.hero::after {
  width: 300px;
  height: 300px;
  bottom: -100px;
  right: -50px;
}

.hero-content {
  position: relative;
  z-index: 1; /* Текст должен быть поверх декоративных кругов */
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

/* Выделяем часть заголовка желтым цветом */
.highlight {
  color: #f1c40f;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
}

/* Стили большой кнопки призыва к действию */
.cta-btn {
  display: inline-block;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  padding: 1.2rem 3rem;
  border-radius: 50px; /* Круглая кнопка */
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 15px rgba(66, 185, 131, 0.4);
}

.cta-btn:hover {
  background-color: #3aa876;
  transform: translateY(-3px) scale(1.02); /* Кнопка слегка увеличивается и поднимается */
  box-shadow: 0 8px 25px rgba(66, 185, 131, 0.5);
}

/* --- СТИЛИ ДЛЯ БЛОКА ПРЕИМУЩЕСТВ --- */
.features {
  display: grid;
  /* Автоматическая сетка: карточки будут сами перестраиваться в зависимости от ширины экрана */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: var(--color-surface);
  padding: 2.5rem 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px); /* Эффект "всплытия" при наведении */
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.3rem;
  color: var(--color-text-main);
  margin-bottom: 1rem;
}

.feature-card p {
  color: var(--color-text-muted);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* --- АДАПТИВНОСТЬ ДЛЯ ТЕЛЕФОНОВ --- */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  .hero {
    padding: 3rem 1.5rem;
  }
  .home {
    gap: 2.5rem;
  }
}
</style>


