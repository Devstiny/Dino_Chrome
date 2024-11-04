let dinosaur = document.getElementById("dinosaur");
let grid = document.getElementById("grid");
let text = document.getElementById("text");
let background = document.getElementById("background");
let gravity = 0.9;
let jumping = false;

let dinoPosition = 0;

const jump = (event) => {
  if (event.code === "Space") {
    jumping = true;
    let cont = 0;
    let timer = setInterval(() => {
      //Fall
      if (cont === 15) {
        clearInterval(timer);
        let fallTimer = setInterval(() => {
          if (cont === 0) {
            clearInterval(fallTimer);
            jumping = false;
          }
          dinoPosition -= 5;
          cont--;
          dinoPosition *= gravity;
          dinosaur.style.bottom = dinoPosition + "px";
        }, 20);
      }

      //Jump
      dinoPosition += 20;
      cont++;
      dinoPosition *= gravity;
      dinosaur.style.bottom = dinoPosition + "px";
    }, 20);
  }
};

document.addEventListener("keydown", jump);
