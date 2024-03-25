<template>
    <div :class="[frontend ? 'py-32' : 'py-6 ', 'bg-white px-6 lg:px-8']">
        <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <p class="text-base font-semibold leading-7 text-indigo-600 text-xs	">{{ formatDate(publishDate, 'MMM Do, YYYY') }}</p>
            <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ props.title}}</h1>
            <p class="mt-2 text-xl leading-8"> {{ props.subtitle }}</p>
            <div class="mt-10 max-w-2xl" v-html="props.content">
            </div>
        </div>
    </div>
</template>

<script setup>    

    import { formatDate } from "@/composables/date";

    const props = defineProps({
        title: {
            type: [String, Number],
            default: '',
        },
        subtitle: {
            type: [String, Number],
            required: false
        },
        content: {
            type: [String, Number],
            default: '',
        },
        publishDate: {
            type: String,
            default: null
        },
        frontend: {
            type: Boolean,
            default: false
        }
    });

</script>