const board = document.querySelector("#board");
const cards = [
  {
    name: "javascript",
    img: "images/javascript-logo.png",
  },
  {
    name: "html",
    img: "images/html-logo.png",
  },
  {
    name: "css",
    img: "images/css-logo.png",
  },

  {
    name: "csharp",
    img: "images/csharp-logo.png",
  },
  {
    name: "react",
    img: "images/react-logo.png",
  },
  {
    name: "javascript",
    img: "images/javascript-logo.png",
  },
  {
    name: "html",
    img: "images/html-logo.png",
  },
  {
    name: "css",
    img: "images/css-logo.png",
  },

  {
    name: "csharp",
    img: "images/csharp-logo.png",
  },
  {
    name: "react",
    img: "images/react-logo.png",
  },
];
const score = document.querySelector("#score");
let chosenCard = [];
let chosenCardId = [];
let cardsScore = [];
cards.sort(() => 0.5 - Math.random());
function createBoard() {
  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/card-back.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    board.append(card);
  }
}
createBoard();
function checkMatch() {
  const allCards = document.querySelectorAll("#board img");
  const firstCard = chosenCardId[0];
  const secondCard = chosenCardId[1];
  if (chosenCard[0] === chosenCard[1]) {
    allCards[firstCard].setAttribute("src", "images/blank.png");
    allCards[secondCard].setAttribute("src", "images/blank.png");
    allCards[firstCard].removeEventListener("click", flipCard);
    allCards[secondCard].removeEventListener("click", flipCard);
    cardsScore.push(chosenCard);
  } else {
    allCards[firstCard].setAttribute("src", "images/card-back.png");
    allCards[secondCard].setAttribute("src", "images/card-back.png");
  }
  score.innerHTML = cardsScore.length;
  chosenCard = [];
  chosenCardId = [];
  if (cardsScore.length == cards.length / 2) {
    score.innerHTML = "you have found them all";
  }
}
function flipCard() {
  const cardId = this.getAttribute("data-id");

  chosenCard.push(cards[cardId].name);
  chosenCardId.push(cardId);
  this.setAttribute("src", cards[cardId].img);
  if (chosenCard.length === 2) {
    setTimeout(checkMatch, 500);
  }
}
