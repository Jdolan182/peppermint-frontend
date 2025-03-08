<template>

<header :class="[title == 'Home' ? 'absolute inset-x-0 top-0 z-50' : $theme.bgColour]">
      <nav class="z-50 flex items-center justify-between p-6 lg:px-8 w-full" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Peppermint</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm/6 font-semibold text-white">{{ item.name }}</a>
        </div>
        <div v-if="login == 'true'" class="hidden lg:flex lg:flex-1 lg:justify-end">
          <div v-if="loggedIn">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- <button type="button" class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="sr-only">View notifications</span>
                 <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button> -->

              <!-- Profile dropdown -->
                <DropdownMenu 
                :arrow=false
                :options=menuOptions
                :title=userName
                class="relative ml-3"
            >
                <MenuItem>
                    <a href="#" @click="logoutConsumer(router)" :class="[$theme.textThirdColour, $theme.textBgHoverColour, 'block px-3 py-1 text-sm leading-6']">Sign Out</a>
                </MenuItem>
            </DropdownMenu>      
            </div>
          </div>
          <div v-else>
            <router-link to="login" class="text-sm/6 font-semibold text-white">Login</router-link>
          </div>
        </div>
        <div v-else class="hidden lg:flex lg:flex-1 lg:justify-end"></div>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50 " />
        <DialogPanel :class="[$theme.bgColour]" class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Peppermint</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="" />
            </a>
            <button type="button" :class="[$theme.thirdTextColour]" class="-m-2.5 rounded-md p-2.5" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/25">
              <div class="space-y-2 py-6">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[$theme.secondBgHoverColour, $theme.textColour]" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold">{{ item.name }}</a>
              </div>
              <div v-if="login == 'true'" >
                <div v-if="loggedIn">
                  <div class="pace-y-2 py-6">
                    <div class="">
                      <div class="text-base font-medium leading-none text-gray-400">{{ userName }}</div>
                    </div>
                    <!-- <button type="button" class="ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span class="sr-only">View notifications</span>
                      <BellIcon class="h-6 w-6" aria-hidden="true" /> 
                    </button> -->
                  
                    <a v-for="item in menuOptions" :key="item.name" :href="item.route" :class="[$theme.secondBgHoverColour, $theme.textColour]" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold">{{ item.name }}</a>
                    <a href="#" @click="mobileMenuOpen = false, logoutConsumer(router)" :class="[$theme.secondBgHoverColour, $theme.textColour]" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold">Sign Out</a>
                  </div>
                </div>
                <div v-else class="py-6">
                  <router-link @click="mobileMenuOpen = false" to="login" :class="[$theme.secondBgHoverColour, $theme.textColour]" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold">Login</router-link>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
</template>
      
<script setup>
  import { Dialog, DialogPanel, MenuItem } from '@headlessui/vue'
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { computed, ref } from 'vue';

  import  DropdownMenu  from '@/components/menus/DropdownMenu.vue'
  import { useRouter } from 'vue-router'
  import { logoutConsumer } from "@/composables/logout";
  import { useNavigationStore } from '@/store/navigation';
  import { useConsumerStore } from '@/store/frontend/consumer';
  import { useConsumerAuthStore } from '@/store/frontend/consumerAuth';

  const mobileMenuOpen = ref(false)

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