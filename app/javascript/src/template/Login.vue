<template>
  <div class="login-container">
    <div class="login-sub-container">
      <h1>ログイン</h1>
      <div class="login-base-container" >
        <flash
          v-if="flash.status"
          :flash="flash"
          @closeFlash="flash = { message: '', status: ''}"
        >
        </flash>
      <login-form
        @loginErrorStatus="flash = $event"
      ></login-form>
        <router-link :to="{ name: 'Signup' }" class="login-link">ユーザー登録</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import LoginForm from '../molcules/LoginForm.vue'
  import Flash from '../atoms/Flash.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      LoginForm,
      Flash
    },
    data() {
      return {
        flash: { message: '', status: ''}
      }
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
  .login-sub-container {
    width: 90%;
    margin: 0 auto;
  }
  .login-base-container {
    width: 80%;
    margin: 0 auto;
    padding: 0;
  }
  .login-link {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  .login-link:hover {
    color: rgba(0, 0, 0, 0.5);
  }

  @media screen and (max-width: 480px) {
    .login-base-container {
      width: 100%;
      margin: 0 auto;
      padding: 0;
    }
  }
</style>
