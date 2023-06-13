<template>
    <div class="bg-gray-900 p-4 h-24">
        <div>
        <nav class="sm:hidden" aria-label="Back">
            <a href="#" class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200">
            <ChevronLeftIcon class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
            Back
            </a>
        </nav>
        <nav class="hidden sm:flex" aria-label="Breadcrumb">
            <ol role="list" class="flex items-center space-x-4">
            <li>
                <div class="flex">
                    <router-link :to="{ name: 'Dashboard' }" class="text-sm font-medium text-gray-400 hover:text-gray-200">Dashboard</router-link>
                </div>
            </li>
            <li v-for="crumb in breadcrumbs">
                <div class="flex items-center">
                    <ChevronRightIcon class="h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
                    <router-link v-if="!crumb.current" :to="{ name: crumb.title }" class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200">{{  crumb.title }}</router-link>
                    <span v-else class="ml-4 text-sm font-medium text-white">{{  crumb.title }}</span>
                </div>
            </li>
            </ol>
        </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
            <div class="min-w-0 flex-1">
                <h2 class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight"> {{ title }}  </h2>
            </div>
        </div>
    </div>
</template>
      
<script setup>
    import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
    import { computed } from 'vue';
    import { useRouter } from 'vue-router'
    import { useBreadcrumbStore } from "@/store/breadcrumbs";
    
    const router = useRouter();

    const title = computed(() => router.currentRoute.value.name)

    const breadcrumbStore = useBreadcrumbStore();
    const breadcrumbs = computed(() => breadcrumbStore.getBreadcrumbs);
</script>