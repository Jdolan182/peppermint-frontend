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
    setToken(val,) {
        localStorage.setItem("isLoggedIn", val);
        this.isLoggedIn = val;
    },
    removeToken() { 
      localStorage.removeItem("isLoggedIn");
      this.isLoggedIn = false;
    }
  }
})