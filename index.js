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
// tracking player turns
let player1Turn = true;
let player2Turn = false;
// to hold 42 yellow and red chips
let redChipLarge = [];
let yellowChipLarge = [];
// to track index of placed chips
let player1array = [];
let player2array = [];
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

// winning arrays looped through using for loop
const winningIndexs = [
  [0, 1, 2, 3],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 17, 25, 33],
  [8, 16, 24, 32],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 32],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [9, 10, 11, 12],
  [10, 11, 12, 13],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  [23, 24, 25, 26],
  [24, 25, 26, 27],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  [37, 38, 39, 40],
  [38, 39, 40, 41],
];
// checks if player1 or player2 selected indexs match winning indexs
function checkWinner() {
  for (let i = 0; i < winningIndexs.length; i++) {
    // loops over all arrays and grabs the first,second,third,&four number of each array
    const box1 = winningIndexs[i][0];
    const box2 = winningIndexs[i][1];
    const box3 = winningIndexs[i][2];
    const box4 = winningIndexs[i][3];

    if (
      // checks if player1 selected indexs match winning indexs
      player1array.includes(box1) &&
      player1array.includes(box2) &&
      player1array.includes(box3) &&
      player1array.includes(box4)
    ) {
      alert("player 1 wins");
    } else if (
      player2array.includes(box1) &&
      player2array.includes(box2) &&
      player2array.includes(box3) &&
      player2array.includes(box4)
    ) {
      alert("player 2 wins");
    }
  }
}
checkWinner();

// places a chip on the board when grid cell is clicked
// chips svg is then appended to the renderBoard which underlays the gameBoard
function addChip() {
  // index of on click variable
  let boxIndex = event.target.index;
  // conditional statement that controls where players can put game peices on the board.
  if (
    player1Turn == true &&
    // peices on the bottom of board have a class of 'open-space' hard coded in HTML
    ((boxes[boxIndex].classList.contains("open-space") &&
      // !checks that spots haven't already been taken and prevents going in the same spot twice
      !boxes[boxIndex].classList.contains("taken")) ||
      // clicked spaces will have taken added to their class list
      // checked to see if the space directy below is taken & makes sure current spot isn't taken
      (boxes[boxIndex + 7].classList.contains("taken") &&
        !boxes[boxIndex].classList.contains("taken")))
  ) {
    return (
      // changes player turn
      (player1Turn = false),
      (player2Turn = true),
      // appends red chip svg inside div on render board grid underlay with the same index of the clicked div on the gameboard overlay
      renderBoxes[boxIndex].appendChild(redChipLarge[boxIndex]),
      // adds class of taken to clicked box on gameboard grid overlay
      boxes[boxIndex].classList.add("taken"),
      // pushes clicked box index to player1array
      player1array.push(boxIndex),
      // gsap animation for chip bounce
      gsap.from(renderBoxes[boxIndex], {
        duration: 0.9,
        ease: "bounce.out",
        y: -600,
      }),
      // checks for winner
      checkWinner()
    );
  } else if (
    player2Turn == true &&
    ((boxes[boxIndex].classList.contains("open-space") &&
      !boxes[boxIndex].classList.contains("taken")) ||
      (boxes[boxIndex + 7].classList.contains("taken") &&
        !boxes[boxIndex].classList.contains("taken")))
  ) {
    return (
      (player1Turn = true),
      (player2Turn = false),
      renderBoxes[boxIndex].appendChild(yellowChipLarge[boxIndex]),
      boxes[boxIndex].classList.add("taken"),
      player2array.push(boxIndex),
      gsap.from(renderBoxes[boxIndex], {
        duration: 0.9,
        ease: "bounce.out",
        y: -600,
      }),
      checkWinner()
    );
  } else {
    // alert for illegal moves
    return alert("Cant got here");
  }
}
