<template>
  <div v-if="flash.status" :class="flashClass" class="base-flash">
    {{ flash.message }}
    <div class="flash-close" @click="closeFlashClick">
      x
    </div>
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
    text-align: center;
    border-radius: 4px;
    font-weight: bold;
  }
  .success-flash {
    box-sizing: border-box;
    color: rgba(13, 0, 255);
    background-color: rgba(255, 255, 255);
    border: 5px solid rgba(13, 0, 255);
  }
  .error-flash {
    box-sizing: border-box;
    color: rgba(254, 0, 0, 0.81);
    background-color: rgba(255, 255, 255);
    border: 5px solid rgba(254, 0, 0, 0.81);
  }
  .flash-close {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.5);
    float: right;
    cursor: pointer;
  }
  .flash-close:hover {
    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
