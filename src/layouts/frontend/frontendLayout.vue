<template>

    <div class="min-h-full">
    
        <frontendHeader />

        <main>
            
                <RouterView  />

        </main>
            
    </div>
</template>
  
<script setup>
  import frontendHeader from './frontendHeader.vue'
  import { RouterView } from 'vue-router'

</script>