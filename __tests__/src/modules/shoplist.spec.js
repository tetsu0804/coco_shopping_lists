import shoplist from '@/src/modules/shoplist'
import date from '@/src/modules/date'

describe('/modules/shoplist', () => {
  let state, shoplists
  beforeEach(() => {
    shoplists = [
      { id: 1, list_name: 'a', purchasedate: '2021-10-22T00:00:00.000Z', price: 300},
      { id: 2, list_name: 'b', purchasedate: '2021-10-10-T00:00:00.000Z', price: 400},
      { id: 3, list_name: 'c', purchasedate: '2021-09-22T00:00:00.000Z', price: 500},
      { id: 4, list_name: 'd', purchasedate: '2021-09-10T00:00:00.000Z', price: 600},
      { id: 5, list_name: 'e', purchasedate: '2021-08-22T00:00:00.000Z', price: 700},
      { id: 6, list_name: 'f', purchasedate: '2021-08-10T00:00:00.000Z', price: 800},
      { id: 7, list_name: 'g', purchasedate: '2021-07-22T00:00:00.000Z', price: 900},
      { id: 8, list_name: 'g', purchasedate: '2021-07-22T00:00:00.000Z', price: 1000},
    ]

    state = {
      shoplists
    }
  });
  describe('filteringMonthShopList', () => {
    let regexp
    it('2021-10月の shoplists を取得', () => {
      regexp = date.regexpYearMonth(new Date('2021-10-10'));
      expect(shoplist.filteringMonthShopList(state.shoplists, regexp)).toEqual([
        { id: 1, list_name: 'a', purchasedate: '2021-10-22T00:00:00.000Z', price: 300},
        { id: 2, list_name: 'b', purchasedate: '2021-10-10-T00:00:00.000Z', price: 400}
      ]);
    });

    it('2021-09月の shoplists を取得', () => {
      regexp = date.regexpYearMonth(new Date('2021-09-10'));
      expect(shoplist.filteringMonthShopList(state.shoplists, regexp)).toEqual([
        { id: 3, list_name: 'c', purchasedate: '2021-09-22T00:00:00.000Z', price: 500},
        { id: 4, list_name: 'd', purchasedate: '2021-09-10T00:00:00.000Z', price: 600}
      ]);
    });

    it('2021-08月の shoplists を取得', () => {
      regexp = date.regexpYearMonth(new Date('2021-08-10'));
      expect(shoplist.filteringMonthShopList(state.shoplists, regexp)).toEqual([
        { id: 5, list_name: 'e', purchasedate: '2021-08-22T00:00:00.000Z', price: 700},
        { id: 6, list_name: 'f', purchasedate: '2021-08-10T00:00:00.000Z', price: 800}
      ]);
    });
  });

  describe('descendingOrderShoplists', () => {
    it('state.shoplistsのpurchasedateの降順 id も降順', () => {
      expect(shoplist.descendingOrderShopLists(state.shoplists)).toEqual(
        [
          { id: 1, list_name: 'a', purchasedate: '2021-10-22T00:00:00.000Z', price:300},
          { id: 2, list_name: 'b', purchasedate: '2021-10-10-T00:00:00.000Z', price: 400},
          { id: 3, list_name: 'c', purchasedate: '2021-09-22T00:00:00.000Z', price: 500},
          { id: 4, list_name: 'd', purchasedate: '2021-09-10T00:00:00.000Z', price: 600},
          { id: 5, list_name: 'e', purchasedate: '2021-08-22T00:00:00.000Z', price: 700},
          { id: 6, list_name: 'f', purchasedate: '2021-08-10T00:00:00.000Z', price: 800},
          { id: 8, list_name: 'g', purchasedate: '2021-07-22T00:00:00.000Z', price: 1000},
          { id: 7, list_name: 'g', purchasedate: '2021-07-22T00:00:00.000Z', price: 900},
        ]
      )
      // id:8 と id: 7 の idも降順なのがわかる
    });
  });

  describe('thisMonthTotalPrice', () => {
    let this_month_shoplists
    it('2021-10 の total_price は 700  である', () => {
      this_month_shoplists = state.shoplists.slice(0, 2);
      expect(shoplist.thisMonthTotalPrice(this_month_shoplists)).toEqual(700);
    });
    it('2021-09 の total_price は 1100  である', () => {
      this_month_shoplists = state.shoplists.slice(2, 4);
      expect(shoplist.thisMonthTotalPrice(this_month_shoplists)).toEqual(1100);
    });
    it('2021-08 の total_price は 1500  である', () => {
      this_month_shoplists = state.shoplists.slice(4, 6);
      expect(shoplist.thisMonthTotalPrice(this_month_shoplists)).toEqual(1500);
    });
    it('引数に渡すデータが無いと 0 が返る (その月のデータが0 の場合)', () => {
      expect(shoplist.thisMonthTotalPrice([])).toEqual(0);
    });
  });

  describe('thisMonthLastShopList', () => {
    let this_month_shoplists
    it('2021-10 の最後のlist_name は list_name: "a"  である', () => {
      this_month_shoplists = state.shoplists.slice(0, 2);
      expect(shoplist.thisMonthLastShopList(this_month_shoplists)).toEqual({ id: 1, list_name: 'a', purchasedate: '2021-10-22T00:00:00.000Z', price:300})
    });

    it('2021-09 の最後のlist_nameは list_name: "c"  である', () => {
      this_month_shoplists = state.shoplists.slice(2, 4);
      expect(shoplist.thisMonthLastShopList(this_month_shoplists)).toEqual({ id: 3, list_name: 'c', purchasedate: '2021-09-22T00:00:00.000Z', price: 500});
    });

    it('2021-08 の最後のlist_nameは list_name: "3"  である', () => {
      this_month_shoplists = state.shoplists.slice(4, 6);
      expect(shoplist.thisMonthLastShopList(this_month_shoplists)).toEqual({ id: 5, list_name: 'e', purchasedate: '2021-08-22T00:00:00.000Z', price: 700});
    });

    it('引数に渡すデータが無いと list_name: "まだ購入していません。" が返る', () => {
      expect(shoplist.thisMonthLastShopList([])).toEqual({ id: '', list_name: 'まだ購入していません。', purchasedate: '', price: '', user_id: ''});
    });
  });

  describe('thisMonthDisplayTitle', () => {
    let now, this_month, now_judge
    it('date_num が 0 (今月) の場合 "今月" が返る', () => {
      now = new Date();
      this_month = date.getThisMonth(0);
      now_judge = date.regexpYearMonth(now)
      expect(shoplist.thisMonthDisplayTitle(this_month, now_judge)).toEqual('今月');
    });

    it('date_num が 0以上の場合 先月以降になるので 20xx年xx月 と 出る', () => {
      let match_year_month, match_month, combine
      now = new Date();
      // 先月の 20xx-xx-xxT00:00:00.000Z
      this_month = date.getThisMonth(1);
      // 先月の /2xxx-xx/ 正規表現
      now_judge = date.regexpYearMonth(now);
      // match_year_month=['20xx-xx', ....]
      match_year_month = this_month.toJSON().match(/^\d{4}-\d{2}/);
      //match_month=['20xx', 'xx']
      match_month = match_year_month[0].split('-');
      //combine= '20xx年xx月'
      combine = match_month[0] + '年' + Number(match_month[1]) + '月'
      expect(shoplist.thisMonthDisplayTitle(this_month, now_judge)).toEqual(combine);

    });
  });
});
