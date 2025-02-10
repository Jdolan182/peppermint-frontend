<template>
  <div class="mt-2 flex">

    <div class="hover:bg-gray-800 cursor-pointer flex shrink-0 items-center rounded-l-md bg-gray-900 px-3 text-base text-white outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6" @click="chooseFile">Choose File</div>
    <input 
      class="block w-full cursor-pointer appearance-none rounded-r-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-xs focus:border-indigo-500 focus:outline-hidden focus:ring-indigo-500 sm:text-sm" 
      type="file"
      ref="fileInput"
    >

    <InputErrorMessage
      v-if="$attrs['error'] !== undefined"
      :error="$attrs['error']"
      :error-message="$attrs['error-message']"
    />
  </div>
</template>
  
<script setup>
    import InputErrorMessage from "@/components/inputs/InputErrorMessage.vue";
    import { useTemplateRef } from 'vue'

    const file = useTemplateRef('fileInput')


    const props = defineProps({
      disabled: {
        type: Boolean,
        default: false,
      },
    });

    const chooseFile = async () => {
      file.value.click()
    }
</script>