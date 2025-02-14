<template>
    <input
      v-model.trim="value"
      :disabled="props.disabled"
      class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-xs focus:outline-hidden sm:text-sm"
      :class="
        [$attrs.error
          ? 'border-red-500 placeholder-red-500 '
          : 'border-gray-300  placeholder-gray-500 ',
        props.disabled
          ? 'text-gray-500'
          : 'text-gray-900',
        props.icon
          ? 'pl-10' 
          : '',
         this.$secondFocusColour]
      "
      v-bind="$attrs"
      @input="inputValue"
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
      defaultValue: {
        type: [String, Number],
        default: () => "",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      icon: {
        type: Boolean,
        default: false,
      },
    });

    const emits = defineEmits(["inputValue"]);
    const value = ref(props.defaultValue);
    const defaultValue = computed(() => props.defaultValue);

    const inputValue = () => {
        emits("inputValue", value.value);
    };

    watch(defaultValue, () => {
      value.value = defaultValue.value;
    });
</script>