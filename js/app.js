function init(){
    const cardSymbol = createCardSymbol();
    const cardList =  createCard(cardSymbol);
    toggleCards(cardList);
}

init();

// Create a list of font-awesome to be inserted in the cards
function createCardSymbol() {
    const cardClasses = ['fa-diamond','fa-paper-plane-o','fa-anchor',
            'fa-bolt', 'fa-cube', 'fa-anchor',
            'fa-leaf', 'fa-bicycle', 'fa-diamond',
            'fa-bomb', 'fa-leaf', 'fa-bomb',
            'fa-bolt','fa-bicycle','fa-paper-plane-o',
            'fa-cube'];
    
    return cardClasses;
}

//Create a list of cards
function createCard(cardClass){
    const cardShuffled = shuffle(cardClass);
    let deck = document.querySelector('.deck'); 
    let cardList = [];
    
    //Generate the cards
    cardShuffled.forEach(function(item){
        cardList.push(`<li class="card" data-card="${item}"><i class="fa ${item}"></i></li>`);
        deck.innerHTML = cardList.join('');
    });    
    
    //return only the List of LI's
    return deck;    
}


//Toggle the cards 
function toggleCards(cards) {
    let flippedCards = [];    
    let isAMatch;
    cards.addEventListener('click',function(evt){
                
        if (evt.target.nodeName === 'LI' && flippedCards.length <= 1){
            evt.target.classList.add('open','show');           
            flippedCards.push(evt.target);
            
            if (flippedCards.length === 2) {
                let card1 = flippedCards[0].dataset.card;
                let card2 = flippedCards[1].dataset.card;
                isAMatch = compareCards(card1, card2);                
                
                if (isAMatch) {
                    flippedCards[0].classList.add('match');
                    flippedCards[1].classList.add('match');
                } else {
                    flippedCards[0].classList.remove('open', 'show');
                    flippedCards[1].classList.remove('open', 'show');
                  }
                
                flippedCards = [];
            }
        }   
       
    });    
}


//Compare the symbol of the flipped cards
function compareCards(card1,card2){    
    if (card1 === card2){
        return true;
    } else{
        return false;
      }
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

