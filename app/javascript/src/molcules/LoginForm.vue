<template>
  <div>
    <div v-if="flash">
      {{ flash }}
    </div>
    <form>
      <div>{{ email.value }}</div>
      <div class="input-container">
        <div class="input-field">
          <input-form
            :status="email"
            @inputFormValue="email.value = $event"
          ></input-form>
        </div>
      </div>
      <div> {{ password.value }}</div>
      <div class="input-container">
        <div class="input-field">
          <input-form
            :status="password"
            @inputFormValue="password.value = $event"
          ></input-form>
        </div>
      </div>
      <div> {{ login_state.value}}</div>

      <div class="input-container">
        <div class="input-field">
          <input-form
            :status="login_state"
            @inputFormValue="login_state.value = $event"
          ></input-form>
        </div>
      </div>

      <div class="input-container">
        <div class="input-field">
          <create-btn
            @createBtnClick="loginClick"
          ></create-btn>
        </div>
      </div>
    </form>
  </div>
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
        login_state: { id: 'input-check-box', kinds: 'checkbox', label: 'ログイン状態を保持', true_box: '1', false_box: '0', value: '0', checkbox_be: true },
        flash: ''
      }
    },
    methods: {
      loginClick() {
        this.axios.post('/api/v1/login', { email: this.email.value, password: this.password.value, remember_me: this.login_state.value })
        .then(response => {
          this.dataClear();
          this.$store.dispatch('fetchLoggedInUser', response.data.user);
          this.$router.push({ name: 'Home', params: { flash: { message: `${response.data.user.first_name} さんがログインしました。`, status: response.status }}});
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
  form {
    width: 90%;
    margin: 0 auto;
  }
  .input-container {
    width: 100%;
    margin-top: 10px;
  }
  .input-field {
    width: 96%;
    height: 40px;
    margin: 0 auto;
  }
</style>
