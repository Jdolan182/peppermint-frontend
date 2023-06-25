import { defineStore } from 'pinia'
import { useAuthStore } from "./auth";
import { useAxios } from "@/composables/request.js";

export const useUserStore = defineStore('customer', {
  state: () => {
    return {
        id: localStorage.getItem("customerId") ?? null,
        name: localStorage.getItem("customerId") ?? null,
        email: localStorage.getItem("customerId") ?? null,
    }
  },
  getters: {
    getId: (state) => state.id,
    getName: (state) => state.name,
    getEmail: (state) => state.email,
  }, 
  actions: {
    setUser(data) {
        this.name = data.name;

        const authStore = useAuthStore();
        authStore.setToken(true, data.token)
        this.getUser();
    },
    async getUser() {
        const res = await useAxios.get('api/customer')
        let data = res.data.data

        localStorage.setItem("customerId", data.id)
        this.id = res.data.id
        localStorage.setItem("customerId", data.name)
        this.name = res.data.name
        localStorage.setItem("customerId", data.email)
        this.email = res.data.email
    },
    removeUser() {
      const authStore = useAuthStore();
      authStore.removeToken()
      
      localStorage.removeItem("customerId")
      this.id = null
      localStorage.removeItem("customerId")
      this.name = null
      localStorage.removeItem("customerId")
      this.email = null
    }
  }
})