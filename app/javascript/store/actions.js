export default {
  fetchCreateUsers({ commit }, user) {
    commit('createUsers', user);
  },
  fetchLoggedInUser( { commit }, user) {
    commit('loggedInUser', user);
  },
  fetchLogoutUser( { commit }) {
    commit('logoutUser');
  },
  fetchCreateCategory( { commit }, categories) {
    commit('createCategory', categories)
  },
  fetchCreateAllCategories( { commit }, categories) {
    commit('createAllCategories', categories)
  },
  fetchUpdateCategory( { commit }, update_category) {
    commit('updateCategory', update_category)
  },
  fetchDeleteCategory( { commit }, delete_category_num) {
    commit('deleteCategory', delete_category_num)
  },
  fetchAllDeleteCategory( { commit }) {
    commit('allDeleteCategory')
  },
  fetchCreateShopList( { commit }, { shoplist: shoplist, categories: categories }) {
    commit('createShopList', { shoplist: shoplist, categories: categories})
  },
  fetchAllCreateShopList( { commit }, { categories: categories, shoplists: shoplists, category_shoplists: category_shoplists}) {
    commit('createAllShopList', { categories: categories, shoplists: shoplists, category_shoplists: category_shoplists})
  },
  fetchAllDeleteShopList( { commit }) {
    commit('allDeleteShopList')
  },
  fetchUpdateShopList( { commit }, { update_shoplist: update_shoplist, categories: categories }) {
    commit('updateShopList', { update_shoplist: update_shoplist, categories: categories })
  },
  fetchDeleteShopList( { commit }, shoplist_id) {
    commit('deleteShopList', shoplist_id)
  }
}
