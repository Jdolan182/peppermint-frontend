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
                    <router-link v-if="title!='Dashboard'" :to="{ name: 'Dashboard' }" class="text-sm font-medium text-gray-400 hover:text-gray-200">Dashboard</router-link>
                    <span v-else class="text-sm font-medium text-white">Dashboard</span>
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

            <DropdownMenu 
                :title=userName
                :options=menuOptions
            >
                <MenuItem>
                    <a href="#" @click="logout(router)" class="block px-3 py-1 text-sm leading-6 text-gray-900">Sign Out</a>
                </MenuItem>
            </DropdownMenu>
            

           
        </div>
    </div>
</template>
      
<script setup>
    import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { useBreadcrumbStore } from '@/store/breadcrumbs';
    import { useUserStore } from '@/store/admin/user';
    import  DropdownMenu  from '@/components/menus/DropdownMenu.vue'
    import { logout } from "@/composables/logout";
    import { MenuItem } from '@headlessui/vue'


    const router = useRouter();

    const title = computed(() => router.currentRoute.value.name)

    const breadcrumbStore = useBreadcrumbStore();
    const breadcrumbs = computed(() => breadcrumbStore.getBreadcrumbs);

    const menuOptions = [
        { name: 'Your profile', href: '#' },
    ]

    //user
    const userStore = useUserStore();
    const userName =  ref(userStore.getName);
</script>