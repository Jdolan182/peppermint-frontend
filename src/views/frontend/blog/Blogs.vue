
<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="">
      <ContentList
        :blogs="blogs"
        :data="paginationData"
      />
    </div>
  </div>
</template>

<script setup>
  import { useAxios } from "@/composables/request.js";
  import ContentList from '@/components/dataDisplay/ContentList.vue'
  import { ref, onMounted, reactive } from 'vue'

  const blogs = ref({});
  const paginationData = ref({});
  const pageLimit = 30

  
  onMounted(async () => {
    getData(1)
  })
 
  const getData = async (page, keyword = '', limit = pageLimit) => {
    try {
      let res = [];

      if(keyword && keyword.value != null && keyword.value != ''){
        res = await useAxios.get(`/api/blogs?page=${page}&keyword=${keyword.value}`, { params: { "limit": limit } })
      }
      else{
        res = await useAxios.get(`/api/blogs?page=${page}`, { params: { "limit": limit } })
      }

      if(res.status == 200){
        blogs.value = res.data.data
        paginationData.value = res.data
      }

    } catch (e) {
    }
  }

</script>