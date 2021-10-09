<template>
  <div class="create-btn-container">
    <button @click="onClick"><slot>登録</slot></button>
  </div>
</template>

<script>
  export default {
    methods: {
      onClick() {
        this.$emit('createBtnClick')
      }
    }
  }
</script>

<style scoped>
  .create-btn-container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  button {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  button:hover {
    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
