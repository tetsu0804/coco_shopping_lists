<template>
  <div class="shop-list-container">
    shoplist
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
import InputForm from '../atoms/InputForm'
import CreateBtn from '../atoms/CreateBtn'
  export default {
    components: {
      InputForm,
      CreateBtn
    },
    props: {
      allCategories: {
        type: Array
      }
    },
    data() {
      return {
        checkformat: {},
        checked: [],
        listName: { id: 'list-name', kinds: 'text', label: '', place: '例: ロイヤルカナン', value: '' },
        price: { id: 'price', kinds: 'number', label: '', place: '例: 500', value: '' },
        datetime: { id: 'datetime', kinds: 'date', label: '', place: '', value: '' },
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
      createShopList() {
        console.log('createbtn')
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
      }
    }
  }
</script>
<style scoped>
  .shop-list-container {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.16);
  }
  .shop-list-base-container {
    width: 100%;
    background-color: rgb(226, 215, 199);
  }
  .shop-list-category {
    width: 30%;
    padding: 0;
    margin: 5px 1.4%;
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
