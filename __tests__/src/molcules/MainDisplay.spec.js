import { shallowMount, createLocalVue } from '@vue/test-utils'
import MainDisplay from '@/src/molcules/MainDisplay'
import getters from '@/store/getters'
import date from '@/src/modules/date'
import VueRouter from 'vue-router'

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('/molcules/MainDisplay', () => {
  let main_display, state, shoplists, other_getters, month_to_month, now
  beforeEach(() => {
    now = new Date();
    shoplists = [
      {id:1, list_name: 'ちゅーる8月10味', price: 600, purchasedate: '2021-08-10T00:00:00.000Z', user_id: 1},
      {id:2, list_name: 'ちゅーる8月20味', price: 700, purchasedate: '2021-08-20T00:00:00.000Z', user_id: 1},
      {id:3, list_name: 'ちゅーる9月10味', price: 800, purchasedate: '2021-09-10T00:00:00.000Z', user_id: 1},
      {id:4, list_name: 'ちゅーる9月20味', price: 900, purchasedate: '2021-09-20T00:00:00.000Z', user_id: 1},
      {id:5, list_name: 'ちゅーる10月10味', price: 1000, purchasedate: '2021-10-10T00:00:00.000Z', user_id: 1},
      {id:6, list_name: 'ちゅーる10月20味', price: 1100, purchasedate: '2021-10-20T00:00:00.000Z', user_id: 1},
    ]
    state = {
      shoplists: shoplists
    }
    other_getters = {
      thisMonthShopList: getters.thisMonthShopList(state)
    }
    month_to_month = date.monthToMonthNumber(now, shoplists[shoplists.length - 1]);
    main_display = shallowMount(MainDisplay, {localVue,
      propsData: {
        mainDisplay: getters.mainDisplay(state, other_getters),
        dateNum: month_to_month,
        arrowRight: getters.arrowRight(state)
      }
    });
  });

  describe('DOM', () => {
    describe('class', () => {
      describe('main-display-container', () => {
        it('存在する', () => {
          expect(main_display.find('.main-display-container').exists()).toEqual(true);
        })
      });
      describe('.arrow-price', () => {
        it('存在する', () => {
          expect(main_display.find('.arrow-price').exists()).toEqual(true);
        });
      });

      describe('.arrow-price-split', () => {
        let arrow_price_splits
        beforeEach(() => {
          arrow_price_splits = main_display.findAll('.arrow-price-split');
        });
        it('存在する', () => {
          expect(arrow_price_splits.exists()).toEqual(true);
        });
        it('at(0) dateNum=0 (今月) なので 左矢印はv-if="false" になっている', () => {
          if (month_to_month > 0) {
            expect(arrow_price_splits.at(0).find('i').exists()).toEqual(true);
          } else {
            expect(arrow_price_splits.at(0).find('i').exists()).toEqual(false);
          }

        });
        it('at(1) テキスト "1100円" となっている', () => {
          expect(arrow_price_splits.at(1).text()).toEqual('2100円');
        });
        it('at(2) 先月のデータもあるので (iタグ) true', () => {
          expect(arrow_price_splits.at(2).find('i').exists()).toEqual(true);
        });
        it('at(2) iタグのclassに fa-arrow-alt-circle-right が存在する', () => {
          expect(arrow_price_splits.at(2).find('i').attributes().class).toEqual('far fa-arrow-alt-circle-right fa-3x')
        });
      });

      describe('last-shopping', () => {
        it('存在する', () => {
          expect(main_display.find('.last-shopping').exists()).toEqual(true);
        });

        it('テキスト', () => {
          expect(main_display.find('.last-shopping').text()).toEqual('最後に購入した商品: ちゅーる10月20味')
        });
      });
    });
  });

  describe('computed', () => {
    describe('number', () => {
      it('dateNum の値をそのまま返す, dateNumが 0なら 0', () => {
        expect(main_display.vm.number).toEqual(month_to_month);
      });
      it('dateNumを 2にすると number も 2となる', async () => {
        await main_display.setProps({
          dateNum: 2
        });
        expect(main_display.vm.number).toEqual(2);
      });
    });

    describe('rightArrow (arrowRightと同じ機能。 state.shoplistsの最後の日付のでデータ月が以降がfalse 今月から最後の月の一月手前まで true)', () => {
      let now, month_length, other_day
      beforeEach(() => {
        now = new Date();
      });
      it('state.shoplistsの最後の日付が2021-08-10になるので 今月 0 は true', async () =>{
        other_day = {
          purchasedate: new Date().toJSON()
        }
        month_length = date.monthToMonthNumber(now, other_day);
        await main_display.setProps({
          dateNum: month_length
        });
        expect(main_display.vm.rightArrow).toEqual(true);
      });
      it('state.shoplistsの最後の日付が2021-08-10になるので2021-10-20  は true', async () =>{
        other_day = {
          purchasedate: '2021-10-20T00:00:00.000Z'
        }
        month_length = date.monthToMonthNumber(now, other_day);
        await main_display.setProps({
          dateNum: month_length
        });
        expect(main_display.vm.rightArrow).toEqual(true);
      });
      it('state.shoplistsの最後の日付が2021-08-10になるので2021-09-10  は true', async () => {
        other_day = {
          purchasedate: '2021-09-10T00:00:00.000Z'
        }
        month_length = date.monthToMonthNumber(now, other_day);
        await main_display.setProps({
          dateNum: month_length
        });
        expect(main_display.vm.rightArrow).toEqual(true);
      });
      it('state.shoplistsの最後の日付が2021-08-10になるので2021-08-10  は false', async () => {
        other_day = {
          purchasedate: '2021-08-10T00:00:00.000Z'
        }
        month_length = date.monthToMonthNumber(now, other_day);
        await main_display.setProps({
          dateNum: month_length
        });
        expect(main_display.vm.rightArrow).toEqual(false);
      });
      it('state.shoplistsの最後の日付が2021-08-10になるので2021-07-10  は false', async () => {
        other_day = {
          purchasedate: '2021-07-10T00:00:00.000Z'
        }
        month_length = date.monthToMonthNumber(now, other_day);
        await main_display.setProps({
          dateNum: month_length
        });
        expect(main_display.vm.rightArrow).toEqual(false);
      });

      it('来月の数字 (-1) を渡すと true', async () => {
        other_day = {
          purchasedate: new Date().toJSON()
        }
        month_length = date.monthToMonthNumber(now, other_day);
        await main_display.setProps({
          dateNum: month_length - 1
        });
        expect(main_display.vm.rightArrow).toEqual(true);
      });
    });

    describe('leftArrow 今月(0)は false にり 先月以降に行くと(0以上) true', () => {
      let other_day, month_length, now
      beforeEach(() => {
        now = new Date();
      });
      it('今月 0 は false', async () => {
        other_day = {
          purchasedate: new Date().toJSON()
        }
        month_length = date.monthToMonthNumber(now, other_day);
        await main_display.setProps({
          dateNum: month_length
        });
        expect(main_display.vm.leftArrow).toEqual(false);
      });
      it('2021-09-10は今月以降になるので true', async () => {
        other_day = {
          purchasedate: '2021-09-10T00:00:00.000Z'
        }
        month_length = date.monthToMonthNumber(now, other_day);
        await main_display.setProps({
          dateNum: month_length
        });
        expect(main_display.vm.leftArrow).toEqual(true);
      });
      it('2021-08-10は今月以降になるので true (shoplistsの最後の日付があるデータ月)', async () => {
        other_day = {
          purchasedate: '2021-08-10T00:00:00.000Z'
        }
        month_length = date.monthToMonthNumber(now, other_day);
        await main_display.setProps({
          dateNum: month_length
        });
        expect(main_display.vm.leftArrow).toEqual(true);
      });
      it('2021-07-10は今月以降になるので true (shoplistsの日付より前の月)', async () => {
        other_day = {
          purchasedate: '2021-07-10T00:00:00.000Z'
        }
        month_length = date.monthToMonthNumber(now, other_day);
        await main_display.setProps({
          dateNum: month_length
        });
        expect(main_display.vm.leftArrow).toEqual(true);
      });
      it('来月 (-1) 来月になると false', async () => {
        other_day = {
          purchasedate: new Date().toJSON()
        }
        month_length = date.monthToMonthNumber(now, other_day);
        await main_display.setProps({
          dateNum: month_length -1
        });
        expect(main_display.vm.leftArrow).toEqual(false);
      });
    });
  });

  describe('methods', () => {
    describe('plusOne', () => {
      it('plusOneが動くと $emit("changeNum") が動き適切な引数 +1 が入っているか？', () => {
        main_display.find('.fa-arrow-alt-circle-right').trigger('click');
        expect(main_display.emitted('changeNum')).toMatchObject([[+1]]);
      });
    });

    describe('minusOne', () => {
      beforeEach(() => {
        main_display.setProps({
          dateNum: 1
        });
      });

      it('minusOne が動くと$emit("changeNum") が動き適切な引数 -1 が入っているか？', () => {
        main_display.find('.fa-arrow-alt-circle-left').trigger('click');
        expect(main_display.emitted('changeNum')).toMatchObject([[-1]]);
      });
    });
  });
});
