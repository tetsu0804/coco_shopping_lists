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
  },
  createAllShopList(state, { categories: categories, shoplists: shoplists, category_shoplists: category_shoplists}) {
    let format_list, categories_box = []
    if (categories.length > 0) {
      state.categories = categories
      if (shoplists.length > 0) {
        state.shoplists = []
        shoplists.forEach(shoplist => {
          categories_box = []
          category_shoplists.forEach(result => {
            if (shoplist.id === result.shop_list_id) {
              format_list = shoplist
              categories_box.push(result.category_id)
            }
          });
          format_list.categories = categories_box
          state.shoplists.push(format_list)
        });
      } else {
        state.shoplists = []
      }
    } else {
      state.categories = []
      state.shoplists = []
    }
  },
  allDeleteShopList(state) {
    state.shoplists = []
  },
  updateShopList(state, { update_shoplist: update_shoplist, categories: categories }) {
    let match_shoplist_index, change_shoplist
    change_shoplist = update_shoplist
    if (!!change_shoplist) {
      change_shoplist.categories = categories
      match_shoplist_index = state.shoplists.findIndex(shoplist => shoplist.id === update_shoplist.id);
      if (match_shoplist_index >= 0) {
        state.shoplists.splice(match_shoplist_index, 1, change_shoplist)
      }
    }
  },
  deleteShopList(state, shoplist_id) {
    let match_shoplist_index
    match_shoplist_index = state.shoplists.findIndex(shoplist => shoplist.id === shoplist_id);
    if (match_shoplist_index >= 0) {
      state.shoplists.splice(match_shoplist_index, 1);
    }
  }
}
