import { shallowMount } from '@vue/test-utils'
import CreateBtn from '@/src/atoms/CreateBtn'

describe('/atoms/CreateBtn', () => {
  let create_btn
  beforeEach(() => {
    create_btn = shallowMount(CreateBtn)
  });
  describe('DOM', () => {
    describe('class', () => {
      it('create-btn-container', () => {
        expect(create_btn.find('.create-btn-container').exists()).toEqual(true);
      });
    });

    describe('buttonタグ', () => {
      it('buttonタグが存在する', () => {
        expect(create_btn.find('button').exists()).toEqual(true);
      });
    });

    describe('テキスト', () => {
      it('buttonタグのテキストは デフォルトで "登録" である', () => {
        expect(create_btn.find('button').text()).toEqual('登録');
      });

      it('slotsのに テキスト を入れると その値になる', () => {
        create_btn = shallowMount(CreateBtn, {
          slots: {
            default: 'ログイン'
          }
        });

        expect(create_btn.find('button').text()).toEqual('ログイン');
      });
    });
  });

  describe('methods', () => {
    let btn
    describe('$emit', () => {
      it('$emit("createBtnClick") が動いているか?', () => {
        btn = create_btn.find('button');
        btn.trigger('click');

        expect(create_btn.emitted('createBtnClick')).toMatchObject([[]]);
      });
    });;
  });
});
