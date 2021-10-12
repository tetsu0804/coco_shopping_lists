import { shallowMount, createLocalVue } from '@vue/test-utils'
import SignupForm from '@/src/molcules/SignupForm'
import InputForm from '@/src/atoms/InputForm'
import CreateBtn from '@/src/atoms/CreateBtn'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
const localVue = createLocalVue();
localVue.use(Vuex);

describe('/molcules/SignupForm', () => {
  let signup_form, input_forms, create_btn, mockPost, mockPush, store, actions
  beforeEach(() => {
    mockPush = jest.fn();
    actions = {
      fetchCreateUsers: jest.fn(),
      fetchLoggedInUser: jest.fn()
    }

    store = new Vuex.Store({
      actions
    });

    mockPost = jest.fn().mockImplementationOnce((url, args) => {
      return new Promise((resolve, reject) => {
        if(!!args.last_name && !!args.first_name && !!args.email && !!args.password && !!args.password_confirmation ) {
          resolve({
            data: {
              user: {id: 1, last_name: args.last_name, first_name: args.first_name, email: args.email }
            }
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
    signup_form = shallowMount(SignupForm, { localVue, store,
      mocks: {
        axios: {
          post: mockPost
        },
        $router: {
          push: mockPush
        }
      }
    });

    input_forms = signup_form.findAllComponents(InputForm);
    create_btn = signup_form.findComponent(CreateBtn);
  });

  describe('DOM', () => {
    describe('class', () => {
      let input_containers, input_field_doubles, input_field_doubles2, input_field, input_field2
      beforeEach(() => {
        input_containers = signup_form.findAll('.input-container');
      });
      describe('input-container', () => {
        it('存在するのか?', () => {
          expect(input_containers.exists()).toEqual(true);
        });
        it('input-container は 4つある', () => {
          expect(input_containers.length).toEqual(4);
        });
      });

      describe('input-field-double', () => {
        it('存在するのか？', () => {
          input_field_doubles = input_containers.at(0).findAll('.input-field-double');
          input_field_doubles2 = input_containers.at(2).findAll('.input-field-double');
          expect(input_field_doubles.exists()).toEqual(true);
          expect(input_field_doubles2.exists()).toEqual(true);
        });
        it('input-field-double の数は4つある', () => {
          input_field_doubles = input_containers.at(0).findAll('.input-field-double');
          input_field_doubles2 = input_containers.at(2).findAll('.input-field-double');
          expect(input_field_doubles.length).toEqual(2);
          expect(input_field_doubles2.length).toEqual(2);
        });
      });

      describe('input-field', () => {
        it('存在するのか？', () => {
          input_field = input_containers.at(1).find('.input-field');
          input_field2 = input_containers.at(3).find('.input-field');
          expect(input_field.exists()).toEqual(true);
          expect(input_field2.exists()).toEqual(true);
        });
      });
    });

    describe('子コンポーネント', () => {
      describe('InputForm', () => {
        it('存在するのか?', () => {
          expect(input_forms.exists()).toEqual(true);
        });
        it('5つある', () => {
          expect(input_forms.length).toEqual(5);
        });
        it(':statusの中身 (at(0))', () => {
          expect(input_forms.at(0).props()).toMatchObject({
            status: {
               id: 'input-last-name', kinds: 'text', place: '田中', label: '', value: ''
             }
          });
        });
        it(':statusの中身 (at(1))', () => {
          expect(input_forms.at(1).props()).toMatchObject({
            status: {
              id: 'input-first-name', kinds: 'text', place: '太朗', label: '', value: ''
             }
          });
        });
        it(':statusの中身 (at(2))', () => {
          expect(input_forms.at(2).props()).toMatchObject({
            status: {
               id: 'input-email', kinds: 'email', place: 'メールアドレス', label: '', value: ''
             }
          });
        });
        it(':statusの中身 (at(3))', () => {
          expect(input_forms.at(3).props()).toMatchObject({
            status: {
               id: 'input-password', kinds: 'password', place: 'パスワード', label: '', value: ''
             }
          });
        });
        it(':statusの中身 (at(4))', () => {
          expect(input_forms.at(4).props()).toMatchObject({
            status: {
               id: 'input-password-confirmation', kinds: 'password', place: 'パスワード再確認', label: '', value: ''
             }
          });
        });
      });
    });
  });

  describe('$emit("inputFormValue") が動いた時に data.プロパティ.value に値が入っているか？', () => {
    it('input_forms.at(0)の inputFormValue が動いたときに last_name.value に値が入る', () => {
      expect(signup_form.vm.last_name.value).toEqual('');
      input_forms.at(0).vm.$emit('inputFormValue', '吉田');
      expect(signup_form.vm.last_name.value).toEqual('吉田');
    });
    it('input_forms.at(1)の inputFormValue が動いたときに first_name.value に値が入る', () => {
      expect(signup_form.vm.first_name.value).toEqual('');
      input_forms.at(1).vm.$emit('inputFormValue', '太朗');
      expect(signup_form.vm.first_name.value).toEqual('太朗');
    });
    it('input_forms.at(2)の inputFormValue が動いたときに email.value に値が入る', () => {
      expect(signup_form.vm.email.value).toEqual('');
      input_forms.at(2).vm.$emit('inputFormValue', 'test@test.com');
      expect(signup_form.vm.email.value).toEqual('test@test.com');
    });
    it('input_forms.at(3)の inputFormValue が動いたときに password.value に値が入る', () => {
      expect(signup_form.vm.password.value).toEqual('');
      input_forms.at(3).vm.$emit('inputFormValue', 'password');
      expect(signup_form.vm.password.value).toEqual('password');
    });
    it('input_forms.at(4)の inputFormValue が動いたときに password_confirmation.value に値が入る', () => {
      expect(signup_form.vm.password_confirmation.value).toEqual('');
      input_forms.at(4).vm.$emit('inputFormValue', 'password');
      expect(signup_form.vm.password_confirmation.value).toEqual('password');
    });
  });

  describe('methods', () => {
    afterEach(() => {
      actions.fetchCreateUsers.mockClear();
      actions.fetchLoggedInUser.mockClear();
      mockPost.mockClear();
      mockPush.mockClear();
    });
    describe('signupClick', () => {


      describe('then', () => {
        beforeEach(() => {
          signup_form.setData({
            last_name: { id: 'input-last-name', kinds: 'text', place: '田中', label: '', value: '吉田'},
            first_name: { id: 'input-first-name', kinds: 'text', place: '太朗', label: '', value: '二郎'},
            email: { id: 'input-email', kinds: 'email', place: 'メールアドレス', label: '', value: 'test2@test.com'},
            password: { id: 'input-password', kinds: 'password', place: 'パスワード', label: '', value: 'password'},
            password_confirmation: { id: 'input-password-confirmation', kinds: 'password', place: 'パスワード再確認', label: '', value: 'password'}
          });
        });
        it('this.axios.postが動いて適切な引数が渡っているか？', () => {
          create_btn.vm.$emit('createBtnClick');
          expect(mockPost).toHaveBeenCalledWith('/api/v1/signup', { last_name: '吉田', first_name: '二郎', email: 'test2@test.com', password: 'password', password_confirmation: 'password'});
        });
        it('this.$store.dispatch("fetchCreateusers")が動いていて適切な引数が入っているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(actions.fetchCreateUsers).toHaveBeenCalledWith(expect.any(Object), { id:1, last_name: '吉田', first_name: '二郎', email: 'test2@test.com'});
        });
        it('this.$store.dispatch("fetchLoggedInUser")が動いていて適切な引数が入っているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(actions.fetchLoggedInUser).toHaveBeenCalledWith(expect.any(Object), { id:1, last_name: '吉田', first_name: '二郎', email: 'test2@test.com'});
        });
        it('this.$rotuer.pushが動いていて適切な引数が入っているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(mockPush).toHaveBeenCalledWith({ name: 'Home', params: { flash: '二郎 さんが登録されました。'}});
          expect(signup_form.vm.last_name.value).toEqual('')
        });
        it('data内のプロパティのvalue値が空文字になる', async () => {
          expect(signup_form.vm.last_name.value).toEqual('吉田');
          expect(signup_form.vm.first_name.value).toEqual('二郎');
          expect(signup_form.vm.email.value).toEqual('test2@test.com');
          expect(signup_form.vm.password.value).toEqual('password');
          expect(signup_form.vm.password_confirmation.value).toEqual('password');
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(signup_form.vm.last_name.value).toEqual('');
          expect(signup_form.vm.first_name.value).toEqual('');
          expect(signup_form.vm.email.value).toEqual('');
          expect(signup_form.vm.password.value).toEqual('');
          expect(signup_form.vm.password_confirmation.value).toEqual('');
        });
      });

      describe('catch', () => {
        beforeEach(() => {
          signup_form.setData({
            last_name: { id: 'input-last-name', kinds: 'text', place: '田中', label: '', value: ''},
            first_name: { id: 'input-first-name', kinds: 'text', place: '太朗', label: '', value: ''},
            email: { id: 'input-email', kinds: 'email', place: 'メールアドレス', label: '', value: ''},
            password: { id: 'input-password', kinds: 'password', place: 'パスワード', label: '', value: ''},
            password_confirmation: { id: 'input-password-confirmation', kinds: 'password', place: 'パスワード再確認', label: '', value: ''}
          });
        });
        it('$emit("signiupErrorStatus")が動いて適切な引数が入っているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(signup_form.emitted('signupErrorStatus')).toMatchObject([[{message: '失敗しました。', status: 400 }]]);
        });
      });
    });
  });
});
