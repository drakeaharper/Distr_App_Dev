<template>
  <div class="custom-home">
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  beforeCreate: function () {
    fetch(this.$store.state.apiUrl + '/api/user', {
      method: 'GET'
    })
    // .then(res => res.json())
    .then(res => console.log(res))
  }
}
</script>
