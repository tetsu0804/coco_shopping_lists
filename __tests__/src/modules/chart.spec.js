import chart from '@/src/modules/chart'

describe('/modules/chart', () => {
  describe('colors rgbカテゴリ', () => {
    describe('randomRGB', () => {
      let matchs = /^rgb\(\s*?\d{1,3},\s*?\d{1,3},\s*?\d{1,3}\)/
      it('ランダムな rgb(n, n, n) ができる', () => {
        expect(chart.randomRGB()).toMatch(matchs);
      });
    });
  });

  describe('shoplist.user_id shoplistカテゴリ', () => {
    let state, another_date, date_now, new_date, change_id, format_shoplist, category_shoplist_format, set_date, delete_shoplists_index

    beforeEach(() => {
      state = {
        shoplists: []
      }
      for (let i = 0; i < 30; i++) {
        date_now = new Date();
        change_id = i + 1
        if (i < 10) {
          set_date = new Date(date_now.setDate(10));
          format_shoplist = {id: change_id, list_name: 'ショップリスト' + change_id, price: 5000, purchasedate: set_date.toJSON() , user_id: 1 }
        } else if (i < 20) {
          set_date = new Date(date_now.setDate(11));
          format_shoplist = {id: change_id, list_name: 'ショップリスト' + change_id, price: 5000, purchasedate: set_date.toJSON() , user_id: 2 }
        } else if (i < 30) {
          set_date = new Date(date_now.setDate(12));
          format_shoplist = {id: change_id, list_name: 'ショップリスト' + change_id, price: 5000, purchasedate: set_date.toJSON() , user_id: 3 }
        }
        state.shoplists.push(format_shoplist);
      }
    });

    describe('userIdSplitShopLists', () => {
      it('(user.id=2) state.shoplistsの中の user_id の投稿を分割する', () => {
        state.shoplists.push({id: 40, list_name: 'ショップリスト40', price: 5000, purchasedate: new Date().toJSON() , user_id: 1 });
        expect(chart.userIdSplitShopLists(state.shoplists, 2)).toEqual([
          {user_id: 2, shoplists: 10},
          {user_id: 1, shoplists: 11},
          {user_id: 3, shoplists: 10}
        ]);
      });

      it('(user.id=2) state.shoplists.length = 0', () => {
        state.shoplists = [];
        expect(chart.userIdSplitShopLists(state.shoplists, 2)).toEqual([
          {user_id: 2, shoplists: 0},
          {user_id: '', shoplists: ''}
        ]);
      });

      it('(user.id=2) user = 0, 他のids = n', () => {
        expect(state.shoplists.length).toEqual(30)
        delete_shoplists_index = [];
        state.shoplists.forEach((shoplist, index) => {
          if (shoplist.user_id === 2) {
            delete_shoplists_index.push(index)
          }
        });

        state.shoplists.splice(delete_shoplists_index[0], 10);
        expect(state.shoplists.length).toEqual(20);
        expect(chart.userIdSplitShopLists(state.shoplists, 2)).toEqual([
          {user_id: 2, shoplists: 0},
          {user_id: 1, shoplists: 10},
          {user_id: 3, shoplists:  10},
        ]);
      });
      it('(user.id=2) user = n, 他のids = 0', () => {
        date_now = new Date()
        state.shoplists = [
          {id: 40, list_name: 'ショップリスト40', price: 5000, purchasedate: date_now.toJSON() , user_id: 2 },
          {id: 41, list_name: 'ショップリスト41', price: 5000, purchasedate: date_now.toJSON() , user_id: 2 },
        ]
        expect(chart.userIdSplitShopLists(state.shoplists, 2)).toEqual([
          {user_id:2, shoplists: 2}
        ]);
      });
    });

    describe('userIdAndOtherShopList', () => {
      let user_id_split_shop_lists
      it('user.idのshoplists と 別に 他のuserのshoplistは合体 ( user.id and  (user.id2 + user.id3 + user.id4))', () => {

        user_id_split_shop_lists = chart.userIdSplitShopLists(state.shoplists, 2);
        expect(chart.userIdAndOtherShopList(user_id_split_shop_lists)).toEqual([
          {user_id: 2, shoplists: 10},
          {user_id: -1, shoplists: 20}
        ]);
      });
      it('引数が空の場合', () => {
        expect(chart.userIdAndOtherShopList([])).toEqual([
          {user_id: '', shoplists: ''},
          {user_id: '', shoplists: ''}
        ]);
      });
      it('(user.id=2) user = 0, 他のids = n', () => {
        user_id_split_shop_lists = [
          {user_id: 2, shoplists: 0},
          {user_id: 1, shoplists: 2},
          {user_id: 3, shoplists: 1}
        ]
        expect(chart.userIdAndOtherShopList(user_id_split_shop_lists)).toEqual([
          {user_id: 2, shoplists: 0},
          {user_id: -1, shoplists: 3}
        ]);
      });
      it('(user.id=2) user = n, 他のids = 0', () => {
        user_id_split_shop_lists = [
          {user_id: 2, shoplists: 2}
        ]
        expect(chart.userIdAndOtherShopList(user_id_split_shop_lists)).toEqual([
          {user_id: 2, shoplists: 2},
          {user_id: -1, shoplists: 0}
        ]);
      });
    });
  });

  describe('conic-gradient', () => {
    describe('makeFormatConicGradient', () => {
      let parcent, multi_chart, color
      beforeEach(() => {
        parcent = 100;
        multi_chart = { user_id: 1, shoplists: 10 }
        color = 'rgb(255, 255, 255)'
      });

      it('beforeEachの値を引数に入れる', () => {
        expect(chart.makeFormatConicGradient(parcent, multi_chart, color)).toEqual(
          {
            parcent: parcent,
            user: 1,
            length: 10,
            rgb: 'background-color: rgb(255, 255, 255);'
          }
        )
      });
      it('(正 parcent === number) (誤 parcent = "") 空文字 引数の値の型が適切な型出ない場合はparcent: 0%, user: -1, length: 0, rgb: "background-color: rgba(0, 0, 0, 0.5)" となる', () => {
        parcent = ''
        expect(chart.makeFormatConicGradient(parcent, multi_chart, color)).toEqual(
          {
            parcent: 0,
            user: -1,
            length: 0,
            rgb: 'background-color: rgba(0, 0, 0, 0.5);'
          }
        )
      });
      it('(正 parcent = 0 の場合は number型となる 0% となるので エラー内容ではない)', () => {
        parcent = 0
        expect(chart.makeFormatConicGradient(parcent, multi_chart, color)).toEqual(
          {
            parcent: 0,
            user: 1,
            length: 10,
            rgb: 'background-color: rgb(255, 255, 255);'
          }
        )
      });
      it('(正 multi_chart.user === number) (誤 multi_chart.user = "" 空文字) 空文字 引数の値の型が適切な型出ない場合はparcent: 0%, user: -1, length: 0, rgb: "background-color: rgba(0, 0, 0, 0.5)" となる', () => {
        multi_chart.user_id = ''
        expect(chart.makeFormatConicGradient(parcent, multi_chart, color)).toEqual(
          {
            parcent: 0,
            user: -1,
            length: 0,
            rgb: 'background-color: rgba(0, 0, 0, 0.5);'
          }
        )
      });
      it('(正 multi_chart.user_id = 0 の場合は number型となる id=0 となるので エラー内容ではない)', () => {
        multi_chart.user_id = 0
        expect(chart.makeFormatConicGradient(parcent, multi_chart, color)).toEqual(
          {
            parcent: 100,
            user: 0,
            length: 10,
            rgb: 'background-color: rgb(255, 255, 255);'
          }
        )
      });
      it('(正 multi_chart.shoplists === number) (誤 multi_chart.shoplists = "" 空文字) 引数の値の型が適切な型でない場合はparcent: 0%, user: -1, length: 0, rgb: "background-color: rgba(0, 0, 0, 0.5)" となる', () => {
        multi_chart.shoplists = ''
        expect(chart.makeFormatConicGradient(parcent, multi_chart, color)).toEqual(
          {
            parcent: 0,
            user: -1,
            length: 0,
            rgb: 'background-color: rgba(0, 0, 0, 0.5);'
          }
        )
      });
      it('(正 multi_chart.shoplists = 0 の場合は number型となる shoplists=0 となるので エラー内容ではない)', () => {
        multi_chart.shoplists = 0
        expect(chart.makeFormatConicGradient(parcent, multi_chart, color)).toEqual(
          {
            parcent: 100,
            user: 1,
            length: 0,
            rgb: 'background-color: rgb(255, 255, 255);'
          }
        )
      });
      it('(正 color === rgb(n, n, n) or rgba(n, n, n, n)) (誤 color = "" 空文字) 引数の値の型が適切な型でない場合はparcent: 0%, user: -1, length: 0, rgb: "background-color: rgba(0, 0, 0, 0.5)" となる', () => {
        color = ''
        expect(chart.makeFormatConicGradient(parcent, multi_chart, color)).toEqual(
          {
            parcent: 0,
            user: -1,
            length: 0,
            rgb: 'background-color: rgba(0, 0, 0, 0.5);'
          }
        )
      });
      it('(正 color === rgb(n, n, n) or rgba(n, n, n, n)) (誤 color = rgbb(n, n, n, n)) 引数の値の型が適切な型でない場合はparcent: 0%, user: -1, length: 0, rgb: "background-color: rgba(0, 0, 0, 0.5)" となる', () => {
        color = 'rgbb(0, 0, 0, 0.5)'
        expect(chart.makeFormatConicGradient(parcent, multi_chart, color)).toEqual(
          {
            parcent: 0,
            user: -1,
            length: 0,
            rgb: 'background-color: rgba(0, 0, 0, 0.5);'
          }
        )
      });
      it('(正 color === rgb(n, n, n) or rgba(n, n, n, n)) となるので エラー内容ではない)', () => {
        color = 'rgba(0, 0, 0, 0.5)'
        expect(chart.makeFormatConicGradient(parcent, multi_chart, color)).toEqual(
          {
            parcent: 100,
            user: 1,
            length: 10,
            rgb: 'background-color: rgba(0, 0, 0, 0.5);'
          }
        )
      });
    })
  });
});
