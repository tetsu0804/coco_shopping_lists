<template>
  <div class="parcent-container">
    <div class="parcent-title">
      <div class="parcent-text"><slot>今月</slot></div>
    </div>
    <div class="pie-title pie-sub-container">
      <div class="pie-title-sub" v-for="user in singlePeriod.users" :key="user.user">
        <div class="pie-color pie-sub-title" :style="user.rgb"></div>
        <div class="pie-sub-title">名前: {{ userSearchId(user.user).first_name }},</div>
        <div class="pie-sub-title">{{ user.parcent }}%,</div>
        <div class="pie-sub-title">投稿数: {{ user.length}} </div>
        <div class="clear-left"></div>
      </div>
    </div>
    <div class="pie-container pie-sub-container">
      <div class="pie" :style="singlePeriod.style">
      </div>
    </div>
    <div class="clear-left"></div>
  </div>
</template>

<script>
//
import { mapGetters } from 'vuex'
  export default {
    props: {
      userLoggedIn: {
        type: Object
      },
      periodShopListUser: {
        type: Function
      },
      userSearchId: {
        type: Function
      },
      period: {
        type: String
      },
      kindsType: {
        type: String
      }
    },
    computed: {
      singlePeriod() {
        return this.periodShopListUser(this.period, this.userLoggedIn.user, this.kindsType)
      }
    }
  }
</script>

<style scoped>
.parcent-container {
  width: 100%;
  height: 100%;
}
.parcent-title {
  width: 100%;
  height: 10%;
  display: table;
}
.parcent-text {
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}
.pie-sub-container {
  float: left;
  height: 90%;
}
.pie-title {
  width: 40%;
}
.pie-container {
  width: 60%;
}
.pie-title-sub {
  width: 100%;
}
.pie-color {
  width: 1rem;
  height: 1rem;
}
.pie-sub-title {
  font-size: 10px;
  float: left;
}
.clear-left {
  clear: left;
}
.pie {
  position: relative;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.pie span {
  position: absolute;
  top: 50%;
  right: 50px;
  transform: translateY(-50%);
  color: #fff;
  font-size: 26px;
  font-weight: 700;
}
@media screen and (max-width: 480px) {
  .pie-sub-title {
    font-size: 10px;
    float: left;
    transform: scale(0.8);
    margin: 0;
    padding: 0;
  }
}
</style>
