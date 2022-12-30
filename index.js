// DOM Elements
let gameBoard = document.getElementById("game-board");
let renderBoard = document.getElementById("render-board");
let player1turn = true;
let player2turn = false;
// Create JS Game Board
for (let i = 0; i < 42; i++) {
  let box = document.createElement("div");
  box.addEventListener("click", addChip);
  box.classList = "";
  box.attributes.index = i;
  gameBoard.appendChild(box);
  let renderBox = document.createElement("div");
  renderBox.attributes.index = i;
  renderBoard.appendChild(renderBox);

  let redChipLarge = document.createElement("img");
  redChipLarge.classList = "";
  redChipLarge.src = "./images/counter-red-large.svg";
  let yellowChipLarge = document.createElement("img");
  yellowChipLarge.src = "./images/counter-yellow-large.svg";
  function addChip() {
    if (player1turn === true) {
      let targetIndex = event.target.index;
      return (
        // event.target.parentElement.nextElementSibling.children[
        //   targetIndex
        // ].appendChild(redChipLarge)(
          // event.target.appendChild(redChipLarge),
          (player1turn = false)
        ),
        (player2turn = true),
        console.log(event)
      );
    } else if (player2turn === true) {
      return (
        event.target.appendChild(yellowChipLarge),
        (player1turn = true),
        (player2turn = false)
      );
    } else {
      return alert("game-over");
    }
  }
}
