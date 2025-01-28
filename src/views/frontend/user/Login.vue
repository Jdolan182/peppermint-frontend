<script setup>
  import SignInForm from '@/components/forms/SignInForm.vue'
  import { useAxios } from "@/composables/request.js";
  import { useConsumerStore } from "@/store/frontend/consumer";
  import { useRouter } from "vue-router";

  const consumerStore = useConsumerStore();
  const router = useRouter();

  const login = async ({params, form}) => {

    try {
      useAxios.get('sanctum/csrf-cookie').then(async response => {

        const res = await useAxios.post('/api/consumer/login', params, form)

        if(res.status != 200 && res.response.status == 401)
        {
          form.value.login.error = true
          form.value.login.errorMessage = res.response.data.message
        }
        if (res) {
          consumerStore.setUser(res.data)
          router.push({ name: "Home" })
        
        }
      })
    } catch (e) {
    }
  };
</script>

<template>
  <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
    <div class="h-full">
      <SignInForm 
        title="Sign in"
        @login="login"
        :register=true
      />


    </div>
  </div>
</template>