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

let boardGame = new BoardGame()

class Game2048 {
  constructor() {
    this.score = 0;
    this.win = false;
    this.lose = false;
  }
  updateScore() {

  }
  moveToLeft() {

  }
  moveToRight() {

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