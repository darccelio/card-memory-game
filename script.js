const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

let sucessColor = "#fffd55";
let failColor = "#e61c2e";
let defaultColor = "#5c9fe8";

defaultColor.valueOf;

//função para virar carta
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;
  checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    firstCard.firstElementChild.style.backgroundColor = "#fffd55";
    secondCard.firstElementChild.style.backgroundColor = "#fffd55";
    return disableCards();
  }

    setTimeout(showWrong, 1000);
    unflipCards();
}

//função que mostra que as cartas escolhidas são diferentes
function showWrong() {
    firstCard.firstElementChild.style.backgroundColor = '#e61c2e';
    secondCard.firstElementChild.style.backgroundColor = '#e61c2e';
    
}

//função que desabilita as cartas
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    firstCard.firstElementChild.style.backgroundColo = "#5c9fe8";
    secondCard.firstElementChild.style.backgroundColor = "#5c9fe8";
    resetBoard();
  }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
  cards.forEach((card) => {
    let ramdomPosition = Math.floor(Math.random() * 12);
    card.style.order = ramdomPosition;
  });
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
