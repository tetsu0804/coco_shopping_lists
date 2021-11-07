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
          <td><div class="clickIcon" v-if="userIdMatchedShoplist(shoplist.user_id)" @click="updateShoplist(shoplist.id)"></div></td>
          <td><div class="clickIcon" v-if="userIdMatchedShoplist(shoplist.user_id)" @click="deleteShoplist(shoplist)"></div></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      userLoggedIn: {
        type: Object
      },
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
      },
      userIdMatchedShoplist() {
        return (user_id) => {
          return user_id === this.userLoggedIn.user.id ? true : false
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
    },
    methods: {
      updateShoplist(value) {
        this.$emit('shoplistUpdate', value)
      },
      deleteShoplist(shoplist) {
        this.axios.delete(`/api/v1/shop_list/${shoplist.id}`)
        .then(response => {
          this.$store.dispatch('fetchDeleteShopList', shoplist.id);
          const success_format = { message: '', status: '' }
          success_format.message = `${shoplist.list_name} を削除しました。`
          success_format.status = response.status
          this.$emit('shoplistStatus', success_format)
        })
        .catch(error => {
          const error_format = { message: '', status: ''}
          error_format.message = '削除失敗しました。'
          error_format.status = !!error.response && !!error.response.status ? error.response.status : 400
          this.$emit('shoplistStatus', error_format)
        })
      }
    }
  }
</script>

<style scoped>
  .shoplist-detail-container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
  .shoplist-detail-container table {
    width: 100%;
    border-collapse: collapse ;
  }

  .shoplist-detail-container table thead tr th {
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
      height: 39px;
    font-size: 1rem;
  }
  .shoplist-detail-container table tbody tr td {
    box-sizing: border-box;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    height: 39px;
    font-size: 1rem;
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

  @media screen and (max-width: 480px) {
    .shoplist-detail-container table thead tr th {
      box-sizing: border-box;
      border-bottom: 1px solid rgba(0, 0, 0, 0.5);
      height: 39px;
      font-size: 0.7rem;
    }
    .shoplist-detail-container table tbody tr td {
      box-sizing: border-box;
      text-align: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.5);
      height: 39px;
      font-size: 0.7rem;
    }
  }
</style>
