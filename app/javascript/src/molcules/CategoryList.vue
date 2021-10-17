<template>
  <div class="category-lists-container">
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>カテゴリ名</th>
          <th>編集</th>
          <th>削除</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(category, index) in allCategories">
          <tr  :key="category.id">
            <td>{{ index + 1 }}</td>
            <td>{{ category.category_name }}</td>
            <td><div class="clickIcon" v-if="userIdMatchedCategory(category.user_id)" @click="updateCategory(category.id)"></div></td>
            <td><div class="clickIcon" v-if="userIdMatchedCategory(category.user_id)" @click="deleteCategory(category)"></div></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      allCategories: {
        type: Array
      },
      userLoggedIn: {
        type: Object
      }
    },
    computed: {
      userIdMatchedCategory() {
        return (user_id) => {
          return user_id === this.userLoggedIn.user.id ? true : false
        }
      }
    },
    methods: {
      updateCategory(category_id) {
        this.$emit('categoryUpdate', category_id);
      },
      deleteCategory(category) {
        this.axios.delete(`/api/v1/category/${category.id}`)
        .then(response => {
          this.$store.dispatch('fetchDeleteCategory', category.id);
          const success_format = { message: '', status: '' }
          success_format.message = `${category.category_name} を削除しました。`
          success_format.status = response.status
          this.$emit('categoryStatus', success_format)
        })
        .catch(error => {
          const error_format = { message: '', status: ''}
          error_format.message = '削除失敗しました。'
          error_format.status = !!error.response && !!error.response.status ? error.response.status : 400
          this.$emit('categoryStatus', error_format)
        })
      }
    }
  }
</script>

<style scoped>
  .category-lists-container {
    width: 90%;
    margin: 40px auto;
  }
  .category-lists-container table {
    width: 96%;
    border-collapse: collapse ;
  }
  .category-lists-container table thead tr th {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    height: 30px;
  }
  .category-lists-container table tbody tr td {
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    height: 30px;
  }
  .category-modal {
    position: absolute;
    top: 25%;
  }
  .clickIcon {
    width: 1rem;
    height: 1rem;
    margin: 0 auto;
    border-radius: 50%;
    background-color: rgb(255, 0, 0);
    cursor: pointer;
    border: 1px solid rgb(0, 0, 0);
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
  }
  .clickIcon:hover {
    background-color: rgba(255, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
