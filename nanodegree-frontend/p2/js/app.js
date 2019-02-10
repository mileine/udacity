
const NUMBER_OF_MATCHES = 8;
const deck = document.querySelector(".deck");
let movesLabel = document.querySelector(".moves");
let moves = 0;
let activeMove = false;
let openCards = 0;
let openCardsArray = [];
let numberOfMatches = 0;
/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // Updates cards on deck when page is loaded
 document.addEventListener("DOMContentLoaded", function(event) {
   refreshCards();
 });


// Added event listener on restart button
const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function () {
  refreshCards();
});

// Removes all cards from deck
function removeAllCards(cardsList){
  for(const card of cardsList){
    card.remove();
  }
}

// Display cards on deck
function displayNewCards(cardsArray){
  for (var i = 0; i < cardsArray.length; i++){
    cardsArray[i].classList.remove('match');
    cardsArray[i].classList.remove('open');
    cardsArray[i].classList.remove('show');
    deck.appendChild(cardsArray[i]);
  }
}

// Updates cards list for new game when page loads or when clicking on restart button
function refreshCards(){
  let cardsList = document.querySelectorAll(".card");
  let cardsArray = Array.prototype.slice.call(cardsList);
  cardsArray = shuffle(cardsArray);
  removeAllCards(cardsList);
  displayNewCards(cardsArray);
  movesLabel.innerText = "0";
  moves = 0;
  openCards = 0;
  openCardsArray = [];
  console.log(movesLabel);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
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

 function updateMoves(){
   moves++;
   movesLabel.innerText = moves;
 }

 function hideCards(){
   openCardsArray[0].classList.remove('no-match');
   openCardsArray[1].classList.remove('no-match');
   openCards = 0;
   openCardsArray = [];
 }

 function setMatch(){
   numberOfMatches++;
   openCardsArray[0].classList.remove('open');
   openCardsArray[0].classList.remove('show');
   openCardsArray[1].classList.remove('open');
   openCardsArray[1].classList.remove('show');
   openCardsArray[0].classList.add('match');
   openCardsArray[1].classList.add('match');
   openCards = 0;
   openCardsArray = [];
   if(numberOfMatches == NUMBER_OF_MATCHES){
       console.log('Congrats! You won! =)');
   }
 }

 function setNoMatch(){
   openCardsArray[0].classList.remove('open');
   openCardsArray[0].classList.remove('show');
   openCardsArray[1].classList.remove('open');
   openCardsArray[1].classList.remove('show');
   openCardsArray[0].classList.add('no-match');
   openCardsArray[1].classList.add('no-match');

   setTimeout(() => { hideCards()
   }, 1500);
 }

 function checkMatch(){
   if(openCardsArray[0].firstElementChild.className.includes(openCardsArray[1].firstElementChild.className)){
     setMatch();
   }
   else {
     setNoMatch();
   }
   updateMoves();
 }

 // Decide which action to take on card click
 function evaluateCard(card){
   if ((!(card.className.includes("open")) && !(card.className.includes("match")) && (openCards < 2))){
     openCards++;
     card.className += " open show";
     openCardsArray.push(card);
   }
   if(openCards == 2){
     checkMatch();
   }
 }

 deck.addEventListener('click', function(event) {
   if(event.target.nodeName == 'I'){
     evaluateCard(event.target.parentNode);
   }else if(event.target.nodeName == 'LI'){
     evaluateCard(event.target);
   }
 });
