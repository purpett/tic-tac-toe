const newGameBtn = document.querySelector('.button button');
const gameGrid = document.querySelector('.grid');
const resetBtn = document.querySelector('#reset');
const playersSection = document.querySelector('.players-section');
const clickingSound = new Audio('sounds/clicking.wav')
const winningSound = new Audio('sounds/win.wav')
const tieSound = new Audio('sounds/tie.wav')
const newGameResetSound = new Audio('sounds/new-game-reset.wav')
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
  }

localStorage.setItem('gameData', JSON.stringify(gameData))
}

function loadGame() {
  let gameData = JSON.parse(localStorage.getItem('gameData'))
  if (gameData) {
    isX = gameData.isX;
    boxStatus = gameData.boxStatus
    winner = gameData.winner
    p1Scores = gameData.p1Scores
    p2Scores = gameData.p2Scores
    tieScores = gameData.tieScores
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
}

function incrementScores() {
  if (winner === "Player 1") {
    p1Scores += 1
  } else if (winner === "Player 2") {
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
      return "Player 1"
    } else if (picks.toString() === ['O', 'O', 'O'].toString()) {
      return "Player 2"
    }
  }
  storeGame()
  return null
}

// this function checks if the game is a tie
function isTie() {
  // array containing all not undefined items from boxStatus
  const filledBoxes = boxStatus.filter((item) => item) // where item is not null or undefined
  return !winner && filledBoxes.length === 9 // if filledBoxes are 9 and there is no winner, it must be a tie
}

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
  } else if (isX === false) {
    message = "Player 2, it's your turn"
  }
  p1ScoreCell.textContent = p1Scores
  p2ScoreCell.textContent = p2Scores
  tieScoreCell.textContent = tieScores
  messageParagraph.textContent = message
}

//starts new game when clicking button
newGameBtn.addEventListener('click', startNewGame);

//resets localStorage content so that the game and the scores are empty
resetBtn.addEventListener('click', function() {
  p1Scores = 0;
  p2Scores = 0;
  tieScores = 0;
  newGameResetSound.play()
  startNewGame()
  storeGame()
})

gameGrid.addEventListener('click', function(e) {
  const box = e.target    // box is a div
  const index = box.dataset.number // which box has been clicked with it's number
  if (!index)   // if element clicked is not in the grid, it prevents the change of turn by not doing anything
    return
 
  mark(index) // decides which mark is to be put in the boxStatus array

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
    player.src = `images/x${p1IconImg}.svg`
  } else if (player.id === "O") {
    p2IconImg += 1
    if (p2IconImg > 4) {
      p2IconImg = 1;
    }
    player.src = `images/o${p2IconImg}.svg`
  }
  clickingSound.play()
  updateGridBoxes()
})

// fills the message when page is loaded
updateGridBoxes();
updateMessage();