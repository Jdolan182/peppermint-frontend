<template>
    <button type="button" class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-xs hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
       {{ props.label }}
    </button>
</template>

<script setup>

    const props = defineProps({
        label: {
            type: [String, Number],
            default: () => "",
        },
    });

</script>