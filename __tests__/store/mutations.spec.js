import mutations from '@/store/mutations'

describe('/store/mutatios', () => {
  let user, state
  beforeEach(() => {
    state = {
      users: [],
      loggedIn: { signedIn: false, user: '' },
      categories: [],
      shoplists: []
    }
    user = { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' }
  });
  describe('createusers', () => {
    it('state.usersに user が追加されているか', () => {
      expect(state.users.length).toEqual(0);
      mutations.createUsers(state, user);
      expect(state.users.length).toEqual(1);
      expect(state.users).toMatchObject([
        { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' }
      ]);
    });
  });

  describe('loggedInUser(ログインしているのか？ しているとしたらユーザーは誰か?)', () => {
    it('ログインしたときの state.loggedIn の中身', () => {
      expect(state.loggedIn).toEqual( { signedIn: false, user: '' });
      mutations.loggedInUser(state, user);
      expect(state.loggedIn).toMatchObject(
        {
          signedIn: true,
          user: { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' }
        }
      )
    });

    it('ログインしていない時の state.lggedIn の中身', () => {
      expect(state.loggedIn).toEqual( { signedIn: false, user: '' });
    });
  });

  describe('logoutUser', () => {
    it('ログインしている状態からログアウトした時の state.loggedInの中身', () => {
      state.loggedIn = { signedIn: true, user: { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' } };
      mutations.logoutUser(state);
      expect(state.loggedIn).toMatchObject(
        {
          signedIn: false,
          user: ''
        }
      );
    });

    it('ログアウトしている状態からログアウトした時の state.loggedInの中身', () => {
      mutations.logoutUser(state);
      expect(state.loggedIn).toMatchObject(
        {
          signedIn: false,
          user: ''
        }
      )
    });
  });

  describe('カテゴリ (category)', () => {
    let category, categories, other_categories, update_category
    beforeEach(() => {
      category = { id: 1, category_name: 'ご飯' }
      categories = [
        { id: 1, category_name: 'ご飯' },
        { id: 2, category_name: 'おやつ' },
        { id: 3, category_name: 'しつけ' }
      ]
    });
    describe('createCategory', () => {

      it('(1つのカテゴリ追加) createCategoryを動かすと state.categoriesにカテゴリが追加されているか？', () => {
        expect(state.categories.length).toEqual(0);
        mutations.createCategory(state, category);
        expect(state.categories.length).toEqual(1);
        expect(state.categories).toMatchObject(
          [
            { id: 1, category_name: 'ご飯' }
          ]
        );
      });


    });

    describe('createAllCategories', () => {
      it('(複数のカテゴリ追加) createAllCategoriesを動かすと state.categoriesにカテゴリが追加されているか？', () => {
        expect(state.categories.length).toEqual(0);
        mutations.createAllCategories(state, categories);
        expect(state.categories).toMatchObject(
          [
            { id: 1, category_name: 'ご飯' },
            { id: 2, category_name: 'おやつ' },
            { id: 3, category_name: 'しつけ' }
          ]
        )
      });

      it('( 複数のカテゴリ ) 既にstate.categoriesに値がある時の fetchCreateAllCategories の動き', () => {
        state.categories = categories
        other_categories = [
          { id: 4, category_name: 'おもちゃ' },
          { id: 5, category_name: '散歩' },
          { id: 6, category_name: '衛生用品' }
        ]
        mutations.createAllCategories(state, other_categories);
        expect(state.categories).toMatchObject(
          [
            { id: 4, category_name: 'おもちゃ' },
            { id: 5, category_name: '散歩' },
            { id: 6, category_name: '衛生用品' }
          ]
        )
      });
    });

    describe('updateCategory', () => {
      beforeEach(() => {
        state.categories = categories
      });

      it('{id: 1, category_name: "ご飯"} を category_name: "パン" に変更', () => {
        expect(state.categories[0]).toMatchObject(
          { id: 1, category_name: 'ご飯' }
        );
        update_category = { id: 1, category_name: 'パン'}
        mutations.updateCategory(state, update_category)
        expect(state.categories[0]).toMatchObject(
          { id:1, category_name: 'パン'}
        )
      });

      it('{ id: 3, category_name: "しつけ"} を "衛生用品" に変更', () => {
        expect(state.categories[2]).toMatchObject(
          { id: 3, category_name: 'しつけ' }
        );
        update_category = { id: 3, category_name: '衛生用品'}
        mutations.updateCategory(state, update_category)
        expect(state.categories[2]).toMatchObject(
          { id:3, category_name: '衛生用品'}
        )
      });

      it('一致する id がない場合は何も変更しない', () => {
        expect(state.categories).toMatchObject([
          { id: 1, category_name: 'ご飯' },
          { id: 2, category_name: 'おやつ' },
          { id: 3, category_name: 'しつけ' }
        ]);

        update_category = {id: 4, category_name: '日用品' }
        mutations.updateCategory(state, update_category)
        expect(state.categories).toMatchObject([
          { id: 1, category_name: 'ご飯' },
          { id: 2, category_name: 'おやつ' },
          { id: 3, category_name: 'しつけ' }
        ]);
      });
    });
    describe('delete', ()=> {
      let delete_category_num
      beforeEach(() => {
        state.categories = categories
      });
      describe('allDeleteCategory', () => {
        it('state.categoriesの中身全て 削除', () => {
          expect(state.categories.length).toEqual(3);
          mutations.allDeleteCategory(state);
          expect(state.categories.length).toEqual(0);
          expect(state.categories).toMatchObject([]);
        });
      });

      describe('deleteCategory', () => {
        it('{id: 2, category_name: "おやつ"} を削除する', () => {
          delete_category_num = 2
          expect(state.categories).toMatchObject([
            { id: 1, category_name: 'ご飯' },
            { id: 2, category_name: 'おやつ' },
            { id: 3, category_name: 'しつけ' }
          ]);
          expect(state.categories.length).toEqual(3);
          mutations.deleteCategory(state, delete_category_num);
          expect(state.categories).toMatchObject([
            { id: 1, category_name: 'ご飯' },
            { id: 3, category_name: 'しつけ' }
          ])
          expect(state.categories.length).toEqual(2);
        });
        it('{id: 3, category_name: "しつけ"} を削除する', () => {
          delete_category_num = 3
          expect(state.categories).toMatchObject([
            { id: 1, category_name: 'ご飯' },
            { id: 2, category_name: 'おやつ' },
            { id: 3, category_name: 'しつけ' }
          ]);
          expect(state.categories.length).toEqual(3);
          mutations.deleteCategory(state, delete_category_num);
          expect(state.categories).toMatchObject([
            { id: 1, category_name: 'ご飯' },
            { id: 2, category_name: 'おやつ' }
          ]);
          expect(state.categories.length).toEqual(2);
        });
      });
    });
  });

  describe('shop_list', () => {
    let shoplist, categories
    beforeEach(() => {
      categories = [1, 2]
      shoplist = { id:1, list_name: 'ロイヤルカナン', price: 5000, purchasedate: '2021-10-20T00:00:00.000Z', user_id: 1}
    });
    describe('createShopList', () => {
      it('state.shoplistsに追加される', () => {
        mutations.createShopList(state, { shoplist: shoplist, categories: categories})
        expect(state.shoplists).toMatchObject([
          { id:1, list_name: 'ロイヤルカナン', price: 5000, purchasedate: '2021-10-20T00:00:00.000Z', user_id: 1, categories: [1, 2]}
        ])
      });
    });
  });

  describe('createAllShopList', () => {
    let categories, shoplists, category_shoplists, date
    beforeEach(() => {
      date = Date.parse("2021-10-22T00:00:00")
      categories = [
        { id: 1, category_name: 'ご飯' },
        { id: 2, category_name: 'おやつ' },
        { id: 3, category_name: 'おもちゃ' },
        { id: 4, category_name: 'しつけ' },
      ]

      shoplists = [
        { id: 1, list_name: 'ロイヤルカナン', price: 5000, purchasedate: date, user_id: 1 },
        { id: 2, list_name: 'ちゅーる', price: 500, purchasedate: date, user_id: 1 },
        { id: 3, list_name: 'しつけちゅーる', price: 700, purchasedate: date, user_id: 1 },
        { id: 4, list_name: '野球ボール', price: 800, purchasedate: date, user_id: 1 },
        { id: 5, list_name: 'サッカーボール', price: 800, purchasedate: date, user_id: 1 }
      ]

      category_shoplists = [
        { id: 1 , category_id: 1, shop_list_id: 1 },
        { id: 2, category_id: 2, shop_list_id: 2 },
        { id: 3, category_id: 2, shop_list_id: 3 },
        { id: 4, category_id: 4, shop_list_id: 3 },
        { id: 5, category_id: 3, shop_list_id: 4 },
        { id: 6, category_id: 3, shop_list_id: 5 }
      ]
    });

    it('state.shoplistsの値は適切か？', () => {
      mutations.createAllShopList(state, { categories: categories, shoplists: shoplists, category_shoplists: category_shoplists})
      expect(state.shoplists).toMatchObject([
        { id: 1, list_name: 'ロイヤルカナン', price: 5000, purchasedate: date, user_id: 1, categories: [1] },
        { id: 2, list_name: 'ちゅーる', price: 500, purchasedate: date, user_id: 1, categories: [2] },
        { id: 3, list_name: 'しつけちゅーる', price: 700, purchasedate: date, user_id: 1, categories: [2, 4] },
        { id: 4, list_name: '野球ボール', price: 800, purchasedate: date, user_id: 1, categories: [3] },
        { id: 5, list_name: 'サッカーボール', price: 800, purchasedate: date, user_id: 1, categories: [3] }
      ])
    });

    it('categoriesの引数のデータが０の時は state.categoriesは 空になる', () => {
      state.categories = [{id: 5, category_name: '日用品'}]
      mutations.createAllShopList(state, { categories: [], shoplists: [], category_shoplists: []})
      expect(state.categories).toEqual([]);
    });

    it('引数categories > 0 で 引数shoplists === 0 の場合は state.categoriesはそのままで state.shoplistsは空になる', () => {
      state.categories = categories
      state.shoplists = [{id: 7, list_name: 'ちゅーる芋味', price: 800, user_id: 1}]
      mutations.createAllShopList(state, { categories: categories, shoplists: [], category_shoplists: []});
      expect(state.shoplists).toEqual([]);
      expect(state.categories).toMatchObject(
        [
          { id: 1, category_name: 'ご飯' },
          { id: 2, category_name: 'おやつ' },
          { id: 3, category_name: 'おもちゃ' },
          { id: 4, category_name: 'しつけ' },
        ]
      );
    });
  });


  describe('allDeleteShopList', () => {
    let categories, shoplists, category_shoplists, date
    beforeEach(() => {
      date = Date.parse("2021-10-22T00:00:00")
      categories = [
        { id: 1, category_name: 'ご飯' },
        { id: 2, category_name: 'おやつ' },
        { id: 3, category_name: 'おもちゃ' },
        { id: 4, category_name: 'しつけ' },
      ]

      shoplists = [
        { id: 1, list_name: 'ロイヤルカナン', price: 5000, purchasedate: date, user_id: 1 },
        { id: 2, list_name: 'ちゅーる', price: 500, purchasedate: date, user_id: 1 },
        { id: 3, list_name: 'しつけちゅーる', price: 700, purchasedate: date, user_id: 1 },
        { id: 4, list_name: '野球ボール', price: 800, purchasedate: date, user_id: 1 },
        { id: 5, list_name: 'サッカーボール', price: 800, purchasedate: date, user_id: 1 }
      ]

      category_shoplists = [
        { id: 1 , category_id: 1, shop_list_id: 1 },
        { id: 2, category_id: 2, shop_list_id: 2 },
        { id: 3, category_id: 2, shop_list_id: 3 },
        { id: 4, category_id: 4, shop_list_id: 3 },
        { id: 5, category_id: 3, shop_list_id: 4 },
        { id: 6, category_id: 3, shop_list_id: 5 }
      ]
      mutations.createAllShopList(state, { categories: categories, shoplists: shoplists, category_shoplists: category_shoplists});
    });

    it('state.shoplistsが空になる', () => {
      expect(state.shoplists.length).toEqual(5);
      mutations.allDeleteShopList(state);
      expect(state.shoplists.length).toEqual(0);
    });
  });
});
