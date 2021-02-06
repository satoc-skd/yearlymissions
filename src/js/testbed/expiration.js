// 与えられた日付から有効期限を算出する
import dayjs from 'dayjs';

const daily = ( currentDate ) => {
  const toString = Object.prototype.toString;

  // console.log( toString.call(currentDate) );
  
  // [object Date]以外が渡されたら例外を吐く
  if ( toString.call(currentDate) !== '[object Date]' ) {
    throw new TypeError(`'${currentdate}'は[object Date]ではありません。`);
  }
  
  // 無効な日付だった場合は例外を吐く
  if ( currentDate.toString() === 'Invalid Date' ) {
    throw new RangeError('無効な日付です。');
  }

  // console.log( currentDate.toISOString() );
  // console.log( dayjs(currentDate).format('YYYY/MM/DD HH:mm:ss'));

  const resultDate = currentDate;
  // 5時以降？
  if( resultDate.getHours() >= 5 ) {
    // １日進める
    resultDate.setDate(resultDate.getDate() + 1);
  }
  
  // 4:59:59にセットする
  resultDate.setHours(4,59,59);

  return resultDate;

};

const monthly = ( currentDate ) => {
  const toString = Object.prototype.toString;
  
  // [object Date]以外が渡されたら例外を吐く
  if ( toString.call(currentDate) !== '[object Date]' ) {
    throw new TypeError(`'${currentdate}'は[object Date]ではありません。`);
  }
  
  // 無効な日付だった場合は例外を吐く
  if ( currentDate.toString() === 'Invalid Date' ) {
    throw new RangeError('無効な日付です。');
  }


  const resultDate = currentDate;

  // 1日の5時以降⇒翌月１日の4:59:59
  // 1日の5時以前⇒当月１日の4:59:59

  // 1日の5時以降？
  if( ( resultDate.getDate() === 1 && resultDate.getHours() >= 5) || resultDate.getDate() >= 2 ) {
    // 来月１日に進める
    resultDate.setDate(1);
    resultDate.setMonth(resultDate.getMonth() + 1);
  }
  
  // 4:59:59にセットする
  resultDate.setHours(4,59,59);

  return resultDate;

}


const quarterly = ( currentDate ) => {
  const toString = Object.prototype.toString;
  
  // [object Date]以外が渡されたら例外を吐く
  if ( toString.call(currentDate) !== '[object Date]' ) {
    throw new TypeError(`'${currentdate}'は[object Date]ではありません。`);
  }
  
  // 無効な日付だった場合は例外を吐く
  if ( currentDate.toString() === 'Invalid Date' ) {
    throw new RangeError('無効な日付です。');
  }


  const resultDate = currentDate;

  // 1日の5時以降⇒翌月１日の4:59:59
  // 1日の5時以前⇒当月１日の4:59:59

  // 12月1日、3月1日、6月1日、9月1日の5時以降？
  // if( ( ( resultDate.getMonth() === 11 || resultDate.getMonth() === 2 || resultDate.getMonth() === 5 || resultDate.getMonth() === 9 ) 
  //   && resultDate.getDate() === 1 && resultDate.getHours() >= 5) || resultDate.getDate() >= 2 ) {
  //   // 来月１日に進める
  //   resultDate.setDate(1);
  //   resultDate.setMonth(resultDate.getMonth() + 1);
  // }


  if( resultDate.getMonth() === 11 || resultDate.getMonth() === 2 || resultDate.getMonth() === 5 || resultDate.getMonth() === 8 ) {
    // 12月,３月,６月,９月
    if( ( resultDate.getDate() === 1 && resultDate.getHours() >= 5) || resultDate.getDate() >= 2 ) {
      // ３か月先の１日に進める
      resultDate.setDate(1);
      resultDate.setMonth(resultDate.getMonth() + 3);
    }

  }

  else if( resultDate.getMonth() === 0 || resultDate.getMonth() === 3 || resultDate.getMonth() === 6 || resultDate.getMonth() === 9 ) {
    // 1月,4月,7月,10月

    // ２か月先の１日に進める
    resultDate.setDate(1);
    resultDate.setMonth(resultDate.getMonth() + 2);

  }

  else if( resultDate.getMonth() === 1 || resultDate.getMonth() === 4 || resultDate.getMonth() === 7 || resultDate.getMonth() === 10 ) {
    // 2月,5月,8月,11月

    // １か月先の１日に進める
    resultDate.setDate(1);
    resultDate.setMonth(resultDate.getMonth() + 1);
  }

  // 4:59:59にセットする
  resultDate.setHours(4,59,59);

  return resultDate;

}


