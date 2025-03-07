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
                for="button" 
                label="Show Button"
            />
            <div class="mt-1">
              <Checkbox 
                  name="button"
                  :checked="form.button.value"
                  @input-value="(value) => (form.button.value = value)"
                  :error="form.button.error"
                  :error-message="form.button.errorMessage"
                  @change="enableButton($event)"
              />
            </div>
          </div>

        <div>
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
            />
          </div>
        </div>

        <div>
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
              >    
                <option value=""> None </option>
                <option v-for="page in pages" :key="page.id" :value="page.id"> {{ page.title }}</option>
              </Select>     
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
  ])

  const emit = defineEmits(['submit'])

  const pages = ref({});

  
  const props = defineProps({
      data: {
          type: Object,
          required: true,
      },
  });

  onMounted(async () => {
    populateForm(form, props.data.params)

    if(form.value.button.value == '')
    {
      form.value.button.value = 0
    }
    getPages()
  })
 
  const getPages = async () => {
    try {

      const exclude_id = router.currentRoute.value.params.id;

      const res = await useAxios.get(`/api/pages?exclude_id=${exclude_id}`)

      if(res.status == 200){
        pages.value = res.data.data
        // if(form.value.buttonDestination.value == '')
        // {
        //   form.value.buttonDestination.value = pages.value[0]['id']
        // }

      }

    } catch (e) {
      console.log(e)
    }
  }

  const enableButton = () => {

    

      console.log(form.value.button.value)
      console.log(form)
  }

  const submit = (form) => {
    const params = {
      title: form.title.value,
      subtitle: form.subtitle.value,
      button: form.button.value,
      buttonText: form.buttonText.value,
      buttonDestination: form.buttonDestination.value,
    }
    emit('submit', params);
  }
</script>