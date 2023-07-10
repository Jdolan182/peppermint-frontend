
<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <TableHeader 
      title="Consumer"
      emitFunction="addConsumers"
      @addConsumers="addConsumers()"
    />
    <div class="flex p-4">
      <Table
        :headers="headers"
        :data="paginationData"
        :dataCount="tableData.length"
        @getData="getData"
      >
        <tr v-for="data in tableData" :key="data.id">
          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ data.id }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ data.name }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ data.email }}</td>
          <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <a href="#" class="text-indigo-600 hover:text-indigo-900"
              >Edit<span class="sr-only">{{ data.id }}</span></a
            >
          </td>
        </tr>
      </Table>
    </div>

  </div>
</template>

<script setup>
  import { useAxios } from "@/composables/request.js";
  import TableHeader from '@/components/headers/TableHeader.vue'
  import Table from '@/components/tables/Table.vue'
  import { ref, onMounted, reactive } from 'vue'

  const tableData = ref({});
  const paginationData = ref({});

  let headers = reactive([
    { id: 1, name: "ID" },
    { id: 2, name: "Name" },
    { id: 3, name: "Email" },
    { id: 4, name: "" },
  ]);
  

  onMounted(async () => {
    getData(1)
  })
 

  const getData = async (page, keyword = '') => {
    try {
      let res = [];
      if(keyword && keyword.value != null &&  keyword.value != ''){
        res = await useAxios.get(`/api/consumer?page=${page}&keyword=${keyword.value}`)
      }
      else{
        res = await useAxios.get(`/api/consumer?page=${page}`)
      }

      if(res.status == 200){
        tableData.value = res.data.data
        paginationData.value = res.data
      }

    } catch (e) {
    }
  }


  const addConsumers = async () => {

    //add consumers here
    console.log('we in')
    try {
        // const res = await useAxios.post('/api/consumer/login', params, form)

        // if(res.status != 200 && res.response.status == 401)
        // {
        //   form.value.login.error = true
        //   form.value.login.errorMessage = res.response.data.message
        // }
        // if (res) {
        //   consumerStore.setUser(res.data)
        //   router.push({ name: "Home" })
        // }
      
    } catch (e) {
    }
  };


</script>