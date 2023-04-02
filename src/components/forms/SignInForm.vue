<script setup>
    import Form from './Form.vue'
    import Input from '../inputs/Input.vue'
    import Checkbox from '../inputs/Checkbox.vue'
    import Label from '../labels/Label.vue'
    import HeaderTwo from '../labels/HeaderTwo.vue'
    import Submit from '../buttons/Submit.vue'
    import { ref } from "@vue/reactivity";
    import axios from 'axios'


    const props = defineProps({
      title: {
        type: [String, Number],
        default: "Sign In",
      }
    });

    const submit = async () => {

      try {
        const params = {
            email: form.value.email.value,
            password: form.value.password.value,
        };
  
        axios({
            method: 'post',
            url: 'http://localhost/api/auth/login',
            data: params,
          }).then(function (response) {
            console.log(response);
          });
      } catch (e) { 

      }
    };

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
      }
    });

</script>

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