// イヤーリー１月スタート
const yearlyJan = ( currentDate ) => {

  const offsetMonths02 = {
    0:  () => { return 12; },
    1:  () => { return 12; },
    2:  () => { return 12; },
    3:  () => { return 12; },
    4:  () => { return 12; },
    5:  () => { return 12; },
    6:  () => { return 12; },
    7:  () => { return 12; },
    8:  () => { return 12; },
    9:  () => { return 12; },
    10: () => { return 12; },
    11: () => { return 12; },
  }

  return calcYearly( currentDate, offsetMonths02, 0 );
}

// イヤーリー２月スタート
const yearlyFeb = ( currentDate ) => {

  const offsetMonths02 = {
    0:  () => { return 1; },
    1:  () => { return 13; },
    2:  () => { return 13; },
    3:  () => { return 13; },
    4:  () => { return 13; },
    5:  () => { return 13; },
    6:  () => { return 13; },
    7:  () => { return 13; },
    8:  () => { return 13; },
    9:  () => { return 13; },
    10: () => { return 13; },
    11: () => { return 13; },
  }

  return calcYearly( currentDate, offsetMonths02, 1 );
}

// イヤーリー３月スタート
const yearlyMar = ( currentDate ) => {

  const offsetMonths02 = {
    0:  () => { return 2; },
    1:  () => { return 2; },
    2:  () => { return 14; },
    3:  () => { return 14; },
    4:  () => { return 14; },
    5:  () => { return 14; },
    6:  () => { return 14; },
    7:  () => { return 14; },
    8:  () => { return 14; },
    9:  () => { return 14; },
    10: () => { return 14; },
    11: () => { return 14; },
  }

  return calcYearly( currentDate, offsetMonths02, 2 );
}


// イヤーリー４月スタート
const yearlyApr = ( currentDate ) => {

  const offsetMonths02 = {
    0:  () => { return 3; },
    1:  () => { return 3; },
    2:  () => { return 3; },
    3:  () => { return 15; },
    4:  () => { return 15; },
    5:  () => { return 15; },
    6:  () => { return 15; },
    7:  () => { return 15; },
    8:  () => { return 15; },
    9:  () => { return 15; },
    10: () => { return 15; },
    11: () => { return 15; },
  }

  return calcYearly( currentDate, offsetMonths02, 3 );
}


// イヤーリー５月スタート
const yearlyMay = ( currentDate ) => {

  const offsetMonths02 = {
    0:  () => { return 4; },
    1:  () => { return 4; },
    2:  () => { return 4; },
    3:  () => { return 4; },
    4:  () => { return 16; },
    5:  () => { return 16; },
    6:  () => { return 16; },
    7:  () => { return 16; },
    8:  () => { return 16; },
    9:  () => { return 16; },
    10: () => { return 16; },
    11: () => { return 16; },
  }

  return calcYearly( currentDate, offsetMonths02, 4 );
}


// イヤーリー６月スタート
const yearlyJun = ( currentDate ) => {

  const offsetMonths02 = {
    0:  () => { return 5; },
    1:  () => { return 5; },
    2:  () => { return 5; },
    3:  () => { return 5; },
    4:  () => { return 5; },
    5:  () => { return 17; },
    6:  () => { return 17; },
    7:  () => { return 17; },
    8:  () => { return 17; },
    9:  () => { return 17; },
    10: () => { return 17; },
    11: () => { return 17; },
  }

  return calcYearly( currentDate, offsetMonths02, 5 );
}

// イヤーリー７月スタート
const yearlyJly = ( currentDate ) => {

  const offsetMonths02 = {
    0:  () => { return 6; },
    1:  () => { return 6; },
    2:  () => { return 6; },
    3:  () => { return 6; },
    4:  () => { return 6; },
    5:  () => { return 6; },
    6:  () => { return 18; },
    7:  () => { return 18; },
    8:  () => { return 18; },
    9:  () => { return 18; },
    10: () => { return 18; },
    11: () => { return 18; },
  }

  return calcYearly( currentDate, offsetMonths02, 6 );
}


