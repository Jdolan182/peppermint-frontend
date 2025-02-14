<template>
      <input
        v-model.checked="isChecked"
        :checked="isChecked"
        :disabled="props.disabled"
        type="checkbox"
        class="h-4 w-4 rounded-xs first-line:appearance-none block px-1 py-1 border-1 shadow-xs sm:text-sm"
        :class="
          [$attrs.error
            ? 'border-red-500 placeholder-red-500 '
            : 'border-gray-300  placeholder-gray-500 ',
          props.disabled
            ? 'text-gray-500'
            : 'text-gray-900',
            this.$secondFocusColour, this.$bgTextColour]
        "
        v-bind="$attrs"
        @change="inputValue"
      />
      <InputErrorMessage
        v-if="$attrs['error'] !== undefined"
        :error="$attrs['error']"
        :error-message="$attrs['error-message']"
      />
</template>
  
<script setup>
    import { ref, watch, computed } from "vue";
    import InputErrorMessage from "@/components/inputs/InputErrorMessage.vue";

    const props = defineProps({
      checked: {
        type: Number,
        required: false,
        default: () => 0,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    });

    const emits = defineEmits(["inputValue"]);
    const isChecked = ref(props.checked ? true : false);
    const defaultValue = computed(() => props.checked  ? true : false);
    
    const inputValue = () => {
        emits("inputValue", isChecked.value ? 1 : 0);
    };
    
    watch(defaultValue, () => {
      isChecked.value = defaultValue.value;
    });
       
</script>