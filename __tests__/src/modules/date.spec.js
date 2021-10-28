import date from '@/src/modules/date'

describe('/modules/date', () => {
  let now
  describe('getThisMonth 引数に 0 を渡すと 現在時刻 が表示する。 引数に 1 を渡すと一ヶ月前の 現在時刻が表示する', () => {
    it('0 今月の現在時刻', () => {
      now = new Date();
      expect(date.getThisMonth(0)).toEqual(now)
    });

    it('1 先月の現在時刻', () => {
      now = new Date();
      expect(date.getThisMonth(1)).toEqual(new Date(now.setMonth(now.getMonth() - 1)));
    });

    it('12 一年前の現在時刻', () => {
      now = new Date();
      expect(date.getThisMonth(12)).toEqual(new Date(now.setMonth(now.getMonth() - 12)));
    });

    it('-1 来月の現在時刻', () => {
      now = new Date();
      expect(date.getThisMonth(-1)).toEqual(new Date(now.setMonth(now.getMonth() - -1)));
    });
  });

  describe('regexpYearMonth', () => {
    it('日付を渡すと RegExpオブジェクトの日付が返ってくる', () => {
      expect(date.regexpYearMonth(new Date('2021-10-25'))).toEqual(/2021-10/);
    });
    it('2000-09-10 日付を渡すと RegExpオブジェクトの日付が返ってくる', () => {
      expect(date.regexpYearMonth(new Date('2000-09-10'))).toEqual(/2000-09/);
    });
  });

  describe('monthToMonthNumber (この月からその月までの 月数を計算する)', () => {
    let one, two
    it('2021-10-20 〜 2021-09-10 なので 1', () => {
      one = new Date('2021-10-20T00:00:00.000Z')
      two = { purchasedate: '2021-09-10T00:00:00.000Z'}
      expect(date.monthToMonthNumber(one, two)).toEqual(1);
    });
    it('2021-10-20 〜 2021-08-10 なので 2', () => {
      one = new Date('2021-10-20T00:00:00.000Z')
      two = { purchasedate: '2021-08-10T00:00:00.000Z'}
      expect(date.monthToMonthNumber(one, two)).toEqual(2);
    });
    it('2021-10-20 〜 2021-01-10 なので 2', () => {
      one = new Date('2021-10-20T00:00:00.000Z')
      two = { purchasedate: '2021-01-10T00:00:00.000Z'}
      expect(date.monthToMonthNumber(one, two)).toEqual(9);
    });
    it('2021-10-20 〜 2020-10-20 なので 2', () => {
      one = new Date('2021-10-20T00:00:00.000Z')
      two = { purchasedate: '2020-10-20T00:00:00.000Z'}
      expect(date.monthToMonthNumber(one, two)).toEqual(12);
    });
  });
});
