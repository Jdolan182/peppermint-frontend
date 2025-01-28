<template>
    <router-link :to="{ name: props.route }" class="text-sm font-medium text-gray-400 hover:text-gray-200">
        <p class="mb-5 flex text-gray-900"> <ChevronLeftIcon class="-ml-1 h-5 w-5 shrink-0 " /> {{ props.label }}</p>
    </router-link>
</template>

<script setup>
    import { ChevronLeftIcon } from '@heroicons/vue/20/solid'

    const props = defineProps({
        label: {
            type: [String, Number],
            default: "Back",
        },
        route: {
            type: [String],
        },
    });

</script>