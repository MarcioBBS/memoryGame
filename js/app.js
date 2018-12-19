let moveCounter = 0;
let countMatch  = 0;
const resetButtom = document.querySelector('.restart');
resetButtom.addEventListener('click', gameReset);

function init(){
    const cardSymbol = createCardSymbol();
    const cardList =  createCard(cardSymbol);
    toggleCards(cardList);
}

init();

function gameReset() {
    document.querySelector('.moves').textContent = '0';    
    moveCounter = 0;
    resetStar();
    init();
}

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
    
    return deck;    
}


function displayMoves(counter) {
    let moveIndicator = document.querySelector('.moves');
    moveIndicator.textContent = counter;
    
    return counter;
}

function scoreStar(points) {
    
    if (points >= 8 ) {
        document.querySelector('#star1').classList.add('remove-star');   
    }
    
    if (points >= 16 ) {
        document.querySelector('#star2').classList.add('remove-star');
    }
    
    if (points >= 24 ) {
        gameReset();
    }
}

function resetStar(){    
    document.querySelector(' #star1').classList.remove('remove-star');
    document.querySelector('#star2').classList.remove('remove-star');    
}

function resetMoves(){
    const moveIndicator = document.querySelector('.moves');
    moveIndicator.textContent = '0';
}

//Toggle the cards 
function toggleCards(cards) {
    let card1, card2;
    let openCards = [];
    
        cards.addEventListener('click',function(evt){              
                
        if (evt.target.nodeName === 'LI' && openCards.length <= 1 && !evt.target.classList.contains('open','show')) {
            evt.target.classList.add('open','show');           
            openCards.push(evt.target);
            
            if (openCards.length === 2) {
                card1 = openCards[0].dataset.card;
                card2 = openCards[1].dataset.card;
                moveCounter++;
                
                if (compareCards(card1, card2)) {
                    openCards[0].classList.add('match');
                    openCards[1].classList.add('match');                     
                    
                    if (countMatch === 8) {
                        //cover the panel deck or create a background container with the results. 
                        document.querySelector('.deck').classList.add('deck-panel');
                    }
                    
                } else {                         
                         card1 = openCards[0];
                         card2 = openCards[1];
                         setTimeout(() => {                                                        
                            card1.classList.remove('open', 'show');
                            card2.classList.remove('open', 'show');                     
                         }, 880);                       
                    }
                //reset the list of open cards
                openCards = [];                
            }
        }   
       scoreStar(displayMoves(moveCounter));
    });    
}

//Compare the symbol of the flipped cards
function compareCards(card1,card2){    
    if (card1 === card2){
        countMatch++;
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
