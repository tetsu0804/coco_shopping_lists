<template>
  <div v-if="flash.status" :class="flashClass" class="base-flash">
    <p class="text-msg">{{ flash.message }}</p>
    <p class="flash-close" @click="closeFlashClick">
      x
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      flash: {
        type: Object
      }
    },
    computed: {
      flashClass() {
        let status_regexp = new RegExp(/^2[0-9]{2}/)
        if (!!this.flash.status) {
          return status_regexp.test(this.flash.status) ? "success-flash" : "error-flash"
        }
      }
    },
    methods: {
      closeFlashClick() {
        this.$emit('closeFlash')
      }
    }
  }
</script>

<style scoped>
  .base-flash {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    text-align: center;
    border-radius: 4px;
    font-weight: bold;
  }
  .success-flash {
    box-sizing: border-box;
    color: rgba(13, 0, 255);
    background-color: rgba(255, 255, 255);
    border: 2px solid rgba(13, 0, 255);
  }
  .error-flash {
    box-sizing: border-box;
    color: rgba(254, 0, 0, 0.81);
    background-color: rgba(255, 255, 255);
    border: 2px solid rgba(254, 0, 0, 0.81);
  }
  .text-msg {
    box-sizing: border-box;
    width: 90%;
    margin: 0;
    padding: 0;
    float: left;
  }
  .flash-close {
    color: rgba(0, 0, 0, 0.5);
    float: right;
    cursor: pointer;
    margin: 0;
    padding:0;
    width: 10%;
  }
  .flash-close:hover {
    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.5);
  }
  @media screen and (max-width: 332px) {
    .base-flash {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      text-align: center;
      border-radius: 4px;
      font-weight: bold;
      line-height: 200%;
    }
    .text-msg {
      box-sizing: border-box;
      width: 90%;
      margin: 0;
      padding: 0;
      background-color: rgb(168, 43, 218);
      float: left;
      font-size: 0.8em;
    }
  }
</style>
