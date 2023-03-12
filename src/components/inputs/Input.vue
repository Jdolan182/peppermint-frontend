<template>
    <input
      v-model.trim="value"
      :disabled="props.disabled"
      class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      :class="
        [$attrs.error
          ? 'border-red-500 placeholder-red-500 '
          : 'border-gray-300  placeholder-gray-500 ',
        props.disabled
          ? 'text-gray-500'
          : 'text-gray-900']
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
    //Vue Components
    import InputErrorMessage from "@/components/inputs/InputErrorMessage.vue";
    // eslint-disable-next-line no-undef
    const props = defineProps({
      defaultValue: {
        type: [String, Number],
        default: () => "",
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    });
    // eslint-disable-next-line no-undef
    const emits = defineEmits(["inputValue", "clearInput"]);
    const value = ref(props.defaultValue ?? "");
    const defaultValue = computed(() => props.defaultValue);
    const inputValue = () => {
        emits("inputValue", value.value);
    };
    watch(defaultValue, () => {
      value.value = defaultValue.value;
    });
</script>
<style scoped>

</style>