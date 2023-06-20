import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Admin from './App.vue'
import router from './router'

import './assets/main.css'

//set api url
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Origin', '*#']

//store
const pinia = createPinia()

const peppermint = createApp(Admin)

peppermint.use(pinia)
peppermint.use(router)


peppermint.mount('#app')
