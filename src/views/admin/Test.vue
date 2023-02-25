<template>
  <div class="about">
    <h1>Api data is: </h1>
    <p id="api-data">   {{ apiData }}</p>
  </div>
</template>

<script>
    new Vue({
    el: '#api-data',
    data () {
        return {
        info: null
        }
    },
    mounted () {
        axios
        .get('https://http://localhost/api/test')
        .then(response => (this.info = response))
    }
    })
</script>