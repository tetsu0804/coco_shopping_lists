import { shallowMount, createLocalVue } from '@vue/test-utils'
import CategoryForm from '@/src/molcules/CategoryForm'
import InputForm from '@/src/atoms/InputForm'
import CreateBtn from '@/src/atoms/CreateBtn'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

const localVue = createLocalVue();
localVue.use(Vuex);

describe('/molcules/CategoryForm', () => {
  let category_form, input_forms, create_btn, mockPost, store, actions
  beforeEach(() => {
    actions = {
      fetchCreateCategory: jest.fn()
    }

    mockPost = jest.fn().mockImplementationOnce((url, args) => {
      return new Promise((resolve, reject) => {
        if (!!args.category_name && !!args.user_id) {
          resolve({
            data: {
              category: { id: 1, category_name: args.category_name, user_id: args.user_id}
            },
            status: 200
          })
        } else {
          reject({
            response: {
              data: {
                message: '失敗しました。'
              },
              status: 400
            }
          })
        }
      });
    });

    store = new Vuex.Store({
      actions
    });
    category_form = shallowMount(CategoryForm, { localVue, store,
      propsData: {
        userLoggedIn: {
          loggedIn: true,
          user: { id: 1, first_name: '太朗', last_name: '吉田', email: 'test@test.com'}
        }
      },
      mocks: {
        axios: {
          post: mockPost
        }
      }
    });
    input_forms = category_form.findComponent(InputForm);
    create_btn = category_form.findComponent(CreateBtn);
  });

  describe('DOM', () => {
    describe('class', () => {
      it('category-form-container が存在するか?', () => {
        expect(category_form.find('.category-form-container').exists()).toEqual(true);
      });
      it('input-category-container が存在するか？', () => {
        expect(category_form.findAll('.input-category-container').exists()).toEqual(true);
        expect(category_form.findAll('.input-category-container').length).toEqual(2);
      });
      it('input-category-field が存在するか？', () => {
        expect(category_form.findAll('.input-category-field').exists()).toEqual(true);
        expect(category_form.findAll('.input-category-field').length).toEqual(2);
      });
    });
    describe('子コンポーネント', () => {
      describe('InputForm', () => {
        it('存在するか？', () => {
          expect(input_forms.exists()).toEqual(true);
        });
        it(':status の値は data > category_name の値である', () => {
          expect(input_forms.props().status).toMatchObject(
            { id: 'category-name', kinds: 'text', place: 'ご飯', label: '', value: ''}
          )
        });
        it('$emit @inputFromValue が動いた時の category_name.value の値が変更する', () => {
          expect(category_form.vm.category_name.value).toEqual('');
          input_forms.vm.$emit('inputFormValue', 'ご飯');
          expect(category_form.vm.category_name.value).toEqual('ご飯');
        });
      });

      describe('Createbtn', () => {
        it('存在するか？', () => {
          expect(create_btn.exists()).toEqual(true);
        });

        it('テキスト', () => {
          expect(create_btn.text()).toEqual('カテゴリ登録');
        });
      });
    });
  });

  describe('methods', () =>{
    afterEach(() => {
      mockPost.mockClear();
      actions.fetchCreateCategory.mockClear();
    });
    describe('createCategoryClick', () =>{
      describe('then', () => {
        beforeEach(() => {
          category_form.setData({
            category_name: { id: 'category-name', kinds: 'text', place: 'ご飯', label: '', value: 'ご飯'}
          });
        });

        it('this.axios.psotが動いて適切な引数が入っているか？', () => {
          create_btn.vm.$emit('createBtnClick');
          expect(mockPost).toHaveBeenCalledWith('/api/v1/category', { category_name: 'ご飯', user_id: 1});
        });

        it('this.$store.dispatch("fetchCreateCategory") が動いて適切な引数が渡っているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(actions.fetchCreateCategory).toHaveBeenCalledWith(expect.any(Object), { id: 1, category_name: 'ご飯', user_id: 1});
        });

        it('this.$emit("categoryStatus") が動いて適切な引数が入っているか？', async () =>{
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(category_form.emitted('categoryStatus')).toMatchObject([[{ message: 'ご飯 を作成しました。', status: 200}]])
        });

        it('dataClear() が動いて category_name.value が "" となっているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(category_form.vm.category_name).toMatchObject({ id: 'category-name', kinds: 'text', place: 'ご飯', label: '', value: ''})
        });
      });

      describe('catch', () => {
        beforeEach(() => {
          category_form.setData({
            category_name: { id: 'category-name', kinds: 'text', place: 'ご飯', label: '', value: ''}
          });
        });

        it('this.$emit("categoryStatus") が動いて適切な引数が入っているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(category_form.emitted('categoryStatus')).toMatchObject([[ { message: '失敗しました。', status: 400 }]]);
        });

        it('dataClear() が動いて category_name.value が "" となっているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(category_form.vm.category_name).toMatchObject({ id: 'category-name', kinds: 'text', place: 'ご飯', label: '', value: ''});
        });
      });
    });
  });
});
