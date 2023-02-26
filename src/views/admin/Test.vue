
<template>
  <div class="about">
    <h1>Api data is: </h1>
    <p id="api-data">   {{ apiData }}</p>
  </div>
</template>

<script>

 export default {
  data() {
    return {
      apiData: []
    }
  },
  mounted() {
    this.axios
      .get('http://localhost/api/test')
      .then((response) => {
        this.apiData = response.data
      })
  }
}


</script>