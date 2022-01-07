const cards = document.querySelectorAll('.card');
const countdown = document.querySelector('.count');
const timer = document.querySelector('.score');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let pair = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        pair++;
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function start() {
    setTimeout(() => {
        countdown.style.visibility = 'visible';
    }, 1000);

    setTimeout(() => {
        countdown.style.backgroundPosition = `${-270}px ${-3}px`;
    }, 2000);

    setTimeout(() => {
        countdown.style.backgroundPosition = `${-3}px ${-3}px`;
    }, 3000);

    setTimeout(() => {
        countdown.style.backgroundPosition = null;
        countdown.classList.add('go');
        setTimeout(() => {
            countdown.style.visibility = null;
            lockBoard = false;
            startTimer();
        }, 500);
    }, 4000);
}

function startTimer() {
    let score = 0;
    let scoreCount = setInterval(() => {
        if (pair == 6) {
            clearInterval(scoreCount);
            setInterval(() => {
                timer.classList.toggle('finish');
            }, 250);
        }
        else {
            score++;
            timer.textContent = `Tempo: ${(score / 100).toFixed(2)}s`;
        }
    }, 10);
}

(function shuffleAndStart() {
    lockBoard = true;

    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);

        card.style.order = randomPosition;
    })

    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.add('flip');
        })

        setTimeout(() => {
            cards.forEach((card) => {
                card.classList.remove('flip');
            })

            start();
        }, 2000);
    }, 1000);
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});