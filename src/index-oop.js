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
        if(!elem) {
          emptyPositions.push({x: indexRow, y: indexElem});
        }
      })
    })
    return emptyPositions;
  }
  getEmptyRandomPosition() {
    let emptyPositions = this.getAllEmptyPositions();
    if(emptyPositions.length > 0) {
      let randomPosition = Math.floor(Math.random() * emptyPositions.length);
      console.log(emptyPositions[randomPosition]);
      return emptyPositions[randomPosition];
    }
  }
  setRandomTile() {
    const emptyRandomPosition = this.getEmptyRandomPosition();
    let randomNumber = (Math.random() < 0.8) ? 2 : 4; // This value has an 80% chance to be 2, and just a 20% chance to be 4.
    this.board[emptyRandomPosition.x][emptyRandomPosition.y] = randomNumber;
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
    this.boardGame.setRandomTile();
        this.boardGame.consoleBoard();
    this.boardGame.setRandomTile();
        this.boardGame.consoleBoard();
    this.boardGame.setRandomTile();
        this.boardGame.consoleBoard();
    this.boardGame.setRandomTile();
        this.boardGame.consoleBoard();
    this.boardGame.setRandomTile();
        this.boardGame.consoleBoard();
    this.boardGame.setRandomTile();
        this.boardGame.consoleBoard();
    this.boardGame.setRandomTile();
        this.boardGame.consoleBoard();

    //this.moveToLeft();
    //this.boardGame.consoleBoard();
    this.moveToRight();
    this.boardGame.consoleBoard();
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
        }
      };
      let rowTrimAfterAdd = that.trimNulls(rowTrim) // trim after add
      let rowFill = that.fillNulls(rowTrimAfterAdd, "right") // fill
      newBoardGame.push(rowFill); //push
    });
    this.boardGame.board = newBoardGame;
  }
  transposeMatrix() {

  }
  moveToUp() {

  }
  moveToDown() {

  }
  winGame() {

  }
  checkAvailableMovements() {

  }
  loseGame() {

  }
  addSound() {
    ion.sound({
      sounds: [{ name: "snap-[AudioTrimmer.com]", volume: 0.4 }],
      volume: 0.5,
      path: "./sounds/",
      preload: true
    });
  }
}

let game2048 = new Game2048();