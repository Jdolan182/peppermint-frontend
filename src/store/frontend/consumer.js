import { defineStore } from 'pinia'
import { useConsumerAuthStore } from "./consumerAuth";
import { useAxios } from "@/composables/request.js";

export const useConsumerStore = defineStore('consumer', {
  state: () => {
    return {
        id: localStorage.getItem("consumerId") ?? null,
        name: localStorage.getItem("consumerName") ?? null,
        email: localStorage.getItem("consumerEmail") ?? null,
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

        const consumerAuthStore = useConsumerAuthStore();
        consumerAuthStore.setLoggedIn(true)
        this.getUser();
    },
    async getUser() {
        const res = await useAxios.get('api/consumer')
        let data = res.data.data

        localStorage.setItem("consumerId", data.id)
        this.id = res.data.id
        localStorage.setItem("consumerName", data.name)
        this.name = res.data.name
        localStorage.setItem("consumerEmail", data.email)
        this.email = res.data.email
    },
    removeUser() {
      const consumerAuthStore = useConsumerAuthStore();
      consumerAuthStore.logout()
      
      localStorage.removeItem("consumerId")
      this.id = null
      localStorage.removeItem("consumerName")
      this.name = null
      localStorage.removeItem("consumerEmail")
      this.email = null
    }
  }
})