const computerChoice = document.querySelector("#computer-choice");
const userChoice = document.querySelector("#user-choice");
const result = document.querySelector("#result");
const choice = document.querySelectorAll("button");
let getChoice;
let playerChoice;
let showResult;
choice.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    playerChoice = e.target.innerHTML;
    userChoice.innerHTML = playerChoice;
    getComputerChoice();
    getResult();
    console.log(getChoice);
    console.log(showResult);
  });
});
function getComputerChoice() {
  const randomChoice = Math.floor(Math.random() * 3) + 1;
  if (randomChoice === 1) {
    getChoice = "rock";
  } else if (randomChoice === 2) {
    getChoice = "paper";
  } else if (randomChoice === 1) {
    getChoice = "scissors";
  }
  computerChoice.innerHTML = getChoice;
}
function getResult() {
  if (getChoice === playerChoice) {
    showResult = "draw";
  } else if (getChoice === "rock" && playerChoice === "scissors") {
    showResult = "you lost";
  } else if (getChoice === "scissors" && playerChoice === "rock") {
    showResult = "you won";
  } else if (getChoice === "scissors" && playerChoice === "paper") {
    showResult = "you lost";
  } else if (getChoice === "paper" && playerChoice === "scissors") {
    showResult = "you won";
  } else if (getChoice === "paper" && playerChoice === "rock") {
    showResult = "you lost";
  } else if (getChoice === "rock" && playerChoice === "paper") {
    showResult = "you won";
  }
  result.innerHTML = showResult;
}
