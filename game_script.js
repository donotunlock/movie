const cardsArray = [
    { name: 'card1', img: 'images/card1.png' },
    { name: 'card2', img: 'images/card2.png' },
    { name: 'card3', img: 'images/card3.png' },
    { name: 'card4', img: 'images/card4.png' },
    { name: 'card5', img: 'images/card5.png' },
    { name: 'card6', img: 'images/card6.png' },
    { name: 'card7', img: 'images/card7.png' },
    { name: 'card8', img: 'images/card8.png' },
];

const gameBoard = document.getElementById('gameBoard');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

function createBoard() {
    const doubledCardsArray = cardsArray.concat(cardsArray);
    doubledCardsArray.sort(() => 0.5 - Math.random());

    for (let i = 0; i < doubledCardsArray.length; i++) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        const cardImg = document.createElement('img');
        cardImg.setAttribute('src', doubledCardsArray[i].img);
        cardImg.setAttribute('alt', doubledCardsArray[i].name);
        card.appendChild(cardImg);
        gameBoard.appendChild(card);
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardsArray[cardId % cardsArray.length].name);
    cardsChosenId.push(cardId);
    this.classList.add('flipped');
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstId, secondId] = cardsChosenId;
    if (cardsChosen[0] === cardsChosen[1] && firstId !== secondId) {
        cards[firstId].removeEventListener('click', flipCard);
        cards[secondId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    } else {
        cards[firstId].classList.remove('flipped');
        cards[secondId].classList.remove('flipped');
    }
    cardsChosen = [];
    cardsChosenId = [];
    if (cardsWon.length === cardsArray.length) {
        alert('Congratulations! You found all the matches!');
    }
}

createBoard();
