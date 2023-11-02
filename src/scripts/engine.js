const selectedDifficulty = document.getElementById("difficulty-selector");

const state = {
  view: {
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
  },
  values: {
    timerId: null,
    velocityLevels: {
      easy: 2000,
      moderate: 1000,
      hard: 500,
      expert: 250,
    },
  },
};

const {
  view: { squares },
} = state;

const {
  values: { timerId },
} = state;

const {
  values: { velocityLevels },
} = state;

const removeEnemy = () =>
  squares.forEach((square) => square.classList.remove("enemy"));

const getRandomSquare = () => {
  const randomNumber = Math.floor(Math.random() * 9);
  return squares[randomNumber];
};

const addEnemy = () => {
  removeEnemy();

  const randomSquare = getRandomSquare();
  randomSquare.classList.add("enemy");
};

const moveEnemy = () => {
  clearInterval(timerId);
  timerId = setInterval(addEnemy, velocityLevels[selectedDifficulty.value]);
};

const init = () => {
  moveEnemy();
};

init();
