import { shallowMount } from '@vue/test-utils'
import ChangeDate from '@/src/molcules/ChangeDate'
import getters from '@/store/getters'
import date from '@/src/modules/date'

describe('/molcules/ChangeDate', () => {
  let change_date, state, shoplists, other_getters, date1, date2, date3, date4, month_to_month, now
  beforeEach(() => {
    now = new Date();
    date1 = '2021-09-20T00:00:00.000Z'
    date2 = '2021-09-25T00:00:00.000Z'
    date3 = '2021-10-20T00:00:00.000Z'
    date4 = '2021-10-25T00:00:00.000Z'

    shoplists = [
      { id: 1, list_name: 'リストA', price: 100, purchasedate: date1, user_id: 1},
      { id: 2, list_name: 'リストB', price: 200, purchasedate: date2, user_id: 1},
      { id: 3, list_name: 'リストC', price: 300, purchasedate: date3, user_id: 1},
      { id: 4, list_name: 'リストD', price: 400, purchasedate: date4, user_id: 1},
    ]

    state = {
    shoplists: shoplists
    }

    other_getters = {
      thisMonthShopList: getters.thisMonthShopList(state)
    }

    month_to_month = date.monthToMonthNumber(now, shoplists[3]);

    change_date = shallowMount(ChangeDate, {
      propsData: {
        dateNum: month_to_month,
        mainDisplay: getters.mainDisplay(state, other_getters),
        arrowRight: getters.arrowRight(state)
      }
    });
  });

  describe('DOM', () => {
    describe('class', () => {
      let change_date_splits
      it('change-data-container', () => {
        expect(change_date.find('.change-data-container').exists()).toEqual(true);
      });
      it('change-data-sub-container', () => {
        expect(change_date.find('.change-data-sub-container').exists()).toEqual(true);
      });
      describe('change-date-split', () => {
        beforeEach(() => {
          change_date_splits = change_date.findAll('.change-data-split');
        });
        it('change-date-spit の数 3', () => {
          expect(change_date_splits.length).toEqual(3);
        });
        it('at(0) class="far fa-arrow-alt-circle-left fa-3x"', () => {
          expect(change_date_splits.at(0).find('i').attributes().class).toEqual("far fa-arrow-alt-circle-left fa-3x");
        });
        it('at(1) テキスト 2021年10月', () => {
          expect(change_date_splits.at(1).text()).toEqual("2021年10月");
        });
        it('at(2) class="far fa-arrow-alt-circle-right fa-3x"', () => {
          expect(change_date_splits.at(2).find('i').attributes().class).toEqual("far fa-arrow-alt-circle-right fa-3x");
        });
      });
    });
  });

  describe('computed', () => {
    describe('number', () => {
      it('dateNum=number となる', async () => {
          expect(change_date.vm.number).toEqual(month_to_month);
      });
      it('dateNum=0 === number=0', async () => {
        await change_date.setProps({
          dateNum: 0
        });
        expect(change_date.vm.number).toEqual(0);
      });
      it('dateNum=10 === number=10', async () => {
        await change_date.setProps({
          dateNum: 10
        });
        expect(change_date.vm.number).toEqual(10);
      });
    });

    describe('leftArrow', () => {
      it('dateNum= 0なら true', async () => {
        await change_date.setProps({
          dateNum: 0
        });

        expect(change_date.vm.leftArrow).toEqual(false);
      });
      it('dateNum= 1なら false', async () => {
        await change_date.setProps({
          dateNum: 1
        });

        expect(change_date.vm.leftArrow).toEqual(true);
      });
      it('dateNum= -1なら false', async () => {
        await change_date.setProps({
          dateNum: -1
        });

        expect(change_date.vm.leftArrow).toEqual(false);
      });
    });

    describe('rightArrow', () => {
      it('dateNum=0 先月以降にshoplistsが存在するので true', async () => {
        await change_date.setProps({
          dateNum: 0
        });

        expect(change_date.vm.rightArrow).toEqual(true);
      });
      it('最後の shoplsitsが 2021/09なので month_to_month + 1 にすると false', async () => {
        await change_date.setProps({
          dateNum: month_to_month + 1
        });
        expect(change_date.vm.rightArrow).toEqual(false);
      });
      it('dateNumに マイナスを与えても true', async () => {
        await change_date.setProps({
          dateNum: -1
        });
        expect(change_date.vm.rightArrow).toEqual(true);
      });
      it('shoplistsを空にすると dateNum=0 でも false ', async () => {
        state.shoplists = []
        other_getters.thisMonthShopList =  getters.thisMonthShopList(state)
        await change_date.setProps({
          dateNum: 0,
          mainDisplay: getters.mainDisplay(state, other_getters),
          arrowRight: getters.arrowRight(state)
        });
        expect(change_date.vm.rightArrow).toEqual(false);
      });
    });
  });

  describe('methods', () => {
    describe('minusOne', () => {
      it('minusOneが動くと this.$emit("changeNum") が動く', () => {
        change_date.find('.fa-arrow-alt-circle-left').trigger('click');

        expect(change_date.emitted('changeNum')).toMatchObject([[-1]]);
      });
    });

    describe('plusOne', () => {
      it('plusOneが動くと this.$emit("changeNum") が動く', () => {
        change_date.find('.fa-arrow-alt-circle-right').trigger('click');

        expect(change_date.emitted('changeNum')).toMatchObject([[+1]]);
      });
    });
  });

});
