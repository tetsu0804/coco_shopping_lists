<template>
  <div class="home-container">
    <template v-if="loding">
      Loding ...
    </template>
    <template v-else>
      <template v-if="userLoggedIn.signedIn">
        <div> {{ userLoggedIn.user.first_name }} さん</div>
        <div @click="logoutClick">ログアウト</div>
        <router-link :to="{ name: 'CategoryCreate'}">カテゴリ作成</router-link>
        <div>
          {{ userLoggedIn }}
        </div>
      </template>
      <template v-else>
        <router-link :to="{ name: 'Signup' }">ユーザー登録</router-link>
        <div @click="logoutClick">ログアウト</div>
      </template>
      <div v-if="error">
        {{ error }}
      </div>
      <transition name="shop-list-home">
        <div class="home-sub-container" v-if="homeState">
          <flash
            v-if="flash.status"
            :flash="flash"
            @closeFlash="flash = { message: '', status: ''}"
          >
          </flash>
          home
          <p>dateNum: {{ dateNum }}</p>
          <main-display
            :mainDisplay="mainDisplay"
            :dateNum="dateNum"
            :arrowRight="arrowRight"
            @changeNum="dateNum += $event"
          ></main-display>
          <create-btn
            @createBtnClick="slideStart"
          >購入品作成</create-btn>
        </div>
      </transition>
      <transition name="shop-list-create">
        <div class="home-sub-container" v-if="shoplistState">
          <shop-list-create
            :allCategories="allCategories"
            :userLoggedIn="userLoggedIn"
            @shopListStatus="flash = $event"
            @closeModal="slideEnd"
          ></shop-list-create>
        </div>
      </transition>

      <div v-for="list in allShoplists" :key="list.id">
        id: {{list.id}}, 商品名: {{ list.list_name}}, 値段: {{ list.price }}, 購入日: {{ list.purchasedate }}
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Flash from '../atoms/Flash.vue'
import ShopListCreate from '../molcules/ShopListCreate.vue'
import MainDisplay from '../molcules/MainDisplay.vue'
import CreateBtn from '../atoms/CreateBtn.vue'

  export default {
    components: {
      Flash,
      ShopListCreate,
      MainDisplay,
      CreateBtn
    },
    computed: mapGetters(['userLoggedIn', 'allCategories', 'allShoplists', 'mainDisplay', 'arrowRight']),
    data() {
      return {
        flash: { message: '', status: ''},
        loding: null,
        error: null,
        homeState: true,
        shoplistState: false,
        dateNum: 0
      }
    },
    created() {
      if (this.$route.params.loggedIn) {
        //this.getDataBase();
        this.getAllDataBase();
      }
    },
    mounted() {
      if (this.$route.params.flash) {
        this.getFlash();
      }

    },
    methods: {
      logoutClick() {
        this.axios.delete('/api/v1/logout')
        .then(response => {
          this.$store.dispatch('fetchLogoutUser');
          this.$router.push({ name: 'Login' });
        })
        .catch(error => {
          this.flash = 'ログアウトできませんでした。'
        })
      },
      getFlash() {
        this.flash = this.$route.params.flash
      },
      getDataBase() {
        this.loding = true
        this.axios.get('/api/v1/category')
        .then(response => {
          this.$store.dispatch('fetchCreateAllCategories', response.data.categories)
          this.error = false
          this.loding = false
        })
        .catch(error => {
          this.$store.dispatch('fetchAllDeleteCategory');
          this.error = error.response.data.message
          this.loding = false
        })
      },
      slideStart() {
        this.homeState = false;
        this.shoplistState = true;
      },
      slideEnd() {
        this.shoplistState = false
        let self = this
        window.setTimeout(function() {
          self.homeState = true;
        }, 2100)
      },
      getAllDataBase() {
        this.loding = true
        this.axios.get('/api/v1/all')
        .then(response => {
          this.$store.dispatch('fetchAllCreateShopList', { categories: response.data.categories, shoplists: response.data.shoplists, category_shoplists: response.data.category_shoplists})
          this.error = false
          this.loding = false
        })
        .catch(error => {
          this.$store.dispatch('fetchAllDeleteCategory');
          this.$store.dispatch('fetchAllDeleteShopList');
          this.error = error.response.data.message
          this.loding = false
        })
      }
    }
  }
</script>

<style scoped>
  .home-container {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.06);
  }
  .home-sub-container {
    width: 90%;
    margin: 0 auto;
    background-color: rgba(28, 54, 106, 0.17);
  }
  .shop-list-home-enter, .shop-list-home-leave-to {
    opacity: 0;
  }
  .shop-list-home-enter-to, .shop-list-home-leave {
    opacity: 1;
  }
  .shop-list-home-enter-active {
    transition: opacity 2s;
  }
  .shop-list-home-leave-active {
    transition: opacity 0s;
  }
  .shop-list-create-enter-active {
    animation: rale 2s;
  }
  .shop-list-create-leave-active {
    animation: rale 2s reverse;
  }
  @keyframes rale {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
</style>
