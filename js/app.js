// Create a list of font-awesome to be inserted in the cards
const cardClasses = ['fa-diamond','fa-paper-plane-o','fa-anchor',
            'fa-bolt', 'fa-cube', 'fa-anchor',
            'fa-leaf', 'fa-bicycle', 'fa-diamond',
            'fa-bomb', 'fa-leaf', 'fa-bomb',
            'fa-bolt','fa-bicycle','fa-paper-plane-o',
            'fa-cube'];

//Create a list of cards
function createCard(cardClass){
    const cardShuffled = shuffle(cardClass);
    let deck = document.querySelector('.deck'); 
    let cardList = [];
    
    //Generate the cards
    cardShuffled.forEach(function(item){
        cardList.push(`<li class="card"><i class="fa ${item}"></i></li>`);
        deck.innerHTML = cardList.join('');            
    });    
    
    return deck;    
}

//Flip the cards 
function flipCards(cards) {
    let flippedCards = [];    
    let click = 1;
    cards.addEventListener('click',function(evt){
                
        if (evt.target.nodeName === 'LI' && click <= 2){
            evt.target.classList.add('open','show');           
            flippedCards[click] = evt.target;
            click++;            
        }       
    });
    
    return flippedCards;
}

function checkMatch(flippedCards){
    console.log(flippedCards);
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


const cards =  createCard(cardClasses);
let flipped = flipCards(cards);

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

