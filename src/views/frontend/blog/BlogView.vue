
<template>
  <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
    
    <Blog
      :title="data.title"
      :subtitle="data.subtitle"
      :content="data.content"
      :publishDate="data.live_date ? data.live_date : data.created_at"
      :frontend="true"
    />

  </div>
</template>

<script setup>
  import { useAxios } from "@/composables/request.js";
  import { ref, onMounted } from 'vue'
  import Blog from '@/components/dataDisplay/Blog.vue'
  import { useRouter } from "vue-router";

  const router = useRouter();
  const data = ref({});
  
  onMounted(async () => {
    getData()
  })
 
  const getData = async () => {
    try {

      const res = await useAxios.get(`/api/blog/show/${router.currentRoute.value.params.slug}`)

      if(res.status == 200){
        data.value = res.data.data
      }

    } catch (e) {
    }
  }
</script>