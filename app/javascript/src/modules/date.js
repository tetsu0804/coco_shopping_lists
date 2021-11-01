export default {
  getThisMonth(date_num) {
    let now = new Date(), other_today = new Date(), this_get_month
    let this_month = new Date(other_today.setMonth(other_today.getMonth() - date_num));
    if (now.getDate() !== this_month.getDate()) {
      this_get_month = new Date(this_month.setDate(0))
    } else {
      this_get_month = this_month
    }
    return this_get_month
  },
  regexpYearMonth(date) {
    let json_date, match_date
    json_date = date.toJSON();
    match_date = json_date.match(/^\d{4}-\d{2}/g)
    return new RegExp(match_date[0]);
  },
  monthToMonthNumber(now, other_day) {
    let last_purchasedate, now_year, now_month, last_year, last_month, now_num, last_num
    last_purchasedate = new Date(other_day.purchasedate);
    now_year = Number(now.getFullYear());
    now_month = Number(now.getMonth());
    last_year = Number(last_purchasedate.getFullYear());
    last_month = Number(last_purchasedate.getMonth());
    now_num = now_year * 12 + now_month
    last_num = last_year * 12 + last_month
    return  now_num - last_num
  }
}
