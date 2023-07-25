import { useAxios } from "@/composables/request.js"
import { useAuthStore } from "@/store/admin/auth"
import { useConsumerAuthStore } from "@/store/frontend/consumerAuth"

export const logout = async (router) => {

    const res = await useAxios.post('/api/auth/logout')

    if(res.status == 200){
    
        const authStore = useAuthStore()
        authStore.logout()

        router.push({ name: "Peppermint" })
    }
}

export const logoutConsumer = async (router) => {

    const res = await useAxios.post('/api/consumer/logout')

    if(res.status == 200){
    
        const consumerAuthStore = useConsumerAuthStore()
        consumerAuthStore.logout()

        router.push({ name: "Home", replace: true })
    }
}