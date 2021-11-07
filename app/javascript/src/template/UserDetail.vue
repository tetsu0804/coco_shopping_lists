<template>
  <div class="user-detail-container">
    <div class="user-detail-sub-container">
      <div class="user-detail-head-container">
        <header-link
          :userLoggedIn="userLoggedIn"
          @logoutStatus="flash = $event"
        ></header-link>
      </div>
      <div class="user-detail-show-container">
        <user-show
          :userLoggedIn="userLoggedIn"
        ></user-show>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLink from './HeaderLink.vue'
import UserShow from '../molcules/UserShow.vue'
import { mapGetters } from 'vuex'
  export default {
    components: {
      HeaderLink,
      UserShow
    },
    data() {
      return {
        flash: ''
      }
    },
    computed: mapGetters(['userLoggedIn'])
  }
</script>

<style scoped>
  .user-detail-container {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.06);
  }
  .user-detail-sub-container {
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }
  .user-detail-head-container {
    width: 80%;
    height: 10%;
    margin: 0 auto;
  }
  .user-detail-show-container {
    width: 80%;
    height: 30%;
    margin: 0 auto;
  }
</style>
