<template>
  <div class="shoplist-detail-container">
    <table>
      <thead>
        <tr>
          <th>日付</th>
          <th>商品名</th>
          <th>値段</th>
          <th>作成者</th>
          <th>編集</th>
          <th>削除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shoplist in pageSplit(dateNum, pageNum, pageTotal)" :key="shoplist.id">
          <td>{{ shoplist.purchasedate | dateDisplay}}</td>
          <td>{{ shoplist.list_name }}</td>
          <td>{{ shoplist.price | priceYen }}</td>
          <td>{{ userSearch(shoplist.user_id) }}</td>
          <td>x</td>
          <td>x</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      pageSplit: {
        type: Function
      },
      dateNum: {
        type: Number
      },
      pageNum: {
        type: Number
      },
      pageTotal: {
        type: Number
      },
      userSearchId: {
        type: Function
      }
    },
    computed: {
      userSearch() {
        return (user_id) => {
          return this.userSearchId(user_id).first_name
        }
      }
    },
    filters: {
      dateDisplay(value) {
        if (!!value) {
          let date_split = value.split(/-|T/);
          return Number(date_split[2]);
        } else {
          return ''
        }
      },
      priceYen(value) {
        return !!value ? value + '円' : ''
      }
    }
  }
</script>

<style scoped>
  .shoplist-detail-container {
    width: 90%;
    margin: 40px auto;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
  .shoplist-detail-container table {
    width: 96%;
    margin: 0 auto;
    border-collapse: collapse ;
  }
  .shoplist-detail-container table thead tr th {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    height: 30px;
  }
  .shoplist-detail-container table tbody tr td {
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    height: 30px;
  }
</style>
