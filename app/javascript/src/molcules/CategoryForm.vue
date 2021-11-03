<template>
  <div>
    <form class="category-form-container">
      <div class="input-category-container">
        <div class="input-category-field">
          <input-form
            :status="category_name"
            @inputFormValue="category_name.value = $event"
          ></input-form>
        </div>
      </div>
      <div class="input-category-container">
        <div class="input-category-field">
          <create-btn
            @createBtnClick="createCategoryClick"
          >カテゴリ登録</create-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import InputForm from '../atoms/InputForm.vue'
import CreateBtn from '../atoms/CreateBtn.vue'
  export default {
    props: {
      userLoggedIn: {
        type: Object
      }
    },
    components: {
      InputForm,
      CreateBtn
    },
    data() {
      return {
        category_name: { id: 'category-name', kinds: 'text', place: 'ご飯', label: '', value: ''},
      }
    },
    methods: {
      createCategoryClick() {
        this.axios.post('/api/v1/category', { category_name: this.category_name.value, user_id: this.userLoggedIn.user.id })
        .then(response => {
          this.dataClear();
          this.$store.dispatch('fetchCreateCategory', response.data.category)
          const success_format = { message: '', status: '' }
          success_format.message = `${response.data.category.category_name} を作成しました。`
          success_format.status = response.status
          this.$emit('categoryStatus', success_format)
        })
        .catch(error => {
          this.dataClear();
          const error_format = { message: '', status: ''}
          error_format.message = !!error.response && !!error.response.data && !!error.response.data.message ? error.response.data.message : '失敗しました'
          error_format.status = !!error.response && !!error.response.status ? error.response.status : 400
          this.$emit('categoryStatus', error_format)
        })
      },
      dataClear() {
        this.category_name = { id: 'category-name', kinds: 'text', place: 'ご飯', label: '', value: ''}
      }
    }
  }
</script>

<style scoped>
  .category-form-container {
    width: 90%;
    margin: 30px auto 0 auto;
  }
  .input-category-container {
    width: 100%;
    margin: 10px 0;
  }
  .input-category-field {
    width: 96%;
    height: 40px;
  }
</style>
