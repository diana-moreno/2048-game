function Game2048 () {
  this.board = [
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null]
  ];

  this.score = 0;
  this.win   = false;
  this.lost  = false;

  this._generateBox();
  this._generateBox();
  this._showBoard()
}


Game2048.prototype._getEmptyPosition = function() {
  let emptyPositions = []
  this.board.forEach(function(row, iRow) {
    row.forEach(function(elem, iElem) {
      if(!elem) {
        emptyPositions.push({x: iRow, y: iElem});
      }
    });
  });
  if(emptyPositions.length > 0) {
    let randomPosition = Math.floor(Math.random() * emptyPositions.length);
    return emptyPositions[randomPosition]
  } else {
    return false
  }
}


Game2048.prototype._generateBox = function() {
  let emptyPosition = this._getEmptyPosition()
  if(emptyPosition) {
    let randomNumberBox = (Math.random() < 0.8) ? 2 : 4; // This value has an 80% chance to be 2, and just a 20% chance to be 4.
    this.board[emptyPosition.x][emptyPosition.y] = randomNumberBox
  }
}

Game2048.prototype._updateScore = function(points) {
  this.score += points
  if(points === 2048) {
    this.win = true;
  }
}

Game2048.prototype._moveLeft = function () {
  var newBoard = [];
  var boardChanged = false;

  //filtra board para que muestre solo las casillas con valores.
  this.board.forEach(row => {
    let newRow = row.filter(elem => elem !== null)

    // para cada fila, si tiene dos números iguales, súmalos y añade el resultado a la izquierda y deja el espacio de la derecha vacío.
    for(let i = 0; i < newRow.length -1; i++) {
      if(newRow[i] === newRow[i+1]) {
        newRow[i] = newRow[i] * 2;
        newRow[i+1] = null;
        this._updateScore(newRow[i]); //actualizar puntuación
      }
    }

    //hay que eliminar los posibles espacios que queden en medio en el caso de que haya más de 2 numeros en la fila
    let newRowAfterAdds = newRow.filter(elem => elem !== null)

    //rellena los espacios vacíos de la izquierda con null
    while(newRowAfterAdds.length < 4) {
      newRowAfterAdds.push(null);
    }

    //compara la longitud de newRow con la original de row, comparando solo los valores, sin tener en cuenta los null. Si es diferente, es que ha habido cambios y se han realizado sumas. newboard será ahora rewRow
    if(row.filter(elem => elem !== null) !== newRow.filter(elem => elem !== null)) {
      boardChanged = true;
      newBoard.push(newRowAfterAdds)
    }
  })
  this.board = newBoard;
  return boardChanged;
}


Game2048.prototype._moveRight = function () {
  var newBoard = [];
  var boardChanged = false;

  //filtra board para que muestre solo las casillas con valores.
  this.board.forEach(row => {
    let newRow = row.filter(elem => elem !== null)

    // para cada fila, si tiene dos números iguales, súmalos y añade el resultado a la derecha y deja el espacio de la izquierda vacío.
    for (i=newRow.length - 1; i>0; i--) {
      if(newRow[i-1] === newRow[i]) {
        newRow[i] = newRow[i] * 2;
        newRow[i-1] = null;
        this._updateScore(newRow[i]); //actualizar puntuación
      }
    }
    //hay que eliminar los posibles espacios que queden en medio en el caso de que haya más de 2 numeros en la fila
    let newRowAfterAdds = newRow.filter(elem => elem !== null)

    //rellena los espacios vacíos de la derecha con null
    while(newRowAfterAdds.length < 4) {
      newRowAfterAdds.unshift(null);
    }

    //compara la longitud de newRow con la original de row, comparando solo los valores, sin tener en cuenta los null. Si es diferente, es que ha habido cambios y se han realizado sumas. newboard será ahora rewRow
    if(row.filter(elem => elem !== null) !== newRow.filter(elem => elem !== null)) {
      boardChanged = true;
      newBoard.push(newRowAfterAdds)
    }
  })
  this.board = newBoard;
  return boardChanged;
}

Game2048.prototype._transposeMatrix = function() {
  //trasponer las filas por columnas
  this.board = this.board[0].map((col, i) => this.board.map(row => row[i]));
}

//primero se gira hacia la derecha la matriz, se aplica el movimiento a la izquierda y después se vuelve a girar.
Game2048.prototype._moveUp = function () {
  this._transposeMatrix()
  let boardChanged = this._moveLeft()
  this._transposeMatrix()
  return boardChanged
}

//primero se gira hacia la derecha la matriz, se aplica el movimiento a la derecha y después se vuelve a girar.
Game2048.prototype._moveDown = function () {
  this._transposeMatrix()
  let boardChanged = this._moveRight()
  this._transposeMatrix()
  return boardChanged
}

// con esta función, podemos acceder a los métodos privados pasando un string como argumento que indique la dirección. Además, si hay cambio de pantalla, generará un nuevo número y lo colocará en pantalla.
Game2048.prototype.move = function (direction) {
  if(direction === 'left') {
    boardChanged = this._moveLeft();
  } else if (direction === 'right') {
    boardChanged = this._moveRight();
  } else if (direction === 'up') {
    boardChanged = this._moveUp();
  } else if (direction === 'down') {
    boardChanged = this._moveDown();
  }
  if(boardChanged) {
    this._generateBox();
    this._showBoard();
    this._checkIfLostGame();
  }
};

Game2048.prototype._showBoard = function() {
  this.board.forEach(function(row){ console.log(row); });
  console.log('Score: ' + this.score);
}


Game2048.prototype.winGame = function() {
  return this.win;
}

Game2048.prototype._checkIfAvailableMovements = function() {
  let continuePlaying = [];
  this.board.forEach(function (row, rowIndex) {
    row.forEach(function(cel, cellIndex) {
      continuePlaying.push(row[cellIndex] != row[cellIndex +1])
    })
  })
  let finishPlay = continuePlaying.filter(elem => elem === false)
  if(finishPlay.length === 0) {
    return false
  }
}

Game2048.prototype._checkIfLostGame = function() {
  let horizontAvailableMov = true;
  let verticalAvailableMov = true;

  if(!this._getEmptyPosition() && !this.winGame()) { // si no hay casillas libres y no ha ganado
    horizontAvailableMov = this._checkIfAvailableMovements()
    this._transposeMatrix()
    verticalAvailableMov = this._checkIfAvailableMovements()
    this._transposeMatrix()
  }
  if(horizontAvailableMov === false && verticalAvailableMov === false) {
    console.log("game over")
    this.lost = true; //lost game
  }
}

let game = new Game2048