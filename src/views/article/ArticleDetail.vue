<template>
  <section class="module-layout">
    文章详情
  </section>
</template>

<script>
  export default {
    name: 'ArticleDetail',
    created () {
      console.log(this.$route.params)
    }
  }
</script>

<style scoped>

</style>
