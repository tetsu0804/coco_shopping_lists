import actions from '@/store/actions'

describe('/store/actioins', () => {
  let commit, user
  beforeEach(() => {
    commit = jest.fn();
    user = { id: 1, first_name: '太朗', last_name: '吉田', email: 'test@test.com'}
  });
  afterEach(() => {
    commit.mockClear();
  });
  describe('fetchCreateUsers', () => {
    it('commitの引数が user であること', () => {
      actions.fetchCreateUsers({ commit }, user);
      expect(commit).toHaveBeenCalledWith('createUsers', user)
    });
  });

  describe('fetchLoggedInUser', () => {
    it('commitの引数が user であること', () => {
      actions.fetchLoggedInUser( { commit }, user);
      expect(commit).toHaveBeenCalledWith('loggedInUser', user)
    });
  });

  describe('fetchLogoutUser', () => {
    it('commitの引数が logoutUser になっているか?', () => {
      actions.fetchLogoutUser( { commit });
      expect(commit).toHaveBeenCalledWith('logoutUser');
    });
  });

  describe('カテゴリ ( category )', () => {
    let category, categories, update_category, delete_num
    beforeEach(() => {
      category = { id: 1, category_name: 'ご飯' }
      categories = [
        { id: 1, category_name: 'ご飯' },
        { id: 2, category_name: 'おやつ' },
        { id: 3, category_name: 'しつけ' }
      ]
    });

    describe('fetchCreateCategory', () => {
      it('( 一つのカテゴリ )commitの引数が createCategory と category になっているか？', () => {
        actions.fetchCreateCategory( { commit }, category);
        expect(commit).toHaveBeenCalledWith('createCategory', category);
      });
    });

    describe('fetchCreateAllCategories', () => {
      it('( 複数のカテゴリ ) commitの引数が createAllCategories と categories になっているか？', () => {
        actions.fetchCreateAllCategories( { commit }, categories);
        expect(commit).toHaveBeenCalledWith('createAllCategories', categories);
      });
    });

    describe('fetchUpdateCategory', () => {
      it('commit の引数が updateCategory と update_categoryになっているか？', () => {
        update_category = { id: 1, category_name: 'パン' }
        actions.fetchUpdateCategory({ commit }, update_category);
        expect(commit).toHaveBeenCalledWith('updateCategory', update_category);
      });
    });

    describe('fetchAllDeleteCategory', () => {
      it('全てのカテゴリを削除した時の commit の引数が allDeleteCategory と categories になっているか？', () => {
        actions.fetchAllDeleteCategory( { commit });
        expect(commit).toHaveBeenCalledWith('allDeleteCategory');
      });
    });

    describe('fetchDeleteCategory', () => {
      it('commit の引数が deleteCategory と id になっているか？', () => {
        delete_num = 2
        actions.fetchDeleteCategory( { commit }, delete_num);
        expect(commit).toHaveBeenCalledWith('deleteCategory', 2);
      });
    });
  });

  describe('fetchCreateShopList', () => {
    let shoplist, categories
    beforeEach(() => {
      shoplist = { id: 1, list_name: 'ロイヤルカナン', price: 5000, purchasedate: '2021_10_22T00:00:00.000Z', user_id: 1}
      categories = [1, 2]
    });

    it('commitの引数が shoplist と cateoriesになっているか？', () => {
      actions.fetchCreateShopList({ commit }, { shoplist: shoplist, categories: categories });
      expect(commit).toHaveBeenCalledWith('createShopList', { shoplist: shoplist, categories: categories });
    });
  });

  describe('fetchAllCreateShopList', () => {
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

    it('commit の引数が categories と shoplists と category_shoplistsになっているか？', () => {
      actions.fetchAllCreateShopList({ commit }, { categories: categories, shoplists: shoplists, category_shoplists: category_shoplists});
      expect(commit).toHaveBeenCalledWith('createAllShopList', { categories: categories, shoplists: shoplists, category_shoplists: category_shoplists});
    });
  });

  describe('fetchAllDeleteShopList', () => {
    it('commit の引数が allDeleteShopList になっているか？', () => {
      actions.fetchAllDeleteShopList({ commit });
      expect(commit).toHaveBeenCalledWith('allDeleteShopList');
    });
  });
});
