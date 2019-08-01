
class DomLayout {
  constructor() {
    this.game = new Game2048();
    this.showEmpyCellInDom()
    this.showBoxInDom(); //muestra los valores iniciales al principio
    this.callEventListeners();
  }

  showEmpyCellInDom() {
    this.game.boardGame.board.forEach(function(row, rowIndex){
      row.forEach(function (cell, cellIndex) {
        //crea las celdas vacías
        let emptyCell = $('<div/>').addClass('empty-cell')
        $('#container-board').append(emptyCell);
      });
    });
  }

  showBoxInDom() {
    this.game.boardGame.board.forEach(function(row, rowIndex){
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

  resetBox() {
    $('#container-box').empty();
  }

  updateScore() {
    $('#score').text(this.game.score)
  }

  gameStatus() {
    if(this.game.boardGame.win === true) {
      $('.container').addClass('change-opacity')
      $('#win').attr('style', 'display: flex')
    } else if(this.game.boardGame.lose === true) {
      $('.container').addClass('change-opacity')
      $('#game-over').attr('style', 'display: flex')
    }
  }

  playListeners (event) {
    var keys = [37, 38, 39, 40];
    switch (event.keyCode) {
      case 37: this.game.play('left');  break;
      case 38: this.game.play('up');    break;
      case 39: this.game.play('right'); break;
      case 40: this.game.play('down');  break;
    }
    this.resetBox();
    this.showBoxInDom();
    this.updateScore();
    this.gameStatus();
  }

  callEventListeners() {
    document.addEventListener("keydown", this.playListeners.bind(this));
  }
}

window.onload = function () { //al cargar la página
  let gameInDom = new DomLayout();
};



