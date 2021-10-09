<template>
  <div>
    <router-link :to="{ name: 'Home' }">home</router-link>
    <h1>ユーザー登録</h1>
    <signup-form></signup-form>
  </div>
</template>

<script>
  import SignupForm from '../molcules/SignupForm.vue'
  export default {
    components: {
      SignupForm
    }
  }
</script>

<style scoped>
  h1 {
    text-align: center;
  }
</style>
