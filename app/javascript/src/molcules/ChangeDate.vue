<template>
  <div class="change-data-container">
    <div class="change-data-sub-container">
      <div class="change-data-split arrow-date">
        <i v-if="leftArrow" class="far fa-arrow-alt-circle-left fa-3x" @click="minusOne"></i>
      </div>
      <div class="change-data-split arrow-date-center">
        {{ mainDisplay(dateNum).month_display }}
      </div>
      <div class="change-data-split arrow-date">
        <i v-if="rightArrow" class="far fa-arrow-alt-circle-right fa-3x" @click="plusOne"></i>
      </div>
      <div class="float-clear"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      dateNum: {
        type: Number
      },
      mainDisplay: {
        type: Function
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
      leftArrow() {
        return this.number > 0 ? true : false
      },
      rightArrow() {
        return this.arrowRight(this.number);
      }
    },
    methods: {
      minusOne() {
        this.number = -1
      },
      plusOne() {
        this.number = +1
      }
    }
  }
</script>

<style scoped>
  .change-data-container {
    width: 90%;
    margin: 0 auto;
  }
  .change-data-sub-container {
    width: 100%;
    height: 50px;
  }
  .change-data-split {
    float: left;
    text-align: center;
    line-height: 50px;
    height: 100%;
  }
  .float-clear {
    clear: left;
  }
  .arrow-date {
    width: 30%;
    cursor: pointer;
  }
  .arrow-date:hover {
    color: rgba(0, 0, 0, 0.5);
  }
  .arrow-date-center {
    width: 40%;
    font-size: 2rem;
  }
</style>
