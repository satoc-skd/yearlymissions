import $ from 'jquery'

import util from './util'

import '../../assets/sortie-yearly-feb.png'
import '../../assets/sortie-yearly-mar.png'
import '../../assets/sortie-yearly-sep.png'
import '../../assets/arsenal-yearly-jan.png'
import '../../assets/arsenal-yearly-sep.png'
import '../../assets/arsenal-yearly-oct.png'
import '../../assets/arsenal-yearly-nov.png'
import '../../assets/expedition-yearly-feb.png'
import '../../assets/expedition-yearly-mar.png'
import '../../assets/expedition-yearly-may.png'
import '../../assets/expedition-yearly-aug.png'
import '../../assets/expedition-yearly-sep.png'
import '../../assets/exercise-yearly-oct.png'
import '../../assets/modernization-yearly-nov.png'

const createTable = ( mainData ) => {
  // https://qiita.com/rokko2massy/items/83283bce06acbba7a4f0

  
  console.log( mainData )
  // ヘッダを生成
  const columnName = ['任務名'] 
  const thead = $('<thead class="thead-light"></thead>')
  thead.append('<tr class="fixed-header-0"></tr>')
  thead.find('tr').append('<th class="fixed-column-0"></th>')
  columnName.forEach(element => {
    thead.find('tr').append(`<th>${element}</th>`)
  })

  const rowNames = ['１', '２', '３', '４', '５', '６', '７', '８', '９', '１０', '１１', '１２'] 
  const tbody = $('<tbody></tbody>')
  rowNames.forEach(element => {
    const newTr = $('<tr></tr>')
    newTr.append(`<th class="fixed-column-0 table-light">${element}月～</th>`)
    for (let index = 0; index < columnName.length; index++) {
      newTr.append('<td></td>')
    }
    tbody.append(newTr)
  })

  const result = $(`<div class="table-wrapper">
    <table class="table text-nowrap sticky-table table-bordered table-striped">
        ${thead.prop('outerHTML')}
        ${tbody.prop('outerHTML')}
    </table>
  </div>`)


  //行ヘッダーに対しtopを設定
  const fixed_header_num = 1
  let height = 0
  for (var i = 0; i < fixed_header_num; i++) {
    result.find(`.fixed-header-${i} th`).css('top', height)
    height += result.find(`.fixed-header-${i} th`).outerHeight()
  }

  //列ヘッダーに対しleftを設定
  const fixed_column_num = 1
  let width = 0
  for (var j = 0; j < fixed_column_num; j++) {
    result.find(`th.fixed-column-${j}`).css('left', width)
    width += result.find(`th.fixed-column-${j}`).outerWidth(true)
  }

  // // サンプルデータ
  // const sampleData = [
  //   { caption: '精鋭「十九駆」、躍り出る！' },
  //   { caption: '「海防艦」、海を護る！' }
  // ]
  // const writeCell = searchCell(result, 2, 'sortie')
  // writeCell.html(createMissionHTML(sampleData))

  // 1～12月毎に、任務名を埋めていく
  mainData.forEach(element => {
    if( !util.hasProperty( element, 'tasks') ) {
      return
    }

    searchCell( result, element.month ).html(createMissionHTML(element.month, 'tasks', element['tasks']))

  })

  return result.prop('outerHTML')
}

const createMissionHTML = (month, typeName, captionCotains) => {
  const result = $('<div class="missions"></div>')
  captionCotains.forEach(element => {
    // result.append($(`<li><img src='./assets/sortie-yearly-feb.png' />${element.caption}</li>`))
    result.append($(`<div id="${element.id}">${crateImageTag(month, element.category)}${element.caption}</div>`))
  })
  return result.prop('outerHTML')
}

// 画像ファイル名に変換する
const crateImageTag = (month, typeName) => {
  const monthTable = { 1:'jan', 2:'feb', 3:'mar', 4:'apr', 5:'may', 6:'june', 7:'july', 8:'aug', 9:'sept', 10:'oct', 11:'nov', 12:'dec' }

  return `<img src='./assets/${typeName}-${monthTable[month]}start.png' />`
}

const searchCell = (tableData, month) => {
  return tableData.find('tbody>tr').eq(month - 1).children('td').eq(0)
}

export default { createTable }
