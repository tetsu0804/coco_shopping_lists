<template>
  <div>
    <form>
      <div class="input-container">
        <div class="input-field-double">
          <input-form
           :status="last_name"
           @inputFormValue="last_name.value = $event"
          ></input-form>
        </div>
        <div class="input-field-double">
          <input-form
            :status="first_name"
            @inputFormValue="first_name.value = $event"
          ></input-form>
        </div>
        <div class="clear-left"></div>
      </div>

      <div class="input-container">
        <div class="input-field">
          <input-form
            :status="email"
            @inputFormValue="email.value = $event"
          ></input-form>
        </div>
      </div>

      <div class="input-container">
        <div class="input-field-double">
          <input-form
            :status="password"
            @inputFormValue="password.value = $event"
          ></input-form>
        </div>
        <div class="input-field-double">
          <input-form
            :status="password_confirmation"
            @inputFormValue="password_confirmation.value = $event"
          ></input-form>
        </div>
        <div class="clear-left"></div>
      </div>

      <div class="input-container">
        <div class="input-field">
          <create-btn
            @createBtnClick="signupClick"
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
        last_name: { id: 'input-last-name', kinds: 'text', place: '田中', label: '', value: ''},
        first_name: { id: 'input-first-name', kinds: 'text', place: '太朗', label: '', value: ''},
        email: { id: 'input-email', kinds: 'email', place: 'メールアドレス', label: '', value: ''},
        password: { id: 'input-password', kinds: 'password', place: 'パスワード', label: '', value: ''},
        password_confirmation: { id: 'input-password-confirmation', kinds: 'password', place: 'パスワード再確認', label: '', value: ''}
      }
    },
    methods: {
      signupClick() {
        debugger
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
  .input-field-double {
    width: 46%;
    margin: 0 2%;
    height: 40px;
    float: left;
  }
  .clear-left {
    clear: left;
  }
  .input-field {
    width: 96%;
    height: 40px;
    margin: 0 auto;
  }
</style>
