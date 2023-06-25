<template>

    <div class="min-h-full">
    
        <frontendHeader />

        <main>
            <div class="mx-auto max-w-screen-2xl py-6 sm:px-6 lg:px-8">
                <RouterView  />

            </div>
        </main>
            
    </div>
</template>
  
<script setup>
  import frontendHeader from './frontendHeader.vue'
  import { RouterView } from 'vue-router'

</script>