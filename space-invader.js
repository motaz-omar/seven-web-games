const canvas = document.querySelector("#canvas");
const result = document.querySelector("#score");
let shooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
let invadersRemoved = [];
let score = 0;
for (let i = 0; i < 225; i++) {
  const square = document.createElement("div");
  canvas.appendChild(square);
}
const squares = Array.from(document.querySelectorAll("#canvas div"));
const invaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];
function draw() {
  for (let i = 0; i < invaders.length; i++) {
    if (!invadersRemoved.includes(i)) {
      squares[invaders[i]].classList.add("invader");
    }
  }
}
function remove() {
  for (let i = 0; i < invaders.length; i++) {
    squares[invaders[i]].classList.remove("invader");
  }
}
draw();
squares[shooterIndex].classList.add("shooter");
function moveShooter(e) {
  squares[shooterIndex].classList.remove("shooter");

  switch (e.key) {
    case "a":
      if (shooterIndex % width !== 0) {
        shooterIndex -= 1;
      }
      break;

    case "d":
      if (shooterIndex % width < width - 1) {
        shooterIndex += 1;
      }
      break;
  }
  squares[shooterIndex].classList.add("shooter");
}
document.addEventListener("keydown", moveShooter);
function moveInvaders() {
  const left = invaders[0] % width === 0;
  const right = invaders[invaders.length - 1] % width === width - 1;
  remove();
  if (right && goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }
  if (left && !goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }
  for (let i = 0; i < invaders.length; i++) {
    invaders[i] += direction;
  }
  draw();
  if (squares[shooterIndex].classList.contains("invader", "shooter")) {
    result.innerHTML = "Game over";
    clearInterval(invadersId);
  }
  for (let i = 0; i < invaders.length; i++) {
    if (invaders[i] > squares.length) {
      result.innerHTML = "Game over";

      clearInterval(invadersId);
    }
  }
  if (invadersRemoved.length === invaders.length) {
    result.innerHTML = "you won";
    clearInterval(invadersId);
    document.removeEventListener("keydown", shoot);
    document.removeEventListener("keydown", moveShooter);
  }
}

invadersId = setInterval(moveInvaders, 700);
function shoot(e) {
  let laserId;
  let laserIndex = shooterIndex;
  function moveLaser() {
    squares[laserIndex].classList.remove("laser");
    laserIndex -= width;
    squares[laserIndex].classList.add("laser");
    if (squares[laserIndex].classList.contains("invader")) {
      squares[laserIndex].classList.remove("laser");
      squares[laserIndex].classList.remove("invader");
      squares[laserIndex].classList.add("boom");

      setTimeout(() => {
        squares[laserIndex].classList.remove("boom");
      }, 300);
      clearInterval(laserId);
      const invaderReomve = invaders.indexOf(laserIndex);
      score++;
      result.innerHTML = score;
      invadersRemoved.push(invaderReomve);
    }
  }
  switch (e.key) {
    case " ":
      laserId = setInterval(moveLaser, 100);
      break;
  }
}
document.addEventListener("keydown", shoot);
