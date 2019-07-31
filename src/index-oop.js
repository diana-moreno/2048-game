class BoardGame {
  constructor() {
    this.board = Array(4).fill(null).map(()=>Array(4).fill(null));
  }
  getEmptyPosition() {

  }
  setRandomTile() {

  }
  consoleBoard() {

  }
}

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