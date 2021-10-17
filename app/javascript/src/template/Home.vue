<template>
  <div>
    <template v-if="loding">
      Loding ...
    </template>
    <template v-else>
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
      <p>---------------</p>
      <div v-if="error">
        {{ error }}
      </div>
      <div v-for="category in allCategories" :key="category.id">
        {{ category.category_name }}
      </div>
      <div>
        {{ $store.state.categories }}
      </div>
      <p>-------------</p>
      <div>
        {{ allCategories }}
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Flash from '../atoms/Flash.vue'
  export default {
    components: {
      Flash
    },
    computed: mapGetters(['userLoggedIn', 'allCategories']),
    data() {
      return {
        flash: { message: '', status: ''},
        loding: null,
        error: null
      }
    },
    created() {
      if (this.$route.params.loggedIn) {
        this.getCategoryData();
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
      },
      getCategoryData() {
        this.loding = true
        this.axios.get('/api/v1/category')
        .then(response => {
          this.$store.dispatch('fetchCreateAllCategories', response.data.categories)
          this.error = false
          this.loding = false
        })
        .catch(error => {
          this.$store.dispatch('fetchAllDeleteCategory');
          this.error = error.response.data.message
          this.loding = false
        })
      }
    }
  }
</script>
