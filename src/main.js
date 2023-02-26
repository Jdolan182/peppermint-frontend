import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import axios from 'axios'


import './assets/main.css'

const peppermint = createApp(App)

peppermint.use(router)

peppermint.config.globalProperties.axios=axios

peppermint.mount('#app')
