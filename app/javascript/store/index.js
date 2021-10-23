import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    loggedIn: { signedIn: false, user: '' },
    categories: [],
    shoplists: []
  },
  getters,
  mutations,
  actions,
  plugins: [
    createPersistedState(
      { key: "coco_shopping_list" }
    )
  ]
});
