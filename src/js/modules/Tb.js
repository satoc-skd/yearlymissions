import $ from 'jquery'

import util from './util'

import '../../assets/sortie-febstart.png'
import '../../assets/sortie-marstart.png'
import '../../assets/sortie-septstart.png'
import '../../assets/arsenal-janstart.png'
import '../../assets/arsenal-septstart.png'
import '../../assets/arsenal-octstart.png'
import '../../assets/arsenal-novstart.png'
import '../../assets/expedition-febstart.png'
import '../../assets/expedition-marstart.png'
import '../../assets/expedition-maystart.png'
import '../../assets/expedition-augstart.png'
import '../../assets/expedition-septstart.png'
import '../../assets/exercise-octstart.png'
import '../../assets/refurbishment-novstart.png'

const createTable = ( mainData ) => {
  // https://qiita.com/rokko2massy/items/83283bce06acbba7a4f0

  
  console.log( mainData )
  // ヘッダを生成
  const columnName = ['出撃', '工廠', '演習', '遠征', '改装'] 
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
    const types = ['refurbishment', 'exercise', 'arsenal', 'expedition', 'sortie']
    types.forEach(typeName => {
      if( !util.hasProperty(element, typeName) ) {
        return
      }
      searchCell(result, element.month, typeName).html(createMissionHTML(element.month, typeName, element[typeName]))

    })

  })

  return result.prop('outerHTML')
}

const createMissionHTML = (month, typeName, captionCotains) => {
  const result = $('<div class="missions"></div>')
  captionCotains.forEach(element => {
    // result.append($(`<li><img src='./assets/sortie-febstart.png' />${element.caption}</li>`))
    result.append($(`<div id="${element.id}">${crateImageTag(month, typeName)}${element.caption}</div>`))
  })
  return result.prop('outerHTML')
}

// 画像ファイル名に変換する
const crateImageTag = (month, typeName) => {
  const monthTable = { 1:'jan', 2:'feb', 3:'mar', 4:'apr', 5:'may', 6:'june', 7:'july', 8:'aug', 9:'sept', 10:'oct', 11:'nov', 12:'dec' }

  return `<img src='./assets/${typeName}-${monthTable[month]}start.png' />`
}

const searchCell = (tableData, month, typeName) => {
  const diffTable = {
    sortie: '出撃',
    expedition: '遠征',
    arsenal: '工廠',
    exercise: '演習',
    refurbishment: '改装'
  }

  if ( diffTable[typeName] === undefined ) {
    return undefined
  }

  const cellIndex = tableData.find(`thead>tr>th:contains("${diffTable[typeName]}")`)[0].cellIndex

  return tableData.find('tbody>tr').eq(month - 1).children('td').eq(cellIndex - 1)
}

export default { createTable }
