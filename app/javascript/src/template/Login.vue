<template>
  <div>
    <router-link :to="{ name: 'Home' }">home</router-link>
    <router-link :to="{ name: 'Signup' }">ユーザー登録</router-link>
    <div>
      getters( 'userLoggedIn '): {{ userLoggedIn }}
    </div>
    <h1>ログイン</h1>
    <login-form></login-form>
  </div>
</template>

<script>
  import LoginForm from '../molcules/LoginForm.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      LoginForm
    },
    computed: mapGetters(['userLoggedIn'])
  }
</script>

<style scoped>
  h1 {
    text-align: center;
  }
</style>
