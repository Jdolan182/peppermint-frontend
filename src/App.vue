<script setup>
import { RouterView, useRoute } from 'vue-router'

import adminLayout from './layouts/admin/adminLayout.vue'

const route = useRoute()
</script>

<template>
  <!-- Admin layout -->
  <adminLayout v-if="route.meta.adminSidebar" class="w-full">
  </adminLayout>
  <!-- Frontend layout -->
  <!-- No layouts -->
  <RouterView  v-else/>
</template>
