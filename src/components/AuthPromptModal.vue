<template>
  <div class="modal-overlay" @click.self="store.closeAuthModal()">
    <div class="modal-content surface-box">
      <button class="close-btn" @click="store.closeAuthModal()">✖</button>

      <div class="modal-body">
        <div class="icon-circle">🔒</div>
        <h2>Требуется авторизация</h2>
        <p class="desc">
          Чтобы добавлять товары в избранное и совершать покупки, пожалуйста, войдите в свой аккаунт или зарегистрируйтесь.
        </p>

        <div class="modal-actions">
          <button class="btn btn-secondary" @click="store.closeAuthModal()">Отмена</button>
          <button class="btn btn-primary" @click="goToLogin">Войти / Регистрация</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { store } from '../store.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  store.closeAuthModal() // Закрываем окно
  router.push('/profile') // Перенаправляем на красивую форму входа
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
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000; /* Должно быть поверх всего */
  padding: 1rem;
}

.modal-content {
  padding: 2.5rem 2rem;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 400px;
  box-shadow: var(--shadow-lg);
  position: relative;
  text-align: center;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color 0.3s;
}

.close-btn:hover {
  color: var(--color-danger);
}

.icon-circle {
  font-size: 3rem;
  background: rgba(52, 152, 219, 0.1);
  color: var(--color-secondary);
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  margin: 0 auto 1.5rem auto;
}

h2 {
  color: var(--color-text-main);
  margin-bottom: 1rem;
}

.desc {
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.modal-actions button {
  flex: 1;
  padding: 0.8rem;
  font-size: 0.95rem;
}

.btn-secondary {
  background: var(--color-bg-body);
  color: var(--color-text-main);
  border: 2px solid var(--color-border);
}

.btn-secondary:hover {
  border-color: var(--color-text-muted);
}
</style>