<template>
  <div>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    category
    <flash
      :flash="flash"
      @closeFlash="flash = { message: '', status: '' }"
    ></flash>
    <category-form
      @categoryStatus="flash = $event"
    ></category-form>
    <div v-for="category in allCategories" :key="category.id">
      {{ category.category_name }}
    </div>
  </div>
</template>

<script>
  import CategoryForm from '../molcules/CategoryForm.vue'
  import Flash from '../atoms/Flash.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      CategoryForm,
      Flash
    },
    data() {
      return {
        flash: { message: '', status: '' },
      }
    },
    computed: mapGetters(['allCategories'])
  }
</script>

<style scoped>
  .non-category-msg {
    border: 1px solid rgb(92, 21, 21);
  }
  .category-ids {
    border-bottom: 1px solid rgb(0, 0, 0);
  }
</style>
