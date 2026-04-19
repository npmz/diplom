<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content surface-box">
      <button class="close-btn" @click="$emit('close')" v-if="step !== 4">✖</button>

      <div class="step-indicator" v-if="step !== 4">
        <span :class="{ active: step >= 1 }">1. Товар</span>
        <span class="line"></span>
        <span :class="{ active: step >= 2 }">2. Ключи</span>
        <span class="line"></span>
        <span :class="{ active: step >= 3 }">3. Выплаты</span>
      </div>

      <form v-if="step === 1" @submit.prevent="step = 2" class="step-form">
        <h2>Информация о товаре</h2>
        <div class="form-group">
          <label>Название товара</label>
          <input type="text" v-model="product.name" required placeholder="Например: Cyberpunk 2077 (Steam)" />
        </div>

        <div class="form-row">
          <div class="form-group w-50">
            <label>Категория</label>
            <select v-model="product.category" required>
              <option value="Games">Игры</option>
              <option value="Software">Софт</option>
            </select>
          </div>
          <div class="form-group w-50">
            <label>Цена (₽)</label>
            <input type="number" v-model="product.price" required min="1" placeholder="1000" />
          </div>
        </div>

        <div class="form-group">
          <label>Обложка товара (Изображение)</label>
          <input
              type="file"
              @change="handleImageUpload"
              accept="image/png, image/jpeg, image/webp"
              class="file-input"
              required
          />
          <small class="file-hint">Максимальный размер: 2 МБ (JPG, PNG, WEBP)</small>

          <div v-if="product.image" class="image-preview">
            <img :src="product.image" alt="Предпросмотр обложки" />
          </div>
        </div>

        <div class="form-group">
          <label>Описание</label>
          <textarea v-model="product.description" rows="3" required placeholder="Краткое описание..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary w-100">Далее ➔</button>
      </form>

      <form v-if="step === 2" @submit.prevent="step = 3" class="step-form">
        <h2>Добавление ключей</h2>
        <p class="subtitle">Введите цифровые ключи, которые вы хотите продать.</p>

        <div class="keys-list">
          <div v-for="(key, index) in keysList" :key="index" class="key-row">
            <input type="text" v-model="keysList[index]" required placeholder="XXXXX-XXXXX-XXXXX" />
            <button type="button" @click="removeKey(index)" class="remove-key-btn" v-if="keysList.length > 1">✖</button>
          </div>
        </div>

        <button type="button" class="add-key-btn" @click="addKey">+ Добавить еще ключ</button>

        <div class="nav-buttons">
          <button type="button" class="btn btn-secondary" @click="step = 1">Назад</button>
          <button type="submit" class="btn btn-primary">Далее ➔</button>
        </div>
      </form>

      <form v-if="step === 3" @submit.prevent="submitProduct" class="step-form">
        <h2>Реквизиты и контакты</h2>
        <div class="form-group">
          <label>Реквизиты для выплаты (Карта / Кошелек)</label>
          <input type="text" v-model="payoutDetails" required placeholder="0000 0000 0000 0000" />
        </div>
        <div class="form-group">
          <label>Email для связи</label>
          <input type="email" v-model="contactEmail" required />
        </div>

        <div class="nav-buttons">
          <button type="button" class="btn btn-secondary" @click="step = 2" :disabled="isProcessing">Назад</button>
          <button type="submit" class="btn btn-primary" :disabled="isProcessing">
            {{ isProcessing ? 'Отправка...' : 'Подтвердить' }}
          </button>
        </div>
      </form>

      <div v-if="step === 4" class="success-screen">
        <div class="success-icon">✨</div>
        <h2>Заявка отправлена!</h2>
        <p class="success-desc">
          Спасибо за обращение! Ваша заявка на продажу товара <strong>{{ product.name }}</strong> успешно создана.
        </p>
        <div class="info-box">
          <span class="info-icon">⏱️</span>
          <p>Пожалуйста, подождите примерно <strong>24 часа</strong>, пока администратор рассмотрит заявку. При принятии решения вам придет письмо на почту <strong>{{ contactEmail }}</strong>.</p>
        </div>
        <button class="btn btn-primary w-100" @click="finish">Закрыть</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { store } from '../store.js'

const emit = defineEmits(['close', 'productAdded'])

const step = ref(1)
const isProcessing = ref(false)

const product = reactive({
  name: '',
  category: 'Games',
  price: '',
  image: '', // Сюда теперь будет записываться строка Base64
  description: ''
})

const keysList = ref([''])
const addKey = () => keysList.value.push('')
const removeKey = (index) => keysList.value.splice(index, 1)

const payoutDetails = ref('')
const contactEmail = ref('')

onMounted(() => {
  if (store.currentUser) {
    contactEmail.value = store.currentUser.email
  }
})

