const state = {
  view: {
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
  },
  values: {},
};

const removeEnemy = () =>
  state.view.squares.forEach((square) => square.classList.remove("enemy"));

const getRandomSquare = () => {
  const randomNumber = Math.floor(Math.random() * 9);
  return state.view.squares[randomNumber];
};

const addEnemy = () => {
  removeEnemy();
  const randomSquare = getRandomSquare();
  randomSquare.classList.add("enemy");
};

const main = () => {
  addEnemy();
};

main();
