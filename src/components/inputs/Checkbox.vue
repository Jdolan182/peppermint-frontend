<template>
    <div>
      <label
        v-if="$attrs['label']"
        :for="$attrs['name']"
        class="block text-sm text-gray-700 text-left capitalize"
      >
        {{ $attrs["label"] }}
      </label>
      <div :class="$attrs['label'] ? 'mt-1' : ''">
        <input
          v-bind="$attrs"
          v-model="isChecked"
          type="checkbox"
          :required="false"
          class="h-4 w-4 rounded-xs text-[#79A2D6] first-line:appearance-none focus:ring-[#79A2D6] focus:border-[#79A2D6] block px-1 py-1 border-1 shadow-xs sm:text-sm border-[#79A2D6]"
          @change="inputValue"
        />
      </div>
    </div>
</template>
  
<script setup>
    import { ref, watch, computed } from "vue";
    //Vue Components
    import InputErrorMessage from "@/components/inputs/InputErrorMessage.vue";
    // eslint-disable-next-line no-undef
    const props = defineProps({
      name: "Checkbox",
      props: {
          checked: {
              type: Boolean,
              required: false,
              default: false,
          },
      },
    })
    // eslint-disable-next-line no-undef

    const emits = defineEmits(["inputValue", "updateCheckAll"]);
    const isChecked = ref(props.checked ?? 0);
    const defaultValue = computed(() => isChecked.value);
    const inputValue = () => {
        emits("inputValue", isChecked.value);
    };
    const updateCheckAll = (value) => {
        isChecked.value = value;
    };
    watch(defaultValue, () => {
      isChecked.value = defaultValue.value;
    });
       
</script>