import store from '../store/index'

export const authorizeLogin = (to, from, next) => {
  if (to.matched.some(record => {
    return record.meta.requiresAuth })) {
    if (!store.state.loggedIn.signedIn) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
}
