<template>
  <div>
    <slot />
  </div>
</template>

<script setup>

  const props = defineProps({
    title: {
      type: String,
    },
  });

</script>