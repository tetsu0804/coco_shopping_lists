<template>
  <div class="category-modal-container">
    <div class="category-modal-sub-container">
      <div class="category-modal-title-table">
        <h3 class="category-update-title">{{ selectedCategory.category_name}} を編集</h3>
        <div class="error-flash" v-if="error">{{ error }}</div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>カテゴリ名</th>
              <th>編集完了</th>
              <th>X</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{  selectedCategory.id}}</td>
              <td><input type="text" v-model="updateCategory"></input></td>
              <td><div class="clickIcon" @click="updateCategoryName(selectedCategory.id)"></div></td>
              <td><div class="clickIcon" @click="closeClick"></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selectedCategory: {
        type: Object,
        default: ''
      }
    },
    data() {
      return {
        updateCategory: '',
        error: ''
      }
    },
    methods: {
      updateCategoryName(category_id) {
        if (!!category_id) {
          this.axios.patch(`/api/v1/category/${category_id}`, { id: category_id, category_name: this.updateCategory})
          .then(response => {
            this.updateCategory = ''
            this.$store.dispatch('fetchUpdateCategory', response.data.category);
            const success_format = { message: '', status: '' }
            success_format.message = `${response.data.category.category_name} を作成しました。`
            success_format.status = response.status
            this.$emit('categoryStatus', success_format)
            this.closeClick();
          })
          .catch(error => {
            this.error = error.response.data.message
            this.updateCategory = ''
          })
        } else {
          this.error = '※ 編集したいカテゴリを選択してください。'
          this.updateCategory = ''
        }
      },
      closeClick() {
        this.$emit('closeUpdateClick')
      }
    }
  }
</script>
<style scoped>
  .category-modal-container {
    box-sizing: border-box;
    width: 90%;
  }
  .category-modal-sub-container {
    box-sizing: border-box;
    width: 96%;
    height: 50vh;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .category-modal-title-table {
    width: 100%;
  }
  .category-update-title {
    text-align: center;
  }
  table {
    width: 90%;
    margin: 0 auto;
    border: 1px solid rgba(0, 0, 0, .5);
    border-collapse: collapse;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
  }
  table thead {
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, .5);
  }
  table tbody {
    width: 100%;
    text-align: center;
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
  .error-flash {
    text-align: center;
    margin-bottom: 10px;
  }
</style>
