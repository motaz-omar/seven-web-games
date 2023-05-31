const time = document.querySelector("#time");
const result = document.querySelector("#result");

const squares = document.querySelectorAll("#canvas div");
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");

const width = 9;
let currentIndex = 76;
let timeId;
let checkGameTimeId;
let timeLeft = 20;
function moveFrog(e) {
  squares[currentIndex].classList.remove("frog");

  switch (e.key) {
    case "a":
      if (currentIndex % width !== 0) {
        currentIndex -= 1;
      }
      break;
    case "d":
      if (currentIndex % width < width - 1) {
        currentIndex += 1;
      }
      break;
    case "w":
      if (currentIndex - width >= 0) {
        currentIndex -= width;
      }
      break;
    case "s":
      if (currentIndex + width < width * width) {
        currentIndex += width;
      }
      break;
  }
  squares[currentIndex].classList.add("frog");
}
function moveObjects() {
  timeLeft--;
  time.innerHTML = timeLeft;
  logsLeft.forEach((logLeft) => moveLogLeft(logLeft));
  carsLeft.forEach((carLeft) => moveCarLeft(carLeft));
  logsRight.forEach((logRight) => moveLogRight(logRight));
  carsRight.forEach((carRight) => moveCarRight(carRight));
}
function checkGame() {
  lose();
  win();
}
function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");

      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");

      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");

      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");

      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");

      break;
  }
}
function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carLeft.classList.remove("c1");
      carLeft.classList.add("c2");

      break;
    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("c3");

      break;
    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c1");

      break;
  }
}
function moveCarRight(carRight) {
  switch (true) {
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c3");

      break;
    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c1");

      break;
    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c2");

      break;
  }
}
function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");

      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");

      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");

      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");

      break;
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");

      break;
  }
}
function lose() {
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5") ||
    timeLeft <= 0
  ) {
    result.innerHTML = "you lost";
    clearInterval(timeId);
    clearInterval(checkGameTimeId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keydown", moveFrog);
  }
}
function win() {
  if (squares[currentIndex].classList.contains("end")) {
    result.innerHTML = "you won";
    clearInterval(timeId);
    document.removeEventListener("keydown", moveFrog);
  }
}
timeId = setInterval(moveObjects, 1000);
checkGameTimeId = setInterval(checkGame, 50);
document.addEventListener("keydown", moveFrog);
