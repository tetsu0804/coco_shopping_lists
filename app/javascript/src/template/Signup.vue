<template>
  <div>
    <router-link :to="{ name: 'Home' }">home</router-link>
    <router-link :to="{ name: 'Login' }">ログイン</router-link>
    <div>
      getters( 'userLoggedIn '): {{ userLoggedIn }}
    </div>
    <h1>ユーザー登録</h1>
    <signup-form></signup-form>
  </div>
</template>

<script>
  import SignupForm from '../molcules/SignupForm.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      SignupForm
    },
    computed: mapGetters(['userLoggedIn'])
  }
</script>

<style scoped>
  h1 {
    text-align: center;
  }
</style>
