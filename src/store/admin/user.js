import { defineStore } from 'pinia'
import { useAuthStore } from "./auth";
import { useAxios } from "@/composables/request.js";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
        id: localStorage.getItem("userId") ?? null,
        name: localStorage.getItem("userName") ?? null,
        email: localStorage.getItem("userEmail") ?? null,
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
        //TODO - in the future they would go here?
        // set user role
        // set user permissions
    },
    async getUser() {
        const res = await useAxios.get('api/user')
        let data = res.data.data

        localStorage.setItem("userId", data.id)
        this.id = res.data.id
        localStorage.setItem("userName", data.name)
        this.name = res.data.name
        localStorage.setItem("userEmail", data.email)
        this.email = res.data.email
    },
    removeUser() {
      const authStore = useAuthStore();
      authStore.removeToken()
      
      localStorage.removeItem("userId")
      this.id = null
      localStorage.removeItem("userName")
      this.name = null
      localStorage.removeItem("userEmail")
      this.email = null
    }
  }
})