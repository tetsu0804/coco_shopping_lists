<template>
  <div id="nav" v-if="userLoggedIn.signedIn">
    <div class="nav-li li-left"><router-link :to="{ name: 'Home'}" class="nav-link">Home</router-link></div>
    <div class="nav-li li-right"><p @click="logoutClick" class="div-text">ログアウト</p></div>
    <div class="clear-left"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      userLoggedIn: {
        type: Object
      }
    },
    methods: {
      logoutClick() {
        this.axios.delete('/api/v1/logout')
        .then(response => {
          this.$store.dispatch('fetchLogoutUser');
          this.$router.push({ name: 'Login' });
        })
        .catch(error => {
          const error_format = { message: '', status: ''}
          error_format.message = 'ログアウトできませんでした。'
          error_format.status = 400
          this.$emit('logoutStatus', error_format);
        })
      }
    }
  }
</script>

<style scoped>
  #nav {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  #nav .nav-li {
    box-sizing: border-box;
    color: rgb(0, 0, 0);
    float: left;
    width: 45%;
    height: 100%;
    text-align: center;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
    cursor: pointer;
    display: table;
  }
  #nav .nav-li:hover {
    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.5);
  }
  #nav .li-left {
    margin: 0 5% 0 0;
  }
  #nav .li-right {
    margin: 0 0 0 5%;
  }
  #nav .nav-li .nav-link {
    color: rgb(0, 0, 0);
    text-decoration: none;
    display: table-cell;
    vertical-align: middle;
  }
  #nav .nav-li .nav-link:hover {
    color: rgb(255, 255, 255);
  }
  .div-text {
    display: table-cell;
    vertical-align: middle;
  }
  .clear-left {
    clear: left;
    margin:0;
    padding:0;
  }
</style>
