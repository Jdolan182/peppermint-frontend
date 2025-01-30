<template>
    <div class="bg-gray-900 p-4 h-24">
        <div>
        <nav class="sm:hidden" aria-label="Back">
            <a href="#" class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200">
            <ChevronLeftIcon class="-ml-1 mr-1 h-5 w-5 shrink-0 text-gray-500" aria-hidden="true" />
            Back
            </a>
        </nav>
        <nav class="hidden sm:flex" aria-label="Breadcrumb">
            <ol role="list" class="flex items-center space-x-4">
            <li v-for="crumb in breadcrumbs">
                <div class="flex items-center">
                    <router-link v-if="!crumb.current" :to="{ name: crumb.to.name }" class="mr-4 text-sm font-medium text-gray-400 hover:text-gray-200">{{  crumb.title }}</router-link>
                    <span v-else class="mr-4 text-sm font-medium text-white">{{  crumb.title }}</span>
                    <ChevronRightIcon v-if="!crumb.current" class="h-5 w-5  shrink-0 text-gray-500" aria-hidden="true" />

                </div>
            </li>
            </ol>
        </nav>
        </div>
        <div class="mt-2 md:flex md:items-center md:justify-between">
            <div class="min-w-0 flex-1">
                <HeaderTwo
                    :header="title"
                    :bold=true
                    :style=2
                />
            </div>
            <!-- TODO Profile image? -->
            <!-- <img class="h-8 w-8 rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> -->

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
    import HeaderTwo from '@/components/labels/HeaderTwo.vue'


    const router = useRouter();

    const title = computed(() => router.currentRoute.value.meta.headerTitle ? router.currentRoute.value.meta.headerTitle : router.currentRoute.value.name)

    const breadcrumbStore = useBreadcrumbStore();
    const breadcrumbs = computed(() => breadcrumbStore.getBreadcrumbs);

    //user
    const userStore = useUserStore();
    const userName =  ref(userStore.getName);
    const userId =  ref(userStore.getId);

    const menuOptions = [
        { name: 'Your profile', route: 'User Details', params: { id: userId.value }},
    ]

</script>