import { getRandomDeck } from "./data.js";
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const header = document.querySelector(".header");
const cards = document.querySelectorAll(".card");
let check = 0;

const img1 = document.createElement("img");
img1.src = "/public/img1.png";
img1.classList.add("image");

const img2 = document.createElement("img");
img2.src = "/public/img2.png";
img2.classList.add("image");

const buttons = document.querySelectorAll("button");
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.dataset.id === check.toString()) {
      console.log("You win!!!!");
    } else {
      console.log((check = e.target.dataset.id));
    }
  });
});
