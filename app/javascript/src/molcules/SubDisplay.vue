<template>
  <div class="sub-display-container">
    <div class="sub-display-li sub-display-left">
      <div class="sub-display">
        <p class="sub-display-text">{{ userName }}</p>
      </div>
    </div>
    <div class="sub-display-li sub-display-right">
      <div class="sub-display">
        <router-link :to="{ name: 'CategoryCreate'}" class="sub-display-link">カテゴリ作成</router-link>
      </div>
    </div>
    <div class="left-clear"></div>
  </div>
</template>

<script>
  export default {
    props: {
      userLoggedIn: {
        type: Object
      }
    },
    computed: {
      userName() {
        return this.userLoggedIn.signedIn ? this.userLoggedIn.user.first_name : 'ログインしてる？'
      }
    }
  }
</script>

<style scoped>
  .sub-display-container {
    width: 100%;
    height: 100%;
  }
  .sub-display-li {
    box-sizing: border-box;
    float: left;
    width: 46%;
    height: 100%;
    text-align: center;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 4px;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
    display: table;
    }
  .sub-display {
    display: table-cell;
    vertical-align: middle;
    width:100%;
    height: 100%;
  }
  .sub-display-text {
    font-size: 2rem;
    color: rgb(0, 0, 0);
    cursor: pointer;
  }
  .sub-display-text:hover {
    color: rgba(0, 0, 0, 0.5);
  }
  .sub-display-link {
    font-size: 2rem;
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  .sub-display-link:hover {
    color: rgba(0, 0, 0, 0.5);
  }
  .sub-display-left {
    margin: 0 4% 0 0;
  }
  .sub-display-right {
    margin: 0 0 0 4%;
  }
  .left-clear {
    clear: left;
  }
</style>
