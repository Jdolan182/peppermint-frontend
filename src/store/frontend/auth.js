import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
        isCustomerLoggedIn: JSON.parse(localStorage.getItem("isCustomerLoggedIn")) ?? false,
    }
  },
  getters: {
    getIsCustomerLoggedIn: (state) => state.isLoggedIn,
  }, 
  actions: {
    setToken(val,) {
        localStorage.setItem("isCustomerLoggedIn", val);
        this.isLoggedIn = val;
    },
    removeToken() { 
      localStorage.removeItem("isCustomerLoggedIn");
      this.isLoggedIn = false;
    }
  }
})