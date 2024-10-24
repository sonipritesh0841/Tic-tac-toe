const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("resetButton");
const gameOver = document.getElementById("gameOver");
const gameOverMessage = document.getElementById("gameOverMessage");
const playAgainButton = document.getElementById("playAgainButton");
const modeButton = document.getElementById("modeButton"); // Button to switch modes
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let isAI = false; // New variable to track if AI is active

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (board[clickedCellIndex] === "" && gameActive) {
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(`cell-${currentPlayer.toLowerCase()}`);

    checkForWin();

    if (isAI && currentPlayer === "X") {
      currentPlayer = "O"; // Switch to AI
      setTimeout(aiMove, 500); // Delay for AI move
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch players
    }
  }
}

function aiMove() {
  const availableCells = board
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null);
  const randomIndex =
    availableCells[Math.floor(Math.random() * availableCells.length)];

  if (randomIndex !== undefined) {
    board[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;
    cells[randomIndex].classList.add(`cell-${currentPlayer.toLowerCase()}`);
    checkForWin();
    currentPlayer = "X"; // Switch back to player
  }
}

function checkForWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cell1 = board[condition[0]];
    const cell2 = board[condition[1]];
    const cell3 = board[condition[2]];

    if (cell1 === "" || cell2 === "" || cell3 === "") {
      continue;
    }

    if (cell1 === cell2 && cell2 === cell3) {
      gameOverMessage.textContent = `Player ${cell1} wins!`;
      gameOver.style.display = "flex";
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    gameOverMessage.textContent = "It's a draw!";
    gameOver.style.display = "flex";
    gameActive = false;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  gameOver.style.display = "none";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("cell-x", "cell-o");
  });
}

function toggleMode() {
  isAI = !isAI; // Toggle between player and AI mode
  resetGame(); // Reset the game when mode changes
  const modeText = isAI
    ? "Switch to Player vs Player"
    : "Switch to Player vs AI";
  modeButton.textContent = modeText; // Update button text
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);
playAgainButton.addEventListener("click", resetGame);
modeButton.addEventListener("click", toggleMode); // Add event listener for mode switch
