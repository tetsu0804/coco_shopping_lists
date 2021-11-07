<template>
  <div class="category-create-container">
    <div class="category-create-sub-container">
      <div class="category-create-head-container">
        <header-link
        :userLoggedIn="userLoggedIn"
        @logoutStatus="flash =  $event"
        ></header-link>
        <flash
          :flash="flash"
          @closeFlash="flash = { message: '', status: '' }"
        ></flash>
      </div>

      <div class="category-create-form-container">
        <category-form
          :userLoggedIn="userLoggedIn"
          @categoryStatus="flash = $event"
        ></category-form>
      </div>

      <div class="category-create-footer-container">
        <category-list
          :allCategories="allCategories"
          :userLoggedIn="userLoggedIn"
          @categoryUpdate="matchedNum = $event"
          @categoryStatus="flash = $event"
        ></category-list>
      </div>
      <transition name="category-modal">
        <div class="category-modal-all-container" v-if="!!matchedNum">
          <category-modal
            class="category-modal"
            :selectedCategory="selectedCategory(matchedNum)"
            @closeUpdateClick="matchedNum = ''"
            @categoryStatus="flash = $event"
          ></category-modal>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import CategoryForm from '../molcules/CategoryForm.vue'
  import CategoryList from '../molcules/CategoryList.vue'
  import Flash from '../atoms/Flash.vue'
  import CategoryModal from '../molcules/CategoryModal.vue'
  import HeaderLink from './HeaderLink.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      CategoryForm,
      CategoryList,
      CategoryModal,
      Flash,
      HeaderLink
    },
    data() {
      return {
        flash: { message: '', status: '' },
        matchedNum: ''
      }
    },
    computed: mapGetters(['allCategories', 'userLoggedIn', 'selectedCategory']),
  }
</script>

<style scoped>
  .category-create-container {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: rgba(255, 0, 0, 0.09);
  }
  .category-create-sub-container {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
  }
  .category-create-head-container {
    width: 80%;
    margin: 8% auto 0 auto;
    padding: 0;
    height: 10%;
    background-color: rgba(255, 0, 0, 0.13);
  }
  .category-create-form-container {
    width: 80%;
    margin: 0 auto;
    padding: 0;
    height: 20%;
    background-color: rgba(13, 0, 255, 0.22);
  }
  .category-create-footer-container {
    width: 80%;
    margin: 0 auto;
    padding: 0;
    height: 70%;
    background-color: rgba(204, 255, 0, 0.1);
  }
  .category-modal-all-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .category-modal {
    position: absolute;
    top: 20%;
    left: 5%;
    width: 90%;
  }

  @media screen and (max-width: 480px) {
    .category-create-head-container {
      width: 100%;
      margin: 8% auto 0 auto;
      padding: 0;
      height: 10%;
      background-color: rgba(255, 0, 0, 0.13);
    }
    .category-create-form-container {
      width: 100%;
      margin: 0 auto;
      padding: 0;
      height: 20%;
      background-color: rgba(13, 0, 255, 0.22);
    }
    .category-create-footer-container {
      width: 100%;
      margin: 0 auto;
      padding: 0;
      height: 70%;
      background-color: rgba(204, 255, 0, 0.1);
    }
  }
  .category-modal-enter, .category-modal-leave-to {
    opacity: 0;
  }
  .category-modal-enter-active, .category-modal-leave-active {
    transition: opacity 1000ms linear;
  }
  .category-modal-enter-to, .category-modal-leave {
    opacity: 1;
  }
</style>
