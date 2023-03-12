import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const peppermint = createApp(App)

peppermint.use(router)

peppermint.mount('#app')
