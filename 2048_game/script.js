const $table = document.getElementById("table");
const $score = document.getElementById("score");
let data = [];

function startGame() {
  const $fragment = document.createDocumentFragment();
  [1, 2, 3, 4].forEach(() => {
    const rowData = [];
    data.push(rowData);
    const $tr = document.createElement("tr");
    [1, 2, 3, 4].forEach(() => {
      rowData.push(0);
      const $td = document.createElement("td");
      $tr.appendChild($td);
    });
    $fragment.appendChild($tr);
  });
  $table.appendChild($fragment);
  put2ToRandomCell();
  draw();
}

function put2ToRandomCell() {
  const emptyCells = [];
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      if (!cellData) {
        emptyCells.push([i, j]);
      }
    });
  });

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  data[randomCell[0]][randomCell[1]] = 2;
}

function moveCells(direction) {
  switch (direction) {
    case "left":
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            newData[i].push(cellData);
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][j] = newData[i][j] || 0;
        });
      });
      break;
    case "right":
      break;
    case "up":
      break;
    case "down":
      break;
  }
}
function draw() {
  data.forEach((rowData, i) => {
    rowData.forEach((cellData, j) => {
      const $target = $table.children[i].children[j];
      if (cellData > 0) {
        $target.textContent = cellData;
        $target.className = "color-" + cellData;
      } else {
        $target.textContent = "";
        $target.className = "";
      }
    });
  });
}

startGame();

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      moveCells("up");
      return;
    case "ArrowDown":
      moveCells("down");
      return;
    case "ArrowLeft":
      moveCells("left");
      return;
    case "ArrowRight":
      moveCells("right");
      return;
    default:
      return;
  }
});

let startCoord;
window.addEventListener("mousedown", (e) => {
  startCoord = [e.clientX, e.clientY];
});
window.addEventListener("mouseup", (e) => {
  const endCoord = [e.clientX, e.clientY];
  const diffX = endCoord[0] - startCoord[0];
  const diffY = endCoord[1] - startCoord[1];
  if (diffX < 0 && Math.abs(diffX) > Maxh.abs(diffY)) {
    moveCells("left");
  } else if (diffX > 0 && Math.abs(diffX) > Maxh.abs(diffY)) {
    moveCells("right");
  } else if (diffX < 0 && Math.abs(diffX) <= Maxh.abs(diffY)) {
    moveCells("down");
  } else if (diffX > 0 && Math.abs(diffX) <= Maxh.abs(diffY)) {
    moveCells("up");
  }
});
