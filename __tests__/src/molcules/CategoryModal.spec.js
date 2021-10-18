import { shallowMount, createLocalVue } from '@vue/test-utils'
import CategoryModal from '@/src/molcules/CategoryModal'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

const localVue = createLocalVue();
localVue.use(Vuex);

describe('/molcules/CategoryModal', () => {
  let category_modal, store, actions, mockPatch, tbody_tr
  beforeEach(() => {
    actions = {
      fetchUpdateCategory: jest.fn()
    }
    store = new Vuex.Store({
      actions
    });

    mockPatch = jest.fn().mockImplementationOnce(( url, args) => {
      return new Promise((resolve, reject) => {
        if (!!args.id && !!args.category_name) {
          resolve({
            data: {
              category: { id: args.id, category_name: args.category_name }
            },
            status: 200
          })
        } else {
          reject({
            response: {
              data: {
                message: '失敗しました。'
              }
            }
          })
        }
      });
    });
    category_modal = shallowMount(CategoryModal, { localVue, store,
      propsData: {
        selectedCategory: {
          id: 1, category_name: 'ご飯', user_id: 1
        }
      },
      mocks: {
        axios: {
          patch: mockPatch
        }
      }
    });
    tbody_tr = category_modal.find('table tbody tr');
  });

  describe('DOM', () => {
    describe('class', () => {
      it('category-modal-containerが存在する', () => {
        expect(category_modal.find('.category-modal-container').exists()).toEqual(true);
      });
      it('category-modal-sub-containerが存在する', () => {
        expect(category_modal.find('.category-modal-sub-container').exists()).toEqual(true);
      });
      it('category-update-titleが存在する', () => {
        expect(category_modal.find('.category-update-title').exists()).toEqual(true);
        expect(category_modal.find('.category-update-title').text()).toEqual('ご飯 を編集');
      });
    });

    describe('table', () => {
      describe('td', () => {
        it('テキスト', () => {
          expect(tbody_tr.findAll('td').at(0).text()).toEqual('1');
          expect(tbody_tr.findAll('td').at(1).text()).toEqual('');
          expect(tbody_tr.findAll('td').at(2).find('.clickIcon').exists()).toEqual(true);
          expect(tbody_tr.findAll('td').at(3).find('.clickIcon').exists()).toEqual(true);
        });
      });
    });
  });

  describe('methods', () => {
    afterEach(() => {
      actions.fetchUpdateCategory.mockClear();
      mockPatch.mockClear();
    });
    describe('updateCategoryName', () => {
      describe('then', () => {
        beforeEach(() => {
          category_modal.setData({
            updateCategory: 'ごはん'
          });
        });
        it('this.axios.patch が動いていて適切な引数が入っているか？', () => {
          tbody_tr.findAll('td').at(2).find('.clickIcon').trigger('click');
          expect(mockPatch).toHaveBeenCalledWith('/api/v1/category/1', {id: 1, category_name: 'ごはん'});
        });

        it('this.$store.dispatch("fetchUpdateCategory") が動いていて適切な引数が入っているか？', async () => {
          tbody_tr.findAll('td').at(2).find('.clickIcon').trigger('click');
          await flushPromises();
          expect(actions.fetchUpdateCategory).toHaveBeenCalledWith(expect.any(Object), { id: 1, category_name: 'ごはん'});
        });

        it('this.$emit("cateogryStatus") が動いていて適切な引数が入っているか？', async () => {
          tbody_tr.findAll('td').at(2).find('.clickIcon').trigger('click');
          await flushPromises();
          expect(category_modal.emitted('categoryStatus')).toMatchObject([[ { message: 'ごはん を作成しました。', status: 200 } ]])
        });

        it('updateCategoryの値が 空文字になる', async () => {
          tbody_tr.findAll('td').at(2).find('.clickIcon').trigger('click');
          await flushPromises();
          expect(category_modal.vm.updateCategory).toEqual('');
        });
        it('this.$emit("closeUpdateClick") が動いて適切な値が入るか?', async () => {
          tbody_tr.findAll('td').at(2).find('.clickIcon').trigger('click');
          await flushPromises();
          expect(category_modal.emitted('closeUpdateClick')).toMatchObject([[]]);
        });
      });

      describe('catch', () => {
        beforeEach(() => {
          category_modal.setData({
            updateCategory: ''
          });
        });

        it('this.error の値が error.response.data.message の値になっているか？', async () => {
          tbody_tr.findAll('td').at(2).find('.clickIcon').trigger('click');
          await flushPromises();
          expect(category_modal.vm.error).toEqual('失敗しました。');
        });
        it('updateCategoryの値が 空文字になる', async () => {
          tbody_tr.findAll('td').at(2).find('.clickIcon').trigger('click');
          await flushPromises();
          expect(category_modal.vm.updateCategory).toEqual('');
        });
      });
    });
  });
});
