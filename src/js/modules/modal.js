const createModal = ( id ) => {
  return `
  <div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="${id}-label" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="${id}-label">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Modal body
        </div>
      </div>
    </div>
  </div>
  `

}


const modalBodyText = ( id ) => {
  const contents = {
    'sortie-year-feb01': `
      <table class="table table-bordered">
        <tbody>
        <tr>
          <th scope="row">編成制約</th>
          <td>「綾波改二」+「敷波改二」+自由枠4隻</td>
        </tr>
        <tr>
          <th scope="row">行動</th>
          <td>
            <ul>
              <li>2-5 S勝利１回</li>
              <li>3-4 S勝利１回</li>
              <li>4-5 S勝利１回</li>
              <li>5-3 S勝利１回</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th scope="row">確定報酬</th>
          <td>
            <ul>
              <li>燃料×1900</li>
              <li>鋼材×1900</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th scope="row">選択報酬１</th>
          <td>
            <ul>
              <li>特注家具職人x1</li>
              <li>給糧艦「間宮」x1</li>
              <li>家具箱(中)x10</li>
            </ul>
          </td>
          </tr>
          <tr>
          <th scope="row">選択報酬２</th>
          <td>
            <ul>
              <li>高速修復材x8</li>
              <li>開発資材x10</li>
              <li>改修資材x4</li>
            </ul>
          </td>
          </tr>
        </tbody>
      </table>
      `
  }

  if ( typeof contents[id] === 'undefined' ) {
    return 'ありません'
  }

  return contents[id]

}


export default { createModal, modalBodyText}
