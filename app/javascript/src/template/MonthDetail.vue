<template>
  <div class="month-details-container">
    <div class="month-details-sub-container">
      <div class="month-details-head-container">
        <header-link
          :userLoggedIn="userLoggedIn"
          @logoutStatus="flash =  $event"
        ></header-link>
      </div>

      <div class="details-month-flash-container">
        <flash
          v-if="flash.status"
          :flash="flash"
          @closeFlash="flash = { message: '', status: ''}"
        >
        </flash>
      </div>

      <div class="month-details-changedate-container">
        <change-date
          :dateNum="dateNum"
          :mainDisplay="mainDisplay"
          :arrowRight="arrowRight"
          @changeNum="changeDateNum($event)"
        ></change-date>
      </div>

      <div class="month-details-shoplist-container">
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
import HeaderLink from './HeaderLink.vue'
  export default {
    components: {
      ChangeDate,
      Pagenation,
      ShoplistDetail,
      ShoplistModal,
      Flash,
      HeaderLink
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
    width: 100%;
    height: 100vh;
  }
  .month-details-sub-container {
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }
  .month-details-head-container {
    width: 80%;
    margin: 0 auto;
    height: 10%;
    padding: 0;
  }

  .details-month-flash-container {
    width: 80%;
    margin: 0 auto;
    padding: 0;
    height: 5%;
  }

  .month-details-changedate-container {
    width: 80%;
    margin: 0 auto;
    padding: 0;
    height: 10%;
  }
  .month-details-shoplist-container {
    width: 80%;
    margin: 0 auto;
    padding: 0;
    height: 59%;
  }

  .month-detail-pagenation {
    width: 80%;
    margin: 5% auto 0 auto;
    padding: 0;
    height: 5%;
  }

  .month-detail-hidden-container {
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
  .shoplist-modal {
    position: absolute;
    top: 20%;
    left: 5%;
    width: 90%;
  }

</style>
