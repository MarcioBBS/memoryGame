let startGame;
let endGame;
let flagTimer = 0;

//variable to increment the numbers of moves. 2 clicks (at different cards) means 1 move. 
let moveCounter = 0;

//variable to check if the all the cards match
let countMatch  = 0;

function init(){    
    const cardSymbol = createCardSymbol();
    const cardList =  createCard(cardSymbol);
    toggleCards(cardList);    
    document.querySelector('.restart').addEventListener('click', gameReset);
    document.querySelector('#try-again').addEventListener('click', gameReset);
}

init();

function gameReset() {
    document.querySelector('#winner-block').classList.add('score-display-none');
    document.querySelector('.moves').textContent = '0';    
    countMatch  = 0;
    moveCounter = 0;
    flagTimer = 0;
    startGame = 0;
    endGame = 0;
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
    
    if (points > 8 ) {
        document.querySelector('#star1').classList.add('remove-star');   
    }
    
    if (points > 16 ) {
        document.querySelector('#star2').classList.add('remove-star');
    }
    
    if (points > 20 ) {
        document.querySelector('#star3').classList.add('remove-star');
    }
}

function resetStar(){    
    document.querySelector('#star1').classList.remove('remove-star');
    document.querySelector('#star2').classList.remove('remove-star');    
    document.querySelector('#star3').classList.remove('remove-star');    
}

function resetMoves(){
    const moveIndicator = document.querySelector('.moves');
    moveIndicator.textContent = '0';
}

function getElementId(id){    
    return document.querySelector(id);
}

function winnerMessage(message){ 
    getElementId('#game-score').innerHTML = message;
    getElementId('#game-time').innerHTML = ' You time was: ' + (endGame-startGame)/1000 + ' Seconds.';
    getElementId('#winner-block').classList.remove('score-display-none');
}


function  setWinner(){  
    
    endGame = new Date();

    if (moveCounter === 8){
        winnerMessage(`You did excelente.`);        
    }
    
    if (moveCounter > 8 && moveCounter <= 15){
         winnerMessage(`You did good.`);
    }
    
    if (moveCounter => 16 && moveCounter <= 20){
        winnerMessage(`You did ok.`) ;      
    }
    
    if (moveCounter > 20){
        winnerMessage(`You could do it better.`);      
    }
           
}

function setGameTimer(){
    flagTimer++ ; 
        
    if (flagTimer === 1){
        startGame = new Date();
    }
}

//Toggle the cards 
function toggleCards(cards) {
    let card1, card2;
    let openCards = [];
    
     cards.addEventListener('click',function(evt){ 
        
        setGameTimer();
                
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
                        setWinner();                        
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
