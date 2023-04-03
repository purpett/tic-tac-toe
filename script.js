// Status of the game is stored in variables

const newGameBtn = document.querySelector('.button button');
const gameGrid = document.querySelector('.grid');
const resetBtn = document.querySelector('#reset');
const playersSection = document.querySelector('.players-section');
const player2Select = document.querySelector('select')
const clickingSound = new Audio('sounds/clicking.wav')
const winningSound = new Audio('sounds/win.wav')
const tieSound = new Audio('sounds/tie.wav')
const newGameResetSound = new Audio('sounds/new-game-reset.wav')
const p2ScoreNameCell = document.querySelector('#p2-score-name-cell');

let player2 = "Player 2"
let p1IconImg = 1;
let p2IconImg = 1;
let isX = true;
let boxStatus = [];
let winner = undefined;
let p1Scores = 0;
let p2Scores = 0;
let tieScores = 0;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]


//
// Logic of the game is developed with functions (where possible, DOM manipulation is separate from logic).
//


// storeGame()
loadGame()

// this function puts the variables representing game status inside localStorage
function storeGame() {
  let gameData = {
    isX: isX,
    boxStatus: boxStatus,
    winner: winner, 
    p1Scores: p1Scores,
    p2Scores: p2Scores,
    tieScores: tieScores,
    player2: player2,
  }

  localStorage.setItem('gameData', JSON.stringify(gameData))
}

// this function loads the saved variables and their values back in the game when the page reloads
function loadGame() {
  let gameData = JSON.parse(localStorage.getItem('gameData'))
  if (gameData) {
    isX = gameData.isX;
    boxStatus = gameData.boxStatus
    winner = gameData.winner
    p1Scores = gameData.p1Scores
    p2Scores = gameData.p2Scores
    tieScores = gameData.tieScores
    player2 = gameData.player2
    p2ScoreNameCell.textContent = player2
    player2Select.selectedIndex = player2 === "Computer" ? 1 : 0
  }
}

// resets the grid and the message
function startNewGame() {
  isX = true;
  boxStatus = [];
  winner = undefined;
  newGameResetSound.play();
  updateGridBoxes()
  updateMessage()
  resetWinningCombination();
}

function incrementScores() {
  if (winner === "Player 1") {
    p1Scores += 1
  } else if (winner === player2) {
    p2Scores += 1
  } else if (isTie()) {
    tieScores += 1
  }
  storeGame()
}

// this function assigns values inside boxStatus array at the given index
function mark(index) {
  const marker = isX ? 'X' : 'O'    // marker contains 'X' or 'O' depending on content of isX

  if (winner) {   // checks if the game is over (there is a winner)
    return        // this does not allow to keep playing
  }

  if (!boxStatus[index]) {              // if the value of boxStatus with given index is not assigned
    boxStatus[index] = marker;          // it replaces it with the marker (depends on isX)
    isX = !isX                          // this flips the value of isX at the end of each turn

    const win = determineWinner()       // determineWinner() returns a string saying who is the winner
    if (win) {                          // if there is a winner, the string gets assigned to global variable 'winner'
      winner = win
    } else if (isTie()) {
      tieSound.play()
    } else {
      clickingSound.play()
    }
    incrementScores()
  } 
  storeGame()
}

// this function checks if one of the winning combinations has been used in the game grid
function determineWinner() {

  // winningCombinations is an array of triples that represent indexes in the boxStatus array
  for (let i = 0; i < winningCombinations.length; i++) {
    const triple = winningCombinations[i];

    // triple.map gets a triple, puts each item of triple at the index of boxStatus 
    // then makes a new array with all boxStatus[item]
    const picks = triple.map((item) => boxStatus[item]) 
    // array === array returns false. Had to transform to strings to compare
    if (picks.toString() === ['X', 'X', 'X'].toString()) {   
      colorWinningCombination(triple) 
      return "Player 1"
    } else if (picks.toString() === ['O', 'O', 'O'].toString()) {
      colorWinningCombination(triple) 
      return player2
    }
  }
  storeGame()
  return null
}

// Checks all potential winning combinations for two out of three sequences
// For example two Xs or two Os in the same row, column or diagonal.
// The marker parameter is used to determine which marker to look for (pass X to look for XX, O for OO)
function findTwoThirds(marker) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const triple = winningCombinations[i];
    const picks = triple.map((item) => boxStatus[item])
    let howManyMarks = picks.filter((value) => value === marker).length
    if (howManyMarks === 2) {
      let blankBox = picks.findIndex((value) => !value)
      if (blankBox >= 0) {
        mark(triple[blankBox])
        return true
      }
    }
  }
  return false
}

// Decides the computer's move
function computerMove() {
  if (isX || winner || isTie()) {   // to check if it's the computer's turn & if game is over
    return
  }

  if (!findTwoThirds("O")) {    // Look for incomplete combinations with two Os first to win
    if (!findTwoThirds("X")) {  // Look for incomplete combinations with two Xs to defend
      computerFallbackChoices()      // If there are no incomplete combinations (e.g. start of game)
    }
  }

  updateGridBoxes()
}

