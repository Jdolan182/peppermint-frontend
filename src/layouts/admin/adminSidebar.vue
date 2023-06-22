<template>
  <!-- Static sidebar for desktop -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-12">
      <div class="flex h-16 shrink-0 items-center">
        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <router-link :to="item.href" :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                  <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </li>
          <li class="mx-2 mt-auto mb-10">
            <a href="#" class="group -mx-4 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:text-white hover:bg-gray-800">
              <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
  import { useNavigationStore } from "@/store/navigation";
  import { computed } from 'vue';
  import { Cog6ToothIcon } from '@heroicons/vue/24/outline'

  const navigationStore = useNavigationStore();
  const navigation = computed(() => navigationStore.getNavigation);

</script>