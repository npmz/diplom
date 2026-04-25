<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal-content surface-box">
      <div class="modal-body">
        <div class="icon-circle">
          <IconTrash />
        </div>
        <h2>Удаление товара</h2>
        <p class="desc">
          Вы уверены, что хотите снять этот товар с продажи? <br>
          Он будет безвозвратно удален из каталога.
        </p>

        <div class="modal-actions">
          <button class="btn btn-secondary" @click="$emit('cancel')">Отмена</button>
          <button class="btn btn-danger" @click="$emit('confirm')">Да, удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconTrash from './icons/IconTrash.vue'
defineEmits(['confirm', 'cancel'])
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
  z-index: 3000;
  padding: 1rem;
}

.modal-content {
  padding: 2.5rem 2rem;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 380px;
  box-shadow: var(--shadow-lg);
  text-align: center;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.icon-circle {
  font-size: 3rem;
  color: var(--color-danger);
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  margin: 0 auto 1.5rem auto;
}

h2 {
  color: var(--color-text-main);
  margin-bottom: 0.8rem;
}

.desc {
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-bottom: 2rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.modal-actions button {
  flex: 1;
  padding: 0.8rem;
  font-weight: bold;
}

.btn-secondary {
  background: var(--color-bg-body);
  color: var(--color-text-main);
  border: 1px solid var(--color-border);
}
</style>