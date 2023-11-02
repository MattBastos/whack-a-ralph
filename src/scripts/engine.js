const selectedDifficulty = document.getElementById("difficulty-selector");

const state = {
  view: {
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
  },
  values: {
    currentTime: 60,
    countDownTimerId: null,
    timerId: null,
    points: 0,
    hitPosition: 0,
    velocityLevels: {
      easy: 2000,
      moderate: 1000,
      hard: 500,
      expert: 250,
    },
  },
};

let {
  view: { timeLeft },
} = state;

let {
  view: { score },
} = state;

const {
  view: { squares },
} = state;

let {
  values: { currentTime },
} = state;

let {
  values: { countDownTimerId },
} = state;

let {
  values: { timerId },
} = state;

let {
  values: { points },
} = state;

let {
  values: { hitPosition },
} = state;

const {
  values: { velocityLevels },
} = state;

const countDownGameTime = () => {
  clearInterval(countDownTimerId);

  countDownTimerId = setInterval(() => {
    currentTime -= 1;
    timeLeft.textContent = `Tempo Restante:${currentTime}`;

    if (currentTime < 0) {
      clearInterval(countDownTimerId);
      clearInterval(timerId);

      alert(`Game Over! O resultado foi: ${points}`);
    }
  }, 1000);
};

const removeEnemy = () =>
  squares.forEach((square) => square.classList.remove("enemy"));

const getRandomSquare = () => {
  removeEnemy();

  let randomNumber = Math.floor(Math.random() * 9);
  return squares[randomNumber];
};

const addEnemy = () => {
  removeEnemy();

  let randomSquare = getRandomSquare();
  randomSquare.classList.add("enemy");
  hitPosition = randomSquare.id;
};

const moveEnemy = () => {
  clearInterval(timerId);

  timerId = setInterval(addEnemy, velocityLevels[selectedDifficulty.value]);
};

const playSoundtrack = (soundtrack) => {
  let audio = new Audio(`./src/audios/${soundtrack}.m4a`);

  audio.volume = 0.2;
  audio.play();
};

const hitEnemy = (square) => {
  if (square.id === hitPosition) {
    points += 1;
    playSoundtrack("hit");
    removeEnemy();
  } else if (square.id !== hitPosition && points > 0) {
    points -= 1;
  }

  score.textContent = `Sua Pontuação:${points}`;
  hitPosition = null;
};

const addListenerHitBox = () => {
  squares.forEach((square) =>
    square.addEventListener("mousedown", () => hitEnemy(square))
  );
};

const init = () => {
  moveEnemy();
  addListenerHitBox();
  countDownGameTime();
};

init();
