<template>
    <button type="button" class="flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-xs focus:outline-hidden focus:ring-2 focus:ring-offset-2"
        :class="[$theme.secondColour, $theme.secondHoverColour, $theme.secondFocusColour]"
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