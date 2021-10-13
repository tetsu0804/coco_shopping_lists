import { shallowMount } from '@vue/test-utils'
import Flash from '@/src/atoms/Flash'

describe('/atoms/Flash', () => {
  let flash
  beforeEach(() => {
    flash = shallowMount(Flash, {
      propsData: {
        flash: {
          status: '',
          message: ''
        }
      }
    });
  });

  describe('props', () => {
    describe('status', () => {
      describe('200', () => {
        beforeEach(() => {
          flash.setProps({
            flash: {
              message: '成功しました。',
              status: 200
            }
          });
        });
        it('propsのflash.statusが200である', () => {
          expect(flash.vm.flash.status).toEqual(200);
        });
        it('propsのflash.messageが "成功しました" である', () => {
          expect(flash.vm.flash.message).toEqual('成功しました。');
        });
        it('propsのflash.statusが200なので class="success-flash" である', () => {
          expect(flash.find('.success-flash').exists()).toEqual(true);
          expect(flash.find('.error-flash').exists()).toEqual(false);
        });
      });

      describe('400', () => {
        beforeEach(() => {
          flash.setProps({
            flash: {
              message: '失敗しました。',
              status: 400
            }
          });
        });

        it('propsのflash.statusが400である', () => {
          expect(flash.vm.flash.status).toEqual(400);
        });
        it('propsのflash.messageが "失敗しました。" である', () => {
          expect(flash.vm.flash.message).toEqual('失敗しました。');
        });
        it('propsのflash.statusが200以外なので class="error-flash" である', () => {
          expect(flash.find('.error-flash').exists()).toEqual(true);
          expect(flash.find('.success-flash').exists()).toEqual(false);
        });
      });
    });
  });

  describe('x', () => {
    beforeEach(() => {
      flash.setProps({
        flash: {
          status: 200,
          message: '成功しました。'
        }
      });
    });
    it('x をクリックすると $emit("closeFlash") が動作する', () => {
      flash.find('.flash-close').trigger('click')
      expect(flash.emitted('closeFlash')).toMatchObject([[]])
    });
  });

  describe('computed', () => {
    describe('flashClass', () => {
      it('flash.statusの値が 200 の場合 success-flash になる', async() => {
        await flash.setProps({
          flash: {
            status: 200,
            message: '成功しました。'
          }
        });
        expect(flash.vm.flashClass).toEqual('success-flash');
      });

      it('flash.statusの価が 200以外 の場合 error-flash', async () => {
        await flash.setProps({
          flash: {
            status: 400,
            message: '失敗しました。'
          }
        });

        expect(flash.vm.flashClass).toEqual('error-flash');
      });
    });
  });
});
