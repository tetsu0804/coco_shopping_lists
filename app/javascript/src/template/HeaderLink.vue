<template>
  <div id="nav" v-if="userLoggedIn.signedIn">
    <div class="nav-li li-left"><router-link :to="{ name: 'Home'}" class="nav-link">Home</router-link></div>
    <div class="nav-li li-center">{{ userLoggedIn.user.first_name }} さん</div>
    <div class="nav-li li-center"><router-link :to="{ name: 'CategoryCreate'}" class="nav-link">カテゴリ作成</router-link></div>
    <div class="nav-li li-right"@click="logoutClick">ログアウト</div>
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
    margin: 10px 0;
  }
  #nav .nav-li {
    box-sizing: border-box;
    color: rgb(0, 0, 0);
    float: left;
    width: 20%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
    cursor: pointer;
  }
  #nav .nav-li:hover {
    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.5);
  }
  #nav .li-left {
    margin: 0 3.3% 0 0;
  }
  #nav .li-center {
    margin: 0 3.3%;
  }
  #nav .li-right {
    margin: 0 0 0 3.3%;
  }
  #nav .nav-li .nav-link {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  #nav .nav-li .nav-link:hover {
    color: rgb(255, 255, 255);
  }
  .clear-left {
    clear: left;
  }
</style>
