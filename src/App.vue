<script setup>
import { RouterView, useRoute } from 'vue-router'

import adminSidebar from './layouts/adminSidebar.vue'

const route = useRoute()
</script>

<template>
  <adminSidebar v-if="route.meta.adminSidebar"/>
  <RouterView />
</template>
