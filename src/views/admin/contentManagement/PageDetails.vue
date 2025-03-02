
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
          <div class="inline-flex flex items-center px-3 py-2 text-sm font-semibold text-black hover:bg-white/70">

              <Button 
                  @click="showAddSectionModal" 
                  class="mr-4"
                  label="Add Section"

              />
          </div>
          <Draggable
            class="draggable-list-group "
            :component-data="{
              tag: 'ul',
              type: 'transition-group',
              name: !drag ? 'flip-list' : null
            }"
            v-model="pageSections"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false, updateOrder()"
            item-key="order">
          >
          <template #item="{ element }">

              <div  :key="element.order" class="px-4 pt-4 pb-4 sm:gap-4 sm:px-6 draggable-list-group-item cursor-move">
                <Accordion  :title="element.page_section_template.template">
                  <TemplateForm :section="element" @getPage="getData"/>

                </Accordion>
              </div>
            </template>

          </Draggable>
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

    <Modal 
      :show="showAddSection" 
      @hideModal="showAddSection = false"
      title="Add Section"
    >
      <template v-slot:content>

        <Form class="space-y-6 mt-5" @keydown.enter.prevent @keyup.enter.prevent
        >
          <div>
            <Label
                for="section" 
                label="Select Section"
            />
            <div class="mt-1">
              <Select 
                width="w-20"
                name="category"
                :defaultValue="templates[0]['id']"
                v-model="selectedTemplate"
              >   
                <option v-for="option in templates" :key="option.id" :value="option.id"> {{ option.template }}</option>
              </Select>     

            </div>
          </div>

        </Form>
      </template>

      <template v-slot:button>
        <div>
          <Submit 
            label="Add"
            @click="addSection()"
          />
        </div>
      </template>

    </Modal>

  </div>
</template>

<script setup>
  import { useAxios } from "@/composables/request.js";
  import { ref, onMounted, reactive, computed } from 'vue'
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
  import Draggable from 'vuedraggable'
  import Button from "@/components/buttons/Button.vue";
  import Select from "@/components/inputs/Select.vue";

  const router = useRouter();
  const data = ref({});
  const templates = ref({})

  const selectedTemplate = ref(0)


  const showEditPage = ref(false);
  const showAddSection = ref(false);

  let buttons = reactive([
    { buttonText: 'Edit', emitFunction: 'editPage' },
    { buttonText: 'Preview Page', emitFunction: 'previewPage' }
  ])

  const pageSections = ref([])

  const drag = ref(false)
  const dragOptions = computed(() => ({
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "draggable-ghost"
  }))

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
        pageSections.value = data.value.sections
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
    getTemplates()
  })
 
  const getData = async () => {
    try {

      const res = await useAxios.get(`/api/pages/show/${router.currentRoute.value.params.id}`)

      if(res.status == 200){
        data.value = res.data.data
        pageSections.value = data.value.sections
        populateForm(form, res.data.data)
      }

    } catch (e) {
    }
  }

  const getTemplates = async () => {
    try {

      const res = await useAxios.get(`/api/pages/getTemplates`)

      if(res.status == 200){
        templates.value = res.data.data
        selectedTemplate.value = templates.value[0].id
      }

    } catch (e) {
    }
  }

  const showEditPageModal = async () => {
    showEditPage.value = true
  }

  const showAddSectionModal = async () => {
    showAddSection.value = true
  }

  const previewPage = async () => {
    const route = router.resolve({ name: form.value.title.value }); 
    window.open(route.href, '_blank');
  }

  const updateOrder = async () => {

    pageSections.value.forEach((value, index) => {
  
      if(value.order != index+1)
      {
        value.order = index+1
      }
    })

    try {

      const params = {
        sections: pageSections.value,
      };

      const res = await useAxios.post(`/api/pages/updateSectionOrder`, params)

      if(res.status == 200){
        showSuccessBanner("Order Updated", "This pages sections have been reorder successfully");

      }

    } catch (e) {
    }
  }

  const addSection = async () => {

    try {

      const params = {
        template_id: selectedTemplate.value,
      };

      const res = await useAxios.post(`/api/pages/addSection/${router.currentRoute.value.params.id}`, params)

      if(res.status != 200 && res.status == 400)
      {
        form.value.edit.error = true
        form.value.edit.errorMessage = res.data.message
      }
      if (res.status == 200) {
        getData()
        showAddSection.value = false
        selectedTemplate.value = templates.value[0].id
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
  
</script>