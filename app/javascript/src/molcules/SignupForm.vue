<template>
  <form class="signup-input-container">
    <div class="signup-field">
      <div class="input-field-double field-left">
        <input-form
         :status="last_name"
         @inputFormValue="last_name.value = $event"
        ></input-form>
      </div>
      <div class="input-field-double field-right">
        <input-form
          :status="first_name"
          @inputFormValue="first_name.value = $event"
        ></input-form>
      </div>
      <div class="clear-left"></div>
    </div>

    <div class="signup-field">
      <input-form
        :status="email"
        @inputFormValue="email.value = $event"
      ></input-form>
    </div>

    <div class="signup-field">
      <div class="input-field-double field-left">
        <input-form
          :status="password"
          @inputFormValue="password.value = $event"
        ></input-form>
      </div>
      <div class="input-field-double field-right">
        <input-form
          :status="password_confirmation"
          @inputFormValue="password_confirmation.value = $event"
        ></input-form>
      </div>
      <div class="clear-left"></div>
    </div>

    <div class="signup-field">
      <create-btn
        @createBtnClick="signupClick"
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
        last_name: { id: 'input-last-name', kinds: 'text', place: '田中', label: '', value: ''},
        first_name: { id: 'input-first-name', kinds: 'text', place: '太朗', label: '', value: ''},
        email: { id: 'input-email', kinds: 'email', place: 'メールアドレス', label: '', value: ''},
        password: { id: 'input-password', kinds: 'password', place: 'パスワード', label: '', value: ''},
        password_confirmation: { id: 'input-password-confirmation', kinds: 'password', place: 'パスワード再確認', label: '', value: ''},
      }
    },
    methods: {
      signupClick() {
        this.axios.post('/api/v1/signup', { last_name: this.last_name.value, first_name: this.first_name.value, email: this.email.value, password: this.password.value, password_confirmation: this.password_confirmation.value})
        .then(response => {
          this.dataClear();
          this.$store.dispatch('fetchCreateUsers', response.data.user);
          this.$store.dispatch('fetchLoggedInUser', response.data.user);
          this.$router.push({ name: 'Home', params: { loggedIn: true, flash: { message: `${response.data.user.first_name} さんが登録されました。`, status: response.status }}});
        })
        .catch(error => {
          const error_format = { message: '', status: ''}
          error_format.message = !!error.response && !!error.response.data && !!error.response.data.error ? error.response.data.error : '失敗しました'
          error_format.status = !!error.response && !!error.response.status ? error.response.status : 422
          this.dataClear();
          this.$emit('signupErrorStatus', error_format)
        })
      },
      dataClear() {
        this.last_name = { id: 'input-last-name', kinds: 'text', place: '田中', label: '', value: ''},
        this.first_name = { id: 'input-first-name', kinds: 'text', place: '太朗', label: '', value: ''},
        this.email = { id: 'input-email', kinds: 'email', place: 'メールアドレス', label: '', value: ''},
        this.password = { id: 'input-password', kinds: 'password', place: 'パスワード', label: '', value: ''},
        this.password_confirmation = { id: 'input-password-confirmation', kinds: 'password', place: 'パスワード再確認', label: '', value: ''}
      }
    }
  }
</script>

<style scoped>
  .signup-input-container {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .signup-field {
    width: 100%;
    padding: 0;
    margin: 10px 0;
    height: 40px;
  }
  .input-field-double {
    float: left;
    width: 46%;
    height: 100%;
  }
  .field-left {
    margin: 0 4% 0 0;
  }
  .field-right {
    margin: 0 0 0 4%;
  }
  .clear-left {
    clear: left;
  }
</style>