// --- ЛОГИКА ОБРАБОТКИ ЗАГРУЖЕННОЙ КАРТИНКИ ---
const handleImageUpload = (event) => {
  // Получаем первый выбранный файл
  const file = event.target.files[0]

  if (!file) {
    product.image = ''
    return
  }

  // Ограничение размера файла (2 МБ = 2 * 1024 * 1024 байт)
  const maxSize = 2 * 1024 * 1024
  if (file.size > maxSize) {
    alert('Файл слишком большой. Пожалуйста, выберите картинку размером до 2 МБ.')
    event.target.value = '' // Сбрасываем выбранный файл
    product.image = ''
    return
  }

  // Используем FileReader для конвертации файла в строку (Base64)
  const reader = new FileReader()

  reader.onload = (e) => {
    // Когда чтение завершено, записываем результат в данные товара
    product.image = e.target.result
  }

  // Запускаем процесс чтения
  reader.readAsDataURL(file)
}

const submitProduct = () => {
  isProcessing.value = true
  setTimeout(() => {
    isProcessing.value = false
    step.value = 4
  }, 1500)
}

const finish = () => {
  store.addCustomProduct({
    name: product.name,
    category: product.category,
    price: Number(product.price),
    image: product.image,
    description: product.description,
    sellerEmail: contactEmail.value,
    keysAvailable: keysList.value.length
  })
  emit('productAdded')
  emit('close')
}
</script>

<style scoped>
.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(5px); display: flex; justify-content: center; align-items: center; z-index: 2000; padding: 1rem; }
.modal-content { padding: 2.5rem 2rem; border-radius: var(--radius-lg); width: 100%; max-width: 500px; box-shadow: var(--shadow-lg); position: relative; max-height: 90vh; overflow-y: auto; }
.close-btn { position: absolute; top: 15px; right: 20px; background: none; border: none; font-size: 1.5rem; color: var(--color-text-muted); cursor: pointer; }
.close-btn:hover { color: var(--color-danger); }

.step-indicator { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; color: var(--color-text-muted); font-weight: bold; font-size: 0.9rem; }
.step-indicator span.active { color: var(--color-primary); }
.line { flex: 1; height: 2px; background: var(--color-border); margin: 0 10px; }

.step-form h2 { margin-bottom: 0.5rem; color: var(--color-text-main); }
.subtitle { color: var(--color-text-muted); margin-bottom: 1.5rem; font-size: 0.95rem; }

.form-group { margin-bottom: 1.2rem; }
.form-row { display: flex; gap: 1rem; }
.w-50 { width: 50%; }

label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--color-text-main); }
input, select, textarea { width: 100%; padding: 0.8rem; background-color: var(--color-bg-body); color: var(--color-text-main); border: 2px solid var(--color-border); border-radius: var(--radius-md); font-size: 1rem; }
input:focus, select:focus, textarea:focus { outline: none; border-color: var(--color-primary); }

/* Стили для загрузки файла */
.file-input { padding: 0.5rem; cursor: pointer; }
.file-hint { display: block; margin-top: 0.3rem; color: var(--color-text-muted); font-size: 0.85rem; }

.image-preview { margin-top: 1rem; text-align: center; background: var(--color-bg-body); padding: 0.5rem; border-radius: var(--radius-md); border: 1px dashed var(--color-border); }
.image-preview img { max-width: 100%; max-height: 200px; border-radius: var(--radius-sm); object-fit: cover; box-shadow: var(--shadow-sm); }

.keys-list { display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1rem; }
.key-row { display: flex; gap: 0.5rem; }
.remove-key-btn { background: var(--color-danger); color: white; border: none; border-radius: var(--radius-md); padding: 0 1rem; cursor: pointer; }

.add-key-btn { width: 100%; padding: 0.8rem; background: transparent; border: 2px dashed var(--color-primary); color: var(--color-primary); border-radius: var(--radius-md); font-weight: bold; cursor: pointer; margin-bottom: 1.5rem; transition: background 0.3s; }
.add-key-btn:hover { background: rgba(66, 185, 131, 0.1); }

.nav-buttons { display: flex; gap: 1rem; }
.nav-buttons button { flex: 1; }
.w-100 { width: 100%; }

.btn-secondary { background: var(--color-bg-body); color: var(--color-text-main); border: 2px solid var(--color-border); }
.btn-secondary:hover { border-color: var(--color-text-muted); }

.success-screen { text-align: center; animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
.success-icon { font-size: 4rem; margin-bottom: 1rem; background: rgba(66, 185, 131, 0.1); width: 100px; height: 100px; line-height: 100px; border-radius: 50%; display: inline-block; }
.success-desc { color: var(--color-text-muted); margin-bottom: 1.5rem; }
.info-box { background: rgba(211, 84, 0, 0.1); border: 1px solid rgba(211, 84, 0, 0.3); padding: 1rem; border-radius: var(--radius-md); text-align: left; margin-bottom: 2rem; color: #d35400; }
</style>