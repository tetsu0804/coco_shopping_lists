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
        <tr v-for="(category, index) in allCategories" :key="category.id">
          <td>{{ index + 1 }}</td>
          <td>{{ category.category_name }}</td>
          <td><p>◯</p></td>
          <td><p>◯</p></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      allCategories: {
        type: Array
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

</style>
