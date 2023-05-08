<template>
    <label v-if="props.error" class="ml-1 text-sm font-medium text-red-600">{{ props.label }}</label>
</template>

<script setup>

    const props = defineProps({
        label: {
            type: [String, Number],
            default: () => "",
        },
        error: {
            type: Boolean,
            required: false,
        },
    });

</script>