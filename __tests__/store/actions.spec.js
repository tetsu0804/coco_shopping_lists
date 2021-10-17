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

});
