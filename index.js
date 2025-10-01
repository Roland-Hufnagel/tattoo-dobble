import { getRandomDeck } from "./data.js";
import { playCorrect, playWrong } from "./audio.js";
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const header = document.querySelector(".header");
const cards = document.querySelectorAll(".card");

let buttonA = null;
let buttonB = null;

const img1 = document.createElement("img");
img1.src = "/public/img1.png";
img1.classList.add("image");

const img2 = document.createElement("img");
img2.src = "/public/img2.png";
img2.classList.add("image");

const aButtons = document.querySelectorAll(".a");
aButtons.forEach((btn) => {
  btn.addEventListener("click", checkItemA);
});
const bButtons = document.querySelectorAll(".b");
bButtons.forEach((btn) => {
  btn.addEventListener("click", checkItemB);
});
function checkItemA(event) {
  buttonA?.classList.remove("active");
  buttonA = event.target;
  buttonA.classList.add("active");
  console.log(buttonA?.dataset.id + " - " + buttonB?.dataset.id);
  checkWin();
}
function checkItemB(event) {
  buttonB?.classList.remove("active");
  buttonB = event.target;
  buttonB.classList.add("active");
  console.log(buttonA?.dataset.id + " - " + buttonB?.dataset.id);
  checkWin();
}
function checkWin() {
  if (buttonA && buttonB) {
    if (buttonA?.dataset.id === buttonB?.dataset.id) {
      console.log("You win!!!");
      // playCorrect();
      playSound("/public/sounds/yes.wav");
      header.textContent = "You found a match! 🎉";
    } else {
      console.log("Wrong!");
      //playWrong();
      playSound("/public/sounds/no.ogg");
      
      header.textContent = "Try again! ❌";
      setTimeout(() => {
        header.textContent = ``;
      }, 1000);
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


function playSound(file) {
  const audio = new Audio(file);
  audio.play();
}
