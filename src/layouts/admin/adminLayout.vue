<template>

    <div class="w-full ">
        
        <adminSidebar />

        <div class="lg:pl-72 ">
            <adminHeader />

            <main class="py-10 bg-grey-100">
                <div class="px-4 sm:px-6 lg:px-8 bg-grey-100">
                    <RouterView class="bg-grey-100" />

                </div>
            </main>
        </div>
    </div>
</template>
  
<script setup>
    import { RouterView } from 'vue-router'
    import adminHeader from './adminHeader.vue'
    import adminSidebar from './adminSidebar.vue'
</script>