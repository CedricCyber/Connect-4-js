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
let player1Turn = true;
let player2Turn = false;
let redChipLarge = [];
let yellowChipLarge = [];
// function to addChip to renderboard when gameboard is clicked
// & adds game logic with conditional statements
// for loop to loop through grid cells
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", addChip);
  boxes[i].index = i;
  // created 42 red and yellow chips in an array to append to renderBoard when gameBoard is clicked
  redChipLarge.push(document.createElement("img"));
  redChipLarge[i].src = "./images/counter-red-large.svg";
  yellowChipLarge.push(document.createElement("img"));
  yellowChipLarge[i].src = "./images/counter-yellow-large.svg";
}
console.log(redChipLarge[0]);
function addChip() {
  // index of on click variable
  let boxIndex = event.target.index;
  if (
    player1Turn == true &&
    (boxes[boxIndex].classList.contains("open-space") ||
      boxes[boxIndex + 7].classList.contains("taken"))
  ) {
    return (
      (player1Turn = false),
      (player2Turn = true),
      renderBoxes[boxIndex].appendChild(redChipLarge[boxIndex]),
      boxes[boxIndex].classList.add("taken")
    );
  } else if (
    player2Turn == true &&
    (boxes[boxIndex].classList.contains("open-space") ||
      boxes[boxIndex + 7].classList.contains("taken"))
  ) {
    return (
      (player1Turn = true),
      (player2Turn = false),
      renderBoxes[boxIndex].appendChild(yellowChipLarge[boxIndex]),
      boxes[boxIndex].classList.add("taken")
    );
  } else {
    return alert("Cant got here");
  }
}
