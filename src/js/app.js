'use strict'

// import Util from './modules/Util'
// import Ro from './modules/Ro'
// import Hc from './modules/Hc'
// import '../styles/style.css'
import $ from 'jquery'

import 'bootstrap'
import '../scss/custom.scss'
// import '../scss/sticky-table.css'

import Tb from './modules/Tb'
import md from './modules/modal'

const init = async () => {
  // document.getElementsByClassName('left')[0].innerHTML = Util.createLogo()
  // document.getElementsByClassName('center')[0].innerHTML = Util.createElement('h2', 'Hi there and greetings!')
  // // ResizeObserver
  // const container = document.getElementsByClassName('right')[0]
  // const profile = document.getElementsByClassName('profile')[0]
  // Ro.observer(container, profile)
  // // axios
  // document.getElementsByClassName('user')[0].innerHTML = await Hc.getUser(1)

  const detailId = 'p1'

  $('main')[0].innerHTML = Tb.createTable()
  $('main').append( $(md.createModal(detailId)) )

  $('.missions div').on('click', function() {
    // c.f.https://stackoverflow.com/questions/10626885/passing-data-to-a-bootstrap-modal
    const modalObj = $(`#${detailId}`)
    const that = $(this)
    // modalObj.find('.modal-title').text($(this).text())
    modalObj.find('.modal-title').text(that.text())
    // modalObj.find('.modal-body').html(`<p>${$(this).text()}</p>`)
    modalObj.find('.modal-body').html( md.modalBodyText(that.prop('id') ) )

    modalObj.modal('show')
  } )

}

window.addEventListener('DOMContentLoaded', function () {
  init()
}, false)
