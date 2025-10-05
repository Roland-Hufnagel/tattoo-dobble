import { getRandomDeck, getRandomTemplate } from "./data.js";
import {
  playClickSound,
  playWrongSound,
  playMatchSound,
  unlockAudioContext,
  preloadSound,
  playSound,
} from "./audio.js";
import { preloadImages } from "./images.js";

// --- Preloads ---
preloadImages().then(() => {
  console.log("Alle Bilder vorgeladen!");
});
preloadSound("winSound", "./public/sounds/yes.wav");

// --- DOM Nodes ---
const roundsContainer = document.getElementById("rounds-container");
const teamA = document.querySelector(".teamA");
const teamB = document.querySelector(".teamB");
const field = document.querySelector(".field");
const overview = document.querySelector(".overview");
const output = document.querySelector(".output");
const startButton = document.getElementById("training");
const stats = document.querySelector(".stats");
const fastestRound = document.getElementById("fastest");
const slowestRound = document.getElementById("slowest");
const averageRound = document.getElementById("average");

// --- EventListener ---
startButton.addEventListener("click", async () => {
  startTrainingGame();
  await unlockAudioContext();
});

// --- States ---
const roundValues = [1, 3, 10, 15, 20, 25];
let buttonA = null;
let buttonB = null;
let points = 0;
let rounds = 1; // default value should be 5
const deck = getRandomDeck();
let performanceMarks = [];
let theme = "dogs"; // default theme

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
  performance.mark("lap-0");
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
  button.style.backgroundImage = `url('./public/images/${theme}/img${id}.png')`;
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
  buttonA?.classList.remove("active");
  buttonA = event.target;
  buttonA.classList.add("active");
  checkMatch();
}

function checkItemB(event) {
  buttonB?.classList.remove("active");
  buttonB = event.target;
  buttonB.classList.add("active");
  checkMatch();
}

function checkMatch() {
  if (buttonA && buttonB) {
    // Match YES:
    if (buttonA?.dataset.id === buttonB?.dataset.id) {
      field.style.backgroundColor = "black";
      points++;
      performance.mark(`lap-${points}`);
      const p = performance.measure(
        "match duration",
        `lap-${points - 1}`,
        `lap-${points}`
      );
      performanceMarks.push(p);
      if (points >= rounds) {
        endGame();
        return;
      }
      playMatchSound();
      field.style.opacity = 0;
      setTimeout(() => {
        newCards();
        output.textContent = `${points}`;
        field.style.backgroundColor = "white";
        field.style.opacity = 1;
      }, 300);
      setTimeout(clearSelection, 500);
      return;
      // Natch NO:
    } else {
      playWrongSound();
      setTimeout(clearSelection, 500);
      return;
    }
  } else {
    playClickSound();
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
  playSound("winSound");
  snowConfetti();
  output.textContent = `YOU WIN!`;
  stats.classList.remove("hidden");
  setTimeout(() => {
    field.classList.add("hidden");
    overview.classList.remove("hidden");
  }, 3500);
  points = 0;
  calculateStats();
  performanceMarks = [];
}

function calculateStats() {
  const sortedMarks = performanceMarks.toSorted((a, b) => {
    return a.duration - b.duration;
  });
  fastestRound.textContent = `${formatSeconds(sortedMarks[0].duration)} sec.`;
  slowestRound.textContent = `${formatSeconds(
    sortedMarks[sortedMarks.length - 1].duration
  )} sec.`;
  averageRound.textContent = `${formatSeconds(
    sortedMarks.reduce((a, b) => {
      return a + b.duration;
    }, 0) / sortedMarks.length
  )} sec.`;
}

// --- Helper Functions ---
function formatSeconds(value) {
  return (value / 1000).toLocaleString("de-DE", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

// --- Audio ---
// function playSound(sound) {
//   sound.currentTime = 0;
//   sound.play();
// }
// function playSound(name) {
//   const source = audioCtx.createBufferSource();
//   source.buffer = soundBuffers[name];
//   source.connect(audioCtx.destination);
//   source.start();
// }

// --- Confetti  from CDN ---
function snowConfetti() {
  const end = Date.now() + 1 * 700; // Dauer: 0.7 Sekunde

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
