
<template>
  <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
    <TableHeader 
      :title="data.name"
      subtitle="Page Details"
      :buttons="buttons"
      @editPage="showEditPageModal()"
      @previewPage="previewPage()"
    />
    <Tabs>
      <Tab title="Page">
        <DataDisplay>
          <div class="border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">Title</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ data.title }}</dd>
              </div>
              <div class="bg-gray-100 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">Slug</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ data.slug }}</dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">Show Footer</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ data.show_footer }}</dd>
              </div>
              <div class="bg-gray-100 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-900">Active?</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ data.is_active }}</dd>
              </div>
            </dl>
          </div>
        </DataDisplay>
      </Tab>
      <Tab title="Sections">
        <div class="border-t border-gray-100">
          <div v-for="section in data.sections" class="px-4 pt-6 sm:gap-4 sm:px-6">
            <Accordion  :title="section.page_section_template.template">
              <TemplateForm :section="section" @getPage="getData"/>

            </Accordion>
          </div>
        </div>
      </Tab>
    </Tabs>
  
    <Modal 
      :show="showEditPage" 
      @hideModal="showEditPage = false"
      title="Edit Page"
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
                  for="show_footer" 
                  label="Show Footer"
              />
              <div class="mt-1">
                <Checkbox 
                    name="show_footer"
                    :checked="form.show_footer.value"
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
                    :checked="form.is_active.value"
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
  import { ref, onMounted, reactive } from 'vue'
  import Modal from '@/components/modals/Modal.vue'
  import Form from '@/components/forms/Form.vue'
  import Input from '@/components/inputs/Input.vue'
  import Label from '@/components/labels/Label.vue'
  import ErrorLabel from '@/components/labels/ErrorLabel.vue'
  import Submit from '@/components/buttons/Submit.vue'
  import DataDisplay from '@/components/dataDisplay/DataDisplay.vue'
  import TableHeader from '@/components/headers/TableHeader.vue'
  import Checkbox from '@/components/inputs/Checkbox.vue'
  import { populateForm, createForm } from "@/composables/forms";
  import { useRouter } from "vue-router";
  import { showSuccessBanner, showErrorBanner } from "@/composables/banners";
  import Accordion from '@/components/dataDisplay/Accordion.vue'
  import Tabs from "@/components/tabs/Tabs2.vue"
  import Tab from "@/components/tabs/Tab.vue"
  import TemplateForm from "./TemplateForm.vue"



  const router = useRouter();
  const data = ref({});

  const showEditPage = ref(false);

  let buttons = reactive([
    { buttonText: 'Edit', emitFunction: 'editPage' },
    { buttonText: 'Preview Page', emitFunction: 'previewPage' }
  ])

  const form = createForm([
    'title', 
    'slug', 
    'show_footer', 
    'is_active', 
    'edit'
  ])

  const submit = async () => {
    try {

      const params = {
        id: router.currentRoute.value.params.id,
        title: form.value.title.value,
        slug: form.value.slug.value,
        show_footer: form.value.show_footer.value,
        is_active: form.value.is_active.value
      };

      const res = await useAxios.patch(`/api/pages/edit/${router.currentRoute.value.params.id}`, params, form)

      if(res.status != 200 && res.status == 400)
      {
        form.value.edit.error = true
        form.value.edit.errorMessage = res.data.message
      }
      if (res.status == 200) {
        showEditPage.value = false
        data.value = res.data.data
        populateForm(form, res.data.data)
        showSuccessBanner("Edited Successfully", "This page has been edited");
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

      const res = await useAxios.get(`/api/pages/show/${router.currentRoute.value.params.id}`)

      if(res.status == 200){
        data.value = res.data.data
        populateForm(form, res.data.data)
      }

    } catch (e) {
    }
  }

  const showEditPageModal = async () => {
    showEditPage.value = true
  };

  const previewPage = async () => {
    const route = router.resolve({ name: form.value.title.value }); 
    window.open(route.href, '_blank');
  };
</script>