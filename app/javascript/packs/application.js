import Vue from 'vue'
import App from '../app.vue'
import router from '../router/index'
import store from '../store/index'
import VueAxiosPlugin from '../Plugin/VueAxios'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'

Vue.use(VueAxiosPlugin, { axios: axios, csrfToken: csrfToken });

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app")
})
