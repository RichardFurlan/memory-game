const FRONT = "card_front";
const BACK = "card_back"
const CARD = "card";
const ICON = "icon";
const FLIP = "flip";

let hudTimer = document.getElementById("timePassed");
let hudMoves = document.getElementById("numberActions");

let finalTime = document.getElementsByClassName("endTimer")[0];
let finalMoves = document.getElementsByClassName("endMoves")[0];;
let gameOverScreen = document.getElementById("gameOver");



let madeAMove = false;

let moves
let timer

let seconds
let minutes
let hours

startGame()

function startGame() {

    hudTimer.innerHTML = "00:00:00";
    hudMoves.innerHTML = "0";
    madeAMove = false ;   
    seconds = 0;
    minutes = 0;
    hours = 0;
    moves = 0;

    initializeCards(game.createCardsFromTechs());
}

function CountTime() {

    seconds = parseInt(seconds);
    minutes = parseInt(minutes);
    hours = parseInt(hours);

    seconds++;

    if (seconds >= 60){
        seconds = 0;
        minutes += 1;
    };
    if (minutes >= 60) {
        minutes = 0;
        hours += 1;
    }
    if(seconds < 10){
        seconds = "0" + seconds
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }

    hudTimer.innerHTML = hours + ":" + minutes + ":" + seconds;

}



function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard")

    gameBoard.innerHTML = '';

    game.cards.forEach(card => {

        let cardElement = document.createElement('div')
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard) 
        gameBoard.appendChild(cardElement);


    })
}


function createCardContent(card, cardElement){

    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}


function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement)
    }else{
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace)
}







function flipCard(){

    if (!madeAMove) {
        timer = setInterval(CountTime, 1000),
        madeAMove = true
    }


    if (game.setCard(this.id)) {

         this.classList.add(FLIP)

        if(game.secondCard) {
        
            updadeMoveUI()

        if (game.checkMatch()){

            game.clearCards();

            if (game.checkGameOver()) {
                setTimeout(() => {

                clearInterval(timer);

                finalTime.innerHTML = "Seu tempo total foi: " + hudTimer.innerHTML + ".";
                finalMoves.innerHTML = "Você precisou de: " + moves + " movimentos para vencer."
                gameOverScreen.style.display = 'flex'
                }, 200)
            };
        }else{
            setTimeout (() =>{
            let firstCardView = document.getElementById(game.firstCard.id);
            let seconCardView = document.getElementById(game.secondCard.id);


            firstCardView.classList.remove(FLIP);
            seconCardView.classList.remove(FLIP);
            game.unflipCards();
            }, 800)

            };
        }

    }

};

function updadeMoveUI(){
    moves++;
    hudMoves.innerHTML = moves;
}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none'
}