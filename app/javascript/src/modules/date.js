export default {
  getThisMonth(date_num) {
    let other_today = new Date()
    return new Date(other_today.setMonth(other_today.getMonth() - date_num));
  },
  regexpYearMonth(date) {
    let json_date, match_date
    json_date = date.toJSON();
    match_date = json_date.match(/^\d{4}-\d{2}/g)
    return new RegExp(match_date[0]);
  }
}
