<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  onIdle () {
    if (this.$store.getters.loggedIn) {
      console.log('yes is login try to refresh token')
      this.$store.dispatch('refreshToken')
      .then(() => {
        console.log('auto run')
      })
    }
    
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    background-color:#f8f8f8!important;
  }
</style>
