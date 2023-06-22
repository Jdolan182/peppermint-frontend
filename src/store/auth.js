import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
        isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) ?? false,
        token: null,
    }
  },
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getToken: (state) => state.token,
  }, 
  actions: {
    setToken(val, token) {
        localStorage.setItem("isLoggedIn", val);
        //localStorage.setItem("token", token);
        this.isLoggedIn = val;
        //this.token = token
    },
    removeToken() { 
      localStorage.removeItem("isLoggedIn");
      this.isLoggedIn = null;
    }
  }
})