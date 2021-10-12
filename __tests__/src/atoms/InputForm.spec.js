import { shallowMount } from '@vue/test-utils'
import InputForm from '@/src/atoms/InputForm'

describe('/atoms/InputForm', () => {
  let input_form, input_tag
  beforeEach(() => {
    input_form = shallowMount(InputForm, {
      propsData: {
        status: {
          id: 'email',
          kinds: 'email',
          place: 'メールアドレス',
          label: '',
          trueBox: '',
          false_Box: '',
          checkbox_be: '',
          value: 'test@'
        }
      }
    });
  });

  describe('computed', () => {
    describe('forId', () => {
      it('status.id の値が入る', () => {
        expect(input_form.vm.forId).toEqual('email');
      });
      it('status.id の値が空文字の場合 は "unnowId" となる', async () => {
        await input_form.setProps({
          status: { id: '' }
        });

        expect(input_form.vm.forId).toEqual('unnowId');
      });
    });
    describe('typeKinds', () => {
      it('status.kinds の値が入る', () => {
        expect(input_form.vm.typeKinds).toEqual('email');
      });
      it('status.kinds の値が空文字の場合 は "text" となる', async () => {
        await input_form.setProps({
          status: { kinds: '' }
        });

        expect(input_form.vm.typeKinds).toEqual('text');
      });
    });
    describe('placeholder', () => {
      it('status.place の値が入る', () => {
        expect(input_form.vm.placeholder).toEqual('メールアドレス');
      });
      it('status.place の値が空文字の場合 は "ここに入力ください。" となる', async () => {
        await input_form.setProps({
          status: { place: '' }
        });

        expect(input_form.vm.placeholder).toEqual('ここに入力ください。');
      });
    });
    describe('labelText', () => {
      it('status.label の値が空文字の場合は 空文字が入る', () => {
        expect(input_form.vm.labelText).toEqual('');
      });
      it('status.label の値が入る', async () => {
        await input_form.setProps({
          status: { label: 'Eメール' }
        });

        expect(input_form.vm.labelText).toEqual('Eメール');
      });
    });
    describe('trueBox', () => {
      it('status.true_box の値が空文字の場合は false が入る', () => {
        expect(input_form.vm.trueBox).toEqual(false);
      });
      it('status.true_box の値が入る', async () => {
        await input_form.setProps({
          status: { true_box: '1' }
        });

        expect(input_form.vm.trueBox).toEqual('1');
      });
    });
    describe('falseBox', () => {
      it('status.false_box の値が空文字の場合は false がはいる', () => {
        expect(input_form.vm.falseBox).toEqual(false);
      });
      it('status.false_box の値がはいる', async () => {
        await input_form.setProps({
          status: { false_box: '0' }
        });

        expect(input_form.vm.falseBox).toEqual('0');
      });
    });
    describe('beCheckbox', () => {
      it('status.checkbox_be がない場合は false となる', () => {
        expect(input_form.vm.beCheckbox).toEqual(false);
      });
      it('status.checkbox_be に値が入っている場合は true になる', async () => {
        await input_form.setProps({
          status: { checkbox_be: true }
        });

        expect(input_form.vm.beCheckbox).toEqual(true);
      });
    });
    describe('inputValue', () => {
      it('status.value の値が 入る', () => {
        expect(input_form.vm.inputValue).toEqual('test@');
      });
      it('status.checkbox_be に値が入っている場合は true になる', async () => {
        input_tag = input_form.find('input[type="email"]');
        await input_tag.setValue('test@t')
        expect(input_form.emitted('inputFormValue')).toMatchObject([['test@t']]);
      });
    });
  });

  describe('DOM', () => {
    describe('class', () => {
      describe('checkbox-form', () => {
        beforeEach(() => {
          input_form.setProps({
            status: {
              id: 'checkbox-id',
              kinds: 'checkbox',
              place: '',
              label: 'ログインの維持',
              trueBox: '1',
              false_Box: '0',
              checkbox_be: true,
              value: ''
            }
          });
        });
        it('beCheckBoxに trueの場合に 存在する',  () => {
          expect(input_form.find('.checkbox-form').exists()).toEqual(true);
          expect(input_form.find('.input-form').exists()).toEqual(false);
        });

        it('type="checkbox" である', () => {
          expect(input_form.find('.checkbox-form').attributes().type).toEqual('checkbox');
        });
        it('id === checkbox-id である', () => {
          expect(input_form.find('.checkbox-form').attributes().id).toEqual('checkbox-id');
        });
      });
      describe('input-form', () => {
        beforeEach(() => {
          input_form.setProps({
            status: {
              id: 'email-id',
              kinds: 'email',
              place: 'Eメール',
              label: '',
              trueBox: '',
              false_Box: '',
              checkbox_be: '',
              value: ''
            }
          });
        });
        it('beCheckBoxに false の場合に存在する', () => {
          expect(input_form.find('.input-form').exists()).toEqual(true);
          expect(input_form.find('.checkbox-form').exists()).toEqual(false);
        });

        it('type === emial である', () => {
          expect(input_form.find('.input-form').attributes().type).toEqual('email');
        });
        it('id === emial-id である', () => {
          expect(input_form.find('.input-form').attributes().id).toEqual('email-id');
        });
        it('place === Eメール である', () => {
          expect(input_form.find('.input-form').attributes().placeholder).toEqual('Eメール');
        });
      });
    });
  });
});
