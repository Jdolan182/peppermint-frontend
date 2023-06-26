import { useAxios } from "@/composables/request.js"
import { useUserStore } from "@/store/admin/user"
import { useConsumerStore } from "@/store/frontend/consumer"

export const logout = async (router) => {

    const res = await useAxios.post('/api/auth/logout')

    if(res.status == 200){
    
        const userStore = useUserStore()
        userStore.removeUser()

        router.push({ name: "Peppermint" })
    }
}

export const logoutConsumer = async (router) => {

    const res = await useAxios.post('/api/consumer/logout')

    if(res.status == 200){
    
        const consumerStore = useConsumerStore()
        consumerStore.removeUser()

        router.push({ name: "Home", replace: true })
    }
}