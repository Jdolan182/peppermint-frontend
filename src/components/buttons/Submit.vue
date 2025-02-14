<template>
    <button type="submit" 
        class="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        :class="[this.$secondColour, this.$secondHoverColour, this.$secondFocusColour]"
        >
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