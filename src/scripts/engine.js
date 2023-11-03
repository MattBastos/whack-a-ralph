const selectedDifficulty = document.getElementById("difficulty-selector");

const state = {
  view: {
    timeLeft: document.querySelector("#time-left"),
    hitPoints: document.querySelector("#hits"),
    missPoints: document.querySelector("#misses"),
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
  },
  values: {
    currentTime: 10,
    countDownTimerId: null,
    timerId: null,
    hits: 0,
    misses: 0,
    result: 0,
    hitPosition: 0,
    velocityLevels: {
      easy: 2000,
      moderate: 1000,
      hard: 500,
      expert: 250,
    },
  },
};

const { view, values } = state;

const showGameResult = () =>
  alert(
    `Game Over! Acertos: ${values.hits} | Erros: ${
      values.misses
    } | Resultado: ${values.hits - values.misses}`
  );

const countDownGameTime = () => {
  clearInterval(values.countDownTimerId);

  values.countDownTimerId = setInterval(() => {
    values.currentTime -= 1;
    view.timeLeft.textContent = `Tempo Restante:${values.currentTime}`;

    if (values.currentTime <= 0) {
      clearInterval(values.countDownTimerId);
      clearInterval(values.timerId);

      showGameResult();
    }
  }, 1000);
};

const removeEnemy = () =>
  view.squares.forEach((square) => square.classList.remove("enemy"));

const getRandomSquare = () => {
  removeEnemy();

  let randomNumber = Math.floor(Math.random() * 9);
  return view.squares[randomNumber];
};

const addEnemy = () => {
  removeEnemy();

  let randomSquare = getRandomSquare();
  randomSquare.classList.add("enemy");
  values.hitPosition = randomSquare.id;
};

const moveEnemy = () => {
  clearInterval(values.timerId);

  values.timerId = setInterval(
    addEnemy,
    values.velocityLevels[selectedDifficulty.value]
  );
};

const playSoundtrack = (soundtrack) => {
  let audio = new Audio(`./src/audios/${soundtrack}.m4a`);

  audio.volume = 0.2;
  audio.play();
};

const hitEnemy = (square) => {
  if (square.id === values.hitPosition) {
    values.hits += 1;
    playSoundtrack("hit");
    removeEnemy();
  } else if (square.id !== values.hitPosition) {
    values.misses += 1;
  }

  view.hitPoints.textContent = `Sua Pontuação:${values.hits}`;
  view.missPoints.textContent = `Sua Pontuação:${values.misses}`;
  values.hitPosition = null;
};

const addListenerHitBox = () => {
  view.squares.forEach((square) =>
    square.addEventListener("mousedown", () => hitEnemy(square))
  );
};

const init = () => {
  moveEnemy();
  addListenerHitBox();
  countDownGameTime();
};

init();