// イヤーリー８月スタート
const yearlyAug = ( currentDate ) => {

  const offsetMonths02 = {
    0:  () => { return 7; },
    1:  () => { return 7; },
    2:  () => { return 7; },
    3:  () => { return 7; },
    4:  () => { return 7; },
    5:  () => { return 7; },
    6:  () => { return 7; },
    7:  () => { return 19; },
    8:  () => { return 19; },
    9:  () => { return 19; },
    10: () => { return 19; },
    11: () => { return 19; },
  }

  return calcYearly( currentDate, offsetMonths02, 7 );
}


// イヤーリー９月スタート
const yearlySep = ( currentDate ) => {

  const offsetMonths02 = {
    0:  () => { return 8; },
    1:  () => { return 8; },
    2:  () => { return 8; },
    3:  () => { return 8; },
    4:  () => { return 8; },
    5:  () => { return 8; },
    6:  () => { return 8; },
    7:  () => { return 8; },
    8:  () => { return 20; },
    9:  () => { return 20; },
    10: () => { return 20; },
    11: () => { return 20; },
  }

  return calcYearly( currentDate, offsetMonths02, 8 );
}


// イヤーリー１０月スタート
const yearlyOct = ( currentDate ) => {

  const offsetMonths02 = {
    0:  () => { return 9; },
    1:  () => { return 9; },
    2:  () => { return 9; },
    3:  () => { return 9; },
    4:  () => { return 9; },
    5:  () => { return 9; },
    6:  () => { return 9; },
    7:  () => { return 9; },
    8:  () => { return 9; },
    9:  () => { return 21; },
    10: () => { return 21; },
    11: () => { return 21; },
  }

  return calcYearly( currentDate, offsetMonths02, 9 );
}


// イヤーリー１１月スタート
const yearlyNov = ( currentDate ) => {

  const offsetMonths02 = {
    0:  () => { return 10; },
    1:  () => { return 10; },
    2:  () => { return 10; },
    3:  () => { return 10; },
    4:  () => { return 10; },
    5:  () => { return 10; },
    6:  () => { return 10; },
    7:  () => { return 10; },
    8:  () => { return 10; },
    9:  () => { return 10; },
    10: () => { return 22; },
    11: () => { return 22; },
  }

  return calcYearly( currentDate, offsetMonths02, 10 );
}

// イヤーリー１２月スタート
const yearlyDec = ( currentDate ) => {

  const offsetMonths02 = {
    0:  () => { return 11; },
    1:  () => { return 11; },
    2:  () => { return 11; },
    3:  () => { return 11; },
    4:  () => { return 11; },
    5:  () => { return 11; },
    6:  () => { return 11; },
    7:  () => { return 11; },
    8:  () => { return 11; },
    9:  () => { return 11; },
    10: () => { return 11; },
    11: () => { return 23; },
  }

  return calcYearly( currentDate, offsetMonths02, 11 );
}


// イヤーリー有効期限の計算ロジック
const calcYearly = ( currentDate, offsetMonths02, beginMonth ) => {

  const resultDate = validationDate( currentDate );

  const currentMonth = resultDate.getMonth();
  if( currentMonth === beginMonth ) {
    if( ( resultDate.getDate() === 1 && resultDate.getHours() >= 5) || resultDate.getDate() >= 2 ) {
      resultDate.setDate(1);
      resultDate.setMonth( offsetMonths02[currentMonth]() );
    }

  }
  else {
    resultDate.setDate(1);
    resultDate.setMonth( offsetMonths02[currentMonth]() );

  }

  // 4:59:59にセットする
  resultDate.setHours(4,59,59);

  return resultDate;
}


const validationDate = ( currentDate ) => {
  const toString = Object.prototype.toString;

  // [object Date]以外が渡されたら例外を吐く
  if ( toString.call(currentDate) !== '[object Date]' ) {
    throw new TypeError(`'${currentdate}'は[object Date]ではありません。`);
  }

  // 無効な日付だった場合は例外を吐く
  if ( currentDate.toString() === 'Invalid Date' ) {
    throw new RangeError('無効な日付です。');
  }

  return currentDate;
}



export default  { daily, monthly, quarterly, 
                  yearlyJan, yearlyFeb, yearlyMar, yearlyApr, yearlyMay, yearlyJun, yearlyJly, yearlyAug, yearlySep, yearlyOct, yearlyNov, yearlyDec
                };
