<template>
    

      <div class="mt-3 flow-root w-full">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div v-if="dataCount > 0" class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table  class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th 
                      v-for="header in props.headers" 
                      :key="header.id" 
                      scope="col" 
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      {{ header.name }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <slot></slot>
                </tbody>
              </table>
              <Pagination 
                v-if="props.data.meta.total > 1"
                :data="props.data"
                @changePage="changePage"
              />             
            </div>
            <div v-else class="p-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                No data to show
            </div>
          </div>
        </div>
      </div>
    
  </template>
  
<script setup>
import Pagination from "@/components/navigation/Pagination.vue";

  const props = defineProps({
    dataCount: {
      type: Number,
      required: true,
      default: 0
    },
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      required: false,
    }
  });

  const emit = defineEmits(['changePage'])

  const changePage = (page) => {
    emit('changePage', page);
  }

</script>