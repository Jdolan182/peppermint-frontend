<template>
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <HeaderTwo
          :header=props.title 
        />
      </div>
  
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Form class="space-y-6"
        @submit="submit()"
        >
            <div class="text-center">
              <ErrorLabel
                  :label="form.login.errorMessage"
                  :error="form.login.error"

              />
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
  
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <Checkbox 
                    name="remember-me"
                />
                <Label
                    for="remember-me" 
                    label="Remember Me"
                />
              </div>
  
              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
              </div>
            </div>
  
            <div>
              <Submit 
                label="Sign In"
              />
            </div>
        </Form>
        </div>
      </div>
    </div>
</template>

<script setup>
    import Form from './Form.vue'
    import Input from '../inputs/Input.vue'
    import Checkbox from '../inputs/Checkbox.vue'
    import Label from '../labels/Label.vue'
    import ErrorLabel from '../labels/ErrorLabel.vue'
    import HeaderTwo from '../labels/HeaderTwo.vue'
    import Submit from '../buttons/Submit.vue'
    import { ref } from "@vue/reactivity";
    import { useUserStore } from "../../store/user";
    import { useRouter } from "vue-router";
    import { useAxios } from "@/composables/request.js";


    const userStore = useUserStore();
    const router = useRouter();

    const props = defineProps({
      title: {
        type: [String, Number],
        default: "Sign In",
      }
    });

    const form = ref({
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
      login: {
        value: "",
        error: false,
        errorMessage: "",
      }
    });

    const submit = async () => {

      try {
        const params = {
            email: form.value.email.value,
            password: form.value.password.value,
        };

        useAxios.get('sanctum/csrf-cookie').then(async response => {

          const res = await useAxios.post('/api/auth/login', params, form)

          if(res.status != 200 && res.response.status == 401)
          {
            form.value.login.error = true;
            form.value.login.errorMessage = res.response.data.message;
          }
          if (res) {
            userStore.setUser(res.data);
            router.push({ name: "Dashboard" });
          }
        })
      } catch (e) {
      }
    };
</script>
