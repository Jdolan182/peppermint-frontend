<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
      <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{ props.data.meta.from }}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium">{{ props.data.meta.to }}</span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{ props.data.meta.total }}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
          <TailwindPagination
            :data="props.data"
            :limit="1"
            :keepLength="true"
            :item-classes="['cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-gray-900  ring-inset ring-gray-300 hover:bg-gray-50']"
            :active-classes="['cursor-pointer bg-indigo-600 border-indigo-600 text-white focus-visible:outline-indigo-600']"
            @pagination-change-page="getData"
          >
          </TailwindPagination>
        </nav>
      
      </div>
    </div>
  </div>
</template>

<script setup>
import { TailwindPagination } from 'laravel-vue-pagination';

  const props = defineProps({
    data: {
      type: Object,
      required: false,
    }
  });


  const emit = defineEmits(['getData'])

  const getData = (page) => {
    if(page == props.data.meta.current_page)
    {
      return
    }
    emit('getData', page);
  }
</script>