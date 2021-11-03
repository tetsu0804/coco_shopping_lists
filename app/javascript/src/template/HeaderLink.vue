<template>
  <ul id="nav" v-if="userLoggedIn.signedIn">
    <li><router-link :to="{ name: 'Home'}" class="nav-link">Home</router-link></li>
    <li>{{ userLoggedIn.user.first_name }} さん</li>
    <li><router-link :to="{ name: 'CategoryCreate'}" class="nav-link">カテゴリ作成</router-link></li>
    <li@click="logoutClick">ログアウト</li>
    <div class="clear-left"></div>
  </ul>
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
    list-style: none;
    margin: 10px 0;
  }
  #nav li {
    color: rgb(0, 0, 0);
    float: left;
    width: 20%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0;
    margin: 0 1.8%;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, .5);
    cursor: pointer;
  }
  #nav li:hover {
    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.5);
  }
  #nav li .nav-link {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  #nav li .nav-link:hover {
    color: rgb(255, 255, 255);
  }
  .clear-left {
    clear: left;
  }
</style>
