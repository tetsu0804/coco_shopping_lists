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
});
