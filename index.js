// DOM Elements
// gameBoard is an invisable grid that overlays the gameboard svg
const gameBoard = document.getElementById("game-board");
// gameBoard grid cells
const boxes = document.querySelectorAll("#game-board div");
console.log(boxes);
// renderBoard is an invisable grid that underlays the actual game board svg
const renderBoard = document.getElementById("render-board");
// renderBoard grid cells
const renderBoxes = document.querySelectorAll("#render-board div");
console.log(renderBoxes);
// variables for game logic
let player1turn = true;
let player2turn = false;
// function to addChip to renderboard when gameboard is clicked
// & adds game logic with conditional statements
// for loop to loop through grid cells
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", addChip);
  boxes[i].index = i;
}
function addChip() {
  if (player1turn === true) {
    return console.log(event.target.index);
  }
}
