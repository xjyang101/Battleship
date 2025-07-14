const rs = require('readline-sync');

const boardSize = 3;
let shipsRemaining = 2;
let pastAttacks = [];

function createBoard(boardSize) {
  const board = [];
  for(let i = 0; i < boardSize; i++) {
    board.push(Array(boardSize).fill(false))
  }
  return board;
}

const board = createBoard(3);

function placeShips(shipsRemaining) {
  for(let i = 0; i < shipsRemaining; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * boardSize);
      col = Math.floor(Math.random() * boardSize);
    } while(board[row][col]);

    board[row][col] = true; 
  }
}

function parseUserInput(input) {
  const regex = /^([A-Za-z])(\d+)$/;
  const match = input.match(regex);

  if(match) {
    const col = match[1].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    const row = parseInt(match[2]) - 1;

    if(row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
      return [row, col];
    }
  }
  return [-1, -1];
}

const isStrikeAlreadyHit = (strike) => {
    if(pastAttacks.includes(strike)) {
      console.log("You have already picked this location. Miss!");
    }
}

const isCoordinateInBoard = (col, row) => {
  const condition = row === -1 || col === -1
    if(condition) {
        console.log('Invalid input. please enter valid location (I.E -> "A2" or "B5")');
            return condition
      }
}

const handleAttack = (row, col, strikeInput) => {
      if(board[row][col] && !pastAttacks.includes(strikeInput)) {
      console.log("You hit!");
      shipsRemaining -= 1;
      console.log(`Hit! You have sunk a battleship. ${shipsRemaining} ship remaining.`);
      return false; 
    } else if(board[row][col] && pastAttacks.includes(strikeInput)) {
        return true;
    } else if (!board[row][col] && !pastAttacks.includes(strikeInput)){
      console.log("You missed");
      return false;
    }
    return false;
}


function strikeTurn() {
  while(shipsRemaining > 0) {
    const strikeInput = rs.question('Enter a location to strike ie, "A2" -> ').toUpperCase();
    const [col, row] = parseUserInput(strikeInput);

    isStrikeAlreadyHit(strikeInput);

    const isInBoardAndSomething = isCoordinateInBoard(col, row) || handleAttack(row, col, strikeInput)
    if (isInBoardAndSomething) continue; 
    pastAttacks.push(strikeInput);

  }
}

function endOfGame(boardSize) {
  while (true) {
    const restartGame = rs.question('You have destroyed all battleships. Would you like to play again? Y/N > ');

    if (restartGame.toUpperCase() === 'Y') {
      // board = [];
      shipsRemaining = 2;
      pastAttacks = [];
      board.splice(0, board.length, ...createBoard(boardSize));
      break;
    } else if (restartGame.toUpperCase() === 'N') {
      process.exit();
    } else {
      console.log("Invalid input. Please enter 'Y' or 'N'.");
    }
  }
}

function playGame() {
  while(shipsRemaining != 0) {
  rs.keyInPause('Press any key to start... ');
  console.log("Game is starting!");
    createBoard(3);
    placeShips(shipsRemaining);
    console.log(board)
    strikeTurn();
    endOfGame(boardSize);
  }

}

playGame();
