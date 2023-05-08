import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/main.css'

//set api url
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

//store
const pinia = createPinia()

const peppermint = createApp(App)

peppermint.use(pinia)
peppermint.use(router)

peppermint.mount('#app')
