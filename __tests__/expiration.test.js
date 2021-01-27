import expiration from '../src/js/testbed/expiration';
import dayjs from 'dayjs';

describe('デイリー任務有効期限のテスト', () => {
  // 基準日
  // const currentDate = new Date();
  const currentDate = new Date();
  const TEST_FORMAT = 'YYYY/MM/DD HH:mm:ss'

  it.each([
    ['2021/01/25 05:00:00', '2021/01/26 04:59:59'],
    ['2021/01/25 23:59:59', '2021/01/26 04:59:59'],
    ['2021/01/25 23:59',    '2021/01/26 04:59:59'],
    ['2021/01/26 00:00',    '2021/01/26 04:59:59'],
    ['2021/01/26 04:59',    '2021/01/26 04:59:59'],
    ['2021/01/26 04:59:59', '2021/01/26 04:59:59'],
    ['2021/01/31 05:00:00', '2021/02/01 04:59:59'],
  ])("%s -> %s", (actual, expecte) => {
    expect(
      dayjs(expiration.daily( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });
  
  it('デイリー任務（04:59:59）', () => {
    const actual =  '2021/01/26 04:59:59'
    const expecte = '2021/01/26 04:59:59'
    expect(
      dayjs(expiration.daily( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });
  
  it('デイリー任務（1月末 05:00:00）', () => {
    const actual =  '2021/01/31 05:00:00'
    const expecte = '2021/02/01 04:59:59'
    expect(
      dayjs(expiration.daily( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('デイリー任務：型エラーチェック', () => {
    // toThrow を使う場合、expect の引数には関数を渡す必要があります。
    // c.f.https://teratail.com/questions/259723
    expect(() => expiration.daily( 'currentDate' )).toThrow();
    expect(() => expiration.daily( 4 )).toThrow();
    expect(() => expiration.daily( [] )).toThrow();
    expect(() => expiration.daily( '2021-01-27T00:47:03.357Z' )).toThrow();
    expect(() => expiration.daily( new Date('2021-01-27X00:47:03.357Z') )).toThrow();

  });
 
  
});



describe('マンスリー任務有効期限のテスト', () => {
  // 基準日
  // const currentDate = new Date();
  const currentDate = new Date();
  const TEST_FORMAT = 'YYYY/MM/DD HH:mm:ss'

  it('１日の00:00', () => {
    const actual =  '2021/01/01 00:00'
    const expecte = '2021/01/01 04:59:59'
    expect(
      dayjs(expiration.monthly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('１日の04:59', () => {
    const actual =  '2021/01/01 04:59'
    const expecte = '2021/01/01 04:59:59'
    expect(
      dayjs(expiration.monthly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('１日の05:00:00', () => {
    const actual =  '2021/01/01 05:00:00'
    const expecte = '2021/02/01 04:59:59'
    expect(
      dayjs(expiration.monthly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('１日の23:59', () => {
    const actual =  '2021/01/01 23:59'
    const expecte = '2021/02/01 04:59:59'
    expect(
      dayjs(expiration.monthly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('2日の00:00', () => {
    const actual =  '2021/01/02 00:00'
    const expecte = '2021/02/01 04:59:59'
    expect(
      dayjs(expiration.monthly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('2日の04:59', () => {
    const actual =  '2021/01/02 04:59'
    const expecte = '2021/02/01 04:59:59'
    expect(
      dayjs(expiration.monthly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('2日の05:00', () => {
    const actual =  '2021/01/02 05:00'
    const expecte = '2021/02/01 04:59:59'
    expect(
      dayjs(expiration.monthly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('2日の23:59', () => {
    const actual =  '2021/01/02 23:59'
    const expecte = '2021/02/01 04:59:59'
    expect(
      dayjs(expiration.monthly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('31日の23:59', () => {
    const actual =  '2021/01/31 23:59'
    const expecte = '2021/02/01 04:59:59'
    expect(
      dayjs(expiration.monthly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('翌1日の00:00', () => {
    const actual =  '2021/02/01 00:00'
    const expecte = '2021/02/01 04:59:59'
    expect(
      dayjs(expiration.monthly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('翌1日の04:59', () => {
    const actual =  '2021/02/01 04:59'
    const expecte = '2021/02/01 04:59:59'
    expect(
      dayjs(expiration.monthly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('翌1日の05:00', () => {
    const actual =  '2021/02/01 05:00'
    const expecte = '2021/03/01 04:59:59'
    expect(
      dayjs(expiration.monthly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('マンスリー任務：型エラーチェック', () => {
    // toThrow を使う場合、expect の引数には関数を渡す必要があります。
    // c.f.https://teratail.com/questions/259723
    expect(() => expiration.monthly( 'currentDate' )).toThrow();
    expect(() => expiration.monthly( 4 )).toThrow();
    expect(() => expiration.monthly( [] )).toThrow();
    expect(() => expiration.monthly( '2021-01-27T00:47:03.357Z' )).toThrow();
    expect(() => expiration.monthly( new Date('2021-01-27X00:47:03.357Z') )).toThrow();

  });

});


describe('クォータリー任務有効期限のテスト', () => {
  // 12,1,2  3,4,5  6,7,8  9,10,11
  // 基準日
  // const currentDate = new Date();
  const currentDate = new Date();
  const TEST_FORMAT = 'YYYY/MM/DD HH:mm:ss'

  //console.log( (new Date()).getMonth() );
  it('12月1日の05:00:00', () => {
    const actual =  '2020/12/01 05:00:00'
    const expecte = '2021/03/01 04:59:59'
    expect(
      dayjs(expiration.quarterly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });

  it('12月1日の04:59', () => {
    const actual =  '2020/12/01 04:59'
    const expecte = '2020/12/01 04:59:59'
    expect(
      dayjs(expiration.quarterly( new Date(actual) )).format(TEST_FORMAT) 
    ).toEqual(expecte);
  });


});





describe('モックした現在時刻のテスト', () => {
  let mockNow;
  let spiedDate;
  // setup
  beforeAll(() => {
    const OriginalDate = Date; // 退避
    mockNow = new OriginalDate('2019/8/1 12:00:00');
    // Date.now() と new Date() のみmocking
    Date.now = jest.fn().mockReturnValue(mockNow.valueOf());
    spiedDate = jest.spyOn(global, 'Date').mockImplementation((arg) => {
      if (arg === 0 || arg) {
        return new OriginalDate(arg);
      }
      return mockNow;
    });
  });

  afterAll(() => {
    spiedDate.mockRestore();
  });

  test('現在時刻をYYYY/MM/DDの形式で表示できる', () => {
    const actual = dayjs().format('YYYY/MM/DD');
    expect(actual).toBe('2019/08/01');
  });

  test('Dateコンストラクタで現在時刻が固定化される', () => {
    const actual = new Date();
    expect(actual.valueOf()).toBe(mockNow.valueOf());
  });

  test('Dateコンストラクタで時刻を指定できる', () => {
    const actual = new Date(0);
    expect(actual.valueOf()).toBe(0);
  });
});
