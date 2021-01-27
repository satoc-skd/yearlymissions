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



export default { daily, monthly, quarterly };
