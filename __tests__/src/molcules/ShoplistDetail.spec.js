import { shallowMount, createLocalVue } from '@vue/test-utils'
import ShoplistDetail from '@/src/molcules/ShoplistDetail'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import date from '@/src/modules/date'
import getters from '@/store/getters'
const localVue = createLocalVue();
localVue.use(Vuex);

describe('/molcules/ShoplistDeail', () => {
  let shoplists = [], shoplist_detail, store ,state, actions, mockDelete, now, dummy_purchase, month_to_month, other_getters
  dummy_purchase = new Date('2021-10-25T00:00:00.000Z');
  for (let i = 0; i < 21; i++) {
    let format_list = { id: i + 1, list_name: `リスト${i + 1}`, price: 100, purchasedate: new Date(dummy_purchase.setDate(i + 1)).toJSON(), user_id: 1}
    shoplists.push(format_list);
  }

  beforeEach(() => {
    now = new Date();

    month_to_month = date.monthToMonthNumber(now, shoplists[0]);
    state = {
      shoplists: shoplists,
      users: [{ id: 1, first_name: '太朗', last_name: '吉田', email: 'test@test.com'}]
    }




    other_getters = {
      thisMonthShopList: getters.thisMonthShopList(state)
    }

    mockDelete = jest.fn().mockImplementationOnce((url) => {
      return new Promise((resolve, reject) => {
        if (!!url) {
          resolve({
            status: 200
          })
        } else {
          reject({
            response: {
              status: 400
            }
          })
        }
      });
    });


    actions = {
      fetchDeleteShopList: jest.fn()
    }

    store = new Vuex.Store({
      actions
    })
    //
    shoplist_detail = shallowMount(ShoplistDetail, { localVue, store,
      propsData: {
        userLoggedIn: { loggedIn: true, user: {id:1, last_name: '吉田', first_name: '太朗', email: 'test@test.com'} },
        pageSplit: getters.pageSplit(state, other_getters),
        dateNum: month_to_month,
        pageNum: 0,
        pageTotal: 10,
        userSearchId: getters.userSearchId(state)
      },
      mocks: {
        axios: {
          delete: mockDelete
        }
      }
    });
  });

  describe('DOM', () => {
    it('shoplist-detail-container', () => {
      expect(shoplist_detail.find('.shoplist-detail-container').exists()).toEqual(true);
    });
    describe('table tbody tr', () => {
      let trs, tds
      beforeEach(() => {
        trs = shoplist_detail.findAll('.shoplist-detail-container table tbody tr')
      });

      it('存在するのか？', () => {
        expect(trs.exists()).toEqual(true);
      });
      it('数は pageTotal10なので 10', () => {
        expect(trs.length).toEqual(10);
      });

      describe('at(n).findAll("td")', () => {
        beforeEach(() => {
          tds = trs.at(0).findAll('td');
        });
        it('at(0).findAll("td") は存在するか？', () => {
          expect(tds.exists()).toEqual(true);
        });
        it('at(0).findAll("td") の数 6', () => {
          expect(tds.length).toEqual(6);
        });
        it('tds.at(0).text = 21', () => {
          expect(tds.at(0).text()).toEqual('21');
        });
        it('tds.at(1).text = リスト21', () => {
          expect(tds.at(1).text()).toEqual('リスト21');
        });
        it('tds.at(2).text = 100円', () => {
          expect(tds.at(2).text()).toEqual('100円');
        });
        it('tds.at(3).text = 太朗', () => {
          expect(tds.at(3).text()).toEqual('太朗');
        });
        it('tds.at(4).find("div").class = clickIcon (リスト21のuser_id と loggedIn.user.id が同じの為 存在する)', () => {
          expect(tds.at(4).find('div').attributes().class).toEqual('clickIcon');
        });
        it('tds.at(5).find("div").class = clickIcon (リスト21のuser_id と loggedIn.user.id が同じの為 存在する)', () => {
          expect(tds.at(5).find('div').attributes().class).toEqual('clickIcon');
        });
        it('tds.at(4).find("div") が リスト21のuser_id と loggedIn.user.id が異なると存在しない', async () => {
          await shoplist_detail.setProps({
            userLoggedIn: { loggedIn: true, user: {id:2, last_name: '吉田', first_name: '二郎', email: 'test1@test.com'} },
          });
          trs = shoplist_detail.findAll('.shoplist-detail-container table tbody tr');
          tds = trs.at(0).findAll('td');
          expect(tds.at(4).find('div').exists()).toEqual(false);
        });
        it('tds.at(5).find("div") が リスト21のuser_id と loggedIn.user.id が異なると存在しない', async () => {
          await shoplist_detail.setProps({
            userLoggedIn: { loggedIn: true, user: {id:2, last_name: '吉田', first_name: '二郎', email: 'test1@test.com'} },
          });
          trs = shoplist_detail.findAll('.shoplist-detail-container table tbody tr');
          tds = trs.at(0).findAll('td');
          expect(tds.at(5).find('div').exists()).toEqual(false);
        });
      });
    });
  });

  describe('computed', () => {
    describe('userSearch', () => {
      it('1 を渡すと 太朗 が返る(user.id = 1 = 太朗)', () => {
        expect(shoplist_detail.vm.userSearch(1)).toEqual('太朗');
      });
    });
    describe('userIdMatchedShoplist', () => {
      it('引数に 1 を渡すと true (this.userLoggedIn.user.id が 1の為)', () => {
        expect(shoplist_detail.vm.userIdMatchedShoplist(1)).toEqual(true);
      });
      it('引数に 2 を渡すと false (this.userLoggedIn.user.id が 1の為)', () => {
        expect(shoplist_detail.vm.userIdMatchedShoplist(2)).toEqual(false);
      });
      it('引数に -1 を渡すと false (this.userLoggedIn.user.id が 1の為)', () => {
        expect(shoplist_detail.vm.userIdMatchedShoplist(-1)).toEqual(false);
      });
    });
  });
  describe('methods', () => {
    let trs, tds
    beforeEach(() => {
      trs = shoplist_detail.findAll('table tbody tr');
      tds = trs.at(0).findAll('td');
    });
    afterEach(() => {
      actions.fetchDeleteShopList.mockClear();
      mockDelete.mockClear();
    });
    describe('updateShoplist', () => {
      it('updateShoplistが動くと this.$emit("shoplistUpdate") が動くそして適切な引数が入っているか？', () => {
        tds.at(4).find('div').trigger('click');
        expect(shoplist_detail.emitted('shoplistUpdate')).toMatchObject([[21]]);
      });
    });

    describe('deleteShoplist', () => {
      describe('then', () => {
        it('axios.delete が動いて適切な引数が入っているか？', () => {
          tds.at(5).find('div').trigger('click');
          expect(mockDelete).toHaveBeenCalledWith('/api/v1/shop_list/21');
        });

        it('$srore.dispatch("fetchDeleteShoplist") が動いて適切な引数が入っているか？', async () => {
          tds.at(5).find('div').trigger('click');
          await flushPromises();
          expect(actions.fetchDeleteShopList).toHaveBeenCalledWith(expect.any(Object), 21);
        });
        it('$emit("shoplistStatus") が動いて適切な引数が入っているか？', async () => {
          tds.at(5).find('div').trigger('click');
          await flushPromises();
          expect(shoplist_detail.emitted('shoplistStatus')).toMatchObject([[{message: 'リスト21 を削除しました。', status: 200}]]);
        });
      });
    });
  });
});
