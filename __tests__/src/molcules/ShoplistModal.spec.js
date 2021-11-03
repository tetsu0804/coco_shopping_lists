import { shallowMount, createLocalVue } from '@vue/test-utils'
import ShoplistModal from '@/src/molcules/ShoplistModal'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

const localVue = createLocalVue();
localVue.use(Vuex);

describe('/molcules/ShoplistModal', () => {
  let shoplist_modal, shoplist, store, actions, mockPatch
  beforeEach(() => {
    shoplist = { id: 1, list_name: 'リストA', price: 100, purchasedate: '2021-10-20T00:00:00.000Z', user_id: 1}

    mockPatch = jest.fn().mockImplementationOnce((url, args) => {
      return new Promise((resolve, reject) => {
        if (!!args.id && !!args.list_name && !!args.price && !!args.purchasedate && !!args.user_id ) {
          resolve({
            data: {
              shoplist: { id: args.id, list_name: args.list_name, price: args.price, purchasedate: args.purchasedate, user_id: args.user_id },
              categories: [1, 3]
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

    actions = {
      fetchUpdateShopList: jest.fn()
    }

    store = new Vuex.Store({
      actions
    });

    shoplist_modal = shallowMount(ShoplistModal, {store, localVue,
      propsData: {
        selectedShoplist: shoplist
      },
      mocks: {
        axios: {
          patch: mockPatch
        }
      }
    });
  });

  describe('DOM', () => {
    describe('class', () => {
      describe('shoplist-modal-container', () => {
        it('存在するか？', () => {
          expect(shoplist_modal.find('.shoplist-modal-container').exists()).toEqual(true);
        });
      });
      describe('shoplist-modal-container', () => {
        it('存在するか？', () => {
          expect(shoplist_modal.find('.shoplist-modal-container .shoplist-modal-sub-container').exists()).toEqual(true);
        });
      });
      describe('shoplist-modal-title-table', () => {
        it('存在するか？', () => {
          expect(shoplist_modal.find('.shoplist-modal-container .shoplist-modal-sub-container .shoplist-modal-title-table').exists()).toEqual(true);
        });
      });
      describe('shoplist-update-title', () => {
        it('存在するか？', () => {
          expect(shoplist_modal.find('.shoplist-modal-container .shoplist-modal-sub-container .shoplist-modal-title-table .shoplist-update-title').exists()).toEqual(true);
        });
        it('テキスト', () => {
          expect(shoplist_modal.find('.shoplist-modal-container .shoplist-modal-sub-container .shoplist-modal-title-table .shoplist-update-title').text()).toEqual('リストA を編集');
        });
      });

      describe('table', () => {
        let trs
        it('tableが存在する', () => {
          expect(shoplist_modal.find('table').exists()).toEqual(true);
        });
        beforeEach(() => {
          trs = shoplist_modal.findAll('table tbody tr');
        });

        it('tr は存在する', () => {
          expect(trs.exists()).toEqual(true);
        });

        it('trs.at(0) td.at(0).text = "No" と td.at(1).text= 1', () => {
          expect(trs.at(0).findAll('td').at(0).text()).toEqual('No');
          expect(trs.at(0).findAll('td').at(1).text()).toEqual('1');
        });
        it('trs.at(1) td.at(0).text = "商品名" と td.at(1).find("input") が存在する', () => {
          expect(trs.at(1).findAll('td').at(0).text()).toEqual('商品名');
          expect(trs.at(1).findAll('td').at(1).find('input').exists()).toEqual(true);
          expect(trs.at(1).findAll('td').at(1).find('input').attributes().type).toEqual('text');
        });
        it('trs.at(2) td.at(0).text = "値段" と td.at(1).find("input") が存在する', () => {
          expect(trs.at(2).findAll('td').at(0).text()).toEqual('値段');
          expect(trs.at(2).findAll('td').at(1).find('input').exists()).toEqual(true);
          expect(trs.at(2).findAll('td').at(1).find('input').attributes().type).toEqual('number');
        });
        it('trs.at(3) td.at(0).text = "日付" と td.at(1).find("input") が存在する', () => {
          expect(trs.at(3).findAll('td').at(0).text()).toEqual('日付');
          expect(trs.at(3).findAll('td').at(1).find('input').exists()).toEqual(true);
          expect(trs.at(3).findAll('td').at(1).find('input').attributes().type).toEqual('date');
        });
        it('trs.at(4) td.at(0).text = "日付" と td.at(1).find("input") が存在する', () => {
          expect(trs.at(4).findAll('td').at(0).text()).toEqual('編集完了');
          expect(trs.at(4).findAll('td').at(1).find('div').exists()).toEqual(true);
          expect(trs.at(4).findAll('td').at(1).find('div').attributes().class).toEqual('clickIcon');
        });
        it('trs.at(5) td.at(0).text = "日付" と td.at(1).find("input") が存在する', () => {
          expect(trs.at(5).findAll('td').at(0).text()).toEqual('X');
          expect(trs.at(5).findAll('td').at(1).find('div').exists()).toEqual(true);
          expect(trs.at(5).findAll('td').at(1).find('div').attributes().class).toEqual('clickIcon');
        });
      });
    });
  });

  describe('methods', () => {
    let trs
    beforeEach( () => {
      shoplist_modal.setData({
        updateListName: 'リストB',
        updatePrice: '200',
        updatePurchasedate: '2021-10-21T00:00:00.000Z'
      });

      trs = shoplist_modal.findAll('table tbody tr');
    });
    afterEach(() => {
      actions.fetchUpdateShopList.mockClear();
      mockPatch.mockClear();
    });
    describe('updateShoplist', () => {
      describe('then', () => {
        it('this.axios.patch が動いていて適切な引数が入っているか？', () => {
          trs.at(4).findAll('td').at(1).find('div').trigger('click');
          expect(mockPatch).toHaveBeenCalledWith('/api/v1/shop_list/1', {id: 1, list_name: 'リストB', price: '200', purchasedate: '2021-10-21T00:00:00.000Z', user_id: 1});
        });

        it('$store.dispatch("fetchUpdateShopList")', async () => {
          trs.at(4).findAll('td').at(1).find('div').trigger('click');
          await flushPromises();
          expect(actions.fetchUpdateShopList).toHaveBeenCalledWith(expect.any(Object), { update_shoplist: {id:1, list_name: 'リストB', price: '200', purchasedate: '2021-10-21T00:00:00.000Z', user_id: 1}, categories: [1, 3]});
        });

        it('$emit("shoplistStatus")が動いて適切な引数が入っているか？', async () => {
          trs.at(4).findAll('td').at(1).find('div').trigger('click');
          await flushPromises();
          expect(shoplist_modal.emitted('shoplistStatus')).toMatchObject([[{ message: 'リストB を作成しました。', status: 200}]]);
        });
        it('this.clearData() が動いている data を空文字になっているか？', async () => {
          expect(shoplist_modal.vm.updateListName).toEqual('リストB');
          expect(shoplist_modal.vm.updatePrice).toEqual('200');
          expect(shoplist_modal.vm.updatePurchasedate).toEqual('2021-10-21T00:00:00.000Z');
          trs.at(4).findAll('td').at(1).find('div').trigger('click');
          await flushPromises();
          expect(shoplist_modal.vm.updateListName).toEqual('');
          expect(shoplist_modal.vm.updatePrice).toEqual('');
          expect(shoplist_modal.vm.updatePurchasedate).toEqual('');
        });

        it('this.$emit("closeUpdateClick") が動いてるか？', async () => {
          trs.at(4).findAll('td').at(1).find('div').trigger('click');
          await flushPromises();
          expect(shoplist_modal.emitted('closeUpdateClick')).toMatchObject([[]]);
        });
      });

      describe('catch', () => {
        beforeEach(() => {
          shoplist_modal.setData({
            updateListName: '',
            updatePrice: '',
            updatePurchasedate: ''
          });
        });
        it('this.error にエラ〜メッセージが入る', async () => {
          expect(shoplist_modal.vm.error).toEqual('');
          trs.at(4).findAll('td').at(1).find('div').trigger('click');
          await flushPromises();
          expect(shoplist_modal.vm.error).toEqual('失敗しました。');
        });
        it('this.clearData() が動いている data を空文字になっているか？', async () => {
          expect(shoplist_modal.vm.updateListName).toEqual('');
          expect(shoplist_modal.vm.updatePrice).toEqual('');
          expect(shoplist_modal.vm.updatePurchasedate).toEqual('');
          trs.at(4).findAll('td').at(1).find('div').trigger('click');
          await flushPromises();
          expect(shoplist_modal.vm.updateListName).toEqual('');
          expect(shoplist_modal.vm.updatePrice).toEqual('');
          expect(shoplist_modal.vm.updatePurchasedate).toEqual('');
        });
      });
    });
  });
});
