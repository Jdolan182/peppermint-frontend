
<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <TableHeader 
      :title="data.name"
      subtitle="Consumer Details"
      buttonText="Edit"
      emitFunction="editUser"
      @editUser="showEditUserModal()"
    />
    <DataDisplay>
      <div class="border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">Name</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ data.name }}</dd>
          </div>
          <div class="bg-gray-100 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-900">Email</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ data.email }}</dd>
          </div>
        </dl>
      </div>
    </DataDisplay>

    <Modal 
      :show="showEditUser" 
      @hideModal="showEditUser = false"
      title="Edit Consumer"
      @keyup.enter="submit()"
    >
      <template v-slot:content>

        <Form class="space-y-6"
        >
            <div class="text-center">
              <ErrorLabel
                  :label="form.edit.errorMessage"
                  :error="form.edit.error"
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
                    :default-value="form.name.value"
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
                    :default-value="form.email.value"
                    @input-value="(value) => (form.email.value = value)"
                    :error="form.email.error"
                    :error-message="form.email.errorMessage"
                />
              </div>
            </div>

            <!-- TODO make component one day -->
            <Disclosure  v-slot="{ open }">
              <DisclosureButton  class="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-grey-900 hover:bg-grey-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span class="font-semibold">Edit Password</span>
                <ChevronUpIcon
                  :class="open ? 'rotate-180 transform' : ''"
                  class="h-5 w-5 text-grey-500"
                />
              </DisclosureButton>
              <DisclosurePanel>
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
              </DisclosurePanel>
            </Disclosure>
        </Form>
      </template>

      <template v-slot:button>
        <div>
          <Submit 
            label="Save"
            @click="submit()"
          />
        </div>
      </template>

    </Modal>

  </div>
</template>

<script setup>
  import { useAxios } from "@/composables/request.js";
  import { ref, onMounted } from 'vue'
  import Modal from '@/components/modals/Modal.vue'
  import Form from '@/components/forms/Form.vue'
  import Input from '@/components/inputs/Input.vue'
  import Label from '@/components/labels/Label.vue'
  import ErrorLabel from '@/components/labels/ErrorLabel.vue'
  import Submit from '@/components/buttons/Submit.vue'
  import DataDisplay from '@/components/dataDisplay/DataDisplay.vue'
  import TableHeader from '@/components/headers/TableHeader.vue'
  import { populateForm, createForm } from "@/composables/forms";
  import { useRouter } from "vue-router";
  import { showSuccessBanner, showErrorBanner } from "@/composables/banners";
  import { Disclosure, DisclosureButton, DisclosurePanel, } from '@headlessui/vue'
  import { ChevronUpIcon } from '@heroicons/vue/20/solid'

  const router = useRouter();
  const data = ref({});

  const showEditUser = ref(false);

  const form = createForm([
    'name', 
    'email', 
    'password', 
    'confirmPassword', 
    'edit'
  ])

  const submit = async () => {
    try {

      const params = {
        name: form.value.name.value,
        email: form.value.email.value,
        password: form.value.password.value,
        password_confirmation: form.value.confirmPassword.value
      };

      const res = await useAxios.patch(`/api/user/edit/${router.currentRoute.value.params.id}`, params, form)

      if(res.status != 200 && res.response.status == 401)
      {
        form.value.register.error = true
        form.value.register.errorMessage = res.response.data.message
      }
      if (res.status == 200) {
        showEditUser.value = false
        data.value = res.data.data
        populateForm(form, res.data.data)
        showSuccessBanner("Edited Successfully", "This user has been edited");
      }
      else if(res.status == 404) {
        showErrorBanner("Error", "Error");
      }
    
    } catch (e) {
      showErrorBanner("Error", "Error");
    }
  };
  
  onMounted(async () => {
    getData()
  })
 
  const getData = async () => {
    try {

      const res = await useAxios.get(`/api/user/show/${router.currentRoute.value.params.id}`)

      if(res.status == 200){
        data.value = res.data.data
        populateForm(form, res.data.data)
      }

    } catch (e) {
    }
  }

  const showEditUserModal = async () => {
    showEditUser.value = true
  };
</script>