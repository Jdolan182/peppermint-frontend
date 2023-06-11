<template>

    <div>
        
        <adminSidebar />

        <div class="lg:pl-72">
            <adminHeader />

            <main class="py-10">
            <div class="px-4 sm:px-6 lg:px-8">
                <router-view />
            </div>
            </main>
        </div>
    </div>
</template>
  
<script setup>
  import adminHeader from './frontendHeader.vue'
  import adminSidebar from './frontendSidebar.vue'
</script>