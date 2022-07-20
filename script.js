const gameContainer = document.getElementById('game');
const gameStart = document.getElementById('start-screen');
const startBtn = document.querySelector('.btn-start');
const resetBtn = document.querySelector('.btn-reset');
const resetContainer = document.getElementById('reset');
const body = document.querySelector('body');
const scoreDisplay = document.querySelector('.score-display');
const allCards = gameContainer.childNodes;
let matchedCards = [];
let twoCards = [];
let card1 = null;
let card2 = null;
let score = 0;

const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  const color = e.target.className;
  if (twoCards.length === 2) {
  } else {
    if (e.target.tagName === 'DIV') {
      e.target.style.backgroundColor = `${color}`;
      if (card1 === null && card2 === null) {
        card1 = {
          color: e.target.className,
          isMatched: false,
        };
        e.target.classList.add('clicked');
        twoCards.push(card1);
      } else {
        card2 = {
          color: e.target.className,
          isMatched: false,
        };
        e.target.classList.add('clicked');
        twoCards.push(card2);
      }
    }
  }
  if (card1.color === card2.color) {
    card1.isMatched = true;
    card2.isMatched = true;
    matchedCards.push(card1, card2);
    twoCards = [];
    score++;
    scoreDisplay.firstElementChild.innerText = ` ${score}`;
    card1 = null;
    card2 = null;
  } else {
    setTimeout(function () {
      for (let card of allCards) {
        if (
          (card.classList.contains('clicked') &&
            card.classList.contains(card1.color)) ||
          card.classList.contains(card2.color)
        ) {
          card.style.backgroundColor = '';
          card.classList.remove('clicked');
        }
      }
      twoCards = [];
      card1 = null;
      card2 = null;
    }, 1000);
  }
}

body.addEventListener('click', function (e) {
  if (matchedCards.length === 10) {
    party.confetti(body, {
      count: party.variation.range(40, 60),
    });
    party.confetti(this);
    matchedCards = [];
    resetContainer.style.display = '';
  }
});

startBtn.addEventListener('click', function () {
  scoreDisplay.style.display = '';
  gameContainer.style.display = '';
  gameStart.style.display = 'none';
});

resetBtn.addEventListener('click', function () {
  score = 0;
  scoreDisplay.firstElementChild.innerText = ' 0';
  shuffle(COLORS);
  for (let card of allCards) {
    card.style.display = 'none';
  }
  createDivsForColors(shuffledColors);
});

function startGame() {
  gameContainer.style.display = 'none';
  resetContainer.style.display = 'none';
  scoreDisplay.style.display = 'none';
}

// when the DOM loads
startGame();
createDivsForColors(shuffledColors);
