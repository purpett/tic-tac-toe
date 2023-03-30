const newGameBtn = document.querySelector('.button button');
const gameGrid = document.querySelector('.grid');
let isX = true;

newGameBtn.addEventListener('click', startNewGame);

gameGrid.addEventListener('click', function(e) {
  const box = e.target
  const image = document.createElement('img')
  if (isX) {
    image.src = "images/x1.svg"
  } else {
    image.src = "images/o1.svg"
  }
  isX = !isX;
  box.appendChild(image)
});


function startNewGame() {
  //
}

