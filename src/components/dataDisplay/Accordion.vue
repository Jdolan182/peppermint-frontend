<template>
    <Disclosure  v-slot="{ open }">
        <DisclosureButton  class="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-grey-900 hover:bg-grey-200 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
        <span class="font-semibold"> {{ props.title }} </span>
        <ChevronUpIcon
            :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-grey-500"
        />
        </DisclosureButton>
        <DisclosurePanel>
        <slot></slot>
        </DisclosurePanel>
    </Disclosure>
</template>
<script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel, } from '@headlessui/vue'
  import { ChevronUpIcon } from '@heroicons/vue/20/solid'

  const props = defineProps({
        title: {
            type: [String, Number],
            default: () => "",
        },
    });
</script>