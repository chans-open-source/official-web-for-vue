<template>
  <section class="module-layout">
    用户文章
  </section>
</template>

<script>
  export default {
    name: 'UserArticleList',
    created () {
      console.log(this.$route.params)
    }
  }
</script>

<style scoped>

</style>
