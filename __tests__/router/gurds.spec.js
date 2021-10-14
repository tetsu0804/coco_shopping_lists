import * as gurds from '../../app/javascript/router/gurds'

describe('/router/gurds', () => {
  let to, next, store
  beforeEach(() => {
    to = {
      matched: [
        { path: '/login', meta: { requiresAuth: false } }
      ]
    }
    next = jest.fn().mockImplementationOnce(() => {
      return to
    });
  });

  it('requiresAuth === false', () => {

    gurds.authorizeLogin(to, undefined, next);
    expect(next.mock.results[0].value).toMatchObject({
      matched: [
        { path: '/login', meta: { requiresAuth: false } }
      ]
    });
    next.mockClear();
  });

  it('requriresAuth === true && store.state.loggedIn.signedIn === false の場合は ログインしていない為 next({ path: "/login" }) に送られる', () => {
    to = {
      matched: [
        { path: '/', meta: { requiresAuth: true }}
      ]
    }

    store = {
      state: {
        loggedIn: {
          signedIn: jest.fn().mockImplementationOnce(() => {return false})
        }
      }
    }
    gurds.authorizeLogin(to, undefined, next);
    expect(next.mock.calls[0][0]).toEqual({ path: '/login' });
    next.mockClear();
    store.state.loggedIn.signedIn.mockClear();
  });

  it('requiresAuth === true && store.state.loggedIn.signedIn === true の場合は requiresAuth: trueで設定している pathに遷移する', () => {
    to = {
      matched: [
        { path: '/', meta: { requiresAuth: true }}
      ]
    }

    store = {
      state: {
        loggedIn: {
          signedIn: jest.fn().mockImplementationOnce(() => { return true })
        }
      }
    }

    gurds.authorizeLogin(to, undefined, next);
    expect(next.mock.results[0].value).toEqual({
      matched: [
        { path: '/', meta: { requiresAuth: true }}
      ]
    });
    expect(next.calls).toEqual(undefined);
    next.mockClear();
    store.state.loggedIn.signedIn.mockClear();
  });
});
