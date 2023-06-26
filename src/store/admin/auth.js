import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
        isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) ?? false,
    }
  },
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
  }, 
  actions: {
    setLoggedIn(val) {
        localStorage.setItem("isLoggedIn", val);
        this.isLoggedIn = val;
    },
    logout() { 
      localStorage.removeItem("isLoggedIn");
      this.isLoggedIn = false;
    }
  }
})