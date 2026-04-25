<template>
  <footer class="footer surface-box">
    <div class="footer-content">

      <div class="footer-left">
        <IconKey class="footer-logo" />
        <span>&copy; {{ currentYear }} AllKeys. Все права защищены.</span>
      </div>

      <div class="footer-links">
        <a href="#">О проекте</a>
        <a href="#">Пользовательское соглашение</a>
        <a href="#">Поддержка</a>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import IconKey from './icons/IconKey.vue' // Используем наш новый векторный ключ

// Автоматически получаем текущий год
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* Убираем огромные отступы, делаем подвал тонким */
.footer {
  padding: 1rem 2rem;
  border-top: 1px solid var(--color-border);
  margin-top: auto; /* Прижимает подвал к низу экрана, если контента мало */
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem; /* Делаем шрифт чуть меньше основного (14px) */
  color: var(--color-text-muted);
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-logo {
  width: 18px;
  height: 18px;
  color: var(--color-primary);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--color-text-main);
}

/* Адаптивность для мобильных телефонов:
   если экран узкий, выстраиваем в колонку, но оставляем компактным */
@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    gap: 0.8rem;
    text-align: center;
  }
  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}
</style>