<template>
  <div class="user-show-container">
    <div class="user-details">
      名前: {{ fullName }}
    </div>
    <div class="user-details">
      email: {{ userEmail }}
    </div>
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
  .user-details {
    font-size: 1.2rem;
    text-align: center;
    margin: 0 auto;
    padding: 1% 0 0 0;
  }
</style>
