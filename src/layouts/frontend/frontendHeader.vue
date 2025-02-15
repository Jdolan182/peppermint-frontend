<template>

    <Disclosure as="nav" :class="[$theme.bgColour]" v-slot="{ open }">
      <div class="mx-auto max-w-(--breakpoint-2xl) px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <!-- TODO logo -->
            <div class="shrink-0">
              <!-- <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" /> -->
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link v-for="item in navigation" :key="item.name"  :to="item.href" :class="[item.current ? [$theme.secondBgColour, $theme.textColour] : [$theme.thirdTextColour, $theme.secondBgHoverColour, $theme.textHoverColour], 'rounded-md px-3 py-2 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
              </div>
            </div>
          </div>
          <div v-if="login == 'true'" class="hidden md:block">
            <div v-if="loggedIn">
              <div class="ml-4 flex items-center md:ml-6">
                <button type="button" class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span class="sr-only">View notifications</span>
                  <!-- <BellIcon class="h-6 w-6" aria-hidden="true" /> -->
                </button>

                <!-- Profile dropdown -->
                  <DropdownMenu 
                  :arrow=false
                  :options=menuOptions
                  :title=userName
                  class="relative ml-3"
              >
                  <MenuItem>
                      <a href="#" @click="logoutConsumer(router)" class="block px-3 py-1 text-sm leading-6 text-gray-900">Sign Out</a>
                  </MenuItem>
              </DropdownMenu>      
              </div>
            </div>
            <div v-else>
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link to="login" :class="[title == 'register' || title == 'login' ? [$theme.secondBgColour, $theme.textColour] : [$theme.thirdTextColour, $theme.secondBgHoverColour, $theme.textHoverColour], 'rounded-md px-3 py-2 text-sm font-medium']">Login/Register</router-link>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
        </div>
        <div v-if="login == 'true'" class="border-t border-gray-700 pb-3 pt-4">
          <div v-if="loggedIn">
            <div class="flex items-center px-5">
              <div class="shrink-0">
                <!-- <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" /> -->
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">{{ userName }}</div>
              </div>
              <button type="button" class="ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="sr-only">View notifications</span>
                <!-- <BellIcon class="h-6 w-6" aria-hidden="true" /> -->
              </button>
            </div>
            <div class="mt-3 space-y-1 px-2">
              <div class="mt-3 space-y-1 px-2">
                <DisclosureButton v-for="item in menuOptions" :key="item.name" as="a" :href="item.href" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">{{ item.name }}</DisclosureButton>
                <a href="#" @click="logoutConsumer(router)" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign Out</a>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="ml-3 flex items-baseline space-x-4">
                <router-link to="login" :class="[title == 'register' || title == 'login' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']">Login/Register</router-link>
              </div>
          </div>          
        </div>
      </DisclosurePanel>
    </Disclosure>
</template>
      
<script setup>
  import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { computed, ref } from 'vue';

  import  DropdownMenu  from '@/components/menus/DropdownMenu.vue'
  import { useRouter } from 'vue-router'
  import { logoutConsumer } from "@/composables/logout";
  import { useNavigationStore } from '@/store/navigation';
  import { useConsumerStore } from '@/store/frontend/consumer';
  import { useConsumerAuthStore } from '@/store/frontend/consumerAuth';


  const router = useRouter();

  const title = computed(() => router.currentRoute.value.name)

  const login = import.meta.env.VITE_MODULE_CONSUMER_LOGIN

  const consumerStore = useConsumerStore()
  const userName = computed(() => consumerStore.getName)
  const userId = computed(() => consumerStore.getId)

  const consumerAuthStore = useConsumerAuthStore();
  const loggedIn =  computed(() => consumerAuthStore.getIsConsumerLoggedIn)
  
  const navigationStore = useNavigationStore();
  const navigation = computed(() => navigationStore.getNavigation)

  const menuOptions = [
    { name: 'Your profile', route: 'Profile', params: { id: userId.value }},
  ]

</script>