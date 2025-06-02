let gridSize = 6;
let poisonCount = 1;
let currentPlayer = 1;
let clickCount = 0;
let poisonPositions = new Set();
let score1 = 0;
let score2 = 0;

function startGame() {
  gridSize = parseInt(document.getElementById("gridSize").value);
  poisonCount = parseInt(document.getElementById("poisonCount").value);
  const grid = document.getElementById("grid");
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 60px)`;
  grid.innerHTML = "";

  currentPlayer = 1;
  clickCount = 0;
  poisonPositions.clear();
  updateUI();

  const totalCells = gridSize * gridSize;
  const allCells = Array.from({ length: totalCells }, (_, i) => i);
  const poisonCells = new Set(
    allCells.sort(() => 0.5 - Math.random()).slice(0, Math.min(poisonCount, totalCells - 1))
  );
  poisonPositions = poisonCells;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.onclick = () => revealCell(cell, i);
    grid.appendChild(cell);
  }
}

function revealCell(cell, index) {
  if (cell.classList.contains("revealed")) return;

  if (poisonPositions.has(index)) {
    cell.classList.add("poison", "revealed");
    showAllPoisons();
    endGame(currentPlayer);
  } else {
    const candyClass = clickCount % 2 === 0 ? "candy1" : "candy2";
    cell.classList.add(candyClass, "revealed");
    clickCount++;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateUI();
  }
}

function showAllPoisons() {
  document.querySelectorAll(".cell").forEach(cell => {
    if (poisonPositions.has(parseInt(cell.dataset.index))) {
      cell.classList.add("poison", "revealed");
    }
    cell.onclick = null;
  });
}

function endGame(poisonPlayer) {
  if (poisonPlayer === 1) score2++;
  else score1++;
  alert(`游戏结束！玩家${poisonPlayer}点中了毒药。\n赢家: 玩家${poisonPlayer === 1 ? 2 : 1} 获得1分`);
  updateUI();
}

function updateUI() {
  document.getElementById("currentPlayer").textContent = currentPlayer;
  document.getElementById("score1").textContent = score1;
  document.getElementById("score2").textContent = score2;
}
