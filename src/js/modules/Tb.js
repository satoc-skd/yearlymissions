import $ from 'jquery'

import util from './util'

const createTable = () => {
  // https://qiita.com/rokko2massy/items/83283bce06acbba7a4f0

  const mainData = [
    {
      month: 2,
      sortie: [
        { caption: '精鋭「十九駆」、躍り出る！' },
        { caption: '「海防艦」、海を護る！' }
      ],
      expedition: [
        { caption: '特設護衛船団司令部、活動開始！' }
      ]
    },
    {
      month: 3,
      sortie: [
        { caption: '工作艦「明石」護衛任務' },
        { caption: '重巡戦隊、西へ！' }
      ],
      expedition: [
        { caption: '練習航海及び警備任務を実施せよ！' }
      ]
    },
    {
      month: 5,
      expedition: [
        { caption: '小笠原沖哨戒線の強化を実施せよ！' }
      ]
    },
    {
      month: 8,
      expedition: [
        { caption: '南西諸島方面の海上護衛を強化せよ！' }
      ]
    },
    {
      month: 9,
      sortie: [
        { caption: '歴戦「第十方面艦隊」、全力出撃！' }
      ],
      arsenal: [
        { caption: '新型兵装開発整備の強化' }
      ],
      expedition: [
        { caption: '兵站強化遠征任務【基本作戦】' },
        { caption: '兵站強化遠征任務【拡張作戦】' }
      ]
    },
    {
      month: 10,
      exercise: [
        { caption: '演習ティータイム！' },
        { caption: '最精鋭！主力オブ主力、演習開始！' }
      ],
      arsenal: [
        { caption: '精鋭複葉機飛行隊の編成' }
      ]
    },
    {
      month: 11,
      refurbishment: [
        { caption: '「駆逐艦」の改修工事を実施せよ！' },
        { caption: '続：「駆逐艦」の改修工事を実施せよ！' }
      ],
      arsenal: [
        { caption: '工廠フル稼働！新兵装を開発せよ！' }
      ]
    },
    {
      month: 1,
      arsenal: [
        { caption: '航空戦力の再編増強準備' }
      ]
    }

  ]
  
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
      searchCell(result, element.month, typeName).html(createMissionHTML(element[typeName]))

    })

  })

  return result.prop('outerHTML')
}

const createMissionHTML = (captionCotains) => {
  const result = $('<ul></ul>')
  captionCotains.forEach(element => {
    result.append($(`<li>${element.caption}</li>`))
  })
  return result.prop('outerHTML')
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
