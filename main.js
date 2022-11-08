let deckObject = [
    {   
       // name: 'ace',
        img: './img/oneSpiders.png',
        value: 1

    },
    {
       // name: 'ace',
        img: './img/oneGhost.png',
        value: 1
    },
    {
       // name: 'oneBat'
        img: './img/oneBats.png',
        value: 1
    },
    {
       // name: 'oneGhost
        img: './img/oneSkull.png',
        value: 1
    }
    ,
    {
        img: './img/twoSpiders.png',
        value: 2
    },
    {
        img: './img/twoGhost.png',
        value: 2
    },
    {
        img: './img/twoBats.png',
        value: 2
    },
    {
        img: './img/twoSkulls.png',
        value: 2
    },
    {
        img: './img/threeSpiders.png', 
        value: 3
    },
    {
        img: './img/threeGhost.png',
        value: 3
    },
    {
        img: './img/threeBats.png',
        value: 3
    },
    {
        img: './img/threeSkulls.png',
        value: 3
    },
    {
        img: './img/fourSpiders.png',
        value: 4
    },
    {
        img: './img/fourGhost.png',
        value: 4
    },
    {
        img: './img/fourBats.png',
        value: 4
    },
    {
        img: './img/fourSkulls.png',
        value: 4
    },
    {
        img: './img/fiveSpiders.png',
        value: 5
    },
    {
        img: './img/fiveGhost.png',
        value: 5
    },
    {
        img: './img/fiveBats.png',
        value: 5
    },
    {
        img: './img/fiveSkulls.png',
        value: 5
    },
    {
        img: './img/sixSpiders.png',
        value: 6
    },
    {
        img: './img/sixGhost.png',
        value: 6
    },
    {
        img: './img/sixBats.png',
        value: 6
    },
    {
        img: './img/sixSkulls.png',
        value: 6
    },
    {
        img: './img/sevenSpiders.png',
        value: 7
    },
    {
        img: './img/sevenGhost.png',
        value: 7
    },
    {
        img: './img/sevenBats.png',
        value: 7
    },
    {
        img: './img/sevenSkulls.png',
        value: 7
    },
    {
        img: './img/eightSpiders.png',
        value: 8
    },
    {
        img: './img/eightGhost.png',
        value: 8
    },
    {
        img: './img/eightBats.png',
        value: 8
    },
    {
        img: './img/eightSkulls.png',
        value: 8
    },
    {
        img: './img/nineSpiders.png',
        value: 9
    },
    {
        img: './img/nineGhost.png',
        value: 9
    },
    {
        img: './img/nineBats.png',
        value: 9
    },
    {
        img: './img/nineSkulls.png',
        value: 9
    },
    {
        img: './img/tenSpiders.png',
        value: 10
    },
    {
        img: './img/tenGhost.png',
        value: 10
    },
    {
        img: './img/tenBats.png',
        value: 10
    },
    {
        img: './img/tenSkulls.png',
        value: 10
    }
]

const player1CardContainer = document.getElementById('player1CardContainer');
const player2CardContainer = document.getElementById('player2CardContainer');
let hideGameContainer = document.getElementById('hideGameContainer');
let homeNavigation = document.getElementById('home-navigation');
let player2Btns = document.getElementById('player2Btns');
let player1Btns = document.getElementById('player1Btns');
let handDisplay = document.querySelectorAll('.handDisplay');

let winLoseMessage = document.getElementById('winLoseMessage');
let popUp = document.querySelector('#messagePopUp'); 
let player2 = false;


class Hand {
    constructor(playerDiv){
        this.handArray = [];
        this.playerDiv = playerDiv; 
    }

    //Generates a random number and assigns it to a variable. Pushes it into in array 
    deal(){
        const dealtCard = deckObject[Math.floor(Math.random()*deckObject.length)];
        this.handArray.push(dealtCard);
        this.flipCard(dealtCard.img)
        return this;
    }
    //Takes an argument and creates a div with a class "cards". sets the background image to the image of the card in the array.
    flipCard(img){
        let div = document.createElement('div');
        div.classList.add('cards');
        div.style.backgroundImage = `url('${img}')`;
        this.playerDiv.append(div);

    }

    getHand(){
        return this;
    }
    //Loops through the players hand and sums the value of the cards. *Update: Spread operator is more efficient*
    getSum(){
        let totalHandSum = 0;
        for(let i = 0; i < this.handArray.length; i++){
            totalHandSum += this.handArray[i].value;
        }
        if(!player2){
            handDisplay[0].textContent = `Player 1 Hand: ${totalHandSum}`
        }else{
            handDisplay[1].textContent = `Player 2 Hand: ${totalHandSum}`
        }
        this.check(totalHandSum);
        return totalHandSum;
    }
    //Checks the value of the sum and compares it to 21.
    check(totalHandSum){
        if(totalHandSum < 21){
            return this;
        }
        else if(totalHandSum == 21){
            popUpMessage('21!');
            return this;
        }
        else{
            popUpMessage("Busted");
            return this;
        }
    }
    //resets the hand array and removes the card divs
    getNewRound(){
        player2 = false;
        this.handArray = [];
        while (player1CardContainer.lastChild) {
            player1CardContainer.removeChild(player1CardContainer.lastChild);
        }
        while (player2CardContainer.lastChild) {
            player2CardContainer.removeChild(player2CardContainer.lastChild);
        }
        onStart();
    }
} 

//Working on making a single player version with a CPU opponent.
class Dealer extends Hand(){
    constructor(playerDiv){
        super(playerDiv)
        this.dealerDiv = playerDiv
    }

    dealerDeal(){
        return this.deal()
    }
    
}

//Initializes players hand class on page load
var player1Hand = new Hand(player1CardContainer);
var player2Hand = new Hand(player2CardContainer);

//Initializes player hands per round
function onStart(){
    player1Hand = new Hand(player1CardContainer);
    player2Hand = new Hand(player2CardContainer);
    player1Hand.deal().deal().getHand().getSum();
    player2Hand.deal().deal();

}

function hit(){
    if(!player2){
        player1Hand.deal().getHand().getSum();
    }
    else{
        player2Hand.deal().getHand().getSum();
    }
}

let dealerCounter = 0;

function hideHomepage(){    //1. This function runs when user clicks start on the homepage.
    player2Btns.style.visibility = 'hidden';
    homeNavigation.style.display = 'none';
    hideGameContainer.style.display = 'inline-block';
    onStart(); 
}

//Works as a modol.
function popUpMessage(message){
    popUp.style.display = 'block';
    player1Btns.style.visibility = 'hidden';
    player2Btns.style.visibility = 'hidden';
    winLoseMessage.innerText = message;
}

function compareHands(){
    player1Hand.getSum() > player2Hand.getSum() ? popUpMessage('Player 1 Wins!'): popUpMessage('Player 2 Wins!');
}

function player2Turn(){
    player2 = !player2;
    player2Hand.getSum();
    player1Btns.style.visibility = 'hidden';
    player2Btns.style.visibility = 'visible';
}

function playAgain(){
    player1Btns.style.visibility = 'visible';
    player2Btns.style.visibility = 'hidden';
    popUp.style.display = 'none';
    player1Hand.getNewRound();
    player2Hand.getNewRound();
}

function returnHome(){
    window.location.href = "index.html";
}
