<template>
  <div>
    <router-link :to="{ name: 'Home' }">home</router-link>
    <router-link :to="{ name: 'Login' }">ログイン</router-link>

    <h1>ユーザー登録</h1>
    <div class="signup-flash" v-if="flash.status">
      <div class="signup-sub-flash">
        <flash
          :flash="flash"
          @closeFlash="flash = { message: '', status: ''}"
        ></flash>
      </div>
    </div>
    <signup-form
      @signupErrorStatus="flash = $event"
    ></signup-form>
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
  .signup-flash {
    width: 90%;
    height: 40px;
    margin: 0 auto 10px auto;
    border: 0px none;
  }
  .signup-sub-flash {
    box-sizing: border-box;
    width: 96%;
    height: 100%;
    border: 0px none;
    margin: 0 auto;
  }
</style>
