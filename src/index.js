class BoardGame {
  constructor() {
    this.board = Array(4).fill().map(()=>Array(4).fill(null));
    this.setRandomTile();
    this.setRandomTile();
    this.consoleBoard();
  }

  getAllEmptyPositions() {
    let emptyPositions = [];
    this.board.forEach(function(row, indexRow) {
      row.forEach(function(elem, indexElem) {
        if(!elem)
          emptyPositions.push({x: indexRow, y: indexElem});
      })
    })
    return emptyPositions;
  }

  getEmptyRandomPosition() {
    let emptyPositions = this.getAllEmptyPositions();
    if(emptyPositions.length > 0) {
      let randomPosition = Math.floor(Math.random() * emptyPositions.length);
      //console.log(emptyPositions[randomPosition]);
      return emptyPositions[randomPosition];
    }
  }

  setRandomTile() {
    const emptyRandomPosition = this.getEmptyRandomPosition();
    if(emptyRandomPosition) {
      let randomNumber = (Math.random() < 0.8) ? 2 : 4; // This value has an 80% chance to be 2, and just a 20% chance to be 4.
      this.board[emptyRandomPosition.x][emptyRandomPosition.y] = randomNumber;
    }
  }

  consoleBoard() {
    this.board.forEach(row => console.log(row));
  }
}


class Game2048 {
  constructor() {
    this.boardGame = new BoardGame()
    this.score = 0;
    this.win = false;
    this.lose = false;
  }

  updateScore(points) {
    this.score += points;
  }

  trimNulls(row) {
    return row.filter(elem => elem);
  }

  fillNulls(row, direction) {
    if(direction === "left") {
      while(row.length < 4) {
        row.push(null);
      }
    } else if (direction === "right") {
      while(row.length < 4) {
        row.unshift(null);
      }
    }
    return row;
  }

  moveToLeft() {
    let newBoardGame = [];
    let that = this; // for inside the loop
    this.boardGame.board.forEach(function(row, indexRow) {
      let rowTrim = that.trimNulls(row) // trim
      for(let i = 0; i < rowTrim.length -1; i++) { // add
        if(rowTrim[i] === rowTrim[i + 1]) {
          rowTrim[i] += rowTrim[i + 1];
          rowTrim[i + 1] = null;
          that.updateScore(rowTrim[i]);
        }
      };
      let rowTrimAfterAdd = that.trimNulls(rowTrim); // trim after add
      let rowFill = that.fillNulls(rowTrimAfterAdd, "left"); // fill
      newBoardGame.push(rowFill); //push
    });
    this.boardGame.board = newBoardGame;
  }

  moveToRight() {
    let newBoardGame = [];
    let that = this; // for inside the loop
    this.boardGame.board.forEach(function(row, indexRow) {
      let rowTrim = that.trimNulls(row) // trim
      for(let i = rowTrim.length -1; i > 0; i--) { // add
        if(rowTrim[i] === rowTrim[i - 1]) {
          rowTrim[i] += rowTrim[i - 1];
          rowTrim[i - 1] = null;
          that.updateScore(rowTrim[i]);
        }
      };
      let rowTrimAfterAdd = that.trimNulls(rowTrim) // trim after add
      let rowFill = that.fillNulls(rowTrimAfterAdd, "right") // fill
      newBoardGame.push(rowFill); //push
    });
    this.boardGame.board = newBoardGame;
  }

  transposeMatrix() {
    this.boardGame.board = this.boardGame.board[0].map((col, i) =>
                           this.boardGame.board.map(row => row[i]));
  }

  moveToUp() {
    this.transposeMatrix();
    this.moveToLeft();
    this.transposeMatrix();
  }

  moveToDown() {
    this.transposeMatrix();
    this.moveToRight();
    this.transposeMatrix();
  }

  play(direction) {
    this.addSound("play");
    if(direction === 'left') {
      this.moveToLeft();
    } else if (direction === 'right') {
     this.moveToRight();
    } else if (direction === 'up') {
      this.moveToUp();
    } else if (direction === 'down') {
      this.moveToDown();
    }
    this.boardGame.setRandomTile();
    this.boardGame.consoleBoard();
    this.checkLoseGame();
    this.checkWinGame();
  }

  checkWinGame() {
    this.boardGame.board.forEach(function(row, indexRow) {
      row.forEach(function(elem, indexElem) {
        if(elem === 2048) {
          this.addSound('stop');
          this.win = true; //win game
        }
      });
    });
  }

  checkAvailableMovements() {
    let continuePlaying = [];
    this.boardGame.board.forEach(function (row, rowIndex) {
      row.forEach(function(elem, elemIndex) {
        continuePlaying.push(row[elemIndex] != row[elemIndex +1])
      })
    })
    let finishPlay = continuePlaying.filter(elem => !elem);
    if(finishPlay.length === 0)
      return false;
  }

  checkLoseGame() {
    let horizontAvailableMov = true;
    let verticalAvailableMov = true;
    if(!this.boardGame.getEmptyRandomPosition() && !this.checkWinGame()) { // si no hay casillas libres y no ha ganado
      horizontAvailableMov = this.checkAvailableMovements();
      this.transposeMatrix();
      verticalAvailableMov = this.checkAvailableMovements();
      this.transposeMatrix();
    }
    if(horizontAvailableMov === false && verticalAvailableMov === false) {
      this.addSound('stop');
      this.lose = true; // lost game
    }
  }

  addSound(statusAudio) {
    ion.sound({
      sounds: [{ name: "snap-[AudioTrimmer.com]", volume: 0.4 }],
      volume: 0.5,
      path: "./sounds/",
      preload: true
    });
    if(statusAudio === "play") {
      ion.sound.play("snap-[AudioTrimmer.com]"); // play sound
    } else if(statusAudio === "stop") {
      ion.sound.pause(); // stop sound
    }
  }
}
