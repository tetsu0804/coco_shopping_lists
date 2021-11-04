<template>
  <div class="signup-container">
    <div class="signup-sub-container">
      <h1>ユーザー登録</h1>
        <div class="signup-base-container">
          <flash
            v-if="flash.status"
            :flash="flash"
            @closeFlash="flash = { message: '', status: ''}"
          ></flash>
          <signup-form
            @signupErrorStatus="flash = $event"
          ></signup-form>
          <router-link :to="{ name: 'Login' }" class="signup-link">ログイン</router-link>
        </div>
    </div>
  </div>
</template>

<script>
  import SignupForm from '../molcules/SignupForm.vue'
  import Flash from '../atoms/Flash.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      SignupForm,
      Flash
    },
    data() {
      return {
        flash: {message: '', status: ''}
      }
    }
  }
</script>

<style scoped>
  h1 {
    text-align: center;
  }
  .signup-container {
    width: 100%;
  }
  .signup-sub-container {
    width: 90%;
    margin: 0 auto;
  }
  .signup-base-container {
    width: 80%;
    margin: 0 auto;
    padding: 0;
  }
  .signup-link {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  .signup-link:hover {
    color: rgba(0, 0, 0, 0.5);
  }

  @media screen and (max-width: 480px) {
    .signup-base-container {
      width: 100%;
      margin: 0 auto;
      padding: 0;
    }
  }
</style>
