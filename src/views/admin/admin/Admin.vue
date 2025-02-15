
<template>
  <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
    <Tabs 
      :tabs="tabs"
    />
    <router-view></router-view>
  </div>
</template>

<script setup>
  import Tabs from "@/components/tabs/Tabs.vue"
  import { ref } from 'vue'

  const tabs = ref([
    { name: 'Settings', route: 'Admin Settings' },
    { name: 'Users', route: 'Admin Users' },
    { name: 'Theme', route: 'Admin Theme' },
  ])
</script>