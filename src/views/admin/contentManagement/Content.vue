
<template>
  <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
    <TableHeader 
      title="Pages"
      :buttons="buttons"
      @addPage="showAddPageModal()"
    />
    <div class="flex p-4">
      <Table
        :headers="headers"
        :data="paginationData"
        :dataCount="tableData.length"
        :pageLimit="pageLimit"
        @getData="getData"
      >
        <tr v-for="data in tableData" :key="data.id" class="even:bg-gray-100">
          <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900 sm:pl-6">{{ data.id }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <router-link :to="{ name: 'Page Details', params: {id: data.id } }" class="text-sm font-medium text-gray-700 hover:text-gray-400">{{ data.title }}</router-link>
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ data.slug}}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ data.show_footer ? 'Yes' : 'No' }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ data.is_active ? 'Yes' : 'No' }}</td>
          <td class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium ">
            <div class="inline-flex mr-4">
              <router-link :to="{ name: 'Page Details', params: {id: data.id } }" class="text-sm font-medium text-gray-400 hover:text-gray-200">
                <PencilSquareIcon class="-ml-1 h-5 w-5 shrink-0 text-gray-500" />
              </router-link>
            </div>
            <div class="inline-flex mr-12">
              <XMarkIcon v-if="data.title != 'Home'" @click="showDeletePageModel(data.id)" class="-ml-1 h-5 w-5 shrink-0 text-red-500 cursor-pointer" />
            </div>
          </td>
        </tr>
      </Table>
    </div>

    <Modal 
      :show="showAddPage" 
      @hideModal="showAddPage = false"
      title="Add Page"
      @keyup.enter="submit()"
    >
      <template v-slot:content>

        <Form class="space-y-6" @keydown.enter.prevent @keyup.enter.prevent
        >
            <div class="text-center">
              <ErrorLabel
                  :label="form.add.errorMessage"
                  :error="form.add.error"

              />
            </div>
            <div>
                <Label
                    for="title" 
                    label="Title"
                />
              <div class="mt-1">
                <Input 
                    name="title"
                    placeholder="Title"
                    @input-value="(value) => (form.title.value = value)"
                    :error="form.title.error"
                    :error-message="form.title.errorMessage"
                />
              </div>
            </div>

            <div>
                <Label
                    for="slug" 
                    label="Slug"
                />
              <div class="mt-1">
                <Input 
                    name="slug"
                    placeholder="Slug"
                    @input-value="(value) => (form.slug.value = value)"
                    :error="form.slug.error"
                    :error-message="form.slug.errorMessage"
                />
              </div>
            </div>

            <div>
              <Label
                  for="show_footer" 
                  label="Show Footer"
              />
              <div class="mt-1">
                <Checkbox 
                    name="show_footer"
                    :defaultValue="0"
                    @input-value="(value) => (form.show_footer.value = value)"
                    :error="form.show_footer.error"
                    :error-message="form.show_footer.errorMessage"
                />
              </div>
            </div>

            <div>
              <Label
                  for="is_active" 
                  label="Active"
              />
              <div class="mt-1">
                <Checkbox 
                    name="is_active"
                    :defaultValue="0"
                    @input-value="(value) => (form.is_active.value = value)"
                    :error="form.is_active.error"
                    :error-message="form.is_active.errorMessage"
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

    <Modal 
      :show="showDeletePage" 
      @hideModal="showDeletePage = false"
      title="Delete Page"
      :warning=true   
    >
      <template v-slot:content>
        <div class="mt-2">
          <p class="text-sm text-gray-500">Are you sure you want to delete this Page? This action cannot be undone.</p>
        </div>
      </template>

      <template v-slot:button>
        <div>
          <Error 
            label="Delete"
            @click="deletePage()"
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
  import Error from '@/components/buttons/Error.vue'
  import Checkbox from '@/components/inputs/Checkbox.vue'
  import { createForm } from "@/composables/forms";
  import { PencilSquareIcon, XMarkIcon} from '@heroicons/vue/20/solid'
  import { showSuccessBanner, showErrorBanner } from "@/composables/banners";
  import { useRouter } from "vue-router";

  const tableData = ref({});
  const paginationData = ref({});
  const pageLimit = 30

  const showAddPage = ref(false);
  const showDeletePage = ref(false)
  const deletePageID = ref({})

  const router = useRouter();

  let buttons = reactive([
    { buttonText: 'Add', emitFunction: 'addPage' },
  ])

  let headers = reactive([
    { id: 1, name: "ID" },
    { id: 2, name: "Title" },
    { id: 3, name: "Slug" },
    { id: 3, name: "Show Footer?" },
    { id: 3, name: "Active?" },
    { id: 4, name: "" },
  ]);

  const form = createForm([
    { key: 'title', default: '' }, 
    { key: 'slug', default: '' },
    { key: 'show_footer', default: 0 },
    { key: 'is_active', default: 0 },
    { key: 'add', default: '' },
  ])

  const submit = async () => {

    try {

      const params = {
        title: form.value.title.value,
        slug: form.value.slug.value,
        show_footer: form.value.show_footer.value,
        is_active: form.value.is_active.value,
      };

      const res = await useAxios.post('/api/pages/create', params, form)

      if(res.status != 200 && res.status == 400)
      {
        form.value.add.error = true
        form.value.add.errorMessage = res.data.message
      }
      if (res.status == 200) {
        showAddPage.value = false
        showSuccessBanner("Saved Successfully", "A new page has been added");
        router.push({  name: 'Page Details', params: {id: res.data.page.slug }  })
      }
      else if(res.status == 404) {
        showErrorBanner("Error", "Error");
      }
      else if(res.status == 401) {
        showErrorBanner("Unauthorized", "You don't have access to this");
      }
    
    } catch (e) {
      showErrorBanner(true, 404, "Error", "Error");
    }
  };
  
  onMounted(async () => {
    getData(1)
  })
 
  const getData = async (page, keyword = '', limit = pageLimit) => {
    try {
      let res = [];

      if(keyword && keyword.value != null && keyword.value != ''){
        res = await useAxios.get(`/api/pages?page=${page}&keyword=${keyword.value}`, { params: { "limit": limit } })
      }
      else{
        res = await useAxios.get(`/api/pages?page=${page}`, { params: { "limit": limit } })
      }

      if(res.status == 200){
        tableData.value = res.data.data
        paginationData.value = res.data
      }

    } catch (e) {
    }
  }

  const showAddPageModal = async () => {
    showAddPage.value = true
  };

  const showDeletePageModel = (id) => {
    deletePageID.value = id
    showDeletePage.value = true
  }

  const deletePage = async() => {
    try {
    
      const res = await useAxios.delete(`/api/pages/delete/${deletePageID.value}`)
      
      if(res.status == 200){
        showDeletePage.value = false
        showSuccessBanner("Delete Successful", "Page has been deleted");
        getData(1)
      }
      else if(res.status == 404) {
        showErrorBanner("Error", "Error");
      }
      else if(res.status == 401) {
        showErrorBanner("Unauthorized", "You don't have access to this");
      }
    } catch (e) {
    }
  }
</script>