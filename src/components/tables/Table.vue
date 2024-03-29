<template>

    <div class="mt-3 flow-root w-full">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div v-if="props.limit && dataCount > 0" class="mb-6 inline-flex">
              <TableSelect 
                :options="options"
                :selected="1"
                @updatePageLength="updatePageLength"
                width="w-20"
              />            
          </div>
          <div v-if="props.search" class="mb-6 float-right inline-flex">
              <div class="pointer-events-none absolute inset-y-0 z-10 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <Input 
                name="search"
                placeholder="Search"
                :icon="true"
                @keyup="search(keyword)"
                @input-value="(value) => (keyword.value = value)"
              />            
          </div>
          <div v-if="dataCount > 0" class="w-full overflow-hidden shadow ring-1 ring-black ring-opacity-5  sm:rounded-lg">
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
              @getData="getData"
            />             
          </div>
          <div v-else class="w-full p-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              No data to show
          </div>
        </div>
      </div>
    </div>
  
</template>
  
<script setup>
import Pagination from "@/components/navigation/Pagination.vue";
import Input from "@/components/inputs/Input.vue";
import TableSelect from "@/components/inputs/TableSelect.vue";
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { ref } from "@vue/reactivity";
import { debounce } from "@/composables/debounce"

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
    search: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      required: false,
    },
    pageLimit: {
      type: Number,
      default: 30
    }
  });

  const options = [
    { id: 1, value: 10, text: '10' },
    { id: 2, value: 30, text: '30' },
    { id: 3, value: 50, text: '50' },
    { id: 4, value: 100, text: '100' }
  ]

  const keyword = ref({})
  const limit = ref({})
  limit.value = props.pageLimit

  const emit = defineEmits(['getData', 'search', 'updatePageLength'])

  const getData = (page) => {
    emit('getData', page, keyword.value, limit.value);
  }

  const updatePageLength = (value) => {
    limit.value = value
    emit('getData', 1, keyword.value, value);
  }

  const search =  debounce((keyword) => {
    emit('getData', 1, keyword, limit.value);
  }, 500);

</script>