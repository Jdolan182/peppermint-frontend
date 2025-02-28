
<template>
    <div class="py-3 pl-50 pr-50">
        <div class="text-center">
          <ErrorLabel
              :label="form.edit.errorMessage"
              :error="form.edit.error"
          />
        </div>        
        <component 
            :is="section" 
            :data="data"
            @submit="submit"
        > 
        </component>
    </div>
</template>


  <script setup>

    import { useAxios } from "@/composables/request.js";
    import { ref, defineAsyncComponent } from 'vue'
    
    import { createForm } from "@/composables/forms";
    import { showSuccessBanner, showErrorBanner } from "@/composables/banners";
    import ErrorLabel from '@/components/labels/ErrorLabel.vue'


    const props = defineProps({
      section: {
          type: Object,
          required: true,
      },
    });

    const data = ref(JSON.parse(props.section.data));

    const form = createForm([
        'edit',
    ])

    const section = defineAsyncComponent(() => 
        import('./templateForms/'+ props.section.page_section_template.template + '.vue'),
    )

    const emit = defineEmits(['getPage'])

    
    const submit = async (form) => {
      try {
  
        const params = {
            order: props.section.order,
            page_id: props.section.page_id,
            page_section_template_id:  props.section.page_section_template.id,
            data: { params: JSON.parse(JSON.stringify(form)) },
        };

  
        const res = await useAxios.patch(`/api/pages/editSection/${props.section.id}`, params, form)
  
        if(res.status != 200 && res.status == 400)
        {
          form.value.edit.error = true
          form.value.edit.errorMessage = res.data.message
        }
        if (res.status == 200) {
          data.value = JSON.parse(res.data.data)
           emit('getPage');
          showSuccessBanner("Edited Successfully", "This page section has been edited");
        }
        else if(res.status == 404) {
          showErrorBanner("Error", "Error");
        }
        else if(res.status == 401) {
          showErrorBanner("Unauthorized", "You don't have access to this");
        }
      
      } catch (e) {
        console.log(e)
        showErrorBanner("Error", "Error");
      }
    };
  </script>