<template>
    <h2 v-if="props.style == 1" :class="[props.bold ? 'font-bold ' : '', 'mt-6 text-center text-3xl font-bold tracking-tight text-gray-900']">{{ props.header }}</h2>
    <h2 v-else="props.style == 2" :class="[props.bold ? 'font-bold ' : '', 'text-2xl text-white sm:truncate sm:text-2xl sm:tracking-tight']">{{ props.header }}</h2>
    
</template>

<script setup>

    const props = defineProps({
        header: {
            type: [String, Number],
            default: () => "",
        },
        style : {
            type: Number,
            default: 1
        },
        bold : {
            type: Boolean,
            default: false
        }
    });

</script>