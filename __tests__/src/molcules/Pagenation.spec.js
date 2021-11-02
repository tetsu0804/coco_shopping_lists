import { shallowMount } from '@vue/test-utils'
import Pagenation from '@/src/molcules/Pagenation'
import getters from '@/store/getters'
import date from '@/src/modules/date'

describe('/molcules/Pagenation', () => {
  let shoplists = [],pagenation, other_getters, state, format_date, n, num, month_to_month, now, pages

  for (let i = 0; i < 50; i++) {
      n = i + 1
    if (i < 9) {
      num = n < 10 ? '0' + n : n
      format_date = {id: i+1, list_name: `リスト${i+1}`, price: 100, purchasedate: `2021-10-${num}T00:00:00.000Z`, user_id: 1}
    } else if (i < 31) {
      format_date = {id: i+1, list_name: `リスト${i+1}`, price: 100, purchasedate: `2021-10-${n}T00:00:00.000Z`, user_id: 1}
    } else if(i >= 31) {
      n = i - 30
      num = n < 10 ? '0' + n : n
      format_date = {id: i+1, list_name: `リスト${i+1}`, price: 100, purchasedate: `2021-10-${num}T00:00:00.000Z`, user_id: 1}
    }
    shoplists.push(format_date)
  }

  beforeEach(() => {
    now = new Date();
    state = {
      shoplists: shoplists
    }
    other_getters = {
      thisMonthShopList: getters.thisMonthShopList(state)
    }
    month_to_month = date.monthToMonthNumber(now, state.shoplists[0]);
     pagenation = shallowMount(Pagenation, {
       propsData: {
         pageNation: getters.pageNation(state, other_getters),
         dateNum: month_to_month,
         pageNum: 0,
         pageTotal: 10
       }
     })
  });

  describe('DOM', () => {
    describe('class', () => {
      describe('pagenation-container', () => {
        it('存在するか?', () => {
          expect(pagenation.find('.pagenation-container').exists()).toEqual(true);
        })
      });

      describe('pagenation-sub-container', () => {
        it('存在するか？', () => {
          expect(pagenation.find('.pagenation-sub-container').exists()).toEqual(true);
        });
      });

      describe('class=pages', () => {
        beforeEach(() => {
          pages = pagenation.findAll('.pages');
        });
        describe('pageNum=0  (shoplists=total=50 で pageTotal=10 なので 要素(div)=3 )', () => {
          it('.pages の数 = 3', () => {
            expect(pages.length).toEqual(3);
          });
          it('at(0) テキスト', () => {
            expect(pages.at(0).text()).toEqual('1');
          });
          it('at(0) style', () => {
            expect(pages.at(0).attributes().style).toEqual('width: 2.5rem; height: 2.5rem; text-align: center; border-radius: 50%; position: relative; top: -10%; line-height: 2.5rem; margin-left: 4px;');
          });
          it('at(1) テキスト', () => {
            expect(pages.at(1).text()).toEqual('5');
          });
          it('at(1) style', () => {
            expect(pages.at(1).attributes().style).toEqual('width: 2rem; height: 2rem; border-radius: 50%; text-align: center; margin-left: 4px; line-height: 2rem;');
          });
          it('at(2) テキスト', () => {
            expect(pages.at(2).text()).toEqual('次');
          });
          it('at(2) style', () => {
            expect(pages.at(2).attributes().style).toEqual('width: 2rem; height: 2rem; border-radius: 50%; text-align: center; margin-left: 4px; line-height: 2rem;');
          });
        });

        describe('pageNum=1  (shoplists=total=50 で pageTotal=10 なので 要素(div)=3 )', () => {
          beforeEach(async () => {
            await pagenation.setProps({
              pageNum: 1
            });
            pages = pagenation.findAll('.pages');
          });
          it('.pages の数 = 5', () => {
            expect(pages.length).toEqual(5);
          });
          it('at(0) テキスト', () => {
            expect(pages.at(0).text()).toEqual('前');
          });
          it('at(0) style', () => {
            expect(pages.at(0).attributes().style).toEqual('width: 2rem; height: 2rem; border-radius: 50%; text-align: center; margin-left: 4px; line-height: 2rem;');
          });
          it('at(1) テキスト', () => {
            expect(pages.at(1).text()).toEqual('1');
          });
          it('at(1) style', () => {
             expect(pages.at(1).attributes().style).toEqual('width: 2rem; height: 2rem; text-align: center; border-radius: 50%; line-height: 2rem; margin-left: 4px;');
          });
          it('at(2) テキスト', () => {
            expect(pages.at(2).text()).toEqual('2');
          });
          it('at(2) style', () => {
            expect(pages.at(2).attributes().style).toEqual('width: 2.5rem; height: 2.5rem; text-align: center; border-radius: 50%; position: relative; top: -10%; line-height: 2.5rem; margin-left: 4px;');
          });
          it('at(3) テキスト', () => {
            expect(pages.at(3).text()).toEqual('5');
          });
          it('at(3) style', () => {
            expect(pages.at(3).attributes().style).toEqual('width: 2rem; height: 2rem; border-radius: 50%; text-align: center; margin-left: 4px; line-height: 2rem;');
          });
          it('at(4) テキスト', () => {
            expect(pages.at(4).text()).toEqual('次');
          });
          it('at(4) style', () => {
            expect(pages.at(4).attributes().style).toEqual('width: 2rem; height: 2rem; border-radius: 50%; text-align: center; margin-left: 4px; line-height: 2rem;');
          });
        });
        describe('pageNum=4  (shoplists=total=50 で pageTotal=10 なので 要素(div)=3 )', () => {
          beforeEach(async () => {
            await pagenation.setProps({
              pageNum: 4
            });
            pages = pagenation.findAll('.pages');
          });
          it('.pages の数 = 5', () => {
            expect(pages.length).toEqual(3);
          });
          it('at(0) テキスト', () => {
            expect(pages.at(0).text()).toEqual('前');
          });
          it('at(0) style', () => {
            expect(pages.at(0).attributes().style).toEqual('width: 2rem; height: 2rem; border-radius: 50%; text-align: center; margin-left: 4px; line-height: 2rem;');
          });
          it('at(1) テキスト', () => {
            expect(pages.at(1).text()).toEqual('1');
          });
          it('at(1) style', () => {
             expect(pages.at(1).attributes().style).toEqual('width: 2rem; height: 2rem; text-align: center; border-radius: 50%; line-height: 2rem; margin-left: 4px;');
          });
          it('at(2) テキスト', () => {
            expect(pages.at(2).text()).toEqual('5');
          });
          it('at(2) style', () => {
            expect(pages.at(2).attributes().style).toEqual("width: 2.5rem; height: 2.5rem; border-radius: 50%; text-align: center; margin-left: 4px; line-height: 2.5rem; position: relative; top: -10%;");
          });
        });
      });
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      pages = pagenation.findAll('.pages');
    });
    describe('changePageNum', () => {
      it('changePageNumが動くと this.$emit("pageNumChange") が動き適切な引数が入っているか？ at(0).click = 1', () => {
        pages.at(0).trigger('click');
        expect(pagenation.emitted('pageNumChange')).toMatchObject([[{
           "click": 1,
           "style": "width: 2.5rem; height: 2.5rem; text-align: center; border-radius: 50%; position: relative; top: -10%; line-height: 2.5rem; margin-left: 4px;",
           "target": "first",
           "text": 1,
         }]]);
      });
    });
  });
});
