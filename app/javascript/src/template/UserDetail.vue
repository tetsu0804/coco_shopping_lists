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
      <div class="user-shoplist-parcent">
        <div class="shoplists-pracents">
          <parcent
            :userLoggedIn="userLoggedIn"
            :periodShopListUser="periodShopListUser"
            :userSearchId="userSearchId"
            :period="'month'"
            :kindsType="'single'"
          ></parcent>
        </div>
        <div class="shoplists-pracents">
          <parcent
            :userLoggedIn="userLoggedIn"
            :periodShopListUser="periodShopListUser"
            :userSearchId="userSearchId"
            :period="'month'"
            :kindsType="'multi'"
          >今月(全体)</parcent>
        </div>
        <div class="shoplists-pracents">
          <parcent
            :userLoggedIn="userLoggedIn"
            :periodShopListUser="periodShopListUser"
            :userSearchId="userSearchId"
            :period="'year'"
            :kindsType="'single'"
          >今年</parcent>
        </div>
        <div class="shoplists-pracents">
          <parcent
            :userLoggedIn="userLoggedIn"
            :periodShopListUser="periodShopListUser"
            :userSearchId="userSearchId"
            :period="'year'"
            :kindsType="'multi'"
          >今年(全体)</parcent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLink from './HeaderLink.vue'
import UserShow from '../molcules/UserShow.vue'
import Parcent from '../molcules/Parcent.vue'
import { mapGetters } from 'vuex'
  export default {
    components: {
      HeaderLink,
      UserShow,
      Parcent
    },
    data() {
      return {
        flash: ''
      }
    },
    computed: mapGetters(['userLoggedIn', 'periodShopListUser', 'userSearchId'])
  }
</script>

<style scoped>
  .user-detail-container {
    width: 100%;
    height: 100vh;
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
    padding:0;
  }
  .user-detail-show-container {
    width: 80%;
    height: 10%;
    margin: 0 auto;
    padding: 0;
  }
  .user-shoplist-parcent {
    width: 80%;
    height: 80%;
    margin: 0 auto;
    padding:0;
  }
  .shoplists-pracents {
    box-sizing: border-box;
    width: 50%;
    height: 50%;
    float: left;
    border: 1px solid rgb(0, 0, 0);
  }
  @media screen and (max-width: 480px) {
    .user-detail-container {
      width: 100%;
    }
    .shoplists-pracents {
      width: 100%;
      height: 50%;
      float: left;
    }
  }
</style>
