const newGameBtn = document.querySelector('.button button');
const gameGrid = document.querySelector('.grid');
let isX = true;
let boxStatus = [];
let winner = undefined;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]


function mark(index) {
  const marker = isX ? 'X' : 'O'

  if (winner) {
    return
  }

  if (boxStatus[index] === undefined) {
    boxStatus[index] = marker;
    isX = !isX

    const win = determineWinner()
    if (win) {
      winner = win
    }
  } 
}

function determineWinner() {
  // winningCombinations is an array of triples that represent coordinates in the boxStatus array
  // for potential combinations of wins.  

  for (let i = 0; i < winningCombinations.length; i++) {
    const triple = winningCombinations[i];

    // Get 3 elements from the boxStatus array at the indexes for this combination
    const picks = triple.map(i => boxStatus[i])
    if (picks.toString() === ['X', 'X', 'X'].toString()) {
      return "Player 1"
    } else if (picks.toString() === ['O', 'O', 'O'].toString()) {
      return "Player 2"
    }
  }

  return null
}

function updateGridBoxes() {
  for (let i = 0; i < 9; i++) {
    let box = document.querySelector(`.box[data-number="${i}"]`)
    box.innerHTML = "";
    let image = document.createElement('img')
    if (boxStatus[i] === 'X') {
      image.src = "images/x1.svg"
      box.appendChild(image)
    } else if (boxStatus[i] === 'O') {
      image.src = "images/o1.svg"
      box.appendChild(image)
    }
  }
}

function updateMessage() {
  const messageParagraph = document.querySelector('.user-message');
  let message = ""

  if (winner) {
    message = `${winner} has won! Start a new game`
  } else if (isTie()) {
    message = "It's a tie! Start a new game"
  } else if (isX === true) {
    message = "Player 1, it's your turn"
  } else if (isX === false) {
    message = "Player 2, it's your turn"
  }
  messageParagraph.textContent = message
}

function isTie() {
  const filledBoxes = boxStatus.filter((x) => x !== undefined)
  return !winner && filledBoxes.length == 9
}

newGameBtn.addEventListener('click', startNewGame);
gameGrid.addEventListener('click', function(e) {
  const box = e.target
  const index = box.dataset.number
  if (!index)
    return
 
  mark(index)

  updateGridBoxes()
  updateMessage()
});

function startNewGame() {
  isX = true;
  boxStatus = [];
  winner = undefined;
  updateGridBoxes()
  updateMessage()
}

updateMessage();