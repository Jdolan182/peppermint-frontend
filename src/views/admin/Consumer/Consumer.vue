
<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <TableHeader 
      title="Consumer"
      emitFunction="addConsumers"
      @addConsumers="showAddConsumers()"
    />
    <div class="flex p-4">
      <Table
        :headers="headers"
        :data="paginationData"
        :dataCount="tableData.length"
        :pageLimit="pageLimit"
        @getData="getData"
      >
        <tr v-for="data in tableData" :key="data.id">
          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ data.id }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ data.name }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ data.email }}</td>
          <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <router-link :to="{ name: 'Consumer Details', params: {id: data.id } }" class="text-sm font-medium text-gray-400 hover:text-gray-200">Edit</router-link>
          </td>
        </tr>
      </Table>
    </div>

    <Modal 
      :show="showAddConsumer" 
      @hideModal="showAddConsumer = false"
      title="Add Consumer"
    >
      <template v-slot:content>

        <Form class="space-y-6"
        >
            <div class="text-center">
              <ErrorLabel
                  :label="form.add.errorMessage"
                  :error="form.add.error"

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
        </Form>
      </template>

      <template v-slot:button>
        <div>
          <Submit 
            label="Add"
            @click="submit()"
          />
        </div>
      </template>

    </Modal>

  </div>
</template>

<script setup>
  import { useAxios } from "@/composables/request.js";
  import TableHeader from '@/components/headers/TableHeader.vue'
  import Table from '@/components/tables/Table.vue'
  import { ref, onMounted, reactive } from 'vue'
  import Modal from '@/components/modals/Modal.vue'
  import Form from '@/components/forms/Form.vue'
  import Input from '@/components/inputs/Input.vue'
  import Label from '@/components/labels/Label.vue'
  import ErrorLabel from '@/components/labels/ErrorLabel.vue'
  import Submit from '@/components/buttons/Submit.vue'

  const tableData = ref({});
  const paginationData = ref({});
  const pageLimit = 30

  const showAddConsumer = ref(false);


  let headers = reactive([
    { id: 1, name: "ID" },
    { id: 2, name: "Name" },
    { id: 3, name: "Email" },
    { id: 4, name: "" },
  ]);

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
    add: {
      value: "",
      error: false,
      errorMessage: "",
    }
  });

  const submit = async () => {

    console.log('f')
    try {

      const params = {
        name: form.value.name.value,
        email: form.value.email.value,
        password: form.value.password.value,
        password_confirmation: form.value.confirmPassword.value
      };

      const res = await useAxios.post('/api/consumer/signup', params, form)

      if(res.status != 200 && res.response.status == 401)
      {
        form.value.register.error = true
        form.value.register.errorMessage = res.response.data.message
      }
      if (res.status == 200) {
        console.log(res)
      }
    
    } catch (e) {
    }
  };
  

  onMounted(async () => {
    getData(1)
  })
 

  const getData = async (page, keyword = '', limit = pageLimit) => {
    try {
      let res = [];

      if(keyword && keyword.value != null && keyword.value != ''){
        res = await useAxios.get(`/api/consumer?page=${page}&keyword=${keyword.value}`, { params: { "limit": limit } })
      }
      else{
        res = await useAxios.get(`/api/consumer?page=${page}`, { params: { "limit": limit } })
      }

      if(res.status == 200){
        tableData.value = res.data.data
        paginationData.value = res.data
      }

    } catch (e) {
    }
  }


  const showAddConsumers = async () => {
    showAddConsumer.value = true
  };


</script>