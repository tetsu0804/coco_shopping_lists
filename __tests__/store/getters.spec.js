import getters from '@/store/getters'

describe('/store/getters', () => {
  let state
  beforeEach(() => {
    state = {
      users: [
        { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' },
        { id: 2, last_name: '田中', first_name: '二郎', email: 'test1@test.com' },
      ],
      loggedIn: { signedIn: true, user: { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com' } }
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
});
