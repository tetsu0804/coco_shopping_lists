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
  }
}
