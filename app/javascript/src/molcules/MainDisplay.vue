<template>
  <div class="main-display-container">
    <h1>{{ mainDisplay(dateNum).month_display}}</h1>
    <div class="arrow-price">
      <div class="arrow-price-split arrows arrow-left">
        <i v-if="leftArrow" class="far fa-arrow-alt-circle-left fa-3x" @click="minusOne"></i>
      </div>
      <div class="arrow-price-split total-price">
        {{ mainDisplay(dateNum).total_price}}円
      </div>
      <div class="arrow-price-split arrows arrow-right">
          <i v-if="rightArrow" class="far fa-arrow-alt-circle-right fa-3x" @click="plusOne"></i>
      </div>
      <div class="clear-float"></div>
    </div>
    <router-link :to="{ name: 'MonthDetail', params: { date_number: dateNum }}" class="last-shopping">最後に購入した商品: {{ mainDisplay(dateNum).last_shoplist.list_name}}</router-link>
    <div class="clear-right"></div>
  </div>
</template>

<script>
  export default {
    props: {
      mainDisplay: {
        type: Function
      },
      dateNum: {
        type: Number
      },
      arrowRight: {
        type: Function
      }
    },
    computed: {
      number: {
        get: function() {
          return this.dateNum
        },
        set: function(value) {
          this.$emit('changeNum', value);
        }
      },
      rightArrow() {
        return this.arrowRight(this.number)
      },
      leftArrow() {
        return this.number > 0 ? true : false
      }
    },
    methods: {
      plusOne() {
        this.number = +1
      },
      minusOne() {
        this.number = -1
      }
    }
  }
</script>

<style scoped>
  .main-display-container {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .main-display-container h1 {
    text-align: center;
  }

  .arrow-price {
    width: 100%;
    height: 200px;
    margin: 0;
    padding: 0;
  }
  .arrow-price-split {
    float: left;
  }
  .clear-float {
    clear: left;
  }
  .total-price {
    width: 40%;
    height: 100%;
    line-height: 200px;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }
  .arrows {
    width: 30%;
    height: 100%;
    line-height: 220px;
  }
  .arrow-left {
    text-align: right;
  }
  .arrow-right {
    text-align: left;
  }
  .last-shopping {
    float: right;
    text-decoration: none;
    color: rgb(0, 0, 0);
  }
  .last-shopping:hover {
    color: rgba(0, 0, 0, 0.5);
  }
  .clear-right {
    clear: right;
  }
  .far {
    cursor: pointer;
  }
  .far:hover {
    color: rgba(0, 0, 0, 0.5);
  }
</style>
