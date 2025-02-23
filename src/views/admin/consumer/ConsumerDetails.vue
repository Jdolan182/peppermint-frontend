
<template>
  <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
    <TableHeader 
      :title="data.name"
      subtitle="Consumer Details"
      buttonText="Edit"
      emitFunction="editConsumer"
      @editConsumer="showEditConsumerModal()"
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
      :show="showEditConsumer" 
      @hideModal="showEditConsumer = false"
      title="Edit Consumer"
      @keyup.enter="submit()"
    >
      <template v-slot:content>

        <Form class="space-y-6" @keydown.enter.prevent @keyup.enter.prevent
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

            <Accordion 
              title='Edit Password'
            >
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

                <div class="pt-7">
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
            </Accordion>
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
  import Accordion from '@/components/dataDisplay/Accordion.vue'



  const router = useRouter();
  const data = ref({});

  const showEditConsumer = ref(false);

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
        id: router.currentRoute.value.params.id,
        name: form.value.name.value,
        email: form.value.email.value,
        password: form.value.password.value,
        password_confirmation: form.value.confirmPassword.value
      };

      const res = await useAxios.patch(`/api/consumer/edit/${router.currentRoute.value.params.id}`, params, form)

      if(res.status != 200 && res.status == 400)
      {
        form.value.edit.error = true
        form.value.edit.errorMessage = res.data.message
      }
      if (res.status == 200) {
        showEditConsumer.value = false
        data.value = res.data.data
        populateForm(form, res.data.data)
        showSuccessBanner("Edited Successfully", "This consumer has been edited");
      }
      else if(res.status == 404) {
        showErrorBanner("Error", "Error");
      }
      else if(res.status == 401) {
        showErrorBanner("Unauthorized", "You don't have access to this");
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

      const res = await useAxios.get(`/api/consumer/show/${router.currentRoute.value.params.id}`)

      if(res.status == 200){
        data.value = res.data.data
        populateForm(form, res.data.data)
      }

    } catch (e) {
    }
  }

  const showEditConsumerModal = async () => {
    showEditConsumer.value = true
  };
</script>