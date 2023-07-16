
<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="h-full">
      <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <HeaderTwo
            header="Register"
          />
        </div>
    
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form class="space-y-6"
              @submit="submit()"
            >
                <div class="text-center">
                  <ErrorLabel
                      :label="form.register.errorMessage"
                      :error="form.register.error"

                  />
                </div>
                <div>
                    <Label
                        for="name" 
                        label="Name"
                    />
                  <div class="mt-1">
                    <Input 
                        name="name"
                        placeholder="Name"
                        @input-value="(value) => (form.name.value = value)"
                        :error="form.name.error"
                        :error-message="form.name.errorMessage"
                    />
                  </div>
                </div>

                <div>
                    <Label
                        for="email" 
                        label="Email Address"
                    />
                  <div class="mt-1">
                    <Input 
                        name="email"
                        placeholder="Email"
                        autocomplete="email"
                        @input-value="(value) => (form.email.value = value)"
                        :error="form.email.error"
                        :error-message="form.email.errorMessage"
                    />
                  </div>
                </div>

                <div>
                  <Label
                      for="password" 
                      label="Password"
                  />
                  <div class="mt-1">
                    <Input 
                        name="password"
                        placeholder="Password"
                        type="password"
                        @input-value="(value) => (form.password.value = value)"
                        :error="form.password.error"
                        :error-message="form.password.errorMessage"
                    />
                  </div>
                </div>

                <div>
                  <Label
                      for="confirmPassword" 
                      label="Confirm Password"
                  />
                  <div class="mt-1">
                    <Input 
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        @input-value="(value) => (form.confirmPassword.value = value)"
                        :error="form.confirmPassword.error"
                        :error-message="form.confirmPassword.errorMessage"
                    />
                  </div>
                </div>

      
                <div>
                  <Submit 
                    label="Register"
                  />
                </div>
            </Form>

          </div>
        </div>
      </div>
    </div>
  </div>
    
</template>

<script setup>
    import Form from '@/components/forms/Form.vue'
    import Input from '@/components/inputs/Input.vue'
    import Label from '@/components/labels/Label.vue'
    import ErrorLabel from '@/components/labels/ErrorLabel.vue'
    import HeaderTwo from '@/components/labels/HeaderTwo.vue'
    import Submit from '@/components/buttons/Submit.vue'
    import { ref } from "@vue/reactivity";
    import { useAxios } from "@/composables/request.js";
    import { useRouter } from "vue-router";

    const router = useRouter();

    const form = ref({
      name: {
        value: "",
        error: false,
        errorMessage: "",
      },
      email: {
        value: "",
        error: false,
        errorMessage: "",
      },
      password: {
        value: "",
        error: false,
        errorMessage: "",
      },
      confirmPassword: {
        value: "",
        error: false,
        errorMessage: "",
      },
      register: {
        value: "",
        error: false,
        errorMessage: "",
      }
    });

    const submit = async () => {

      try {

        const params = {
          name: form.value.name.value,
          email: form.value.email.value,
          password: form.value.password.value,
          password_confirmation: form.value.confirmPassword.value
        };

        useAxios.get('sanctum/csrf-cookie').then(async response => {

          const res = await useAxios.post('/api/consumer/signup', params, form)

          if(res.status != 200 && res.response.status == 401)
          {
            form.value.register.error = true
            form.value.register.errorMessage = res.response.data.message
          }
          if (res.status == 200) {
            router.push({ name: "Home" })
          }
        });
      } catch (e) {
      }
    };


</script>