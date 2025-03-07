
<template>
  <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
    <TableHeader 
      title="Blogs"
      :buttons="buttons"
      @addBlog="showAddBlogModal()"
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
          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ data.id }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <router-link :to="{ name: 'Blog Details', params: {id: data.id } }" class="text-sm font-medium text-gray-700 hover:text-gray-400">{{ data.title }}</router-link>
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ data.category.category }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ data.is_active ? 'Yes' : 'No'  }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(data.created_at) }}</td>
          <td class="relative whitespace-nowrap py-4 pl-3 text-right text-sm font-medium ">
            <div class="inline-flex mr-4">
              <router-link :to="{ name: 'Blog Details', params: {id: data.id } }" class="text-sm font-medium text-gray-400 hover:text-gray-200">
                <PencilSquareIcon class="-ml-1 h-5 w-5 shrink-0 text-gray-500" />
              </router-link>
            </div>
            <div class="inline-flex mr-12">
              <XMarkIcon @click="showDeleteBlogModel(data.slug)" class="-ml-1 h-5 w-5 shrink-0 text-red-500 cursor-pointer" />
            </div>
          </td>
        </tr>
      </Table>
    </div>

    <Modal 
      :show="showAddBlog" 
      @hideModal="showAddBlog = false"
      title="Add Blog"
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
                    for="subtitle" 
                    label="Subtitle"
                />
              <div class="mt-1">
                <Input 
                    name="subtitle"
                    placeholder="Subtitle"
                    @input-value="(value) => (form.subtitle.value = value)"
                    :error="form.subtitle.error"
                    :error-message="form.subtitle.errorMessage"
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
                    for="image_filename" 
                    label="Blog Image"
                />
              <div class="mt-1">
                <FileInput 
                    name="image_filename"
                    type="file"
                    @change="uploadBlogImage"   
                    :error="form.image_filename.error"
                    :error-message="form.image_filename.errorMessage"               
                />
              </div>

              <div class="mt-1 mb-1">
                <img v-bind:src="url" class="max-w-48 max-h-48">
              </div>

            </div>

            <div>
              <Label
                  for="live_date" 
                  label="Go Live Date"
              />
              <div class="mt-1">
                <Input 
                    name="live_date"
                    placeholder="Live Date"
                    type="date"
                    @input-value="(value) => (form.live_date.value = value)"
                    :error="form.live_date.error"
                    :error-message="form.live_date.errorMessage"
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

            <div>
              <Label
                  for="description" 
                  label="Description"
              />
              <div class="mt-1">
                <Textarea 
                    name="description"
                    type="textarea"
                    @input-value="(value) => (form.description.value = value)"
                    :error="form.description.error"
                    :error-message="form.description.errorMessage"
                />
              </div>
            </div>

            <div>
              <Label
                  for="category" 
                  label="Category"
              />
              <div class="mt-1">
                <Select 
                  width="w-20"
                  name="category"
                  :defaultValue="blogCategories[0]['id']"
                  :error="form.category_id.error"
                  @input-value="(value) => (form.category_id.value = value)"
                  :error-message="form.category_id.errorMessage"
                >   
                  <option v-for="option in blogCategories" :key="option.id" :value="option.id"> {{ option.category }}</option>
                </Select>     

              </div>
            </div>

            <div>
              <Label
                  for="content" 
                  label="Content"
              />
            <tiptap v-model="form.content.value"/>
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
      :show="showDeleteBlog" 
      @hideModal="showDeleteBlog = false"
      title="Delete Blog"
      :warning=true   
    >
      <template v-slot:content>
        <div class="mt-2">
          <p class="text-sm text-gray-500">Are you sure you want to delete this Blog? This action cannot be undone.</p>
        </div>
      </template>

      <template v-slot:button>
        <div>
          <Error 
            label="Delete"
            @click="deleteBlog()"
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
  import Select from "@/components/inputs/Select.vue";
  import { ref, onMounted, reactive } from 'vue'
  import Modal from '@/components/modals/Modal.vue'
  import Form from '@/components/forms/Form.vue'
  import Input from '@/components/inputs/Input.vue'
  import FileInput from '@/components/inputs/FileInput.vue'
  import Textarea from '@/components/inputs/Textarea.vue'
  import Checkbox from '@/components/inputs/Checkbox.vue'
  import Label from '@/components/labels/Label.vue'
  import ErrorLabel from '@/components/labels/ErrorLabel.vue'
  import Submit from '@/components/buttons/Submit.vue'
  import Error from '@/components/buttons/Error.vue'
  import { createForm } from "@/composables/forms";
  import { formatDate } from "@/composables/date";
  import { PencilSquareIcon, XMarkIcon} from '@heroicons/vue/20/solid'
  import { showSuccessBanner, showErrorBanner } from "@/composables/banners";
  import Tiptap from '@/components/inputs/TipTap.vue'
  import { useUserStore } from '@/store/admin/user';
  import { uploadImage } from "@/composables/uploadImage";

  const tableData = ref({});
  const blogCategories = ref({});
  const paginationData = ref({});
  const pageLimit = 30

  const showAddBlog = ref(false);
  const showDeleteBlog = ref(false)
  const deleteBlogID = ref({})

  const userStore = useUserStore();

  const url = ref()
  url.value = ''

  let buttons = reactive([
    { buttonText: 'Add', emitFunction: 'addBlog' },
  ])


  let headers = reactive([
    { id: 1, name: "ID" },
    { id: 2, name: "Title" },
    { id: 2, name: "Category" },
    { id: 2, name: "Active" },
    { id: 3, name: "Date Created" },
    { id: 4, name: "" },
  ]);

  const form = createForm([
    { key: 'title', default: '' }, 
    { key: 'subtitle', default: '' }, 
    { key: 'slug', default: '' }, 
    { key: 'image_filename', default: '' }, 
    { key: 'description', default: '' }, 
    { key: 'category_id', default: 0 }, 
    { key: 'live_date', default: 0 },
    { key: 'is_active', default: 0 },
    { key: 'content', default: '' },
    { key: 'add', default: '' },
  ])

  const submit = async () => {

    try {


      const params = {
        title: form.value.title.value,
        subtitle: form.value.subtitle.value,
        slug: form.value.slug.value,
        image_filename: form.value.image_filename.value,
        description: form.value.description.value,
        category_id: form.value.category_id.value,
        author_id: userStore.getId,
        live_date: form.value.live_date.value,
        is_active: form.value.is_active.value,
        content: form.value.content.value
      };

      const res = await useAxios.post('/api/blog/create', params, form)

      if(res.status != 200 && res.status == 400)
      {
        form.value.add.error = true
        form.value.add.errorMessage = res.data.message
      }
      if (res.status == 200) {
        showAddBlog.value = false
        showSuccessBanner("Saved Successfully", "A new blog has been added");
        getData(1)
      }
      else if(res.status == 404) {
        showErrorBanner("Error", "Error");
      }
      else if(res.status == 401) {
        showErrorBanner("Unauthorized", "You don't have access to this");
      }
    
    } catch (e) {
      console.log(e)
      showErrorBanner(true, 404, "Error", "Error");
    }
  };
  
  onMounted(async () => {
    getData(1)
    getCategories()
  })
 
  const getData = async (page, keyword = '', limit = pageLimit) => {
    try {
      let res = [];

      if(keyword && keyword.value != null && keyword.value != ''){
        res = await useAxios.get(`/api/blog?page=${page}&keyword=${keyword.value}`, { params: { "limit": limit } })
      }
      else{
        res = await useAxios.get(`/api/blog?page=${page}`, { params: { "limit": limit } })
      }

      if(res.status == 200){
        tableData.value = res.data.data
        paginationData.value = res.data
      }

    } catch (e) {
    }
  }

  const getCategories = async () => {
    try {
      let res = [];

      res = await useAxios.get(`/api/blogCategories`)
  
      if(res.status == 200){
        blogCategories.value = res.data.data
      }

    } catch (e) {
    }
  }

  const showAddBlogModal = async () => {
    showAddBlog.value = true
  };

  const uploadBlogImage = async (event) => {

    const image = await uploadImage(event.target.files[0])

    url.value = import.meta.env.VITE_API_ASSET_URL + image
    if (image) {
      form.value.image_filename.value = image

    }
  };

  const showDeleteBlogModel = (id) => {
    deleteBlogID.value = id
    showDeleteBlog.value = true
  }

  const deleteBlog = async() => {
    try {
    
      const res = await useAxios.delete(`/api/blog/delete/${deleteBlogID.value}`)
      
      if(res.status == 200){
        showDeleteBlog.value = false
        showSuccessBanner("Delete Successful", "Blog has been deleted");
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