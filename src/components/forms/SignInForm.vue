<template>
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <!-- TODO logo -->
        <!-- <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
        <HeaderTwo
          :header=props.title
          :stlye=1 
        />
      </div>
  
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
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
                <!-- <div class="flex items-center">
                  <Checkbox 
                      name="remember-me"
                  />
                  <Label
                      for="remember-me" 
                      label="Remember Me"
                  />
                </div> -->
              </div>
    
              <div>
                <Submit 
                  label="Sign In"
                />
              </div>
          </Form>


          <p v-if="props.register" class="mt-8 text-sm font-medium text-gray-400"> Or <router-link :to="props.registerRoute" :class="[$theme.secondFocusColour]">Sign up</router-link> here </p>

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
    import { createForm } from "@/composables/forms";

    const props = defineProps({
      title: {
        type: [String, Number],
        default: "Sign In",
      },
      register: {
        type: Boolean,
        default: false
      },
      registerRoute: {
        type: String,
        default: 'register'
      }
    });

    const form = createForm([
      { key: 'email', default: '' }, 
      { key: 'password', default: '' }, 
      { key: 'login', default: '' }, 
    ])

    const emit = defineEmits(['login'])

    const submit = () => {

      try {
        const params = {
            email: form.value.email.value,
            password: form.value.password.value,
        };

        emit('login', {params, form});
        
      } catch (e) {
      }
    };
</script>
