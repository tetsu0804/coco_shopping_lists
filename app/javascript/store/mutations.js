export default {
  createUsers(state, user) {
    state.users.push(user);
  },
  loggedInUser(state, user) {
    state.loggedIn = { signedIn: true, user: user }
  },
  logoutUser(state) {
    state.loggedIn.signedIn = false
    state.loggedIn.user = ''
  },
  createCategory(state, category) {
    state.categories.push(category)
  },
  createAllCategories(state, categories) {
    state.categories = categories
  },
  updateCategory(state, update_category) {
    let match_category_index
    match_category_index = state.categories.findIndex(category => category.id === update_category.id)
    if (match_category_index >= 0) {
      state.categories.splice(match_category_index, 1, update_category)
    }
  },
  deleteCategory(state, category_num) {
    let match_category_index
    match_category_index = state.categories.findIndex(category => category.id === category_num);
    if (match_category_index >= 0) {
      state.categories.splice(match_category_index, 1);
    }
  },
  allDeleteCategory(state) {
    state.categories = []
  },
  createShopList(state, { shoplist: shoplist, categories: categories}) {
    const list = shoplist
    list.categories = categories
    state.shoplists.push(list)
  }
}
