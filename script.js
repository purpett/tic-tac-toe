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


function mark(index, marker) {
  if (boxStatus[index] === undefined ) {
    boxStatus[index] = marker;
  } 
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



newGameBtn.addEventListener('click', startNewGame);

gameGrid.addEventListener('click', function(e) {
  const box = e.target
  const index = box.dataset.number
  const marker = isX ? 'X' : 'O'
  mark(index, marker)
  updateGridBoxes()
  isX = !isX
});


function startNewGame() {
  //
}

