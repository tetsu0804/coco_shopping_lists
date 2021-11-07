<template>
  <div class="user-show-container">
    user
  </div>
</template>

<script>
  export default {
    props: {
      userLoggedIn: {
        type: Object
      }
    },
    computed: {
      fullName() {
        return this.userLoggedIn.user.last_name + this.userLoggedIn.user.first_name
      },
      userEmail() {
        return this.userLoggedIn.user.email
      }
    }
  }
</script>
<style scoped>
  .user-show-container {
    width: 100%;
    height: 100%;
  }
</style>
