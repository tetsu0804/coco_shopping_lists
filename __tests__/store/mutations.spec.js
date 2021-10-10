import mutations from '@/store/mutations'

describe('/store/mutatios', () => {
  let user, state
  beforeEach(() => {
    state = {
      users: [],
      loggedIn: { signedIn: false, user: '' }
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
});
