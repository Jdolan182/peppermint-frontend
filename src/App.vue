<script setup>
import { RouterView, useRoute } from 'vue-router'

import adminLayout from './layouts/admin/adminLayout.vue'
import frontendLayout from './layouts/frontend/frontendLayout.vue'

const route = useRoute()
</script>

<template>
  <!-- Admin layout -->
  <adminLayout v-if="route.meta.adminLayout" class="w-full">
  </adminLayout>
    <!-- Frontend layout -->
  <frontendLayout v-else-if="route.meta.frontendLayout" class="w-full">
  </frontendLayout>
  <!-- No layouts -->
  <RouterView  v-else/>
</template>
