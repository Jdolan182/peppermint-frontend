<template>
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">{{ props.header }}</h2>
</template>

<script setup>

    const props = defineProps({
        header: {
            type: [String, Number],
            default: () => "",
        },
    });

</script>