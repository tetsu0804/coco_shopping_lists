import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../src/template/Home.vue'
import Signup from '../src/template/Signup.vue'
import Login from '../src/template/Login.vue'
import MonthDetail from '../src/template/MonthDetail.vue'
import CategoryCreate from '../src/template/CategoryCreate.vue'
import { authorizeLogin } from './gurds'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'Home', meta: { requiresAuth: true } },
    { path: '/signup', component: Signup, name: 'Signup' },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/categories', component: CategoryCreate, name: 'CategoryCreate', meta: { requiresAuth: true } },
    { path: '/month_detail/:date_number', component: MonthDetail, name: 'MonthDetail', meta: { requiresAuth: true } },
  ]
});

router.beforeEach(authorizeLogin);
export default router
