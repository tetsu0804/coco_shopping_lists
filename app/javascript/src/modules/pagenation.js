export default {
  pagenatePush() {
    let pagenate_collects = []
    if (arguments.length > 0) {
      for (let i = 0; i < arguments.length; i++) {
        pagenate_collects.push(arguments[i])
      }
    }
    return pagenate_collects
  }
}
