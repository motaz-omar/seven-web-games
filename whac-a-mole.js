const squares = document.querySelectorAll(".square");
const mole = document.querySelector("#mole");
const timeLeft = document.querySelector("#time");
const score = document.querySelector("#score");
let result = 0;
let hitPosition;
let time = 60;
let timeId = null;

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });
  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
}
squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++;
      score.innerHTML = result;
      hitPosition = null;
    }
  });
});
function moveMole() {
  timeId = setInterval(randomSquare, 1000);
}

moveMole();
function timer() {
  time--;
  timeLeft.innerHTML = time;
  if (time == 0) {
    clearInterval(timerId);
    clearInterval(timeId);
    alert("game over your score is " + result + " refresh to restart the game");
  }
}
let timerId = setInterval(timer, 1000);
