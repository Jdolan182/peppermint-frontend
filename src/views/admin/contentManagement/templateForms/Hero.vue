<template>
    <Form class="space-y-6" @keydown.enter.prevent @keyup.enter.prevent
      >   
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
            />
          </div>
        </div>

        <div>
          <Label
              for="latestBlog" 
              label="Show Latest Blog"
          />
          <div class="mt-1">
            <Checkbox 
                name="latestBlog"
                :checked="form.latestBlog.value"
                @input-value="(value) => (form.latestBlog.value = value)"
                :error="form.latestBlog.error"
                :error-message="form.latestBlog.errorMessage"
            />
          </div>
        </div>

        <div>
          <Label
              for="button" 
              label="Show Button"
          />
          <div class="mt-1">
            <Checkbox 
                name="button"
                :checked="form.button.value"
                @input-value="(value) => (form.button.value = value,  toggleButton(value))"
                :error="form.button.error"
                :error-message="form.button.errorMessage"
            />
          </div>
        </div>

        <div :hidden="disabledButton">
          <Label
              for="buttonText" 
              label="Button Text"
          />
          <div class="mt-1">
            <Input 
                name="buttonText"
                placeholder="Button Text"
                :default-value="form.buttonText.value"
                @input-value="(value) => (form.buttonText.value = value)"
                :disabled="disabledButton"
            />
          </div>
        </div>

        <div :hidden="disabledButton">
          <Label
              for="buttonDestination" 
              label="Button Destination"
          />
          <div class="mt-1">
            <Select 
                width="w-20"
                name="buttonDestination"
                :defaultValue="form.buttonDestination.value"
                :error="form.buttonDestination.error"
                @input-value="(value) => (form.buttonDestination.value = value)"
                :disabled="disabledButton"
              >    
                <option v-for="page in pages" :key="page.id" :value="page.id"> {{ page.title }}</option>
              </Select>     
          </div>
        </div>

        <div >
          <Label
              for="extraText" 
              label="Extra Text"
          />
          <div class="mt-1">
            <Input 
                name="extraText"
                placeholder="Extra Text"
                :default-value="form.extraText.value"
                @input-value="(value) => (form.extraText.value = value)"
            />
          </div>
        </div>


        <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <div>
          <Submit 
            label="Save"
            @click="submit(form)"
          />
        
          </div>
        </div>
    </Form>

</template>
  
<script setup>

  import { useAxios } from "@/composables/request.js";
  import Form from '@/components/forms/Form.vue'
  import Submit from '@/components/buttons/Submit.vue'
  import Input from '@/components/inputs/Input.vue'
  import Label from '@/components/labels/Label.vue'
  import { populateForm, createForm } from "@/composables/forms";
  import Select from "@/components/inputs/Select.vue";
  import { ref, onMounted } from 'vue'
  import { useRouter } from "vue-router";
  import Checkbox from '@/components/inputs/Checkbox.vue'

  const router = useRouter();

  const form = createForm([
    { key: 'title', default: '' },
    { key: 'subtitle', default: '' },
    { key: 'button', default: 0 },
    { key: 'buttonText', default: '' },
    { key: 'buttonDestination', default: '' },
    { key: 'latestBlog', default: 0 },
    { key: 'extraText', default: '' },
  ])

  const emit = defineEmits(['submit'])

  const pages = ref({});
  const disabledButton = ref(true)

  
  const props = defineProps({
      data: {
          type: Object,
          required: true,
      },
  });

  onMounted(async () => {
    populateForm(form, props.data.params)
    if(form.value.button.value == 1)
    {
      disabledButton.value = false
    }
    getPages()
  })
 
  const getPages = async () => {
    try {

      const exclude_id = router.currentRoute.value.params.id;

      const res = await useAxios.get(`/api/pages?exclude_id=${exclude_id}`)

      if(res.status == 200){
        pages.value = res.data.data
      }

    } catch (e) {
      console.log(e)
    }
  }

  const toggleButton = (value) => {

      if(value == 1)
      {
        disabledButton.value = false
        form.value.buttonDestination.value = pages.value[0]['id']
      }
      else {
        disabledButton.value = true
        form.value.buttonText.value = ''
        form.value.buttonDestination.value = ''
      }
  }

  const submit = (form) => {
    const params = {
      title: form.title.value,
      subtitle: form.subtitle.value,
      button: form.button.value,
      buttonText: form.buttonText.value,
      buttonDestination: form.buttonDestination.value,
      latestBlog: form.latestBlog.value,
      extraText: form.extraText.value,
    }
    emit('submit', params);
  }
</script>