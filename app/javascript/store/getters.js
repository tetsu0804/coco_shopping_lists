export default {
  allUsers(state) {
    return state.users
  },
  userLoggedIn(state) {
    return state.loggedIn
  },
  allCategories(state) {
    if (state.categories.length > 0) {
      return state.categories
    } else {
      return [{ id: '' , category_name: '登録なし' }]
    }
  },
  selectedCategory(state) {
    return (category_id) => {
      let selected = []
      if (!!state.categories) {
        for(let i = 0; i < state.categories.length; i++) {
          if (state.categories[i].id === category_id) {
            selected.push(state.categories[i])
          }
        }
      }
      return !!selected.length ? selected[0] : {id: '', category_name: '登録なし', user_id: ''}
    }
  }
}
