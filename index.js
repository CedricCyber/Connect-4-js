// DOM Elements --------------------
// gameBoard DOM elements --------------------
// gameBoard is an invisable grid that overlays the gameboard svg
const gameBoard = document.getElementById("game-board");
// gameBoard grid cells
const boxes = document.querySelectorAll("#game-board div");
// renderBoard is an invisable grid that underlays the actual game board svg
const renderBoard = document.getElementById("render-board");
// renderBoard grid cells
const renderBoxes = document.querySelectorAll("#render-board div");
// timer DOM elements --------------------
// timer background svg
const timer = document.getElementById("timer");
// timer seconds text
const timerSeconds = document.getElementById("timer-seconds");
// initialize timerSeconds to 30
timerSeconds.innerHTML = 30;
// timer player turn text
const timerPlayerTurn = document.getElementById("timer-player-turn");
// player score DOM elements --------------------
const player1Score = document.getElementById("player1-score");
// Initialize player1Score to 0
player1Score.innerHTML = 0;
const player2Score = document.getElementById("player2-score");
// Initialize player2Score to 0
player2Score.innerHTML = 0;
// variables for game logic --------------------
// tracking player turns
let player1Turn = true;
let player2Turn = false;
// tacking player win
let player1Win = false;
let player2Win = false;
// to hold 42 yellow and red chips
let redChipLarge = [];
let yellowChipLarge = [];
// to track index of placed chips
// TODO-------Remove selected indexs from p1 & p2 arrays when reset button is clicked -----------!!!
let player1array = [];
let player2array = [];
let initialTime = setInterval(updateTimer, 1000);

// Logic for game timer --------------------
function updateTimer() {
  // display current player turn
  if (player1Turn == true) {
    timerPlayerTurn.innerHTML = "Player 1 Turn";
    timer.src = "./images/turn-background-red.svg";
  } else if (player2Turn == true) {
    timerPlayerTurn.innerHTML = "Player 2 Turn";
    timer.src = "./images/turn-background-yellow.svg";
  }
  // count down form 30 seconds
  // if timerSeconds is greater than 0, count down
  if (timerSeconds.innerHTML > 0) {
    // count down timerSeconds
    timerSeconds.innerHTML--;
    // if timerSeconds hits 0, switch player turn
  } else if (timerSeconds.innerHTML == 0) {
    // switch player turn
    if (player1Turn == true) {
      player1Turn = false;
      player2Turn = true;
    } else if (player2Turn == true) {
      player1Turn = true;
      player2Turn = false;
    }
    // reset timerSeconds to 30
    timerSeconds.innerHTML = 30;
  }
}

// Setting up grid cells for game --------------------
// for loop to loop through grid cells
for (let i = 0; i < boxes.length; i++) {
  // add event listener to each grid cell
  boxes[i].addEventListener("click", addChip);
  // add index to each grid cell
  boxes[i].index = i;
  // created 42 red and yellow chips in an array to append to renderBoard when gameBoard is clicked
  redChipLarge.push(document.createElement("img"));
  redChipLarge[i].src = "./images/counter-red-large.svg";
  yellowChipLarge.push(document.createElement("img"));
  yellowChipLarge[i].src = "./images/counter-yellow-large.svg";
}

// arrays of winning indexs
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

// Game logic --------------------
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
      // sets player1Win to true for conditional statement
      player1Win = true;
      // adds 1 point to player1 score
      player1Score.innerHTML++;
      // pause timer
      clearInterval(initialTime);
      // if player1 selected indexs match winning indexs, inner html of timer changes to player1 wins
      timerPlayerTurn.innerHTML = "Player 1 Wins";

      // stops player from adding chips to the board
      if (player1Win == true) {
        boxes.forEach((box) => {
          box.removeEventListener("click", addChip);
        });
      }
    } else if (
      player2array.includes(box1) &&
      player2array.includes(box2) &&
      player2array.includes(box3) &&
      player2array.includes(box4)
    ) {
      alert("player 2 wins");
      player2Win = true;
      player2Score.innerHTML++;
      clearInterval(initialTime);
      timerPlayerTurn.innerHTML = "Player 2 Wins";
      if (player2Win == true) {
        boxes.forEach((box) => {
          box.removeEventListener("click", addChip);
        });
      }
    }
  }
}

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
      checkWinner(),
      (timerSeconds.innerHTML = 30)
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
      checkWinner(),
      // reset timer
      (timerSeconds.innerHTML = 30)
    );
  } else {
    // alert for illegal moves
    return alert("Cant got here");
  }
}

