const $board = $('.js-board')
const $gridHeightInput = $('.js-grid-height')
const $gridWidthInput = $('.js-grid-width')
const $gridSubmitButton = $('.js-submit')
const $clearButton = $('.js-clear-canvas')
const $colorPickerInput = $('.js-color-picker')
let chosenColor

function getHeight () {
  return $gridHeightInput.val()
}

function getWidth () {
  return $gridWidthInput.val()
}

// renders a grid
function drawGrid (width, height) {
  $board.empty()
  for (let i = 1; i <= height; ++i) {
    const boardRow = $('<div>', {
      'class': 'board__row'
    })
    for (let j = 1; j <= width; ++j) {
      const boardColumn = $('<div>', {
        'class': 'field'
      })
      boardRow.append(boardColumn)
    }
    $board.append(boardRow)
  }
}

// hooks events
function initGrid () {
  var $boardField = $('.board__row .field')

  $boardField.on('click', function (e){
    $(this).css('background', chosenColor)
  })

  $boardField.on('mousedown', function (e) {
    e.preventDefault()
    $(this).css('background-color', chosenColor)
    $boardField.on('mouseover', function () {
      $(this).css('background-color', chosenColor)
    })
  })

  $('body').on('mouseup', function() {
    $boardField.off('mouseover')
  })
}

function clearBoard() {
  $('.field').css('background', '')
}

function getColor (el) {
  let color = el.val()
  return color
}

// Initial setup
drawGrid(getWidth(), getHeight())
initGrid()
chosenColor = getColor($colorPickerInput)

// Change events
$gridSubmitButton.on('click', function (e) {
  e.preventDefault()
  clearBoard()
  drawGrid(getWidth(), getHeight())
  initGrid()
})

$colorPickerInput.on('change', function () {
  chosenColor = getColor($colorPickerInput)
})

$clearButton.on('click', clearBoard)
