const canvas = document.querySelector("#canvas");
const score = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const userStart = [230, 10];
const boardWidth = 560;
const boardHeight = 300;
const ballStart = [270, 40];
const ballWidth = 20;
let ballCurrentPosition = ballStart;
let currentPosition = userStart;
let start;
let xDirection = -2;
let yDirection = 2;
let currentScore = 0;
class Block {
  constructor(x, y) {
    this.bottomLeft = [x, y];
    this.bottomRight = [x + blockWidth, y];
    this.topLeft = [x, y + blockHeight];
    this.topRight = [x + blockWidth, y + blockHeight];
  }
}
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];
function createBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    canvas.append(block);
  }
}
createBlocks();
const user = document.createElement("div");
drawUser();

user.setAttribute("id", "user");
canvas.append(user);
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}
function moveUser(e) {
  switch (e.key) {
    case "a":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }

      break;
    case "d":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }

      break;
  }
}
document.addEventListener("keydown", moveUser);

const ball = document.createElement("div");
ball.setAttribute("id", "ball");
drawBall();
canvas.append(ball);
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;

  drawBall();
  checkforcollisions();
}
start = setInterval(moveBall, 10);
function checkforcollisions() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballWidth > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] + ballWidth < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      channgeDirection();
      currentScore++;
      score.innerHTML = currentScore;
      if (blocks.length === 0) {
        score.innerHTML = "you won";
        clearInterval(start);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }
  if (
    ballCurrentPosition[0] >= boardWidth - ballWidth ||
    ballCurrentPosition[0] <= 0 ||
    ballCurrentPosition[1] >= boardHeight - ballWidth
  ) {
    channgeDirection();
  }
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    channgeDirection();
  }
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(start);
    score.innerHTML = "you lost";
    document.removeEventListener("keydown", moveUser);
  }
}
function channgeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  } else if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  } else if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  } else if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