// Button Logic ------------------------>

// Restart Button
const restartButton = document.getElementById("restart-button");
// Remove Chips from render board ------------------
console.log(restartButton);
// removes chips and classes from renderBoard
// resets player turn and timer
let resetBoard = () => {
  const selectedBoxes = document.querySelectorAll(".taken");
  // rest player turn to 1
  player1Turn = true;
  player2Turn = false;
  // reset wins and restore addChip event listener if a player has won
  if (player1Win == true || player2Win == true) {
    player1Win = false;
    player2Win = false;
    boxes.forEach((box) => {
      box.addEventListener("click", addChip);
    });
    initialTime = setInterval(updateTimer, 1000);
  }
  // reset timer
  timerSeconds.innerHTML = 30;
  for (let i = 0; i < selectedBoxes.length; i++) {
    // index of selectedBoxes to match renderBoxes
    let selectedBoxesIndex = selectedBoxes[i].index;
    // removes child svgs from renderBoxes;
    renderBoxes[selectedBoxesIndex].removeChild(
      renderBoxes[selectedBoxesIndex].firstChild
    ),
      // remove taken class from selected elements
      selectedBoxes[i].classList.remove("taken"),
      (player1array = []),
      (player2array = []);
  }
};
restartButton.addEventListener("click", resetBoard);

// Menu Button
const menuButton = document.getElementById("menu-button");
const gameMenu = document.getElementById("game-menu");
const body = document.getElementById("body");
const gameContainer = document.getElementById("game-container");
// Menu Button Logic
menuButton.addEventListener("click", () => {
  gameMenu.classList.toggle("display-none"),
    body.classList.toggle("dark-purple-background"),
    gameContainer.classList.toggle("brightness-dim"),
    // pause timer
    clearInterval(initialTime);
});

// Continue Game Button
const continueGameButton = document.getElementById("continue-game-button");
continueGameButton.addEventListener("click", () => {
  gameMenu.classList.toggle("display-none"),
    body.classList.toggle("dark-purple-background"),
    gameContainer.classList.toggle("brightness-dim"),
    // resume timer
    (initialTime = setInterval(updateTimer, 1000));
});

// Mobile Game Logic ------------------------>
const gameBoardWhiteLayer = document.getElementById("game-board-white-layer");
const gameBoardBlackLayer = document.getElementById("game-board-black-layer");

// grab current screen size

// function to check to change board to mobile view
function mobileView() {
  let currentScreenSize = window.innerWidth;
  // when currentScreenSize is less than 970px change gameBoardWhiteLayer and gameBoardBlackLayer to smaller images
  if (currentScreenSize < 970) {
    gameBoardWhiteLayer.src = "images/board-layer-white-small.svg";
    gameBoardBlackLayer.src = "images/board-layer-black-small.svg";
    redChipLarge.forEach((chip) => {
      chip.src = "images/counter-red-small.svg";
    });
    yellowChipLarge.forEach((chip) => {
      chip.src = "images/counter-yellow-small.svg";
    });
  }
  // when currentScreenSize is greater than 970px change gameBoardWhiteLayer and gameBoardBlackLayer to larger images
  else if (currentScreenSize > 970) {
    gameBoardWhiteLayer.src = "images/board-layer-white-large.svg";
    gameBoardBlackLayer.src = "images/board-layer-black-large.svg";
    redChipLarge.forEach((chip) => {
      chip.src = "images/counter-red-large.svg";
    });
    yellowChipLarge.forEach((chip) => {
      chip.src = "images/counter-yellow-large.svg";
    });
  }
}
// run function on load
mobileView();
// when currentScreenSize changes run function
window.addEventListener("resize", mobileView);
