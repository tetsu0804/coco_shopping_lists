export default {
  filteringMonthShopList(shoplists, regexp) {
    return shoplists.filter(shoplist => regexp.test(shoplist.purchasedate));
  },
  descendingOrderShopLists(shoplists) {
    return shoplists.sort(
      (a, b) => {
        if (a.purchasedate < b.purchasedate) {
          return 1;
        } else if (a.purchasedate > b.purchasedate) {
          return -1;
        } else {
          if(a.id < b.id) {
            return 1;
          } else if (a.id > b.id) {
            return -1;
          } else {

          }
        }
      }
    )
  },
  thisMonthTotalPrice(shoplists) {
    let total_price = 0
    if (shoplists.length > 0) {
      shoplists.forEach(shoplist => {
        total_price += shoplist.price
      });
    }
    return total_price
  },
  thisMonthLastShopList(shoplists) {
    if (shoplists.length > 0) {
      return shoplists.slice(0, 1)[0]
    } else {
      return { id: '', list_name: 'まだ購入していません。', purchasedate: '', price: '', user_id: ''}
    }
  },
  thisMonthDisplayTitle(this_month, now_regexp_judge) {
    let month_display, split_date
    if (now_regexp_judge.test(this_month.toJSON())) {
      month_display = '今月'
    } else {
      split_date = this_month.toJSON().split('-')
      month_display = split_date[0] + '年' + Number(split_date[1]) + '月'
    }
    return month_display
  }
}
