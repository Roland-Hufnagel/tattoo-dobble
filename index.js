import { getRandomDeck, getRandomTemplate } from "./data.js";

// --- DOM Nodes ---
const roundsContainer = document.getElementById("rounds-container");
const teamA = document.querySelector(".teamA");
const teamB = document.querySelector(".teamB");
const field = document.querySelector(".field");
const overview = document.querySelector(".overview");
const output = document.querySelector(".output");
const startButton = document.getElementById("training");

// --- EventListener ---

startButton.addEventListener("click", () => {
  startTrainingGame();
});

// --- States ---

const roundValues = [1, 5, 10, 15, 20, 25];
let buttonA = null;
let buttonB = null;
let points = 0;
let rounds = 1; // default value should be 5
const deck = getRandomDeck();
const performanceMarks = [];

// --- Prepare Settings ---
roundValues.forEach((value, index) => {
  const button = document.createElement("button");
  button.classList.add("round-button");
  if (index === 0) {
    button.classList.add("round-button--active");
  }
  button.textContent = value;
  button.addEventListener("click", (event) => {
    removeActive();
    event.target.classList.add("round-button--active");
    rounds = value;
  });
  roundsContainer.append(button);
});

function removeActive() {
  const roundButtons = document.querySelectorAll(".round-button");
  roundButtons.forEach((button) =>
    button.classList.remove("round-button--active")
  );
}

// --- Start Training ---

function startTrainingGame() {
  // Reset
  buttonA = null;
  buttonB = null;
  field.classList.remove("hidden");
  overview.classList.add("hidden");
  field.style.opacity = 1;
  field.style.backgroundColor = "white";
  output.textContent = "0";
  performance.mark("start");
  newCards();
}

// --- New Cards ---

function newCards() {
  if (deck.length >= 2) {
    teamA.innerHTML = "";
    const template1 = getRandomTemplate();
    deck.pop().forEach((id, index) => {
      const button = createPlayButton(id, index, template1);
      button.addEventListener("click", checkItemA);
      teamA.append(button);
    });

    teamB.innerHTML = "";
    const template2 = getRandomTemplate();
    deck.pop().forEach((id, index) => {
      const button = createPlayButton(id, index, template2);
      button.addEventListener("click", checkItemB);
      teamB.append(button);
    });
  } else {
    endGame();
  }
}

function createPlayButton(id, index, template) {
  const button = document.createElement("button");
  button.style.backgroundImage = `url('./public/images/img${id}.png')`;
  button.classList.add("play-button");
  button.style.height = template[index].size;
  button.style.width = template[index].size;
  button.style.top = template[index].y;
  button.style.left = template[index].x;
  button.dataset.id = id;
  return button;
}

// --- control functions ---

function checkItemA(event) {
  playSound("/public/sounds/tick.flac");
  buttonA?.classList.remove("active");
  buttonA = event.target;
  buttonA.classList.add("active");
  console.log(buttonA?.dataset.id + " - " + buttonB?.dataset.id);
  checkMatch();
}

function checkItemB(event) {
  playSound("/public/sounds/tick.flac");
  buttonB?.classList.remove("active");
  buttonB = event.target;
  buttonB.classList.add("active");
  console.log(buttonA?.dataset.id + " - " + buttonB?.dataset.id);
  checkMatch();
}

function checkMatch() {
  if (buttonA && buttonB) {
    // Match YES:
    if (buttonA?.dataset.id === buttonB?.dataset.id) {
      playSound("/public/sounds/yes.wav");
      field.style.backgroundColor = "black";
      points++;

      if (points >= rounds) {
        endGame();
        return;
      }
      field.style.opacity = 0;
      setTimeout(() => {
        newCards();
        output.textContent = `${points}`;
        field.style.backgroundColor = "white";
        field.style.opacity = 1;
      }, 300);
      // Natch NO:
    } else {
      playSound("/public/sounds/no.ogg");
    }
    setTimeout(clearSelection, 500);
  }
}

function clearSelection() {
  buttonA?.classList.remove("active");
  buttonB?.classList.remove("active");
  buttonA = null;
  buttonB = null;
}

// --- End Game ---

function endGame() {
  console.log("GAME OVER");
  snowConfetti();
  output.textContent = `YOU WIN!`;
  field.classList.add("fadeout");
  setTimeout(() => {
    field.classList.add("hidden");
    overview.classList.remove("hidden");
  }, 4000);
}

// --- Audio ---

function playSound(file) {
  const audio = new Audio(file);
  audio.play();
}
// --- Confetti  from CDN ---
function snowConfetti() {
  const end = Date.now() + 1 * 1000; // Dauer: 1 Sekunde

  (function frame() {
    // zufällige Konfettischüsse von links & rechts
    confetti({
      particleCount: 5,
      angle: -20,
      spread: 55,
      origin: { x: 0, y: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 200,
      spread: 55,
      origin: { x: 1, y: 0 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
