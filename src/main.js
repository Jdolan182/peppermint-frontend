import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Peppermint from './App.vue'
import router from './router'
import MenuIcon from 'vue-material-design-icons/Menu.vue';

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

peppermint.config.globalProperties.$bgColour = 'bg-green-900'; //'bg-gray-900'
peppermint.config.globalProperties.$bgTextColour = 'text-green-900'; //'text-gray-900'
//
peppermint.config.globalProperties.$secondBgColour = 'bg-green-700'; //'bg-gray-800'
peppermint.config.globalProperties.$secondBgHoverColour = 'hover:bg-green-700'; //'bg-gray-800'
peppermint.config.globalProperties.$secondColour = 'bg-green-600'; //'bg-indigo-600'
peppermint.config.globalProperties.$secondBgTextColour = 'border-green-600 text-green-600'; //'border-indigo-600 text-indigo-600'
peppermint.config.globalProperties.$secondFocusColour = 'focus:border-green-600 focus:ring-green-600'; //'focus:border-indigo-600 focus:ring-indigo-600'
peppermint.config.globalProperties.$secondHoverColour = ' hover:bg-green-700'; //' hover:bg-indigo-700'
//
peppermint.config.globalProperties.$textColour = 'text-white'; //'text-white'
peppermint.config.globalProperties.$textHoverColour = 'hover:text-white'; //'hover:text-white'
peppermint.config.globalProperties.$secondTextColour = 'text-gray-900'; //'text-gray-900'
//
peppermint.config.globalProperties.$thirdTextColour = 'text-white'; //'text-gray-400'
peppermint.config.globalProperties.$textHoverColour = 'hover:text-gray-200'; //'hover:text-gray-200'
peppermint.config.globalProperties.$textBgHoverColour = 'hover:bg-gray-200'; //'hover:text-gray-200'
//
peppermint.config.globalProperties.$mainButtonColour = 'bg-white'; //'bg-white'
peppermint.config.globalProperties.$mainButtonHoverColour = 'hover:bg-white/70'; //'hover:bg-white/70'

// peppermint.config.globalProperties.$bgColour = 'bg-gray-900'; //'bg-gray-900'
// peppermint.config.globalProperties.$bgTextColour = 'text-gray-900'; //'text-gray-900'
// //
// peppermint.config.globalProperties.$secondBgColour = 'bg-gray-800'; //'bg-gray-800'
// peppermint.config.globalProperties.$secondBgHoverColour = 'hover:bg-gray-800'; //'bg-gray-800'
// peppermint.config.globalProperties.$secondColour = 'bg-indigo-600'; //'bg-indigo-600'
// peppermint.config.globalProperties.$secondBgTextColour = 'border-indigo-600 text-indigo-600'; //'border-indigo-600 text-indigo-600'
// peppermint.config.globalProperties.$secondFocusColour = 'focus:border-grindigoeen-600 focus:ring-indigo-600'; //'focus:border-indigo-600 focus:ring-indigo-600'
// peppermint.config.globalProperties.$secondHoverColour = ' hover:bg-indigo-700'; //' hover:bg-indigo-700'
// //
// peppermint.config.globalProperties.$textColour = 'text-white'; //'text-white'
// peppermint.config.globalProperties.$textHoverColour = 'hover:text-white'; //'hover:text-white'
// peppermint.config.globalProperties.$secondTextColour = 'text-gray-900'; //'text-gray-900'
// //
// peppermint.config.globalProperties.$thirdTextColour = 'text-gray-400'; //'text-gray-400'
// peppermint.config.globalProperties.$textHoverColour = 'hover:text-gray-200'; //'hover:text-gray-200'
// peppermint.config.globalProperties.$textBgHoverColour = 'hover:bg-gray-200'; //'hover:text-gray-200'
// //
// peppermint.config.globalProperties.$mainButtonColour = 'bg-white'; //'bg-white'
// peppermint.config.globalProperties.$mainButtonHoverColour = 'hover:bg-white/70'; //'hover:bg-white/70'



peppermint.component('menu-icon', MenuIcon);

peppermint.use(pinia)
        .use(router)
        .mount('#app')
