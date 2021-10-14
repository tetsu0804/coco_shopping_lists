<template>
  <div>
    <template v-if="userLoggedIn.signedIn">
      <div> {{ userLoggedIn.user.first_name }} さん</div>
      <div @click="logoutClick">ログアウト</div>
      <router-link :to="{ name: 'CategoryCreate'}">カテゴリ作成</router-link>
      <div>
        {{ userLoggedIn }}
      </div>
    </template>
    <template v-else>
      <router-link :to="{ name: 'Signup' }">ユーザー登録</router-link>
      <div @click="logoutClick">ログアウト</div>
    </template>


      <flash
        v-if="flash.status"
        :flash="$route.params.flash"
        @closeFlash="flash = { message: '', status: ''}"
      >
      </flash>


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
import Flash from '../atoms/Flash.vue'
  export default {
    components: {
      Flash
    },
    computed: mapGetters(['allUsers', 'userLoggedIn']),
    data() {
      return {
        flash: { message: '', status: ''}
      }
    },
    mounted() {
      if (this.$route.params.flash) {
        this.getFlash();
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
      },
      getFlash() {
        this.flash = this.$route.params.flash
      }
    }
  }
</script>
