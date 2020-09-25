<template>
  <div class="log">
  </div>
</template>

<script>
  export default {
    created () {
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push({ name: 'login' })
          this.$message({
            message: 'تم تسجيل الخروج بنجاح',
            type: 'warning'
            });
        })
    }
  }
</script>

<style>
</style>