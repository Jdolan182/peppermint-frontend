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

import Form from '@/components/forms/Form.vue'
import Submit from '@/components/buttons/Submit.vue'
import Input from '@/components/inputs/Input.vue'
import Label from '@/components/labels/Label.vue'
import { populateForm, createForm } from "@/composables/forms";
import { watch } from 'vue'


const form = createForm([
  'title',
  'subtitle'
])

const emit = defineEmits(['submit'])


const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
});

populateForm(form, props.data.params)

const submit = (form) => {
  const params = {
    title: form.title.value,
    subtitle: form.subtitle.value
  }
  emit('submit', params);
}
</script>