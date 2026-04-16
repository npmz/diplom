import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

import './style.css' // Здесь могут быть ваши глобальные стили

createApp(App).use(router).mount('#app')