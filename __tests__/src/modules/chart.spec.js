import chart from '@/src/modules/chart'

describe('/modules/chart', () => {
  describe('colors', () => {
    describe('randomRGB', () => {
      let matchs = /^rgb\(\s*?\d{1,3},\s*?\d{1,3},\s*?\d{1,3}\)/
      it('ランダムな rgb(n, n, n) ができる', () => {
        expect(chart.randomRGB()).toMatch(matchs);
      });
    });
  });

  describe('shoplist.user_id', () => {
    let state, another_date, date_now, new_date, change_id, format_shoplist, category_shoplist_format, set_date
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
    // for (let i = 0; i < 30; i++) {
    //   another_date = 365 - i
    //date_now = new Date();
    //   new_date = new Date(date_now.setDate(date_now.getDate() - another_date ));
      // change_id = i + 1
      // format_shoplist = {id: change_id, list_name: 'ショップリスト' + change_id, price: 5000, purchasedate: new_date.toJSON() , user_id: 1 }
      // if (i % 7 === 0) {
      //   category_shoplist_format = { category_id: 3, shop_list_id: change_id }
      // } else if (i % 5 === 0) {
      //   category_shoplist_format = { category_id: 4, shop_list_id: change_id }
      // } else if (i % 3 === 0) {
      //   category_shoplist_format = { category_id: 1, shop_list_id: change_id }
      // } else {
      //   category_shoplist_format = { category_id: 2, shop_list_id: change_id}
      // }
      // state.shoplists.push(format_shoplist)
      // category_shoplists.push(category_shoplist_format)
    //}

    describe('userIdSplitShopLists', () => {
      it('state.shoplistsの中の user_id の投稿を分割する', () => {
        state.shoplists.push({id: 40, list_name: 'ショップリスト40', price: 5000, purchasedate: new Date().toJSON() , user_id: 1 })
        // chart.userIdSplitShopLists(state.shoplists, 2)
        // expect(chart.userIdSplitShopLists(state.shoplists, 1)[0].user).toEqual(1)
        // expect(chart.userIdSplitShopLists(state.shoplists, 1)[0].shoplists.length).toEqual(10)
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
