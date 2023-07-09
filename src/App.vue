<script setup>
import { RouterView, useRoute } from 'vue-router'

import adminLayout from './layouts/admin/adminLayout.vue'
import frontendLayout from './layouts/frontend/frontendLayout.vue'

const route = useRoute()
</script>

<template>
  <!-- Admin layout -->
  <adminLayout v-if="route.meta.adminLayout" class="w-full bg-gray-100">
  </adminLayout>
    <!-- Frontend layout -->
  <frontendLayout v-else-if="route.meta.frontendLayout" class="w-full bg-gray-100">
  </frontendLayout>
  <!-- No layouts -->
  <RouterView  v-else class="w-full bg-gray-100"/>
</template>
