
<template lang="html">
  <!-- eslint-disable -->
  <div class="">
    <h1>Oops!</h1>
    <h3>The Page Youre Looking For is Not Here</h3>
      <router-link :to="{ name: 'home' } ">
        Back To Home Page
      </router-link>
  </div>

</template>

<script>
export default {

  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
