<template>
    <label class="block text-sm font-medium text-gray-700">{{ props.label }}</label>
</template>

<script setup>

    const props = defineProps({
        label: {
        type: [String, Number],
        default: () => "",
    },
    });

</script>