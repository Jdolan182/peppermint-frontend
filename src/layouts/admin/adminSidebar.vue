<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0" :class="[$theme.bgColour]" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2 ring-1 ring-white/10" :class="[$theme.bgColour]">
              <!-- TODO logo -->
             <div class="flex h-16 shrink-0 items-center">
                <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" /> -->
              </div> 
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li v-for="item in navigation" :key="item.name">
                        <router-link :to="item.href" :class="[item.current ? [$theme.secondBgColour, $theme.textColour] : [$theme.thirdTextColour, $theme.secondBgHoverColour, $theme.thirdTextHoverColour], 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                          <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                          {{ item.name }}
                        </router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <div class="flex grow flex-col gap-y-5 overflow-y-auto px-12" :class="[$theme.bgColour]">
      <!-- TODO logo -->
      <div class="flex h-16 shrink-0 items-center">
        <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> -->
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <router-link :to="item.href" :class="[item.current ? [$theme.secondBgColour, $theme.textColour] : [$theme.thirdTextColour, $theme.secondBgHoverColour, $theme.textHoverColour], 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                  <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </li>
          <!-- <li class="mx-2 mt-auto mb-10">
            <a href="#" class="group -mx-4 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:text-white hover:bg-gray-800">
              <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
              Settings
            </a>
          </li> -->
        </ul>
      </nav>
    </div>
  </div>

  <div class="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-xs sm:px-6 lg:hidden"  :class="[$theme.bgColour]">
    <button type="button" class="-m-2.5 p-2.5 text-white lg:hidden" @click="sidebarOpen = true">
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup>
  import { useNavigationStore } from "@/store/navigation";
  import { computed, ref } from 'vue';
  import { Cog6ToothIcon, XMarkIcon, Bars3Icon } from '@heroicons/vue/24/outline'
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

  const navigationStore = useNavigationStore();
  const navigation = computed(() => navigationStore.getNavigation);

  const sidebarOpen = ref(false)

</script>