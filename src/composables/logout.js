import { useAxios } from "@/composables/request.js"
import { useUserStore } from "@/store/user"

export const logout = async (router) => {

    const res = await useAxios.post('/api/auth/logout')

    if(res.status == 200){
    
        const userStore = useUserStore()
        userStore.removeUser()

        router.push({ name: "Peppermint" })
    }
}