<template>
          <!-- Settings forms -->
          <div class="divide-y overflow-hidden bg-white shadow sm:rounded-lg">
          <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 class="text-base font-semibold leading-7">Personal Information</h2>
              <p class="mt-1 text-sm leading-6 text-gray-400">Update your details</p>
            </div>

            <Form 
              @submit="updateDetails()"
              class="md:col-span-2"
            >
              <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div class="text-center">
                  <ErrorLabel
                      :label="form.update.errorMessage"
                      :error="form.update.error"
                />
                </div>
                <div class="sm:col-span-full">
                  <Label
                    for="name" 
                    label="Name"
                  />
                  <div class="mt-1">
                    <Input 
                        name="name"
                        placeholder="Name"
                        :default-value="form.name.value"
                        @input-value="(value) => (form.name.value = value)"
                        :error="form.name.error"
                        :error-message="form.name.errorMessage"
                    />
                  </div>
                </div>

                <div class="col-span-full">
                  <Label
                    for="email" 
                    label="Email Address"
                  />
                  <div class="mt-1">
                    <Input 
                        name="email"
                        placeholder="Email"
                        :default-value="form.email.value"
                        @input-value="(value) => (form.email.value = value)"
                        :error="form.email.error"
                        :error-message="form.email.errorMessage"
                    />
                  </div>
                </div>

              </div>

              <div class="mt-8 flex w-14">
                <Submit 
                    label="Save"
                  />
              </div>
            </Form>
          </div>

          <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 class="text-base font-semibold leading-7">Change password</h2>
              <p class="mt-1 text-sm leading-6 text-gray-400">Update your password associated with your account.</p>
            </div>

            <Form 
              class="md:col-span-2"
              @submit="updatePassword()"
            >
              <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div class="text-center">
                  <ErrorLabel
                      :label="passwordForm.update.errorMessage"
                      :error="passwordForm.update.error"
                />
                </div>
                <div class="col-span-full">
                  <Label
                    for="current_password" 
                    label="Current Password"
                  />
                  <div class="mt-1">
                    <Input 
                        name="current_password"
                        type="password"
                        placeholder="Old Password"
                        @input-value="(value) => (passwordForm.current_password.value = value)"
                        :error="passwordForm.current_password.error"
                        :error-message="passwordForm.current_password.errorMessage"
                    />
                  </div>
                </div>

                <div class="col-span-full">
                  <Label
                    for="password" 
                    label="New Password"
                  />
                  <div class="mt-1">
                    <Input 
                        name="password"
                        type="password"
                        placeholder="New Password"
                        @input-value="(value) => (passwordForm.password.value = value)"
                        :error="passwordForm.password.error"
                        :error-message="passwordForm.password.errorMessage"
                    />
                  </div>
                </div>

                <div class="col-span-full">
                  <Label
                    for="confirmPassword" 
                    label="Confirm Password"
                  />
                  <div class="mt-1">
                    <Input 
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        @input-value="(value) => (passwordForm.confirmPassword.value = value)"
                        :error="passwordForm.confirmPassword.error"
                        :error-message="passwordForm.confirmPassword.errorMessage"
                    />
                  </div>
                </div>
              </div>
             
              <div class="mt-8 flex w-14">
                <Submit 
                    label="Save"
                  />
              </div>
            </Form>
          </div>      
        </div>
</template>

<script setup>

import Form from '@/components/forms/Form.vue'
    import Input from '@/components/inputs/Input.vue'
    import Label from '@/components/labels/Label.vue'
    import ErrorLabel from '@/components/labels/ErrorLabel.vue'
    import Submit from '@/components/buttons/Submit.vue'
    import { useAxios } from "@/composables/request.js";
    import { useRouter } from "vue-router";
    import { createForm } from "@/composables/forms";
    import { removeErrors } from "@/composables/errors";
    import { showSuccessBanner, showErrorBanner } from "@/composables/banners";
    import { useConsumerStore } from "@/store/frontend/consumer";

    const consumerStore = useConsumerStore();
    const router = useRouter();


    const form = createForm([
      'name', 
      'email', 
      'update'
    ])

    console.log(form.value)

    form.value['name'].value = consumerStore.getName;
    form.value['email'].value = consumerStore.getEmail;

    const passwordForm = createForm([
      'current_password', 
      'password',
      'confirmPassword',
      'update'
    ])

    const updateDetails = async () => {

      try {

        const params = {
          name: form.value.name.value,
          email: form.value.email.value,
        };


        const res = await useAxios.patch(`/api/consumer/updateDetails/${router.currentRoute.value.params.id}`, params, form)

        if(res.status != 200 && res.response.status == 401)
        {
          form.value.update.error = true
          form.value.update.errorMessage = res.response.data.message
        }
        if (res.status == 200) {
          consumerStore.setUser(res.data)
          removeErrors(form)
          showSuccessBanner("Edited Successfully", "You details have been updated");
      }
        else if(res.status == 404) {
          showErrorBanner("Error", "Error");
        }
      } catch (e) {
      }
    };

    const updatePassword = async () => {

      try {

        const params = {
          current_password: passwordForm.value.current_password.value,
          password: passwordForm.value.password.value,
          password_confirmation: passwordForm.value.confirmPassword.value
        };

        const res = await useAxios.patch(`/api/consumer/updatePassword/${router.currentRoute.value.params.id}`, params, passwordForm)

        if(res.status != 200 && res.response.status == 401)
        {
          passwordForm.value.update.error = true
          passwordForm.value.update.errorMessage = res.response.data.message
        }
        if (res.status == 200) {
          removeErrors(passwordForm)
          showSuccessBanner("Edited Successfully", "Your password has been updated");
        }
        else if(res.status == 404) {
          showErrorBanner("Error", "Error");
        }

      } catch (e) {
      }
    };
</script>