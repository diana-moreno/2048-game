window.onload = function () {
  game = new Game2048();
  showEmpyCellInDom()
  showBoxInDom(); //muestra los valores iniciales al principio
};


function showEmpyCellInDom() {
  game.board.forEach(function(row, rowIndex){
    row.forEach(function (cell, cellIndex) {
      //crea las celdas vacías
      let emptyCell = $('<div/>').addClass('empty-cell')
      $('#container-board').append(emptyCell);
    });
  });
}

function showBoxInDom() {
  game.board.forEach(function(row, rowIndex){
    row.forEach(function (cell, cellIndex) {
      //si existe número en juego, añade el box correspondiente
      if(cell) {
        let newBox = $('<div/>')
                    .addClass('box num-' + cell)
                    .addClass('box-position-' + rowIndex + "-" + cellIndex);
        $('#container-box').append(newBox);
        newBox.text(cell);
      }
    });
  });
}

function resetBox() {
  $('#container-box').empty();
}

function updateScore() {
  $('#score').text(game.score)
}

function gameStatus() {
  if(game.win === true) {
    $('.container').addClass('change-opacity')
    $('#win').attr('style', 'display: flex')
  } else if(game.lose === true) {
    $('.container').addClass('change-opacity')
    $('#game-over').attr('style', 'display: flex')
  }
}

function moveListeners (event) {
  var keys = [37, 38, 39, 40];
  switch (event.keyCode) {
    case 37: game.move("left");  break;
    case 38: game.move("up");    break;
    case 39: game.move("right"); break;
    case 40: game.move("down");  break;
  }
  resetBox();
  showBoxInDom();
  updateScore();
  gameStatus();
}

document.addEventListener("keydown", moveListeners);
