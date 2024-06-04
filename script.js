const images = [
    "kuva1.png", "kuva2.png", "kuva3.png", "kuva4.png",
    "kuva5.png", "kuva6.png", "kuva7.png", "kuva8.png",
    "kuva9.png",
];

const audioFiles = {
    "kuva1.png": "kuva1.mp3",
    "kuva2.png": "kuva2.mp3",
    "kuva3.png": "kuva3.mp3",
    "kuva4.png": "kuva4.mp3",
    "kuva5.png": "kuva5.mp3",
    "kuva6.png": "kuva6.mp3",
    "kuva7.png": "kuva7.mp3",
    "kuva8.png": "kuva8.mp3",
    "kuva9.png": "kuva9.mp3",
};

let selectedImages = [];
let gameBoard = document.getElementById('game-board');
let restartButton = document.getElementById('restart-button');
let congratulationsText = document.getElementById('congratulations');
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    // Tyhjennä pelilauta
    gameBoard.innerHTML = '';
    congratulationsText.style.display = 'none';
    matchedPairs = 0;
    restartButton.style.display = 'none';

    // Satunnaisesti valitaan 8 paria (16 kuvaa) 12 mahdollisesta kuvasta
    selectedImages = shuffle(images).slice(0, 6);
    selectedImages = shuffle([...selectedImages, ...selectedImages]);

    selectedImages.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const img = document.createElement('img');
        img.src = image;
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    playSound(this.dataset.image);

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;
    if (matchedPairs === 6) {
        setTimeout(() => {
            congratulationsText.style.display = 'block';
            restartButton.style.display = 'block';
        }, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function playSound(image) {
    let audio = new Audio(audioFiles[image]);
    audio.play();
}

function restartGame() {
    createBoard();
}

createBoard();