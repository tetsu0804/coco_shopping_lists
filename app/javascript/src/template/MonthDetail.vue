<template>
  <div class="month-details-container">
    <div class="month-details-head-container">
      <div class="month-details-flash">
        <flash
          v-if="flash.status"
          :flash="flash"
          @closeFlash="flash = { message: '', status: ''}"
        >
        </flash>
      </div>

      <router-link :to="{ name: 'Home'}">home</router-link>
      <change-date
        :dateNum="dateNum"
        :mainDisplay="mainDisplay"
        :arrowRight="arrowRight"
        @changeNum="changeDateNum($event)"
      ></change-date>

      <shoplist-detail
        :userLoggedIn="userLoggedIn"
        :pageSplit="pageSplit"
        :dateNum="dateNum"
        :pageNum="pageNum"
        :pageTotal="pageTotal"
        :userSearchId="userSearchId"
        @shoplistUpdate="matchedShoplistId = $event"
        @shoplistStatus="flash = $event"
      ></shoplist-detail>
    </div>
    <p>{{ matchedShoplistId }}</p>

    <div class="month-detail-pagenation">
      <pagenation
        :pageNation="pageNation"
        :dateNum="dateNum"
        :pageNum="pageNum"
        :pageTotal="pageTotal"
        @pageNumChange="changePageNum($event)"
      >
      </pagenation>
    </div>


    <transition name="shop-list-modal">
      <div class="month-detail-hidden-container" v-if="!!matchedShoplistId">
        <shoplist-modal
          class="shoplist-modal"
          :selectedShoplist="selectedShoplist(matchedShoplistId)"
          @closeUpdateClick="matchedShoplistId = ''"
          @shoplistStatus="flash = $event"
        ></shoplist-modal>
      </div>
    </transition>
    <div v-for="(shoplist, index) in $store.state.shoplists" :key="shoplist.id">
      n: {{index +1}}, id: {{shoplist.id}}, list_name: {{ shoplist.list_name}}, price: {{shoplist.price}}, categories: {{shoplist.categories}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChangeDate from '../molcules/ChangeDate'
import Pagenation from '../molcules/Pagenation.vue'
import ShoplistDetail from '../molcules/ShoplistDetail.vue'
import ShoplistModal from '../molcules/ShoplistModal.vue'
import Flash from '../atoms/Flash.vue'
  export default {
    components: {
      ChangeDate,
      Pagenation,
      ShoplistDetail,
      ShoplistModal,
      Flash
    },
    data() {
      return {
        dateNum: 0,
        pageNum: 0,
        pageTotal: 10,
        matchedShoplistId: '',
        flash: ''
      }
    },
    created() {
      if (this.$route.params && this.$route.params.date_number) {
        this.dateNum = this.$route.params.date_number
      }
    },
    computed: mapGetters(['userLoggedIn', 'mainDisplay', 'pageSplit', 'pageNation', 'userSearchId', 'arrowRight', 'selectedShoplist']),
    methods: {
      changePageNum(value) {
        if (!!value.target) {
          this.pageNum = value.click -1
        } else {
          this.pageNum += value.click
        }
      },
      changePlusDateNum() {
        this.dateNum += 1
      },
      changeMinusDateNum() {
        this.dateNum -= 1
      },
      changeDateNum(value) {
        this.dateNum += value
        this.pageNum = 0
      }
    }
  }
</script>

<style scoped>
  .month-details-container {
    width: 90%;
    height: 100vh;
    margin: 0 auto;
  }
  .month-details-head-container {
    width: 100%;
    margin: 0;
    padding: 0;
    height: 80%;
  }
  .month-detail-pagenation {
    width: 100%;
    margin: 0;
    padding: 0;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .month-details-flash {
    height: 40px;
  }
  .arrow-date {
    width: 90%;
    margin: 0 auto;
  }
  .arrow-date-split {
    float: left;
  }
  .clear-float {
    clear: left;
  }
  .month-detail-hidden-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .shoplist-modal {
    position: absolute;
    top: 20%;
    left: 5%;
  }
  .shop-list-modal-enter, .shop-list-modal-leave-to {
    opacity: 0;
  }
  .shop-list-modal-enter-active, .shop-list-modal-leave-active {
    transition: opacity 1000ms linear;
  }
  .shop-list-modal-enter-to, .shop-list-modal-leave {
    opacity: 1;
  }
</style>
