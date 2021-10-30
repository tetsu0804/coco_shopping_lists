import date from '../src/modules/date'
import shoplist from '../src/modules/shoplist'
import pagenation from '../src/modules/pagenation'

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
  },
  arrowRight(state) {
    return (date_num) =>{
      let now = new Date(), order_shoplists, last_shoplist, num_length
      order_shoplists = shoplist.descendingOrderShopLists(state.shoplists);

      last_shoplist = order_shoplists[order_shoplists.length -1];
      num_length = date.monthToMonthNumber(now, last_shoplist);
      return date_num < num_length ? true : false
    }
  },
  pageSplit(state, getters) {
    return (date_num, page_num, page_in_total) => {
      let this_month_shoplists, page_num_x_page_total, slice_shoplists
      this_month_shoplists = getters.thisMonthShopList(date_num);
      page_num_x_page_total = page_num * page_in_total
      slice_shoplists = this_month_shoplists.slice(page_num_x_page_total, page_num_x_page_total + page_in_total)

      return slice_shoplists.length > 0 ? slice_shoplists : [{id: '', list_name: 'ページ範囲外になっています', price: '', purchasedae: '', user_id: ''}]
    }
  },
  pageNation(state, getters) {
    return (date_num, page_num, page_in_total) => {
      let format_pagenation = { pages: '', page_container: ''},this_month_shoplists, total_num, next_page, prev_page, first_page, base_style, normal_page, collect_pages, target_style, last_page, page_number
      this_month_shoplists = getters.thisMonthShopList(date_num);
      page_number = page_num + 1;

      base_style = 'width: 2rem; height: 2rem; border-radius: 50%; text-align: center; margin-left: 4px; line-height: 2rem;'
      target_style = 'width: 2.5rem; height: 2.5rem; text-align: center; border-radius: 50%; position: relative; top: -10%; line-height: 2.5rem; margin-left: 4px;'
      next_page = { text: '次', style: base_style, click: +1, target: '' }
      prev_page = { text: '前', style: base_style, click: -1, target: '' }
      first_page = { text: 1, style: base_style, click: 1, target: 'first'}
      last_page = { text: '', style: base_style, click: '', target: 'last'}
      normal_page = { text: '', style: base_style, click: 0, target: '' }

      if (this_month_shoplists.length > 0) {
        total_num = Math.ceil(this_month_shoplists.length / page_in_total);
        if (total_num <= 0 ) {
          format_pagenation.page_container = "width: 3rem;"
          normal_page.text = '・'
          collect_pages = pagenation.pagenatePush(normal_page)
        } else if (total_num > 0) {
          if(total_num === 1) {
            format_pagenation.page_container = "width: 3rem;"
            first_page.style = target_style
            collect_pages = pagenation.pagenatePush(first_page)
          } else if (total_num > 1) {
            if (page_number <= 1) {
              format_pagenation.page_container = "width: 7.5rem;"
              first_page.style = target_style
              first_page.click = 1
              last_page.click = total_num
              last_page.text = total_num
              collect_pages = pagenation.pagenatePush(first_page, last_page, next_page)
            } else if ((page_number ) >= total_num) {
              format_pagenation.page_container = "width: 7.5rem;"
              last_page.text = total_num
              last_page.style = target_style
              last_page.click = total_num
              collect_pages = pagenation.pagenatePush(prev_page, first_page, last_page)
            } else {
              format_pagenation.page_container = "width: 11.5rem;"
              normal_page.text = page_number
              normal_page.style = target_style
              normal_page.click = page_number
              last_page.text = total_num
              last_page.click = total_num
              collect_pages = pagenation.pagenatePush(prev_page, first_page, normal_page, last_page, next_page)
            }
          }
        }
      } else {
        format_pagenation.page_container = "width: 2.5rem;"
        normal_page.text = '・'
        collect_pages = pagenation.pagenatePush(normal_page);
      }

      format_pagenation.pages = collect_pages;
      return format_pagenation
    }
  },
  userSearchId(state) {
    return (user_id) => {
      let get_user
      get_user = state.users.filter((user) => user.id === user_id);
      return get_user.length > 0 ? get_user[0] : { id: '', last_name: '登録なし', first_name: '登録なし', email: ''}
    }
  }
}
