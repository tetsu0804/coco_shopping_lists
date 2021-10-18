import { shallowMount, createLocalVue } from '@vue/test-utils'
import CategoryList from '@/src/molcules/CategoryList'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex);
describe('/molcules/CategoryList', () => {
  let category_list, actions, store, mockDelete, tbody_trs
  beforeEach(() => {
    actions = {
      fetchDeleteCategory: jest.fn()
    }
    store = new Vuex.Store({
      actions
    });

    mockDelete = jest.fn().mockImplementationOnce((url) => {
      return new Promise((resolve, reject) => {
        if(!!url) {
          resolve({
            status: 200
          })
        } else {
          reject({
            response: {
              satatus: 400
            }
          })
        }
      });
    });

    category_list = shallowMount(CategoryList, { localVue, store,
      propsData: {
        allCategories:
          [
            { id: 1, category_name: 'ご飯', user_id: 1},
            { id: 2, category_name: 'おやつ', user_id: 1},
            { id: 3, category_name: 'しつけ', user_id: 1}
          ]
        ,
        userLoggedIn: {
          loggedIn: true,
          user: { id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com'}
        }
      },
      mocks: {
        axios: {
          delete: mockDelete
        }
      }
    });
  });

  describe('DOM', () => {
    describe('class', () => {
      it('category-lists-container が存在するか？', () => {
        expect(category_list.find('.category-lists-container').exists()).toEqual(true)
      });
    });

    describe('table tbody tr', () => {
      beforeEach(() => {
        tbody_trs = category_list.findAll('table tbody tr');
      });
      it('3つ存在するか？', () => {
        expect(tbody_trs.length).toEqual(3);
      });

      describe('trは3つあり 各々に td が 4つある (No, カテゴリ名, 編集,  削除)', () => {
        it('at(0)', () => {
          expect(tbody_trs.at(0).findAll('td').at(0).text()).toEqual('1');
          expect(tbody_trs.at(0).findAll('td').at(1).text()).toEqual('ご飯');
          expect(tbody_trs.at(0).findAll('td').at(2).find('.clickIcon').exists()).toEqual(true);
          expect(tbody_trs.at(0).findAll('td').at(3).find('.clickIcon').exists()).toEqual(true);
        });
        it('at(1)', () => {
          expect(tbody_trs.at(1).findAll('td').at(0).text()).toEqual('2');
          expect(tbody_trs.at(1).findAll('td').at(1).text()).toEqual('おやつ');
          expect(tbody_trs.at(1).findAll('td').at(2).find('.clickIcon').exists()).toEqual(true);
          expect(tbody_trs.at(1).findAll('td').at(3).find('.clickIcon').exists()).toEqual(true);
        });
        it('at(2)', () => {
          expect(tbody_trs.at(2).findAll('td').at(0).text()).toEqual('3');
          expect(tbody_trs.at(2).findAll('td').at(1).text()).toEqual('しつけ');
          expect(tbody_trs.at(2).findAll('td').at(2).find('.clickIcon').exists()).toEqual(true);
          expect(tbody_trs.at(2).findAll('td').at(3).find('.clickIcon').exists()).toEqual(true);
        });
      });
    });
  });

  describe('computd', () => {
    describe('userIdMatchedCategory', () => {
      it('引数の数字が userLoggedIn.user.id と 同じだと true', () => {
        expect(category_list.vm.userIdMatchedCategory(1)).toEqual(true);
      });
      it('引数の数字が userLoggedIn.user.id と 同じじゃない為 false', () => {
        expect(category_list.vm.userIdMatchedCategory(2)).toEqual(false);
      });
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      tbody_trs = category_list.findAll('table tbody tr');
    });
    afterEach(() => {
      actions.fetchDeleteCategory.mockClear();
      mockDelete.mockClear();
    });
    describe('updateCategory', () => {
      it('this.$emit("categoryUpate") が動いて適切ない引数が動いているか？', () => {
        tbody_trs.at(0).findAll('td').at(2).find('.clickIcon').trigger('click');
        expect(category_list.emitted('categoryUpdate')).toMatchObject([[1]]);
      });
    });

    describe('deleteCategory', () => {
      describe('then', () => {
        it('this.axios.delete が動いていて適切な引数が入っているか？', () => {
          tbody_trs.at(0).findAll('td').at(3).find('.clickIcon').trigger('click');
          expect(mockDelete).toHaveBeenCalledWith('/api/v1/category/1');
        });
        it('this.$store.dispatch("fetchDeleteCategory") が動いていて適切な引数が入っているか？', async () => {
          tbody_trs.at(1).findAll('td').at(3).find('.clickIcon').trigger('click');
          await flushPromises();
          expect(actions.fetchDeleteCategory).toHaveBeenCalledWith(expect.any(Object), 2);
        });
        it('this.$emit("categoryStatus") が動いていて適切な引数が入っているか？', async ()=> {
          tbody_trs.at(1).findAll('td').at(3).find('.clickIcon').trigger('click');
          await flushPromises();
          expect(category_list.emitted('categoryStatus')).toMatchObject([[ { message: 'おやつ を削除しました。', status: 200 }]]);
        });
      });
    });
  });
});
