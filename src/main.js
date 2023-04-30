import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/main.css'

//store
const pinia = createPinia()

const peppermint = createApp(App)

peppermint.use(pinia)
peppermint.use(router)

peppermint.mount('#app')
