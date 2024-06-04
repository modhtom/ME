const board = document.getElementById("board");
const dropButton = document.getElementById("dropButton");
const scoreDisplay = document.getElementById("score");

const rows = 10;
const columns = 9;
const discDiameter = 20;
const pinDiameter = 5;
const pins = [];
let score = 0;

// Create pins
for (let row = 0; row < rows; row++) {
  for (let col = 0; col <= row; col++) {
    const pin = document.createElement("div");
    pin.classList.add("pin");
    pin.style.left = `${
      (board.clientWidth / (row + 1)) * col +
      board.clientWidth / (row + 1) / 2 -
      pinDiameter / 2
    }px`;
    pin.style.top = `${
      (board.clientHeight / rows) * row +
      board.clientHeight / rows / 2 -
      pinDiameter / 2
    }px`;
    board.appendChild(pin);
    pins.push(pin);
  }
}

dropButton.addEventListener("click", dropDisc);

function dropDisc() {
  const disc = document.createElement("div");
  disc.classList.add("disc");
  board.appendChild(disc);

  let x = Math.random() * (board.clientWidth - discDiameter);
  let y = 0;
  disc.style.left = `${x}px`;
  disc.style.top = `${y}px`;

  const interval = setInterval(() => {
    y += 2;
    if (y >= board.clientHeight - discDiameter) {
      clearInterval(interval);
      updateScore(x);
    } else {
      const pin = checkCollision(disc, x, y);
      if (pin) {
        x += Math.random() > 0.5 ? 10 : -10;
      }
      disc.style.left = `${x}px`;
      disc.style.top = `${y}px`;
    }
  }, 10);
}

function checkCollision(disc, x, y) {
  return pins.find((pin) => {
    const pinRect = pin.getBoundingClientRect();
    const discRect = disc.getBoundingClientRect();
    return !(
      discRect.right < pinRect.left ||
      discRect.left > pinRect.right ||
      discRect.bottom < pinRect.top ||
      discRect.top > pinRect.bottom
    );
  });
}

function updateScore(x) {
  const columnWidth = board.clientWidth / columns;
  const columnIndex = Math.floor(x / columnWidth);
  score += columnIndex + 1;
  scoreDisplay.textContent = score;
}
