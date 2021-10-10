import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../src/template/Home.vue'
import Signup from '../src/template/Signup.vue'
import Login from '../src/template/Login.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'Home' },
    { path: '/signup', component: Signup, name: 'Signup' },
    { path: '/login', component: Login, name: 'Login' },
  ]
});
