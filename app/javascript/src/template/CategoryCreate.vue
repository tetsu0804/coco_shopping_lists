<template>
  <div class="category-create-container">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    category
    <div v-for="category in allCategories" :key="category.id">
      {{ category.category_name }}
    </div>

    <flash
      :flash="flash"
      @closeFlash="flash = { message: '', status: '' }"
    ></flash>
    <category-form
      :userLoggedIn="userLoggedIn"
      @categoryStatus="flash = $event"
    ></category-form>

    <category-list
      :allCategories="allCategories"
      :userLoggedIn="userLoggedIn"
      @categoryUpdate="matchedNum = $event"
      @categoryStatus="flash = $event"
    ></category-list>
    <p>------</p>
    <p>matchedNum</p>
    <p>{{ !!matchedNum}}</p>
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
</template>

<script>
  import CategoryForm from '../molcules/CategoryForm.vue'
  import CategoryList from '../molcules/CategoryList.vue'
  import Flash from '../atoms/Flash.vue'
  import CategoryModal from '../molcules/CategoryModal.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      CategoryForm,
      CategoryList,
      CategoryModal,
      Flash
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
  }
  .non-category-msg {
    border: 1px solid rgb(92, 21, 21);
  }
  .category-ids {
    border-bottom: 1px solid rgb(0, 0, 0);
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
