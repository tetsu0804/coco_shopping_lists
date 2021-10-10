<template>
  <div>
    <template v-if="userLoggedIn.signedIn">
      <div> {{ userLoggedIn.user.first_name }} さん</div>
      <div @click="logoutClick">ログアウト</div>
      <div>
        {{ userLoggedIn }}
      </div>
    </template>
    <template v-else>
      <router-link :to="{ name: 'Signup' }">ユーザー登録</router-link>
      <div @click="logoutClick">ログアウト</div>
    </template>

    <div v-if="$route.params.flash">
      {{ $route.params.flash }}
    </div>
    <div v-if="flash">
      {{ flash }}
    </div>
    home

    <div v-for="user in allUsers" :key="user.id">
      {{ user.last_name }} {{ user.first_name }} さん
    </div>

    <div>
      {{ allUsers }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    computed: mapGetters(['allUsers', 'userLoggedIn']),
    data() {
      return {
        flash: ''
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
          this.flash = 'ログアウトできませんでした。'
        })
      }
    }
  }
</script>
