<template>
  <div id="app">
    <Header></Header>
    <router-view id="window"/>
    <UserSignIn></UserSignIn>
  </div>
</template>
<script>
  import Header from '@/components/Header'
  import UserSignIn from '@/components/UserSignIn'

  export default {
    components: { Header, UserSignIn }
  }
</script>
<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #window {
    padding-top: 50px;
  }
</style>
