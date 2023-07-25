import { defineStore } from 'pinia'
import { useConsumerStore } from "./consumer";
import router from '@/router/index.js'

export const useConsumerAuthStore = defineStore('consumerAuth', {
  state: () => {
    return {
        isConsumerLoggedIn: JSON.parse(localStorage.getItem("isConsumerLoggedIn")) ?? false,
    }
  },
  getters: {
    getIsConsumerLoggedIn: (state) => state.isConsumerLoggedIn,
  }, 
  actions: {
    setLoggedIn(val) {
      localStorage.setItem("isConsumerLoggedIn", val);
      this.isConsumerLoggedIn = val;
    },
    logout() { 
      const consumerStore = useConsumerStore();
      consumerStore.removeUser()
      localStorage.removeItem("isConsumerLoggedIn");
      this.isConsumerLoggedIn = false;
      router.push({ name: "Home", replace: true })
    }
  }
})