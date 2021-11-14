import date from '../src/modules/date'
import shoplist from '../src/modules/shoplist'
import pagenation from '../src/modules/pagenation'
import chart from '../src/modules/chart'

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
  thisYearShopLists(state) {
    return (year) => {
      let filter_shoplists, regexp_year, sort_shoplists

      if (state.shoplists.length > 0) {
        //this_month = date.getThisMonth(date_num);
        regexp_year = date.regexpYear(year)
        filter_shoplists = shoplist.filteringMonthShopList(state.shoplists, regexp_year);
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
      if (user_id === -1) {
        return { id: '', last_name: 'その他', first_name: 'その他', email: ''}
      } else {
        if (state.users.length > 0) {
          get_user = state.users.filter((user) => user.id === user_id);
          return get_user.length > 0 ? get_user[0] : { id: '', last_name: '登録なし', first_name: '登録なし', email: ''}
        } else {
          return { id: '', last_name: '登録なし', first_name: '登録なし', email: ''}
        }
      }
    }
  },
  selectedShoplist(state) {
    return (shoplist_id) => {
      let get_shoplist
      if (state.shoplists.length > 0) {
        get_shoplist = state.shoplists.filter(shoplist => shoplist.id === shoplist_id);
        return get_shoplist.length > 0 ? get_shoplist[0] : { id: '', list_name: '登録なし', price: '', purchasedate: '', user_id: ''}
      } else {
        return { id: '', list_name: '登録なし', price: '', purchasedate: '', user_id: ''}
      }
    }
  },
  periodShopListUser(state, getters) {
    return (period, user, single_or_multi) => {
      let dumy_formats = [], conic_parcents = [],targets = [], colors = [], user_colors = [],now = new Date(), format_conic_gradient = { style: '', users: []}, conic_length = [],parcents = [],conic_parcent_users = [],  this_month_shoplists,this_year_shoplists, user_shoplists, other_shoplists, user_format, zero_conic, grad, all_minus_user_parcent, parcent,conic_parcent_user, conic_parcent_other, gray_image, myColor, multi_charts, conic_format, double_charts, parcent_plus, parcent_propaty_format

      gray_image = 'rgba(0, 0, 0, 0.5)'
      zero_conic = `background-image: conic-gradient(${gray_image} 0% 360%);`
      grad = 'deg'
      //grad = '%'
      if (period === 'month') {
        // 今月のshoplistsのデータ
        this_month_shoplists = getters.thisMonthShopList(0);
        // 今月のデータがあるか否か
        if (this_month_shoplists.length > 0) {
          // 今月のuser.idのデータ
          user_shoplists = this_month_shoplists.filter(shoplist => shoplist.user_id === user.id)
          // 今月のデータにuser.idのデータがあるか否か
          if (user_shoplists.length > 0) {
            //今月のデータとuser.idのデータの数が同じ = 今月のデータは全てuser.idが作成したものの場合
            if(this_month_shoplists.length === user_shoplists.length) {
              // rgb(n, n, n)作成
              myColor = chart.randomRGB();
              // ユーザー投稿数 / 全体の投稿数 * 100 = ユーザーの投稿パーセンテージ
              parcent = Math.round(user_shoplists.length / this_month_shoplists.length * 100);
              //  100 - ユーザーパーセンテージ = 他の投稿のパーセンテージ
              all_minus_user_parcent = Math.round(100 - parcent);
              // format.style = 'background-color: conic-gradient' ユーザーが100% なので 0% 360% となる
              multi_charts = [
                {user_id: user.id, shoplists: user_shoplists.length},
                {user_id: '', shoplists: ''},
              ]
              for (let i = 0; i < multi_charts.length; i++) {
                format_conic_gradient.users.push(chart.makeFormatConicGradient(parcent, multi_charts[i], myColor))
              }
              format_conic_gradient.style = `background-image: conic-gradient(${myColor} 0% 360%);`
            } else {
              // userと その他の二つだけの表示の場合
              if (single_or_multi === 'single') {
                //let conic_format
                multi_charts = chart.userIdSplitShopLists(this_month_shoplists, user.id)
                double_charts = chart.userIdAndOtherShopList(multi_charts);
                // targets.push(user_shoplists)
                // targets.push(this_month_shoplists);
                // for(let i = 0; i < targets.length; i++) {
                //   myColor = chart.randomRGB();
                //   colors.push(myColor)
                // }
                parcent_plus = 0
                for (let i = 0; i < double_charts.length; i++) {
                  myColor = chart.randomRGB();
                  // 2 / 10 * 100 = 20%
                  parcent = Math.round(double_charts[i].shoplists / this_month_shoplists.length * 100);
                  // 360 * (20% / 100) = 72%
                  conic_parcent_user = Math.round(360 * (parcent /100));
                  if (i === 0) {
                    parcent_plus += conic_parcent_user
                    conic_format = myColor + ' ' + '0' + grad + ' ' + parcent_plus + grad
                    dumy_formats.push(conic_format);
                    parcent_propaty_format = chart.makeFormatConicGradient(parcent, double_charts[i], myColor);
                  } else {
                    conic_format = myColor + ' ' + parcent_plus + grad + ' ' + (parcent_plus += conic_parcent_user) + grad
                    dumy_formats.push(conic_format)
                    parcent_propaty_format = chart.makeFormatConicGradient(parcent, double_charts[i], myColor)
                  }
                  format_conic_gradient.users.push(parcent_propaty_format);
                }

                format_conic_gradient.style = `background-image: conic-gradient(${dumy_formats.join(',')});`
              } else {
                //[ { user_id: 2, shoplists: 2 }, { user_id: 1, shoplists: 10 } ]
                multi_charts = chart.userIdSplitShopLists(this_month_shoplists, user.id)
                // colors = [rgb(n,n,n), rgb(i, i,i)]
                //let conic_format
                parcent_plus = 0
                for( let i = 0; i < multi_charts.length; i++){
                  //let parcent_propaty_format
                  // let parcent_propaty_format = {};
                  myColor = chart.randomRGB();
                  //100%中の20%
                  parcent = Math.round(multi_charts[i].shoplists / this_month_shoplists.length * 100);
                  // 360%中の72%
                  conic_parcent_user = Math.round(360 * (parcent / 100));
                  // conic_parcent_user = 360 * (parcent / 100);
                  if (i === 0) {
                    parcent_plus += conic_parcent_user
                    // parcent_plus += Math.round(conic_parcent_user)
                    conic_format = myColor + ' ' + '0' + grad + ' ' + parcent_plus + grad
                    dumy_formats.push(conic_format);
                    parcent_propaty_format = chart.makeFormatConicGradient(parcent, multi_charts[i], myColor)
                    // parcent_propaty_format.parcent = parcent
                    // parcent_propaty_format.user = multi_charts[i].user_id
                    // parcent_propaty_format.length = multi_charts[i].shoplists
                    // parcent_propaty_format.rgb = `background-color: ${myColor};`
                  } else {
                    conic_format = myColor + ' ' + parcent_plus + grad + ' ' + (parcent_plus += conic_parcent_user) + grad
                    // conic_format = myColor + ' ' + parcent_plus + '%' + ' ' + (parcent_plus += Math.round(conic_parcent_user)) + '%'
                    dumy_formats.push(conic_format)
                    parcent_propaty_format = chart.makeFormatConicGradient(parcent, multi_charts[i], myColor)
                    // parcent_propaty_format.parcent = parcent
                    // parcent_propaty_format.user = multi_charts[i].user_id
                    // parcent_propaty_format.length = multi_charts[i].shoplists
                    // parcent_propaty_format.rgb = `background-color: ${myColor};`
                  }
                  format_conic_gradient.users.push(parcent_propaty_format);
                  //colors.push(myColor);
                }
                format_conic_gradient.style = `background-image: conic-gradient(${dumy_formats.join(',')});`
                return format_conic_gradient
              }
            }
          } else {
            format_conic_gradient.style = zero_conic
            myColor = chart.randomRGB();
            format_conic_gradient.users = [
              {parcent: 0, user: user.id, length: 0, rgb: myColor},
              {parcent: 100, user: -1, length: this_month_shoplists.length, rgb: gray_image}
            ]
          }
        } else {
          format_conic_gradient.style = zero_conic
          myColor = chart.randomRGB();
          format_conic_gradient.users = [
            {parcent: 0, user: user.id, length: 0, rgb: myColor},
            {parcent: 0, user: -1 , length: 0, rgb: gray_image}
          ]
        }
      } else if( period === 'year') {
        this_year_shoplists = getters.thisYearShopLists(now);
        if (this_year_shoplists.length > 0) {
            user_shoplists = this_year_shoplists.filter(shoplist => shoplist.user_id === user.id);
          if (user_shoplists.length > 0) {
            if(this_year_shoplists.length === user_shoplists.length) {
              myColor = chart.randomRGB();
              parcent = Math.round(user_shoplists.length / this_year_shoplists.length * 100);
              all_minus_user_parcent = Math.round(100 - parcent);
              multi_charts = [
                {user_id: user.id, shoplists: user_shoplists.length},
                {user_id: '', shoplists: ''},
              ]
              for (let i = 0; i < multi_charts.length; i++) {
                format_conic_gradient.users.push(chart.makeFormatConicGradient(parcent, multi_charts[i], myColor))
              }
              format_conic_gradient.style = `background-image: conic-gradient(${myColor} 0% 360%);`
            } else {
              if (single_or_multi === 'single') {
                multi_charts = chart.userIdSplitShopLists(this_year_shoplists, user.id);
                double_charts = chart.userIdAndOtherShopList(multi_charts);

                parcent_plus = 0
                for (let i = 0; i < double_charts.length; i++) {
                  myColor = chart.randomRGB();
                  parcent = Math.round(double_charts[i].shoplists / this_year_shoplists.length * 100);
                  conic_parcent_user = Math.round(360 * (parcent /100));
                  if (i === 0) {
                    parcent_plus += conic_parcent_user
                    conic_format = myColor + ' ' + '0' + grad + ' ' + parcent_plus + grad
                    dumy_formats.push(conic_format);
                    parcent_propaty_format = chart.makeFormatConicGradient(parcent, double_charts[i], myColor);
                  } else {
                    conic_format = myColor + ' ' + parcent_plus + grad + ' ' + (parcent_plus += conic_parcent_user) + grad
                    dumy_formats.push(conic_format)
                    parcent_propaty_format = chart.makeFormatConicGradient(parcent, double_charts[i], myColor)
                  }
                  format_conic_gradient.users.push(parcent_propaty_format);
                }
                format_conic_gradient.style = `background-image: conic-gradient(${dumy_formats.join(',')});`
              } else {
                multi_charts = chart.userIdSplitShopLists(this_year_shoplists, user.id)
                parcent_plus = 0
                for( let i = 0; i < multi_charts.length; i++){
                  myColor = chart.randomRGB();
                  parcent = Math.round(multi_charts[i].shoplists / this_year_shoplists.length * 100);
                  conic_parcent_user = Math.round(360 * (parcent / 100));
                  if (i === 0) {
                    parcent_plus += conic_parcent_user
                    conic_format = myColor + ' ' + '0' + grad + ' ' + parcent_plus + grad
                    dumy_formats.push(conic_format);
                    parcent_propaty_format = chart.makeFormatConicGradient(parcent, multi_charts[i], myColor)
                  } else {
                    conic_format = myColor + ' ' + parcent_plus + grad + ' ' + (parcent_plus += conic_parcent_user) + grad
                    dumy_formats.push(conic_format)
                    parcent_propaty_format = chart.makeFormatConicGradient(parcent, multi_charts[i], myColor)

                  }
                  format_conic_gradient.users.push(parcent_propaty_format);
                }
                format_conic_gradient.style = `background-image: conic-gradient(${dumy_formats.join(',')});`
                return format_conic_gradient
              }
            }
          } else {
            format_conic_gradient.style = zero_conic
            myColor = chart.randomRGB();
            format_conic_gradient.users = [
              {parcent: 0, user: user.id, length: 0, rgb: myColor},
              {parcent: 100, user: -1, length: this_year_shoplists.length, rgb: gray_image}
            ]
          }
        } else {
          format_conic_gradient.style = zero_conic
          myColor = chart.randomRGB();
          format_conic_gradient.users = [
            {parcent: 0, user: user.id, length: 0, rgb: myColor},
            {parcent: 0, user: -1 , length: 0, rgb: gray_image}
          ]
        }
      }
      return format_conic_gradient
    }
  }
}
