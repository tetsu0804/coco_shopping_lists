<template>
  <div class="shoplist-modal-container">
    <div class="shoplist-modal-sub-container">
      <div class="shoplist-modal-title-table">
        <h3 class="shoplist-update-title">{{ selectedShoplist.list_name}} を編集</h3>
        <div class="error-flash" v-if="error">{{ error }}</div>
        <table>
          <tbody>
            <tr>
              <td>No</td>
              <td>{{  selectedShoplist.id}}</td>
            </tr>
            <tr>
              <td>商品名</td>
              <td><input type="text" v-model="updateListName"></input></td>
            </tr>
            <tr>
              <td>値段</td>
              <td><input type="number" v-model="updatePrice"></input></td>
            </tr>
            <tr>
              <td>日付</td>
              <td><input type="date" v-model="updatePurchasedate"></input></td>
            </tr>
            <tr>
              <td>編集完了</td>
              <td><div class="clickIcon" @click="updateShopList(selectedShoplist)"></div></td>
            </tr>
            <tr>
              <td>X</td>
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
      selectedShoplist: {
        type: Object,
        default: ''
      }
    },
    data() {
      return {
        updateListName: '',
        updatePrice: '',
        updatePurchasedate: '',
        error: ''
      }
    },
    methods: {
      updateShopList(shoplist) {
        if (!!shoplist) {
          this.axios.patch(`/api/v1/shop_list/${shoplist.id}`, { id: shoplist.id, list_name: this.updateListName, price: this.updatePrice, purchasedate: this.updatePurchasedate, user_id: shoplist.user_id })
          .then(response => {
            this.clearData();
            this.$store.dispatch('fetchUpdateShopList', { update_shoplist: response.data.shoplist, categories: response.data.categories });
            const success_format = { message: '', status: '' }
            success_format.message = `${response.data.shoplist.list_name} を作成しました。`
            success_format.status = response.status
            this.$emit('shoplistStatus', success_format);
            this.closeClick();
          })
          .catch(error => {
            this.error = error.response.data.message
            this.clearData();
          })
        } else {
          this.error = '※ 編集したい商品を選択してください。'
          this.clearData();
        }
      },
      clearData() {
        this.updateListName = ''
        this.updatePrice = ''
        this.updatePurchasedate = ''
      },
      closeClick() {
        this.$emit('closeUpdateClick')
      }
    }
  }
</script>
<style scoped>
  .shoplist-modal-container {
    box-sizing: border-box;
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }
  .shoplist-modal-sub-container {
    box-sizing: border-box;
    width: 96%;
    height: 50vh;
    margin: 0 auto;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.8);
  }
  .shoplist-modal-title-table {
    width: 100%;
  }
  .shoplist-update-title {
    text-align: center;
  }
  table {
    width: 90%;
    margin: 5% auto 0 auto;
    border: 1px solid rgba(0, 0, 0, .5);
    border-collapse: collapse;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
  }
  table tbody {
    width: 100%;
    text-align: center;
  }
  table tbody tr td {
    height: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
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
  @media screen and (max-width: 1025px) {
    .shoplist-update-title {
      text-align: center;
      margin: 5% auto 0 auto;
    }
    table {
      width: 90%;
      margin: 5% auto 0 auto;
      border: 1px solid rgba(0, 0, 0, .5);
      border-collapse: collapse;
      box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
    }
  }
  @media screen and (max-width: 480px) {
    .shoplist-update-title {
      text-align: center;
      margin: 15% auto 0 auto;
    }
    table {
      width: 90%;
      margin: 13% auto 0 auto;
      border: 1px solid rgba(0, 0, 0, .5);
      border-collapse: collapse;
      box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
    }
  }
</style>
