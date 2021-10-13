import { shallowMount, createLocalVue } from '@vue/test-utils'
import Signup from '@/src/template/Signup'
import SignupForm from '@/src/molcules/SignupForm'
import Flash from '@/src/atoms/Flash'
import VueRouter from 'vue-router'
import flushPromises from 'flush-promises'

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('/template/Signup', () => {
  let signup, signup_form, flash
  beforeEach(() => {
    signup = shallowMount(Signup, { localVue });
    signup_form = signup.findComponent(SignupForm);
  });

  describe('DOM',  () => {
    describe('子コンポーネント', () => {
      describe('Signup', () => {
        it('存在する', () => {
          expect(signup_form.exists()).toEqual(true)
        });
      });
      describe('Flash', () => {
        it('data.flash.statusに値があると存在する', async () => {
          await signup.setData({
            flash: { message: '', status: '' }
          });
          flash = signup.findComponent(Flash);
          expect(flash.exists()).toEqual(false);
        });
        it('data.flash.statusに値があると存在する',  async() => {
          signup.setData({
            flash: { message: '成功しました。', status: 200 }
          });
          await flushPromises();
          flash = signup.findComponent(Flash);
          expect(flash.exists()).toEqual(true);
        });

      });
    });
  });

  describe('$emit', () => {
    describe('signupErrorStatus', () => {
      it('$emit(signupErrorStatsu) が動くと flashの値が signupErrorStatusの引数の値になる', () => {
        expect(signup.vm.flash).toEqual({ message: '', status: ''});
        signup_form.vm.$emit('signupErrorStatus', { message: '失敗しました。', status: 400 });
        expect(signup.vm.flash).toEqual({ message: '失敗しました。', status: 400 });
      });
    });

    describe('closeFlash', () => {
      beforeEach(() => {
        signup.setData({
          flash: { message: '失敗しました。', status: 400 }
        });
      });

      it('$emit("closeFlash") が動くと flashの値がから文字になる', () => {
        flash = signup.findComponent(Flash);
        expect(signup.vm.flash).toEqual({ message: '失敗しました。', status: 400});
        flash.vm.$emit('closeFlash');
        expect(signup.vm.flash).toEqual({ message: '', status: ''});
      });
    });
  });
});
