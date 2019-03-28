<template>
  <section class="module-layout">
    用户详情
  </section>
</template>

<script>
  export default {
    name: 'UserDetail',
    created () {
      console.log(this.$route.params)
    }
  }
</script>

<style scoped>

</style>
