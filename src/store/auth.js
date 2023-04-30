import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
        isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) ?? false,
        token: null
    }
  },
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getToken: (state) => state.token,
  }, 
  actions: {
    setToken(val, token) {
        localStorage.setItem("isLoggedIn", val);
        this.isLoggedIn = val;
        this.token = token
    },
  }
})