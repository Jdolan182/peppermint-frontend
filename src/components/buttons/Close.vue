<template>
    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto" ref="cancelButtonRef"
        :class="[$theme.mainButtonColour, $theme.textBgHoverColour]"
    >
       {{ props.label }}
    </button>
</template>

<script setup>

    const props = defineProps({
        label: {
            type: [String, Number],
            default: () => "Close",
        },
    });

</script>