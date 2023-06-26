import { defineStore } from 'pinia'

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
      localStorage.removeItem("isConsumerLoggedIn");
      this.isConsumerLoggedIn = false;
    }
  }
})