<template>
  <div class="shop-list-container">
    <p class="close-modal-click" @click="closeModalClick">X</p>
    <h3>購入品作成</h3>
    <flash
      v-if="flash.status"
      :flash="flash"
      @closeFlash="flash = { message: '', status: ''}"
    ></flash>

    <div class="shop-list-base-container">
      <div v-for="category in allCategories" :key="category.id" class="shop-list-category">
        <input-form
          :status="changStatus(category)"
          @inputFormValue="changeCheckValue($event, category)"
        ></input-form>
      </div>
      <div class="float-clear"></div>
    </div>
    <div>
      {{ checked }}
    </div>
    <div class="shop-list-base-container">
      <div class="shop-list-field">
        <input-form
          :status="listName"
          @inputFormValue="listName.value = $event"
        ></input-form>
      </div>
    </div>
    <p>{{ listName.value }}</p>
    <div class="shop-list-base-container">
      <div class="shop-list-field">
        <input-form
          :status="price"
          @inputFormValue="price.value = $event"
        ></input-form>
      </div>
    </div>
    <p>{{ price.value }}</p>
    <div class="shop-list-base-container">
      <div class="shop-list-field">
        <input-form
          :status="datetime"
          @inputFormValue="datetime.value = $event"
        ></input-form>
      </div>
    </div>
    <p>{{ datetime.value}}</p>
    <div class="shop-list-base-container">
      <div class="shop-list-field">
        <create-btn
          @createBtnClick="createShopList"
        >
        </create-btn>
      </div>
    </div>


  </div>
</template>

<script>
import InputForm from '../atoms/InputForm.vue'
import CreateBtn from '../atoms/CreateBtn.vue'
import Flash from '../atoms/Flash.vue'
  export default {
    components: {
      InputForm,
      CreateBtn,
      Flash
    },
    props: {
      allCategories: {
        type: Array
      },
      userLoggedIn: {
        type: Object
      }
    },
    data() {
      return {
        checkformat: {},
        checked: [],
        listName: { id: 'list-name', kinds: 'text', label: '', place: '例: ロイヤルカナン', value: '' },
        price: { id: 'price', kinds: 'number', label: '', place: '例: 500', value: '' },
        datetime: { id: 'datetime', kinds: 'date', label: '', place: '', value: '' },
        flash: { message: '', status: ''}
      }
    },
    methods: {
      changStatus(category) {
        const status = { id: '', kinds: 'checkbox', label: '', true_box: '', false_box: '', checkbox_be: true }
        status.id = category.id
        status.label = category.category_name
        status.true_box = category.id
        return status
      },
      changeCheckValue(value, category) {
        this.checked = [];
        if (Object.keys(this.checkformat).length <= 0) {
          this.checkformat[category.id] = value
        } else {
          if (Object.keys(this.checkformat).some(id => id === category.id.toString())) {
            Object.keys(this.checkformat).forEach(id => {
              if (id === category.id.toString()) {
                this.checkformat[id] = value
              }
            })
          } else {
            this.checkformat[category.id] = value
          }
        }
        Object.values(this.checkformat).forEach(value => {
          this.checked.push(value)
        });
      },
      falseCheck() {
        return this.checked.filter(Boolean);
      },
      closeModalClick() {
        this.$emit('closeModal');
      },
      createShopList() {
        this.axios.post('/api/v1/shop_list', { list_name: this.listName.value, price: this.price.value, purchasedate: this.datetime.value, user_id: this.userLoggedIn.user.id, categories: this.falseCheck()})
        .then(response => {
          this.dataClear();
          this.$store.dispatch('fetchCreateShopList', { shoplist: response.data.shop_list, categories: response.data.categories});
          const success_format = { message: '', status: '' }
          success_format.message = `${response.data.shop_list.list_name} を作成しました。`
          success_format.status = response.status
          this.$emit('shopListStatus', success_format);
          this.$emit('closeModal');
        })
        .catch(error => {
          this.dataClear();
          this.flash.message = !!error.response && !!error.response.data && !!error.response.data.message ? error.response.data.message : 'もう一度フォームに入力してください。'
          this.flash.status = !!error.response && !!error.response.status ? error.response.status : 400
        })
      },
      dataClear() {
        this.checkformat = {}
        this.checked = []
        this.listName = { id: 'list-name', kinds: 'text', label: '', place: '例: ロイヤルカナン', value: '' }
        this.price = { id: 'price', kinds: 'number', label: '', place: '例: 500', value: '' }
        this.datetime = { id: 'datetime', kinds: 'date', label: '', place: '', value: '' }
      }
    }
  }
</script>
<style scoped>
  .shop-list-container {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
    background-color: rgba(0, 0, 0, 0.16);
  }
  .close-modal-click {
    width: 5%;
    text-align: center;
    float: right;
    padding: 0;
    margin: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    cursor: pointer;
  }
  .close-modal-click:hover {
    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.5);
  }
  .shop-list-base-container {
    width: 100%;
    background-color: rgb(226, 215, 199);
  }
  h3 {
    text-align: center;
  }
  .shop-list-category {
    width: 30%;
    padding: 0;
    margin: 5px 1.2%;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 4px;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
    float: left;
    text-align: center;
  }
  .float-clear {
    clear: left;
  }
  .shop-list-field {
    width: 96.8%;
    margin: 10px auto;
    height: 40px;
  }
</style>
