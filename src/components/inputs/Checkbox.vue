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
          class="h-4 w-4 rounded-sm text-[#79A2D6] first-line:appearance-none focus:ring-[#79A2D6] focus:border-[#79A2D6] block px-1 py-1 border-1 shadow-sm sm:text-sm border-[#79A2D6]"
          @change="inputValue"
        />
      </div>
    </div>
</template>
  
<script>
    import { ref } from "vue";
    export default {
        name: "Checkbox",
        props: {
            checked: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        emits: ["inputValue"],
            setup(props, ctx) {
            const isChecked = ref(props.checked);
            const updateCheckAll = (value) => {
                isChecked.value = value;
            };
            const inputValue = () => {
                ctx.emit("inputValue", props.name, isChecked.value);
            };
            return {
                props,
                isChecked,
                inputValue,
                updateCheckAll,
            };
        },
    };
</script>