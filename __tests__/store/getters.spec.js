import getters from '@/store/getters'
import date from '@/src/modules/date'
import shoplist from '@/src/modules/shoplist'

describe('/store/getters', () => {
  let state
  beforeEach(() => {
    state = {
      users: [
        { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' },
        { id: 2, last_name: '田中', first_name: '二郎', email: 'test1@test.com' },
      ],
      loggedIn: { signedIn: true, user: { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' } },
      categories: [
        { id: 1, category_name: 'ご飯', user_id: 1 },
        { id: 2, category_name: 'おやつ', user_id: 2 },
        { id: 3, category_name: 'しつけ', user_id: 1 },
        { id: 4, category_name: 'おもちゃ', user_id: 2}
      ],
      shoplists: []
    }
  });
  describe('allUsers', () => {
    it('state.usersと同じ中身が入っている', () => {
      expect(getters.allUsers(state)).toMatchObject([
        { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' },
        { id: 2, last_name: '田中', first_name: '二郎', email: 'test1@test.com' },
      ]);
    });
  });

  describe('userLoggedIn', () => {
    it('ログインしている時の userLoggedInの中身', () => {
      expect(getters.userLoggedIn(state)).toMatchObject(
        {
          signedIn: true,
          user: { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' }
        }
      )
    });

    it('ログインしていない時の userLoggedInの中身', () => {
      state.loggedIn = { signedIn: false, user: '' }
      expect(getters.userLoggedIn(state)).toMatchObject(
        {
          signedIn: false,
          user: ''
        }
      )
    });
  });

  describe('allCategories', () =>{
    it('state.categoriesの値と同じである', () => {
      expect(getters.allCategories(state)).toEqual([
        { id: 1, category_name: 'ご飯', user_id: 1 },
        { id: 2, category_name: 'おやつ', user_id: 2 },
        { id: 3, category_name: 'しつけ', user_id: 1 },
        { id: 4, category_name: 'おもちゃ', user_id: 2}
      ]);
    });
  });

  describe('selectedCategory', () => {
    let selected
    it('{id:2 category_name: "おやつ"} を 取得する', () => {
      selected = getters.selectedCategory(state)
      expect(selected(2)).toEqual(
        { id: 2, category_name: 'おやつ', user_id: 2 }
      )
    });
    it('category_idが存在しない場合は { id: "", category_name: "登録なし", user_id: ""} となる', () => {
      selected = getters.selectedCategory(state)
      expect(selected(5)).toEqual(
        { id: '', category_name: '登録なし', user_id: '' }
      )
    });
  });

  describe('state.shoplists', () => {
    let another_shoplists = [], format_shoplist, dates =[], category_shoplists = [], date_now, another_date, new_date, change_id, category_shoplist_format
    beforeEach(() => {
      // state.shoplistsを作成している 合計 366個作成
      // {id: 1, list_name: 'ショップリスト1', price: 5000, purchasedate: 今日 - 365}
      // .
      // .
      // {id: 366, list_name: '366', price: 5000, purchasedate: 今日}

      // category_shoplistsを作成している 合計 366個作成
      // {id: 1, category_id: ?, shop_list_id: 1}
      // .
      // .
      // {id: 366, category_id: ?, shop_list_id: 366}
      for (let i = 0; i < 366; i++) {
        another_date = 365 - i
        date_now = new Date();
        new_date = new Date(date_now.setDate(date_now.getDate() - another_date ));
        change_id = i + 1
        format_shoplist = {id: change_id, list_name: 'ショップリスト' + change_id, price: 5000, purchasedate: new_date.toJSON() , user_id: 1 }
        if (i % 7 === 0) {
          category_shoplist_format = { category_id: 3, shop_list_id: change_id }
        } else if (i % 5 === 0) {
          category_shoplist_format = { category_id: 4, shop_list_id: change_id }
        } else if (i % 3 === 0) {
          category_shoplist_format = { category_id: 1, shop_list_id: change_id }
        } else {
          category_shoplist_format = { category_id: 2, shop_list_id: change_id}
        }
        state.shoplists.push(format_shoplist)
        category_shoplists.push(category_shoplist_format)
      }
    });

    describe('thisMonthShopList', () => {
      let this_month_list, this_month_last_num, today_this_month_shoplist, test_month, test_regexp, filter_shoplists, sort_shoplists
      beforeEach(() => {
        this_month_list = getters.thisMonthShopList(state)

      });
      it('引数に 0 (今月) を渡すと 今月のShopListが取得できる (降順)', () => {

        // test_month=2021-00-00T13:35:22.912Z オブジェクト
        test_month = date.getThisMonth(0);
        // /2021-00-00/ 正規表現 RegExpオブジェクト
        test_regexp = date.regexpYearMonth(test_month);
        // 2021-00月のstate.shoplistsデータ
        filter_shoplists = state.shoplists.filter(shoplist => test_regexp.test(shoplist.purchasedate));
        // filter_shoplistsの降順データ
        sort_shoplists = shoplist.descendingOrderShopLists(filter_shoplists);

        expect(this_month_list(0)).toEqual(sort_shoplists);
      });

      it('引数に 1 (先月) を渡すと 先月のShopListが取得できる (降順)', () => {
        // test_month=2021-00-00T13:35:22.912Z オブジェクト
        test_month = date.getThisMonth(1);
        // /2021-00-00/ 正規表現 RegExpオブジェクト
        test_regexp = date.regexpYearMonth(test_month);
        // 2021-00月のstate.shoplistsデータ
        filter_shoplists = state.shoplists.filter(shoplist => test_regexp.test(shoplist.purchasedate));
        // filter_shoplistsの降順データ
        sort_shoplists = shoplist.descendingOrderShopLists(filter_shoplists);

        expect(this_month_list(1)).toEqual(sort_shoplists);
      });

      it('引数に 3 (3ヶ月前) を渡すと 先月のShopListが取得できる (降順)', () => {
        // test_month=2021-00-00T13:35:22.912Z オブジェクト
        test_month = date.getThisMonth(3);
        // /2021-00-00/ 正規表現 RegExpオブジェクト
        test_regexp = date.regexpYearMonth(test_month);
        // 2021-00月のstate.shoplistsデータ
        filter_shoplists = state.shoplists.filter(shoplist => test_regexp.test(shoplist.purchasedate));
        // filter_shoplistsの降順データ
        sort_shoplists = shoplist.descendingOrderShopLists(filter_shoplists);

        expect(this_month_list(3)).toEqual(sort_shoplists);
      });

      it('state.shoplistsにデータがない時', () => {
        let other_this_month_list
        state.shoplists = [];
        other_this_month_list = getters.thisMonthShopList(state);
        expect(other_this_month_list(0)).toEqual([]);
      });

      it('state.shoplistsにデータはあるがその月にデータがない時', () => {
        expect(this_month_list(13)).toEqual([]);
      });
    });

    describe('mainDisplay', () => {
      let format_list =  {last_shoplist: '', total_price: '', month_display: ''}, main_display, this_month, now_judge, now, test_regexp, this_shoplists, descending_sort_shop_lists, other_getters

      beforeEach(() => {
        other_getters = {
          thisMonthShopList: getters.thisMonthShopList(state)
        }

        main_display = getters.mainDisplay(state, other_getters);
      });
      it('0 今月を引数に渡した時に "今月" と "合計金額" と "最後の購入品" ', () => {
        now = new Date();
        // month_display取得('今月' or '20xx年xx月')
        this_month = date.getThisMonth(0);
        now_judge = date.regexpYearMonth(now);
        format_list.month_display = shoplist.thisMonthDisplayTitle(this_month, now_judge);
        //---
        // total_price の取得
        test_regexp = date.regexpYearMonth(this_month);
        this_shoplists = state.shoplists.filter(shoplist => test_regexp.test(shoplist.purchasedate));
        format_list.total_price = shoplist.thisMonthTotalPrice(this_shoplists);
        //--

        // last_shoplist 最後の購入品
        descending_sort_shop_lists = shoplist.descendingOrderShopLists(this_shoplists);
        format_list.last_shoplist = shoplist.thisMonthLastShopList(descending_sort_shop_lists);
        //-- ここまで {last_shoplist: { shoplist }, total_price: 1xxxx, month_display: '今月' } を作成した
        expect(main_display(0)).toEqual(format_list);

      });
      it('1 先月を引数に渡した時に "先月の〇〇年〇〇月" と "合計金額" と "最後の購入品" ', () => {
        now = new Date();
        // month_display取得('今月' or '20xx年xx月')
        this_month = date.getThisMonth(1);
        now_judge = date.regexpYearMonth(now);
        format_list.month_display = shoplist.thisMonthDisplayTitle(this_month, now_judge);
        //---
        // total_price の取得
        test_regexp = date.regexpYearMonth(this_month);
        this_shoplists = state.shoplists.filter(shoplist => test_regexp.test(shoplist.purchasedate));
        format_list.total_price = shoplist.thisMonthTotalPrice(this_shoplists);
        //--

        // last_shoplist 最後の購入品
        descending_sort_shop_lists = shoplist.descendingOrderShopLists(this_shoplists);
        format_list.last_shoplist = shoplist.thisMonthLastShopList(descending_sort_shop_lists);
        //-- ここまで {last_shoplist: { shoplist }, total_price: 1xxxx, month_display: '今月' } を作成した
        expect(main_display(1)).toEqual(format_list);

      });
      it('12 一年前を引数に渡した時に "先月の〇〇年〇〇月" と "合計金額" と "最後の購入品" ', () => {
        now = new Date();
        // month_display取得('今月' or '20xx年xx月')
        this_month = date.getThisMonth(12);
        now_judge = date.regexpYearMonth(now);
        format_list.month_display = shoplist.thisMonthDisplayTitle(this_month, now_judge);
        //---
        // total_price の取得
        test_regexp = date.regexpYearMonth(this_month);
        this_shoplists = state.shoplists.filter(shoplist => test_regexp.test(shoplist.purchasedate));
        format_list.total_price = shoplist.thisMonthTotalPrice(this_shoplists);
        //--

        // last_shoplist 最後の購入品
        descending_sort_shop_lists = shoplist.descendingOrderShopLists(this_shoplists);
        format_list.last_shoplist = shoplist.thisMonthLastShopList(descending_sort_shop_lists);
        //-- ここまで {last_shoplist: { shoplist }, total_price: 1xxxx, month_display: '今月' } を作成した
        expect(main_display(12)).toEqual(format_list);
      });
      it('データのない月 を渡すと', () => {
        now = new Date();
        // month_display取得('今月' or '20xx年xx月')
        this_month = date.getThisMonth(13);
        now_judge = date.regexpYearMonth(now);
        format_list.month_display = shoplist.thisMonthDisplayTitle(this_month, now_judge);
        format_list.last_shoplist = { id: '', list_name: 'まだ購入していません。', purchasedate: '', price: '', user_id: ''}
        format_list.total_price = 0

        expect(main_display(13)).toEqual(format_list);
      });
    });

    describe('arrowRight (state.shoplistsを元にしているデータ)', () => {
      // state.shoplistsのpurchasedateの最後から二番目のデータの日付(月) まで true で最後の日付(月) は false
      let arrow_right
      beforeEach(() => {
        arrow_right = getters.arrowRight(state);
      });
      it('今月 (0) を入れると true', () => {
        expect(arrow_right(0)).toEqual(true);
      });
      it('先月 (1) を入れると true', () => {
        expect(arrow_right(1)).toEqual(true);
      });
      it('11ヶ月前 (11) を入れると true', () => {
        expect(arrow_right(11)).toEqual(true);
      });
      it('state.shoplistsの一番古いデータは丁度一年前なので 12 を入れると false', () => {
        expect(arrow_right(12)).toEqual(false);
      });
      it('state.shoplistsの一番古いデータより前のデータ 12以上 を入れると false', () => {
        expect(arrow_right(13)).toEqual(false);
      });
    });

    describe('pageSplit', () => {
      let page_split, other_getters, this_month_shoplists, page_num, page_in_total, page_num_x_page_total, slice_this_month_shoplists
      beforeEach(() => {
        other_getters = {
          thisMonthShopList: getters.thisMonthShopList(state)
        }
        page_split = getters.pageSplit(state, other_getters);
      });

      it('今月 date_num = 0, ページ内 10個 page_in_total = 10, 現在のページナンバー 0p page_num = 0 を入れると state.shoplists の 今月 降順 0-10個のデータが表示する', () => {
        this_month_shoplists = getters.thisMonthShopList(state);
        page_num = 0
        page_in_total = 10
        page_num_x_page_total = page_num * page_in_total
        slice_this_month_shoplists = this_month_shoplists(0).slice(page_num_x_page_total, page_num_x_page_total + page_in_total)
        expect(page_split(0, 0, 10)).toEqual(slice_this_month_shoplists);
      });

      it('今月 date_num = 0, ページ内 10個 page_in_total = 10, 現在のページナンバー 1p page_num = 1 を入れると state.shoplists の 今月 降順 10-20個のデータが表示する', () => {
        let format_this_month_shoplists, no_shoplists
        no_shoplists = [
          {
            id: '',
            list_name: 'ページ範囲外になっています',
            price: '',
            purchasedae: '',
            user_id: ''
          }
        ]

        this_month_shoplists = getters.thisMonthShopList(state);
        page_num = 1
        page_in_total = 10
        page_num_x_page_total = page_num * page_in_total
        slice_this_month_shoplists = this_month_shoplists(0).slice(page_num_x_page_total, page_num_x_page_total + page_in_total)

        format_this_month_shoplists = slice_this_month_shoplists.length > 0 ? slice_this_month_shoplists : no_shoplists

        expect(page_split(0, 1, 10)).toEqual(no_shoplists);
      });

      it('先月 date_num = 1, ページ内 10個 page_in_total = 10, 現在のページナンバー 0p page_num = 0 を入れると state.shoplists の 先月 降順 0-10個のデータが表示する', () => {
        this_month_shoplists = getters.thisMonthShopList(state);
        page_num = 0
        page_in_total = 10
        page_num_x_page_total = page_num * page_in_total
        slice_this_month_shoplists = this_month_shoplists(1).slice(page_num_x_page_total, page_num_x_page_total + page_in_total)
        expect(page_split(1, 0, 10)).toEqual(slice_this_month_shoplists);
      });

      it('先月 date_num = 1, ページ内 10個 page_in_total = 10, 現在のページナンバー 1p page_num = 1 を入れると state.shoplists の 先月 降順 10-20個のデータが表示する', () => {
        this_month_shoplists = getters.thisMonthShopList(state);
        page_num = 1
        page_in_total = 10
        page_num_x_page_total = page_num * page_in_total
        slice_this_month_shoplists = this_month_shoplists(1).slice(page_num_x_page_total, page_num_x_page_total + page_in_total)
        expect(page_split(1, 1, 10)).toEqual(slice_this_month_shoplists);
      });

      it('一年前 date_num = 12, ページ内 10個 page_in_total = 10, 現在のページナンバー 0p page_num = 0 を入れると state.shoplists の 一年前 降順 0-10個のデータが表示する', () => {
        this_month_shoplists = getters.thisMonthShopList(state);
        page_num = 0
        page_in_total = 10
        page_num_x_page_total = page_num * page_in_total
        slice_this_month_shoplists = this_month_shoplists(12).slice(page_num_x_page_total, page_num_x_page_total + page_in_total)
        expect(page_split(12, 0, 10)).toEqual(slice_this_month_shoplists);
      });

      it('13ヶ月前 (データ無し) date_num = 13, ページ内 10個 page_in_total = 10, 現在のページナンバー 0p page_num = 0 を入れると state.shoplists の 一年前 降順 0-10個のデータが表示する', () => {
        expect(page_split(13, 0, 10)).toEqual([
          {id: '', list_name: 'ページ範囲外になっています', price: '', purchasedae: '', user_id: ''}
        ]);
      });
    });

    describe('pageNation', () => {
      let page_nation, other_getters, target_style, base_style, page_in_total, page_all_num
      beforeEach(() => {
        other_getters = {
          thisMonthShopList: getters.thisMonthShopList(state)
        }
        page_nation = getters.pageNation(state, other_getters)
        target_style = 'width: 2.5rem; height: 2.5rem; text-align: center; border-radius: 50%; position: relative; top: -10%; line-height: 2.5rem; margin-left: 4px;'
        base_style = 'width: 2rem; height: 2rem; border-radius: 50%; text-align: center; margin-left: 4px; line-height: 2rem;'
      });
      describe('先月=1 ページ内総数=10', () => {
        beforeEach(() => {
          page_in_total = 10
          page_all_num = Math.ceil(other_getters.thisMonthShopList(1).length / page_in_total);
        });
        it('ページ数 1', () => {
          // 先月のshoplistの数は 30
          expect(page_nation(1, 0, 10)).toEqual(
            {
              pages: [
                { text: 1, style: target_style, click: 1, target: 'first' },
                { text: page_all_num, style: base_style, click: page_all_num, target: 'last'},
                { text: '次', style: base_style, click: +1, target: ''}
              ],
              page_container: 'width: 7.5rem;'
            }
          );
        });
        it('ページ数 2', () => {
          // 先月のshoplistの数は 30
          expect(page_nation(1, 1, 10)).toEqual(
            {
              pages: [
                { text: '前', style: base_style, click: -1, target: '' },
                { text: 1, style: base_style, click: 1, target: 'first' },
                { text: 2, style: target_style, click: 2, target: ''},
                { text: page_all_num, style: base_style, click: page_all_num, target: 'last'},
                { text: '次', style: base_style, click: +1, target: ''}
              ],
              page_container: 'width: 11.5rem;'
            }
          );
        });

        it('ページ数 3 (ラストページ)', () => {
          // 先月のshoplistの数は 30

          expect(page_nation(1, page_all_num -1 , 10)).toEqual(
            {
              pages: [
                { text: '前', style: base_style, click: -1, target: '' },
                { text: 1, style: base_style, click: 1, target: 'first' },
                { text: page_all_num, style: target_style, click: page_all_num, target: 'last'},
              ],
              page_container: 'width: 7.5rem;'
            }
          );
        });
        it('ページ数が 1 より 小さい数', () => {
          // 先月のshoplistの数は 30
          expect(page_nation(1, -1, 10)).toEqual(
            {
              pages: [
                { text: 1, style: target_style, click: 1, target: 'first' },
                { text: page_all_num, style: base_style, click: page_all_num, target: 'last'},
                { text: '次', style: base_style, click: +1, target: ''}
              ],
              page_container: 'width: 7.5rem;'
            }
          );
        });
        it('ページ数 4 (ラストページより多い数)', () => {
          // 先月のshoplistの数は 30
          expect(page_nation(1, 3, 10)).toEqual(
            {
              pages: [
                { text: '前', style: base_style, click: -1, target: '' },
                { text: 1, style: base_style, click: 1, target: 'first' },
                { text: page_all_num, style: target_style, click: page_all_num, target: 'last'},
              ],
              page_container: 'width: 7.5rem;'
            }
          );
        });
      });
    });

    describe('selectedShoplist', () => {
      let selected_shoplist
      beforeEach(() => {
        selected_shoplist = getters.selectedShoplist(state);
      });
      it('今日のshoplistを取得', () => {
        expect(selected_shoplist(366)).toEqual(
          state.shoplists[365]
        );
      });
      it('id 1 の shoplist', () => {
        expect(selected_shoplist(1)).toEqual(
          state.shoplists[0]
        );
      });
      it('登録さていないidが渡ると list_name=登録なし となる', () => {
        expect(selected_shoplist(367)).toEqual(
          { id: '', list_name: '登録なし', price: '', purchasedate: '', user_id: ''}
        );
      });
      it('登録さていないid (-1) が渡ると list_name=登録なし となる', () => {
        expect(selected_shoplist(-1)).toEqual(
          { id: '', list_name: '登録なし', price: '', purchasedate: '', user_id: ''}
        );
      });
      it('state.shoplistsの中身がからだとlist_name=登録なし となる', () => {
        state.shoplists = [];
        selected_shoplist = getters.selectedShoplist(state);
        expect(selected_shoplist(365)).toEqual(
          { id: '', list_name: '登録なし', price: '', purchasedate: '', user_id: ''}
        );
      });
    });
  });

  describe('userSearchId', () => {
    let user_search
    beforeEach(() => {
      user_search = getters.userSearchId(state);
    });
    it('user.id = 1 の 吉田太朗 を取得する', () => {
      expect(user_search(1)).toEqual(
        { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' }
      );
    });
    it('user.id = 2 の 吉田二郎 を取得する', () => {
      expect(user_search(2)).toEqual(
        { id: 2, last_name: '田中', first_name: '二郎', email: 'test1@test.com' }
      );
    });
    it('user.id = 3 登録されていない id を取得しようとすると 登録なしとでる', () => {
      expect(user_search(3)).toEqual(
        { id: '', last_name: '登録なし', first_name: '登録なし', email: '' }
      );
    });
    it('user.id = -1 登録されていない id を取得しようとすると 登録なしとでる', () => {
      expect(user_search(-1)).toEqual(
        { id: '', last_name: '登録なし', first_name: '登録なし', email: '' }
      );
    });
  });
});
