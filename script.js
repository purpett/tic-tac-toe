const newGameBtn = document.querySelector('.button button');
const gameGrid = document.querySelector('.grid');

newGameBtn.addEventListener('click', startNewGame);

gameGrid.addEventListener('click', function(e) {
  const box = e.target
  const image = document.createElement('img')
  image.src = "images/x1.svg"
  box.appendChild(image)
});


function startNewGame() {
  //
}

