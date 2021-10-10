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
  }
}
