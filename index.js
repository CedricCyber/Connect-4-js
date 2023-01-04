// DOM Elements
// gameBoard is an invisable grid that overlays the actual gameboard svg
const gameBoard = document.getElementById("game-board");
// renderBoard is an invisable grid that underlays the actual game board svg
const renderBoard = document.getElementById("render-board");

// Variables to track player turn
let player1turn = true;
let player2turn = false;
// For loop that creates 42 divs for gameBoard and renderBoard grids
for (let i = 0; i < 42; i++) {
  // Created 42 divs to form an invisiable Grid that overlays the gameboard.
  const box = document.createElement("div");
  // Added event listener on each div to addChip() on click
  box.addEventListener("click", addChip);
  // Classes here will applay to each individual cell
  box.classList.add("box");
  // Given index attribute (might come in handy)
  box.attributes.index = i;
  // attached all divs to parent div
  gameBoard.appendChild(box);
  //  Created 42 divs to form an invisible grid that underlays the gameboard.
  const renderBox = document.createElement("div");
  // Given index attribute (might come in handy)
  renderBox.attributes.index = i;
  // attached all divs to parent div
  renderBoard.appendChild(renderBox);

  // 42 Red and 42 Yellow chip svgs
  const redChipLarge = document.createElement("img");
  redChipLarge.src = "./images/counter-red-large.svg";
  const yellowChipLarge = document.createElement("img");
  yellowChipLarge.src = "./images/counter-yellow-large.svg";

  const boxes = document.querySelectorAll(".box");

  // function to switch turn, get index of clicked cell from overly, then
  // render the chip on the underly with the same index.
  function addChip() {
    // renderBoardBoxes: render-board divs called from DOM after creating divs in for loop
    const renderBoardBoxes = document.querySelectorAll("#render-board div");
    // index of clicked cell on overlay
    const overlayIndex = event.target.attributes.index;

    if (player1turn === true) {
      (player1turn = false),
        (player2turn = true),
        // taking the clicked sell index from overlay and appending chip to underlay of same index.nnn
        renderBoardBoxes[overlayIndex].append(redChipLarge),
        // need to find correct element with query selector all
        // console.log(
        // document.querySelectorAll()
        // )
        gsap.from(renderBoardBoxes[overlayIndex], {
          duration: 0.9,
          ease: "bounce.out",
          y: -400,
        });

      // gsap.to(graph, { duration: 2.5, ease: "bounce.out", y: -500 });
    } else if (player2turn === true) {
      return (
        (player1turn = true),
        (player2turn = false),
        renderBoardBoxes[overlayIndex].append(yellowChipLarge),
        gsap.from(renderBoardBoxes[overlayIndex], {
          duration: 0.9,
          ease: "bounce.out",
          y: -300,
        }),
        console.log(overlayIndex + 7)
      );
    } else {
      return alert("game-over");
    }
  }
}
