import { shallowMount, createLocalVue } from '@vue/test-utils'
import ShopListCreate from '@/src/molcules/ShopListCreate'
import InputFrom from '@/src/atoms/InputForm'
import CreateBtn from '@/src/atoms/CreateBtn'
import Flash from '@/src/atoms/Flash'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

const localVue = createLocalVue();
localVue.use(Vuex);

describe('/molcules/ShopListCreate', () => {
  let shop_list_create, input_forms, create_btn, store, actions, mockPost
  beforeEach(() => {
    actions = {
      fetchCreateShopList: jest.fn()
    }
    store = new Vuex.Store({
      actions
    });

    mockPost = jest.fn().mockImplementationOnce((url, args) => {
      return new Promise((resolve, reject) => {
        if (!!args.list_name && !!args.price && !!args.purchasedate && !!args.user_id && !!args.categories) {
          resolve({
            data: {
              shop_list: { id: 1, list_name: args.list_name, price: args.price, purchasedate: args.purchasedate, user_id: args.user_id, categoires: args.categories}
            },
            status: 200
          });
        } else {
          reject({
            response: {
              data: {
                message: 'もう一度フォームに入力してください。'
              },
              status: 400
            }
          });
        }
      });
    });

    shop_list_create = shallowMount(ShopListCreate, { localVue, store,
      propsData: {
        allCategories:
          [
            { id: 1, category_name: 'ご飯'},
            { id: 2, category_name: 'おやつ'},
            { id: 3, category_name: 'おもちゃ'}
          ]
        ,
        userLoggedIn: {
          signedIn: true,
          user: {id: 1, last_name: '吉田', first_name: '太朗', email: 'test@test.com'}
        }
      },
      mocks: {
        axios: {
          post: mockPost
        }
      }
    });
    input_forms = shop_list_create.findAllComponents(InputFrom);
    create_btn = shop_list_create.findComponent(CreateBtn);
  });

  describe('DOM', () => {
    describe('class', () => {
      let shop_list_base_containers, shop_list_fields
      it('shop-list-container が存在するか？', () => {
        expect(shop_list_create.find('.shop-list-container').exists()).toEqual(true);
      });

      it('shop-list-base-container が存在するか？', () => {
        shop_list_base_containers = shop_list_create.findAll('.shop-list-base-container');
        expect(shop_list_base_containers.exists()).toEqual(true);
        expect(shop_list_base_containers.length).toEqual(5);
      });

      it('shop-list-field が存在するか？ ４つあるか？', () => {
        shop_list_fields = shop_list_create.findAll('.shop-list-field');
        expect(shop_list_fields.exists()).toEqual(true);
        expect(shop_list_fields.length).toEqual(4);
      });
    });

    describe('子コンポーネント', () => {
      describe('InputFrom', () => {
        it('存在するか？', () => {
          expect(input_forms.exists()).toEqual(true);
        });

        it('(category:3) + listName + price + datetime = 6 つあるか？', () => {
          expect(input_forms.length).toEqual(6);
        });

        it('at(0) :status ', () => {
          expect(input_forms.at(0).props().status).toMatchObject(
            { id: 1, kinds: 'checkbox', label: 'ご飯', true_box: 1, false_box: '', checkbox_be: true }
          )
        });
        it('at(1) :status ', () => {
          expect(input_forms.at(1).props().status).toMatchObject(
            { id: 2, kinds: 'checkbox', label: 'おやつ', true_box: 2, false_box: '', checkbox_be: true }
          )
        });
        it('at(2) :status ', () => {
          expect(input_forms.at(2).props().status).toMatchObject(
            { id: 3, kinds: 'checkbox', label: 'おもちゃ', true_box: 3, false_box: '', checkbox_be: true }
          )
        });
        it('at(3) :status ', () => {
          expect(input_forms.at(3).props().status).toMatchObject(
            { id: 'list-name', kinds: 'text', label: '', place: '例: ロイヤルカナン', value: '' }
          )
        });
        it('at(4) :status ', () => {
          expect(input_forms.at(4).props().status).toMatchObject(
            { id: 'price', kinds: 'number', label: '', place: '例: 500', value: '' }
          )
        });
        it('at(5) :status ', () => {
          expect(input_forms.at(5).props().status).toMatchObject(
            { id: 'datetime', kinds: 'date', label: '', place: '', value: '' }
          )
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
    describe('InputFormsコンポーネントの $emit("inputFormValue")', () => {
      it('at(0)', () => {
        expect(shop_list_create.vm.checked).toEqual([]);
        input_forms.at(0).vm.$emit('inputFormValue', 1);
        expect(shop_list_create.vm.checked).toEqual([1]);
      });
      it('at(1)', () => {
        expect(shop_list_create.vm.checked).toEqual([]);
        input_forms.at(1).vm.$emit('inputFormValue', 2);
        expect(shop_list_create.vm.checked).toEqual([2]);
      });
      it('at(2)', () => {
        expect(shop_list_create.vm.checked).toEqual([]);
        input_forms.at(2).vm.$emit('inputFormValue', 3);
        expect(shop_list_create.vm.checked).toEqual([3]);
      });
      it('at(3)', () => {
        expect(shop_list_create.vm.listName.value).toEqual('');
        input_forms.at(3).vm.$emit('inputFormValue', 'ロイヤルカナン');
        expect(shop_list_create.vm.listName.value).toEqual('ロイヤルカナン');
      });
      it('at(4)', () => {
        expect(shop_list_create.vm.price.value).toEqual('');
        input_forms.at(4).vm.$emit('inputFormValue', 5000);
        expect(shop_list_create.vm.price.value).toEqual(5000);
      });
      it('at(5)', () => {
        expect(shop_list_create.vm.datetime.value).toEqual('');
        input_forms.at(5).vm.$emit('inputFormValue', '2021-10-22');
        expect(shop_list_create.vm.datetime.value).toEqual('2021-10-22');
      });
    });
  });

  describe('methods', () => {
    describe('changeStatus', () => {
      it('動いて id と label と true_box に値が入っているか？', () => {
        expect(shop_list_create.vm.changStatus({id:1, category_name: 'ご飯'})).toEqual(
          {
            id: 1,
            kinds: 'checkbox',
            label: 'ご飯',
            true_box: 1,
            false_box: '',
            checkbox_be: true
          }
        )
      });
    });

    describe('changeCheckValue', () => {
      it('動いて this.checked の値が適切な値になっているか？', () => {
        expect(shop_list_create.vm.checked).toEqual([]);
        shop_list_create.vm.changeCheckValue(1, { id: 1, category_name: 'ご飯'});
        expect(shop_list_create.vm.checked).toEqual([1]);
      });
    });

    describe('falseCheck', () => {
      it('動いて this.checkedのfalseの値が消えているか？', ()=> {
        shop_list_create.setData({
          checked: [1, false, 2, 3]
        });
        expect(shop_list_create.vm.falseCheck()).toEqual([1, 2, 3]);
      });
    });

    describe('closeModalClick', () => {
      it('.close-modal-click をクリックすると 動く', () => {
        shop_list_create.find('.close-modal-click').trigger('click');
        expect(shop_list_create.emitted('closeModal')).toMatchObject([[]]);
      });
    });

    describe('crateShopList', () => {
      afterEach(() => {
        mockPost.mockClear();
        actions.fetchCreateShopList.mockClear();
      });
      describe('then', () => {
        beforeEach(() => {
          shop_list_create.setData({
            checked: [1],
            listName: { id: 'list-name', kinds: 'text', label: '', place: '例: ロイヤルカナン', value: 'ロイヤルカナン' },
            price: { id: 'price', kinds: 'number', label: '', place: '例: 500', value: 5000 },
            datetime: { id: 'datetime', kinds: 'date', label: '', place: '', value: '2021-10-22' },
          });
        });

        it('this.axios.post が動いていて適切な引数が入っているか？', () => {
          create_btn.vm.$emit('createBtnClick');
          expect(mockPost).toHaveBeenCalledWith('/api/v1/shop_list', { list_name: 'ロイヤルカナン', price: 5000, purchasedate: '2021-10-22', user_id: 1, categories: [1]})
        });

        it('this.$store.dispatch("fetchCreateShopList") が動いて適切な引数が入っているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(actions.fetchCreateShopList).toHaveBeenCalledWith(expect.any(Object), { shoplist: { id: 1, list_name: 'ロイヤルカナン', price: 5000, purchasedate: '2021-10-22', user_id: 1, categoires: [1]}})
        });

        it('$emit("shopListStatus") が動いて適切な引数が入っているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(shop_list_create.emitted('shopListStatus')).toMatchObject([[{ message: 'ロイヤルカナン を作成しました。', status: 200 }]]);
        });

        it('$emit("closeModal") が動いて適切な引数が入っているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(shop_list_create.emitted('closeModal')).toMatchObject([[]]);
        });

        it('data> プロパティ.value の値が空文字になっているか？', async () => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(shop_list_create.vm.checked).toMatchObject([]);
          expect(shop_list_create.vm.listName).toMatchObject(
            { id: 'list-name', kinds: 'text', label: '', place: '例: ロイヤルカナン', value: '' }
          );
          expect(shop_list_create.vm.price).toMatchObject(
            { id: 'price', kinds: 'number', label: '', place: '例: 500', value: '' }
          );
          expect(shop_list_create.vm.datetime).toMatchObject(
            { id: 'datetime', kinds: 'date', label: '', place: '', value: '' }
          );
        });
      });

      describe('catch', () => {
        beforeEach(() => {
          shop_list_create.setData({
            checked: [],
            listName: { id: 'list-name', kinds: 'text', label: '', place: '例: ロイヤルカナン', value: '' },
            price: { id: 'price', kinds: 'number', label: '', place: '例: 500', value: '' },
            datetime: { id: 'datetime', kinds: 'date', label: '', place: '', value: '' },
          });
        });

        it('this.flashに適切な値が入っているか？', async () => {
          expect(shop_list_create.vm.flash).toEqual({ message: '', status: ''});
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(shop_list_create.vm.flash).toEqual({ message: 'もう一度フォームに入力してください。', status: 400 });
        });

        it('data プロパティ.value の値が空文字になっているか？', async() => {
          create_btn.vm.$emit('createBtnClick');
          await flushPromises();
          expect(shop_list_create.vm.checked).toMatchObject([]);
          expect(shop_list_create.vm.listName).toMatchObject(
            { id: 'list-name', kinds: 'text', label: '', place: '例: ロイヤルカナン', value: '' }
          );
          expect(shop_list_create.vm.price).toMatchObject(
            { id: 'price', kinds: 'number', label: '', place: '例: 500', value: '' }
          );
          expect(shop_list_create.vm.datetime).toMatchObject(
            { id: 'datetime', kinds: 'date', label: '', place: '', value: '' }
          );
        });
      });
    });
  });
});
