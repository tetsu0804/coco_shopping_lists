import actions from '@/store/actions'

describe('/store/actioins', () => {
  let commit, user, category, categories
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

  describe('fetchCreateCategory', () => {
    it('( 一つのカテゴリ )commitの引数が createCategory と category になっているか？', () => {
      category = { id: 1, category_name: 'ご飯' }
      actions.fetchCreateCategory( { commit }, category);
      expect(commit).toHaveBeenCalledWith('createCategory', category);
    });

    it('( 複数のカテゴリ ) commitの引数が createCategory と categories になっているか？', () => {
      categories = [
        { id: 1, category_name: 'ご飯' },
        { id: 2, category_name: 'おやつ' },
        { id: 3, category_name: 'しつけ' }
      ]
      actions.fetchCreateCategory( { commit }, categories);
      expect(commit).toHaveBeenCalledWith('createCategory', categories);
    });
  });
});
