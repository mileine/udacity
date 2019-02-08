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
  let deck = document.querySelector(".deck");
  for (var i = 0; i < cardsArray.length; i++){
    console.log("newcard["+i+"]");
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
