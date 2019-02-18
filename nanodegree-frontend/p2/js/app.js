/*
 * Global variables
 */
const MAX_NUMBER_OF_MATCHES = 8;

// Game aux variables
let timer;
let seconds = 0;
let numberOfMoves = 0;
let numberOfMatches = 0;
let openCards = 0;
let openCardsArray = [];
let numberOfErrors = 0;

// UI elements
const scoreModal = document.querySelector("#score-modal");
const movesLabels = document.querySelectorAll(".moves");
const minutesTxts = document.querySelectorAll(".minutes");
const secondsTxts = document.querySelectorAll(".seconds");
const deck = document.querySelector(".deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Updates cards on deck when page is loaded
document.addEventListener("DOMContentLoaded", function(event) {
  startNewGame();
});

function restartGame() {
  clearTimeout(timer);
  startNewGame();
}

// Added event listener on restart button
function enableRestartButton() {
  const restartBtn = document.querySelector('.restart');
  restartBtn.addEventListener('click', restartGame);
}

// Disables restart button
function disableRestartButton() {
  const restartBtn = document.querySelector('.restart');
  restartBtn.removeEventListener('click', restartGame);
}

// Removes all cards from deck
function removeAllCards(cardsList) {
  for (const card of cardsList) {
    card.remove();
  }
}

// Display cards on deck (after shuffling)
function displayNewCards(cardsArray) {
  for (var i = 0; i < cardsArray.length; i++) {
    if (cardsArray[i].classList.contains('is-open')) {
      cardsArray[i].classList.remove('is-open');
      cardsArray[i].classList.add('is-closed');
      if(cardsArray[i].firstElementChild.classList.contains('match')){
        cardsArray[i].firstElementChild.classList.remove('match');
      }
    }
    deck.appendChild(cardsArray[i]);
  }
}

// Updates cards list for new game when page loads or when clicking on restart button
function resetCards() {
  let cardsList = document.querySelectorAll(".card");
  let cardsArray = Array.prototype.slice.call(cardsList);
  cardsArray = shuffle(cardsArray);
  openCards = 0;
  openCardsArray = [];
  numberOfMatches = 0
  removeAllCards(cardsList);
  displayNewCards(cardsArray);
}

// After reseting the score and timer, display new card deck
function startNewGame() {
  enableRestartButton();
  listenToCardClick();
  resetCards();
  resetMoves();
  resetTimerDisplay();
  resetScore();
  timer = setInterval(() => {
    updateTimer()
  }, 1000);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function resetMoves() {
  numberOfMoves = 0;
  for (const movesLabel of movesLabels) {
    movesLabel.innerText = "0";
  }
}

function resetTimerDisplay() {
  seconds = 0;
  updateMinutesDisplay("00");
  updateSecondsDisplay("00");
}

function updateMinutesDisplay(minStr) {
  for (const minutesTxt of minutesTxts) {
    minutesTxt.innerText = minStr;
  }
}

function updateSecondsDisplay(secStr) {
  for (const secondsTxt of secondsTxts) {
    secondsTxt.innerText = secStr;
  }
}

function updateTimer() {
  seconds++;
  if (seconds < 60) {
    if (seconds < 10)
      updateSecondsDisplay("0" + seconds.toString());
    else
      updateSecondsDisplay(seconds.toString());
  } else {
    let secondsTimer = seconds % 60;
    updateMinutesDisplay(Math.floor(seconds / 60).toString());
    if (secondsTimer < 10)
      updateSecondsDisplay("0" + secondsTimer.toString());
    else
      updateSecondsDisplay((secondsTimer).toString());
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function updateMoves() {
  numberOfMoves++;
  for (const movesLabel of movesLabels) {
    movesLabel.innerText = numberOfMoves;
  }
}

function removeNoMatchStyle() {
  let noMatchList = document.querySelectorAll('.no-match');
  for (const node of noMatchList) {
    node.classList.remove('no-match');
  }
  enableRestartButton();
  listenToCardClick();
}

function hideCards() {
  openCardsArray[0].parentNode.classList.remove('is-open');
  openCardsArray[1].parentNode.classList.remove('is-open');
  openCardsArray[0].parentNode.classList.add('is-closed');
  openCardsArray[1].parentNode.classList.add('is-closed');
  openCards = 0;
  openCardsArray = [];
  setTimeout(function() {
    removeNoMatchStyle();;
  }, 1000);
}

function displayFinalScore() {
  scoreModal.style.display = "block";
  clearTimeout(timer);
}

function setMatch() {
  numberOfMatches++;

  openCardsArray[0].classList.add('match');
  openCardsArray[1].classList.add('match');

  openCards = 0;
  openCardsArray = [];
  // check if game was won
  if (numberOfMatches == MAX_NUMBER_OF_MATCHES) {
    setTimeout(function() {
      displayFinalScore();
    }, 1000);
  }
}

function resetScore() {
  numberOfErrors = 0;
  let starErrorList = document.querySelectorAll(".fa-star-o");
  let starErrorArray = Array.prototype.slice.call(starErrorList);
  if (starErrorArray.length > 0) {
    for (const star of starErrorList) {
      star.classList.remove('fa-star-o');
      star.classList.add('fa-star');
    }
  }
}


function removeStar() {
  let starList = document.querySelectorAll(".fa-star");
  let starArray = Array.prototype.slice.call(starList);
  if (starArray.length === 6) {
    starArray[2].classList.remove('fa-star');
    starArray[2].classList.add('fa-star-o');
    starArray[5].classList.remove('fa-star');
    starArray[5].classList.add('fa-star-o');
  } else if (starArray.length === 4) {
    starArray[1].classList.remove('fa-star');
    starArray[1].classList.add('fa-star-o');
    starArray[3].classList.remove('fa-star');
    starArray[3].classList.add('fa-star-o');
  }
}

function scoreUpdate() {
  if ((numberOfMoves <= 6) && (numberOfErrors >= 6)) {
    removeStar();
    numberOfErrors = 0;
  } else if ((numberOfMoves > 6) && (numberOfErrors >= 5)) {
    removeStar();
    numberOfErrors = 0;
  }
}

function addNoMatchStyle(){
  openCardsArray[0].classList.add('no-match');
  openCardsArray[1].classList.add('no-match');
}

function setNoMatch() {
  disableRestartButton();
  setTimeout(function() {
    addNoMatchStyle();
  }, 700);
  stopListeningToCardClicks();
  numberOfErrors++;
  scoreUpdate();
  setTimeout(function() {
    hideCards();
  }, 2000);
}

function checkMatch() {
  if (openCardsArray[0].firstElementChild.className.includes(openCardsArray[1].firstElementChild.className)) {
    setMatch();
  } else {
    setNoMatch();
  }
  updateMoves();
}

// Decide which action to take on card click
function evaluateCard(card) {
  if (openCards < 2) {
    openCards++;
    openCardsArray.push(card);
  }
  if (openCards == 2) {
    checkMatch();
  }
}

/*
 *  Setting card click events
 */

// Stop listening to card click
function stopListeningToCardClicks() {
  deck.removeEventListener('click', onCardClick);
}

function onCardClick() {
  let element = event.target;
  if (element.parentNode.classList.contains("is-closed")) {
    element.parentNode.classList.remove("is-closed");
    element.parentNode.classList.add("is-open");
    evaluateCard(event.target.previousElementSibling);
  }
}

// Listen to card clicked
function listenToCardClick() {
  deck.addEventListener('click', onCardClick);
}

/*
 *  Setting score modal buttons behaviors
 */
// hide score modal
let btnModalClose = document.querySelector(".btn-modal-close");
btnModalClose.addEventListener('click', function(event) {
  scoreModal.style.display = "none";
});

// hide score modal and restart game
let btnModalRestart = document.querySelector(".btn-modal-restart");
btnModalRestart.addEventListener('click', function(event) {
  scoreModal.style.display = "none";
  startNewGame();
});
