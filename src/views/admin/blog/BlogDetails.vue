
<template>
  <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
    <TableHeader 
      :title="data.title"
      subtitle="Blog Preview"
      buttonText="Edit"
      emitFunction="editBlog"
      @editBlog="showEditBlogModal()"
    />

    <Blog
      :title="data.title"
      :subtitle="data.subtitle"
      :content="data.content"
      :publishDate="data.live_date ? data.live_date : data.created_at"
    />

    <Modal 
      :show="showEditBlog" 
      @hideModal="showEditBlog = false"
      title="Edit Blog"
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
                  for="title" 
                  label="Title"
              />
            <div class="mt-1">
              <Input 
                  name="title"
                  placeholder="Title"
                  :default-value="form.title.value"
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
                  :default-value="form.subtitle.value"
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
                  :default-value="form.slug.value"
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
              <DateInput 
                  name="live_date"
                  placeholder="Live Date"
                  type="date"
                  :default-value="form.live_date.value"
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
                  :checked="form.is_active.value"
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
                    :defaultValue="form.description.value"
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
                  :defaultValue="form.category_id.value"
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
  import FileInput from '@/components/inputs/FileInput.vue'
  import DateInput from '@/components/inputs/DateInput.vue'
  import Select from "@/components/inputs/Select.vue";
  import Textarea from '@/components/inputs/Textarea.vue'
  import Label from '@/components/labels/Label.vue'
  import ErrorLabel from '@/components/labels/ErrorLabel.vue'
  import Submit from '@/components/buttons/Submit.vue'
  import Blog from '@/components/dataDisplay/Blog.vue'
  import TableHeader from '@/components/headers/TableHeader.vue'
  import { populateForm, createForm } from "@/composables/forms";
  import { useRouter } from "vue-router";
  import { showSuccessBanner, showErrorBanner } from "@/composables/banners";
  import Checkbox from '@/components/inputs/Checkbox.vue'
  import Tiptap from '@/components/inputs/TipTap.vue'
  import { uploadImage } from "@/composables/uploadImage";

  const router = useRouter();
  const data = ref({});

  const blogCategories = ref({});
  const showEditBlog = ref(false);

  const url = ref({})

  const form = createForm([
    'title', 
    'subtitle', 
    'slug', 
    'image_filename',
    'description', 
    'category_id', 
    'live_date',
    'is_active',
    'content', 
    'edit'
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
        live_date: form.value.live_date.value,
        is_active: form.value.is_active.value,
        content: form.value.content.value
      };

      const res = await useAxios.patch(`/api/blog/edit/${router.currentRoute.value.params.slug}`, params, form)

      if(res.status != 200 && res.status == 400)
      {
        form.value.edit.error = true
        form.value.edit.errorMessage = res.data.message
      }
      if (res.status == 200) {
        showEditBlog.value = false
        data.value = res.data.data
        populateForm(form, res.data.data)
        url.value = import.meta.env.VITE_API_ASSET_URL + data.value.image_filename
        showSuccessBanner("Edited Successfully", "This blog has been edited");
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
    getCategories()
  })
 
  const getData = async () => {
    try {

      const res = await useAxios.get(`/api/blog/show/${router.currentRoute.value.params.slug}`)

      if(res.status == 200){
        data.value = res.data.data
        url.value = import.meta.env.VITE_API_ASSET_URL + data.value.image_filename
        populateForm(form, res.data.data)
       
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

  const showEditBlogModal = async () => {
    showEditBlog.value = true
  };

  const uploadBlogImage = async (event) => {

    const image = await uploadImage(event.target.files[0])

    url.value = import.meta.env.VITE_API_ASSET_URL + image
    if (image) {
      form.value.image_filename.value = image

    }
  };
</script>