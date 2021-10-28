<template>
  <div class="main-display-container">
    <h1>{{ mainDisplay(dateNum).month_display}}</h1>
    <div class="arrow-price">
      <div class="arrow-price-split arrows arrow-left">
        <i class="far fa-arrow-alt-circle-left fa-3x" @click="minusOne"></i>
      </div>
      <div class="arrow-price-split total-price">
        {{ mainDisplay(dateNum).total_price}}
      </div>
      <div class="arrow-price-split arrows arrow-right">
        <i class="far fa-arrow-alt-circle-right fa-3x" @click="plusOne"></i>
      </div>
      <div class="clear-float"></div>
    </div>
    <p class="last-shopping">最後に購入した商品: {{ mainDisplay(dateNum).last_shoplist.list_name}}</p>
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
    background-color: rgba(252, 69, 219, 0.26);
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
    background-color: rgb(60, 122, 201);
  }
  .arrow-price-split {
    float: left;
    background-color: rgb(127, 161, 71);
  }
  .clear-float {
    clear: left;
  }
  .total-price {
    width: 40%;
    height: 100%;
    line-height: 200px;
    background-color: rgb(96, 29, 238);
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }
  .arrows {
    width: 30%;
    height: 100%;
    line-height: 220px;
    background-color: rgb(144, 219, 158);
  }
  .arrow-left {
    text-align: right;
  }
  .arrow-right {
    text-align: left;
  }
  .last-shopping {
    text-align: right;
  }
</style>
