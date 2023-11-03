const state = {
  view: {
    timeLeft: document.querySelector("#time-left"),
    hitPoints: document.querySelector("#hits"),
    missPoints: document.querySelector("#misses"),
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    modal: document.getElementById("modal"),
    modalHits: document.getElementById("modal-hits"),
    modalMisses: document.getElementById("modal-misses"),
    modalResult: document.getElementById("modal-result"),
    restartBtn: document.getElementById("restart-btn"),
    startBtn: document.getElementById("start-btn"),
  },
  values: {
    currentTime: 5,
    countDownTimerId: null,
    timerId: null,
    hits: 0,
    misses: 0,
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

const removeEnemy = () =>
  view.squares.forEach((square) => square.classList.remove("enemy"));

const playSoundtrack = (soundtrack) => {
  let audio = new Audio(`./src/audios/${soundtrack}`);

  audio.volume = 0.2;
  audio.play();
};

const playResultSoundtrack = () => {
  const gameResult = values.hits - values.misses;

  if (gameResult > 0) {
    playSoundtrack("victory.mp3");
    playSoundtrack("victory-cry.wav");
  } else {
    playSoundtrack("defeat.wav");
  }
};

const showGameResult = () => {
  view.modalHits.textContent = values.hits;
  view.modalMisses.textContent = values.misses;
  view.modalResult.textContent = values.hits - values.misses;

  values.hits - values.misses > 0
    ? (view.modalResult.style.color = "#008000")
    : (view.modalResult.style.color = "#ff0000");

  view.modal.style.display = "flex";

  playResultSoundtrack();
};

const resetGameResult = () => location.reload();

const countDownGameTime = () => {
  clearInterval(values.countDownTimerId);

  values.countDownTimerId = setInterval(() => {
    values.currentTime -= 1;
    view.timeLeft.textContent = `Tempo Restante:${values.currentTime}`;

    if (values.currentTime === 0) {
      clearInterval(values.countDownTimerId);
      clearInterval(values.timerId);

      view.timeLeft.textContent = `Tempo Restante:0`;
      values.hitPosition = 0;
      removeEnemy();
      showGameResult();
    }
  }, 1000);
};

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

  values.timerId = setInterval(addEnemy, values.velocityLevels.hard);
};

const hitEnemy = () => {
  values.hits += 1;
  playSoundtrack("hit.wav");
  removeEnemy();
};

const missEnemy = () => {
  values.misses += 1;
  playSoundtrack("miss.ogg");
  removeEnemy();
};

const hit = (square) => {
  square.id === values.hitPosition ? hitEnemy() : missEnemy();

  view.hitPoints.textContent = `Acertos:${values.hits}`;
  view.missPoints.textContent = `Erros:${values.misses}`;
  values.hitPosition = null;
};

const addListenerHitBox = () => {
  view.squares.forEach((square) =>
    square.addEventListener("mousedown", () => hit(square))
  );
};

const init = () => {
  moveEnemy();
  addListenerHitBox();
  countDownGameTime();
};

view.startBtn.addEventListener("click", init);

view.restartBtn.addEventListener("click", resetGameResult);
