
<template>
      <div class="text-center mb-6 mt-6">   
            <h3 class="mt-2 text-sm font-semibold text-gray-900">Theme Settings</h3>
      
            <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-8 lg:px-8">
                  <Form class="space-y-6 mt-10 gap-x-6 gap-y-8 " @keydown.enter.prevent @keyup.enter.prevent>

                        <div class="w-1/3">
                              <Label
                                    for="theme" 
                                    label="Select Theme"
                                    class="float-left"
                              />
                              <div class="mt-1 ">
                                    <Select 
                                          width="w-20"
                                          name="theme"
                                          :defaultValue="form.theme.value"
                                          :error="form.theme.error"
                                          @input-value="(value) => (form.theme.value = value)"
                                          :error-message="form.theme.errorMessage"
                                    >   
                                    <option v-for="option in themes" :value="option.id"> {{ option.name }}</option>
                              </Select>     
                              </div>
                        </div>


                        <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <div>
                                    <Submit 
                                          label="Save"
                                          @click="submit()"
                                    />
                              </div>
                        </div>
                  </Form>
            </div>
      </div>
</template>
  
<script setup>

  import { ref, onMounted } from 'vue'
  import Submit from '@/components/buttons/Submit.vue'
  import { useThemeStore } from "@/store/theme";
  import { useAxios } from "@/composables/request.js";
  import Select from "@/components/inputs/Select.vue";
  import Label from '@/components/labels/Label.vue'
  import Form from '@/components/forms/Form.vue'
  import { showSuccessBanner, showErrorBanner } from "@/composables/banners";
  import { createForm } from "@/composables/forms";


  const themes = ref({});

  const form = createForm([
    'theme', 
  ])
  const themeStore = useThemeStore();


  onMounted(async () => { 
      getCurrentTheme()
      getThemes() 
  })

  const getThemes = async () => {
      let res = [];

      res =  await useAxios.get('api/theme/getAllThemes');

      if(res.status == 200){
            themes.value = res.data.data
      }

  }
  const getCurrentTheme = async () => {
      let res = [];

      res =  await useAxios.get('api/theme/getTheme');

      if(res.status == 200){
            form.value.theme.value=res.data.data.id
      }
  }

  const submit = async () => {
     
      try {
            const params = {
                  theme: form.value.theme.value,
            };

            const res = await useAxios.post('/api/theme/setTheme', params, form)

            if(res.status != 200 && res.status == 400)
            {
                  form.value.add.error = true
                  form.value.add.errorMessage = res.data.message
            }
            if (res.status == 200) {
                  showSuccessBanner("Saved Successfully", "Theme has updated");
                  themeStore.setTheme(params)
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

</script>