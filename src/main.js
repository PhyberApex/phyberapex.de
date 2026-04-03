import { createApp } from 'vue'
import router from './router.js'
import App from './App.vue'
import './styles/global.scss'
import './styles/prose.scss'

createApp(App).use(router).mount('#app')
