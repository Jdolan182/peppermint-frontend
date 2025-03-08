import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Peppermint from './App.vue'
import router from './router'
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import { useThemeStore } from "@/store/theme";

import './assets/main.css'

//set api url
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
axios.defaults.headers.common['Access-Control-Allow-Origin', '*#']


//store
const pinia = createPinia()

const peppermint = createApp(Peppermint)

peppermint.use(pinia);

//theme store
const themeStore = useThemeStore();
themeStore.setTheme();
peppermint.config.globalProperties.$theme = themeStore;

peppermint.component('menu-icon', MenuIcon);

peppermint.use(router)
        .mount('#app')
