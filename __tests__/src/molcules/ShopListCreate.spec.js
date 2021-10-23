import { shallowMount, createLocalVue } from '@vue/test-utils'
import ShopListCreate from '@/src/molcules/ShopListCreate'
import InputFrom from '@/src/atoms/InputForm'
import CreateBtn from '@/src/atoms/CreateBtn'
import Flash from '@/src/atoms/Flash'
import Vuex from 'vuex'

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
      it('shop-list-container が存在するか？', () => {
        expect(shop_list_create.find('.shop-list-container').exists()).toEqual(true);
      });
    })
  });
});
