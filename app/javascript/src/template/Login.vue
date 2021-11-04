<template>
  <div class="login-container">
    <div class="login-sub-container">
      <h1>ログイン</h1>
      <login-form></login-form>
      <router-link :to="{ name: 'Signup' }">ユーザー登録</router-link>
    </div>
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
  .login-container {
    width: 100%;
  }
  .login-container {
    width: 90%;
    margin: 0 auto;
    background-color: rgb(161, 81, 141);
  }
</style>
