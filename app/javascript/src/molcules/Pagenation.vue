<template>
  <div class="pagenation-container">
    <div class="pagenation-sub-container" :style="pageNation(dateNum, pageNum, pageTotal).page_container">
      <div v-for="page in pageNation(this.dateNum, this.pageNum, this.pageTotal).pages" :style="page.style" class="pages" :key="page.text" @click="changePageNum(page)">
        {{ page.text }}
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      pageNation: {
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
      }
    },
    computed: {
      numPage: {
        get: function() {
          return this.pageNum
        },
        set: function(page) {
          this.$emit('pageNumChange', page)
        }
      }
    },
    methods: {
      changePageNum(page) {
        this.numPage = page
      }
    }
  }
</script>

<style scoped>
  .pagenation-container {
    width: 80%;
    margin: 15px auto;
  }
  .pagenation-sub-container {
    margin: 0 auto;
    height: 2rem;
  }
  .pages {
    box-sizing: border-box;
    float: left;
    border: 1px solid rgb(0, 0, 0);
  }
  .pages:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .clear {
    clear: left;
  }
</style>
