<template>
  <form class="input-container">
    <div class="input-field">
      <input-form
        :status="email"
        @inputFormValue="email.value = $event"
      ></input-form>
    </div>
    <div class="input-field">
      <input-form
        :status="password"
        @inputFormValue="password.value = $event"
      ></input-form>
    </div>
    <div class="input-field">
      <input-form
        :status="login_state"
        @inputFormValue="login_state.value = $event"
      ></input-form>
    </div>
    <div class="input-field">
      <create-btn
        @createBtnClick="loginClick"
      ></create-btn>
    </div>
  </form>
</template>

<script>
  import InputForm from '../atoms/InputForm.vue'
  import CreateBtn from '../atoms/CreateBtn.vue'
  export default {
    components: {
      InputForm,
      CreateBtn
    },
    data() {
      return {
        email: { id: 'input-email', kinds: 'email', place: 'メールアドレス', label: '', value: ''},
        password: { id: 'input-password', kinds: 'password', place: 'パスワード', label: '', value: ''},
        login_state: { id: 'input-check-box', kinds: 'checkbox', label: 'ログイン状態を保持', true_box: '1', false_box: '0', value: '0', checkbox_be: true }
      }
    },
    methods: {
      loginClick() {
        this.axios.post('/api/v1/login', { email: this.email.value, password: this.password.value, remember_me: this.login_state.value })
        .then(response => {
          this.dataClear();
          this.$store.dispatch('fetchLoggedInUser', response.data.user);
          this.$router.push({ name: 'Home', params: { loggedIn: true, flash: { message: `${response.data.user.first_name} さんがログインしました。`, status: response.status }}});
        })
        .catch(error => {
          const error_format = { message: '', status: ''}
          error_format.message = !!error.response && !!error.response.data && !!error.response.data.error ? error.response.data.error : '失敗しました'
          error_format.status = !!error.response && !!error.response.status ? error.response.status : 422
          this.dataClear();
          this.$emit('loginErrorStatus', error_format);
        })
      },
      dataClear() {
        this.email = { id: 'input-email', kinds: 'email', place: 'メールアドレス', label: '', value: ''}
        this.password = { id: 'input-password', kinds: 'password', place: 'パスワード', label: '', value: ''}
        this.login_state = { id: 'input-check-box', kinds: 'checkbox', label: 'ログイン状態を保持', true_box: '1', false_box: '0', value: '0', checkbox_be: true }
      }
    }
  }
</script>

<style scoped>
  .input-container {
    width: 100%;
  }
  .input-field {
    width: 100%;
    height: 40px;
    margin: 10px 0;
    padding: 0;
  }
</style>
