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

    deal(){
        const dealtCard = deckObject[Math.floor(Math.random()*deckObject.length)];
        this.handArray.push(dealtCard);
        this.flipCard(dealtCard.img)
        return this;
    }
    
    flipCard(img){
        let div = document.createElement('div');
        div.classList.add('cards');
        div.style.backgroundImage = `url('${img}')`;
        this.playerDiv.append(div);

    }
   
    getHand(){
        console.log('Player Hand', this.handArray);
        return this;
    }

    getSum(){
        let totalHandSum = 0;
        for(let i = 0; i < this.handArray.length; i++){
            totalHandSum += this.handArray[i].value;
        }
        // for(let i = 0; i < handDisplay.length; i++){
        //     handDisplay[i].textContent = `Your Hand: ${totalHandSum}`
        // }
        if(!player2){
            handDisplay[0].textContent = `Player 1 Hand: ${totalHandSum}`
        }else{
            handDisplay[1].textContent = `Player 2 Hand: ${totalHandSum}`
        }

        console.log('hand display', handDisplay)
        this.check(totalHandSum);
        return totalHandSum;
    }

    check(totalHandSum){
        if(totalHandSum < 21){
            console.log('keep going!');
            return this;
        }
        else if(totalHandSum == 21){
            popUpMessage('21!');
            return this;
        }
        else{
            popUpMessage('Busted!');
            return this;
        }
    }

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
        console.log('-------New Round-------');
    }
} 
var player1Hand = new Hand(player1CardContainer);
var player2Hand = new Hand(player2CardContainer);


function onStart(){
    player1Hand = new Hand(player1CardContainer);
    player2Hand = new Hand(player2CardContainer);
    console.log('--------Start Game--------')
    player1Hand.deal().deal().getHand().getSum();
    player2Hand.deal().deal();

}

function hit(){
    console.log('------------Hit-------------')
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

function popUpMessage(message){
    popUp.style.display = 'block';
    player1Btns.style.visibility = 'hidden';
    player2Btns.style.visibility = 'hidden';
    winLoseMessage.innerText = message;
}

function compareHands(){
    console.log('Hand1', player1Hand.getSum());
    console.log('Hand2', player2Hand.getSum());
    player1Hand.getSum() > player2Hand.getSum() ? popUpMessage('Player 1 Wins!'): popUpMessage('Player 2 Wins!');

}

function player2Turn(){
    player2 = !player2;
    player2Hand.getSum();
    console.log('--------Player 2 turn-------');
    player1Btns.style.visibility = 'hidden';
    player2Btns.style.visibility = 'visible';
}

function playAgain(){
    // player2Turn = false;
    // this.handArray = [];
    player1Btns.style.visibility = 'visible';
    player2Btns.style.visibility = 'hidden';
    popUp.style.display = 'none';
    console.log('i got Clicked')
    player1Hand.getNewRound();
    player2Hand.getNewRound();
}

function returnHome(){
    window.location.href = "index.html";
}
//Working on the hit stay buttons functionality. add compareHands();
//need to make popUp buttons reset the game.
//style the pop up message.