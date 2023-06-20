import { defineStore } from 'pinia'
import { useAuthStore } from "./auth";
import { useAxios } from "@/composables/request.js";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
        name: null,
    }
  },
  getters: {
    getName: (state) => state.name,
  }, 
  actions: {
    setUser(data) {
        this.name = data.name;

        const authStore = useAuthStore();
        authStore.setToken(true, data.token)
        //TODO - in the future they would go here?
        // set user role
        // set user permissions
    },
    async getUser() {
        const res = await useAxios.get('api/user')
        
        console.log(res)

    }
  }
})