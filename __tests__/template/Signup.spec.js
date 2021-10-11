import { shallowMount, createLocalVue } from '@vue/test-utils'
import Signup from '@/src/template/Signup'
import SignupForm from '@/src/molcules/SignupForm'
import VueRouter from 'vue-router'

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('/template/Signup', () => {
  let signup, signup_form
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
    });
  });
});
