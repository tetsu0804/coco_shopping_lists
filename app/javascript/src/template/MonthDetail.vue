<template>
  <div class="month-details-container">
    <router-link :to="{ name: 'Home'}">home</router-link>
    <div>{{ mainDisplay(dateNum).month_display }}</div>
    detail
    <div>
      {{ dateNum }}
    </div>
    <router-link :to="{ name: 'MonthDetail', params: { date_number: dateNum + 1}}">+1</router-link>
    <router-link :to="{ name: 'MonthDetail', params: { date_number: dateNum - 1}}">-1</router-link>
    <div v-for="shoplist in splitPages" :key="shoplist.id">
      {{ shoplist.list_name }}
    </div>

    <p>page_container: {{ pageNation(dateNum, pageNum, pageTotal).page_container }}</p>
    <p>dateNum: {{ dateNum }}</p>
    <p>pageNum: {{ pageNum }}</p>
    <p>pageTotal: {{ pageTotal }}</p>

    <div>
      {{ pageNation(dateNum, pageNum, pageTotal) }}
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
import Pagenation from '../molcules/Pagenation.vue'
  export default {
    components: {
      Pagenation
    },
    data() {
      return {
        pageNum: 0,
        pageTotal: 10
      }
    },
    computed: {
      dateNum() {
        return Number(this.$route.params.date_number)
      },
      splitPages() {
        return this.pageSplit(this.dateNum, this.pageNum, this.pageTotal)
      },
      ...mapGetters(['mainDisplay', 'pageSplit', 'pageNation'])
    },
    methods: {
      changePageNum(value) {
        if (!!value.target) {
          this.pageNum = value.click -1
        } else {
          this.pageNum += value.click
        }
      }
    }
  }
</script>

<style scoped>
  .month-details-container {
    width: 100%;
  }
</style>
