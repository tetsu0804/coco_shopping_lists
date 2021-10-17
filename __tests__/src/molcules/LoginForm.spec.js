import { shallowMount, createLocalVue } from '@vue/test-utils'
import LoginForm from '@/src/molcules/LoginForm'
import InputForm from '@/src/atoms/InputForm'
import CreateBtn from '@/src/atoms/CreateBtn'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

const localVue = createLocalVue();
localVue.use(Vuex);

describe('/molcules/LoginForm', () => {
  let login_form, input_forms, create_btn, store, actions, mockPost, mockPush
  beforeEach(() => {
    mockPush = jest.fn();
    mockPost = jest.fn().mockImplementationOnce((url, args) => {
      return new Promise((resolve, reject) => {
        if (!!args.email && !!args.password) {
          resolve({
            data: {
              user: { id: 1, first_name: '太朗', last_name: '山田', email: args.email }
            },
            status: 200
          })
        } else {
          reject({
            response: {
              data: {
                error: '失敗しました。'
              },
              status: 400
            }
          })
        }
      });
    });

    actions = {
      fetchLoggedInUser: jest.fn()
    }
    store = new Vuex.Store({
      actions
    });

    login_form = shallowMount(LoginForm, { localVue, store,
      mocks: {
        axios: {
          post: mockPost
        },
        $router: {
          push: mockPush
        }
      }
    });

    input_forms = login_form.findAllComponents(InputForm);
    create_btn = login_form.findComponent(CreateBtn);
  });

  describe('DOM', () => {
    describe('子コンポーネント', () => {
      describe('InputForm', () => {
        it('存在するか？', () => {
          expect(input_forms.exists()).toEqual(true);
        });
        it('3つ存在する', () => {
          expect(input_forms.length).toEqual(3);
        });
        it(':status at(0)', () => {
          expect(input_forms.at(0).props().status).toMatchObject(
            { id: 'input-email', kinds: 'email', place: 'メールアドレス', label: '', value: ''}
          );
        });
        it(':status at(1)', () => {
          expect(input_forms.at(1).props().status).toMatchObject(
            { id: 'input-password', kinds: 'password', place: 'パスワード', label: '', value: ''}
          );
        });
        it(':status at(2)', () => {
          expect(input_forms.at(2).props().status).toMatchObject(
            { id: 'input-check-box', kinds: 'checkbox', label: 'ログイン状態を保持', true_box: '1', false_box: '0', value: '0', checkbox_be: true }
          );
        });
      });

      describe('CreateBtn', () => {
        it('存在するか？', () => {
          expect(create_btn.exists()).toEqual(true);
        });
      });
    });
  });

  describe('$emit', () => {
    describe('InputForm ( inputFormValue )', () => {
      it('at(0).$emit が動くと this.password.email の値が変更する', () => {
        expect(login_form.vm.email.value).toEqual('');
        input_forms.at(0).vm.$emit('inputFormValue', 'test@test.com');
        expect(login_form.vm.email.value).toEqual('test@test.com');
      });
      it('at(1).$emit が動くと this.password.email の値が変更する', () => {
        expect(login_form.vm.password.value).toEqual('');
        input_forms.at(1).vm.$emit('inputFormValue', 'password');
        expect(login_form.vm.password.value).toEqual('password');
      });
      it('at(2).$emit が動くと this.loign_state.value の値が変更する', () => {
        expect(login_form.vm.login_state.value).toEqual('0');
        input_forms.at(2).vm.$emit('inputFormValue', '1');
        expect(login_form.vm.login_state.value).toEqual('1');
      });
    });
  });

  describe('methods', () => {
    afterEach(() => {
      mockPost.mockClear();
      mockPush.mockClear();
      actions.fetchLoggedInUser.mockClear();
    });
    describe('loginClick', () => {
      describe('then', () => {
        beforeEach(() => {
          login_form.setData({
            email: { id: 'input-email', kinds: 'email', place: 'メールアドレス', label: '', value: 'test@test.com'},
            password: { id: 'input-password', kinds: 'password', place: 'パスワード', label: '', value: 'password'},
            login_state: { id: 'input-check-box', kinds: 'checkbox', label: 'ログイン状態を保持', true_box: '1', false_box: '0', value: '1', checkbox_be: true }
          });
        });

        it('this.axios.postが動いていて引数が適切な引数になっているか？', () => {
          create_btn.vm.$emit('createBtnClick');
          expect(mockPost).toHaveBeenCalledWith('/api/v1/login', { email: 'test@test.com', password: 'password', remember_me: '1'});
        });
        it('this.$stor.dispatch("fetchLoggedInUser")が動いていて適切な引数になっているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(actions.fetchLoggedInUser).toHaveBeenCalledWith(expect.any(Object), { id: 1, first_name: '太朗', last_name: '山田', email: 'test@test.com' })
        });
        it('this.$router.pushが動いていて適切な引数になっているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(mockPush).toHaveBeenCalledWith({"name": "Home", "params": {"loggedIn": true, "flash": { message: "太朗 さんがログインしました。", status: 200}} });
        });
        it('data.プロパティ.valueの値が空文字になる', async() => {
          expect(login_form.vm.email.value).toEqual('test@test.com');
          expect(login_form.vm.password.value).toEqual('password');
          expect(login_form.vm.login_state.value).toEqual('1');
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(login_form.vm.email.value).toEqual('');
          expect(login_form.vm.password.value).toEqual('');
          expect(login_form.vm.login_state.value).toEqual('0');
        });
      });

      describe('catch', () => {
        beforeEach(() => {
          login_form.setData({
            email: { id: 'input-email', kinds: 'email', place: 'メールアドレス', label: '', value: ''},
            password: { id: 'input-password', kinds: 'password', place: 'パスワード', label: '', value: ''},
            login_state: { id: 'input-check-box', kinds: 'checkbox', label: 'ログイン状態を保持', true_box: '1', false_box: '0', value: '0', checkbox_be: true }
          });
        });

        it('this.$emit("lgoinErrorStatus") が動いていて適切な引数が入っているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(login_form.emitted('loginErrorStatus')).toMatchObject([[{message: '失敗しました。', status: 400 }]]);
        });
        it('data.プロパティ.valueの値が空文字になる', async() => {
          expect(login_form.vm.email.value).toEqual('');
          expect(login_form.vm.password.value).toEqual('');
          expect(login_form.vm.login_state.value).toEqual('0');
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(login_form.vm.email.value).toEqual('');
          expect(login_form.vm.password.value).toEqual('');
          expect(login_form.vm.login_state.value).toEqual('0');
        });
      });
    });
  });
});
