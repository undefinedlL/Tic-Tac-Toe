const startGameButton = document.getElementById("startGame");
const resetButton = document.getElementById("resetButton");
const finalWindow = document.getElementById("final");
const finalText = document.getElementById("finalText");
const startWindow = document.querySelector(".start-page");
const cells = document.querySelectorAll(".cell");
const turnInfo = document.getElementById("turn");
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];
let isCrossTurn = true;
let isWinner = false;

startGameButton.addEventListener("click", startButtonClickHandler);
resetButton.addEventListener("click", resetButtonClickHandler);

function startGame() {
    changeGameTurnStatus();
    cells.forEach((cell) => {
        cell.addEventListener("click", clickCell, { once: true });
    });
}

function resetGame() {
    console.log("reset game");
    isWinner = false;
    clearCells();
    removeHighlightCells();
    hideFinalWindow();
    startGame();
}

function endGame() {
    cells.forEach((cell) => {
        cell.removeEventListener("click", clickCell);
    });
    showFinalWindow();
}

function changeTurn() {
    isCrossTurn = !isCrossTurn;
}

function getTurn() {
    return isCrossTurn ? "cross" : "circle";
}

function changeGameTurnStatus() {
    turnInfo.innerHTML = getTurn();
}

function addMark() {
    let mark = document.createElement("div");
    let currentTurn = isCrossTurn ? "cross" : "circle";
    mark.classList.add(currentTurn);
    return mark;
}

function clickCell(e) {
    let cell = e.target;
    cell.appendChild(addMark());
    if (isDraw() || isWinningCombinations()) {
        endGame();
        return;
    }
    changeTurn();
    changeGameTurnStatus();
}

function isWinningCombinations() {
    let currentTurn = getTurn();
    for (combination of winningCombinations) {
        const [x, y, z] = combination;
        if (
            cells[x].firstChild?.classList.contains(currentTurn) &&
            cells[y].firstChild?.classList.contains(currentTurn) &&
            cells[z].firstChild?.classList.contains(currentTurn)
        ) {
            console.log("WINNER");
            isWinner = true;
            highlightCells(x, y, z);
            return true;
        }
    }
    return false;
}

function highlightCells(c1, c2, c3) {
    cells[c1].classList.add("win");
    cells[c2].classList.add("win");
    cells[c3].classList.add("win");
}

function removeHighlightCells() {
    cells.forEach((cell) => {
        if (cell.classList.contains("win")) {
            cell.classList.remove("win");
        }
    });
}

function isDraw() {
    if (
        [...cells].every((cell) => cell.children.length == 1) &&
        !isWinningCombinations()
    ) {
        return true;
    }
    return false;
}

function startButtonClickHandler(e) {
    const startWindow = document.querySelector(".start-page");
    startWindow.remove();
    startGame();
}

function resetButtonClickHandler(e) {
    hideFinalWindow();
    resetGame();
}

function clearCells() {
    cells.forEach((cell) => {
        if (cell.firstChild) {
            cell.removeChild(cell.firstChild);
        }
    });
}

function showFinalWindow() {
    isWinner
        ? (finalText.innerHTML = `The winner is ${getTurn()}`)
        : (finalText.innerHTML = `Draw`);
    finalWindow.style.display = "flex";
    setTimeout(() => {
        finalWindow.classList.add("active");
    }, 300);
}

function hideFinalWindow() {
    finalWindow.classList.remove("active");
    setTimeout(() => {
        finalWindow.style.display = "none";
    }, 100);
}
