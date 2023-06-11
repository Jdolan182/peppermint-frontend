
<template>
  <div class="about">
    <h1>Api data is: </h1>
    <p id="api-data">   {{ apiData }}</p>
  </div>
</template>

<script>
    import { useAxios } from "@/composables/request.js";

 export default {
  
  data() {
    return {
      apiData: []
    }
  },
  mounted() {
    useAxios.post('/test')
      .then((response) => {
        this.apiData = response.data
      })
  }
}


</script>