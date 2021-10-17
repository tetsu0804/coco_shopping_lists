<template>
  <div>
    <div v-for="category  in categories" :key="category.id">
      {{ category.category_name}}
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    categories() {
      return this.$store.getters.allCategories;
    },
  },
  watch: {
    categories: function(newValue, oldValue) {
      debugger
    }
  }
}
</script>
