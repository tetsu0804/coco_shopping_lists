<template>
  <div class="month-details-container">
    <div class="month-details-head-container">
      <router-link :to="{ name: 'Home'}">home</router-link>
      <change-date
        :dateNum="dateNum"
        :mainDisplay="mainDisplay"
        @changeNum="changeDateNum($event)"
      ></change-date>

      <shoplist-detail
        :pageSplit="pageSplit"
        :dateNum="dateNum"
        :pageNum="pageNum"
        :pageTotal="pageTotal"
        :userSearchId="userSearchId"
      ></shoplist-detail>
    </div>


    <pagenation
      :pageNation="pageNation"
      :dateNum="dateNum"
      :pageNum="pageNum"
      :pageTotal="pageTotal"
      @pageNumChange="changePageNum($event)"
    >
    </pagenation>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChangeDate from '../molcules/ChangeDate'
import Pagenation from '../molcules/Pagenation.vue'
import ShoplistDetail from '../molcules/ShoplistDetail.vue'
  export default {
    components: {
      ChangeDate,
      Pagenation,
      ShoplistDetail
    },
    data() {
      return {
        dateNum: 0,
        pageNum: 0,
        pageTotal: 10
      }
    },
    created() {
      if (this.$route.params && this.$route.params.date_number) {
        this.dateNum = this.$route.params.date_number
      }
    },
    computed: mapGetters(['mainDisplay', 'pageSplit', 'pageNation', 'userSearchId']),
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
</style>