//  picks other boxes when no combinations are available yet
function computerFallbackChoices() {
  // Give priority to center box if empty
  if (!boxStatus[4]) {
    mark(4)
    return
  }

  // Get the first available box
  const index = boxStatus.findIndex((v) => !v)
  mark(index)
}


// this function checks if the game is a tie
function isTie() {
  // array containing all not undefined items from boxStatus
  const filledBoxes = boxStatus.filter((item) => item) // where item is not null or undefined
  return !winner && filledBoxes.length === 9 // if filledBoxes are 9 and there is no winner, it must be a tie
}





//
// DOM manipulation with event listeners
//



// goes through each single grid cell
// checks if the boxStatus array has something in it at the index given which also represents the number of the cell
// then appends image to the cell
function updateGridBoxes() {
  for (let i = 0; i < 9; i++) {
    let box = document.querySelector(`.box[data-number="${i}"]`)
    box.innerHTML = "";
    let image = document.createElement('img')
    if (boxStatus[i] === 'X') {
      image.src = `images/x${p1IconImg}.svg`
      box.appendChild(image)
    } else if (boxStatus[i] === 'O') {
      image.src = `images/o${p2IconImg}.svg`
      box.appendChild(image)
    }
  }
  storeGame()
}

// this function updates the displayed message depending on game status 
function updateMessage() {
  const messageParagraph = document.querySelector('.user-message');
  const p1ScoreCell = document.querySelector('#p1-score');
  const p2ScoreCell = document.querySelector('#p2-score');
  const tieScoreCell = document.querySelector('#tie-score');
  let message = ""

  if (winner) {
    winningSound.play();
    message = `${winner} has won! Start a new game`
  } else if (isTie()) {
    message = "It's a tie! Start a new game"
  } else if (isX === true) {
    message = "Player 1, it's your turn"
  } else if (isX === false && player2 === "Computer") {
    message = "It's the Computer's turn"
  } else if (isX === false && player2 === "Player 2") {
    message = "Player 2, it's your turn"
  }
  p1ScoreCell.textContent = p1Scores
  p2ScoreCell.textContent = p2Scores
  tieScoreCell.textContent = tieScores
  messageParagraph.textContent = message
}

// this function adds a class when a box is part of a selected winning combination
function colorWinningCombination(triple) {
  triple.forEach((index) => {
    let box = document.querySelector(`.box[data-number="${index}"]`)
    box.classList.add('winning')
  })
}

// resets the boxes to default style
function resetWinningCombination() {
  for (let i = 0; i < 9; i++) {
    let box = document.querySelector(`.box[data-number="${i}"]`)
    box.classList.remove('winning')
  }
}


player2Select.addEventListener('change', function(e) {
  resetScores()
  newGameResetSound.play()
  startNewGame()
  storeGame()
  let selectValue = e.target.value
  if (selectValue === "1") {
    player2 = "Computer"
    computerMove()
  } else {
    player2 = "Player 2"
  }
  p2ScoreNameCell.textContent = `${player2}`
  updateMessage()
})

//starts new game when clicking button
newGameBtn.addEventListener('click', startNewGame);


function resetScores() {
  p1Scores = 0;
  p2Scores = 0;
  tieScores = 0;
}

//resets localStorage content so that the game and the scores are empty
resetBtn.addEventListener('click', function() {
  resetScores()
  newGameResetSound.play()
  startNewGame()
  storeGame()
})

gameGrid.addEventListener('click', function(e) {
  const box = e.target    // box is a div
  const index = box.dataset.number // which box has been clicked with it's number
  if (!index)   // if element clicked is not in the grid, it prevents the change of turn by not doing anything
    return
 
  // Do not let User choose for O while waiting for the computer
  if (player2 === "Computer" && !isX)
    return

  mark(index) // decides which mark is to be put in the boxStatus array

  if (player2 === "Computer") {
    setTimeout(() => {
      computerMove()
      updateMessage()
    }, 800)
  }

  updateGridBoxes() // puts the relevant image into the clicked cell
  updateMessage()   // updates user message
});

playersSection.addEventListener('click', function(e) {
  let player = e.target;
  if (player.id === "X") {
    p1IconImg += 1
    if (p1IconImg > 4) {
      p1IconImg = 1;
    }
    clickingSound.play()
    player.src = `images/x${p1IconImg}.svg`
  } else if (player.id === "O") {
    p2IconImg += 1
    if (p2IconImg > 4) {
      p2IconImg = 1;
    }
    clickingSound.play()
    player.src = `images/o${p2IconImg}.svg`
  }
  updateGridBoxes()
})

// fills the message when page is loaded
updateGridBoxes();
updateMessage();