<template>
    <Listbox 
        as="div" 
        v-model="selected"
        @update:modelValue="updatePageLength()"
        :class="props.width"
    >
      <ListboxLabel v-if="props.label" class="block text-sm font-medium leading-6 text-gray-900">{{ props.label }}</ListboxLabel>
      <div class="relative mt-2">
        <ListboxButton class="relative w-full  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 focus:outline-hidden focus:ring-2 sm:text-sm sm:leading-6"
          :class="[this.$secondFocusColour]"
        >
          <span class="block truncate">{{ selected.text }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>
  
        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions :class="props.width" class="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden sm:text-sm">
            <ListboxOption as="template" v-for="option in props.options" :key="option.id" :value="option" v-slot="{ active, selected }">
              <li :class="[active ? [this.$secondColour, 'text-white'] : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ option.text }}</span>
  
                <span v-if="props.icon && selected" :class="[active ? 'text-white' : [this.$secondBgTextColour], 'absolute inset-y-0 right-0 flex items-center pr-4']">
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
  import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
  
    const props = defineProps({
        options: {
            type: Array,
            required: true,
        },
        selected: {
            type: Number,
            default: 0
        },
        icon: {
            type: Boolean,
            default: false
        },
        title: { 
            type: String,
            required: false
        },
        width: {
            type: String,
            default: 'w-32'
        }
    })

    const emit = defineEmits(['updatePageLength'])

    const updatePageLength = () => {
        emit('updatePageLength', selected.value.value);
    }
    const selected = ref(props.options[props.selected])
</script>