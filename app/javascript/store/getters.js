import date from '../src/modules/date'
import shoplist from '../src/modules/shoplist'

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
  },
  allShoplists(state) {
    return state.shoplists
  },
  // ◯年◯月のsort したstate.shoplists
  thisMonthShopList(state) {
    return (date_num) => {
      let this_month, filter_shoplists, regexp_month, sort_shoplists

      if (state.shoplists.length > 0) {
        this_month = date.getThisMonth(date_num);
        regexp_month = date.regexpYearMonth(this_month)
        filter_shoplists = shoplist.filteringMonthShopList(state.shoplists, regexp_month);
        sort_shoplists = filter_shoplists.length > 0 ? shoplist.descendingOrderShopLists(filter_shoplists): []
      } else {
        sort_shoplists = []
      }
      return sort_shoplists
    }
  },
  mainDisplay(state, getters) {
    return (date_num) => {
      let now = new Date(), total_price = 0, format_display = {last_shoplist: '', total_price: '', month_display: ''}, date_num_month_shoplists, this_month, now_judge, split_date, month_display, last_shoplist

      date_num_month_shoplists = getters.thisMonthShopList(date_num);

      format_display.total_price = shoplist.thisMonthTotalPrice(date_num_month_shoplists);

      format_display.last_shoplist = shoplist.thisMonthLastShopList(date_num_month_shoplists);

      this_month = date.getThisMonth(date_num);
      now_judge = date.regexpYearMonth(now)

      format_display.month_display = shoplist.thisMonthDisplayTitle(this_month, now_judge);

      return format_display
    }
  }
}
