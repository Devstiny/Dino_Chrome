//VARIABLES
let dinosaur = document.getElementById("dinosaur");
let grid = document.getElementById("grid");
let text = document.getElementById("text");
let background = document.getElementById("background");
let score = document.getElementById("score");
let restart = document.getElementById("restart");
let gravity = 0.9;
let jumping = false;
let gameOver = false;

let dinoPosition = 0;
let cactusCounter = 0;

// Método para hacer que el dinosaurio salte
const jump = (event) => {
  // Si se pulsa la barra espaciadora y el dinosaurio no está saltando, el dinosaurio salta
  if (event.code === "Space" && !jumping) {
    jumping = true;
    let cont = 0;
    let timer = setInterval(() => {
      // Animación de caída del dinosaurio
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

          // Evitamos que el dinosaurio caiga por debajo del suelo
          if (dinoPosition < 0) {
            dinoPosition = 0;
          }

          dinosaur.style.bottom = dinoPosition + "px";
        }, 20);
      }

      // Animación de salto del dinosaurio
      dinoPosition += 20;
      cont++;
      dinoPosition *= gravity;
      dinosaur.style.bottom = dinoPosition + "px";
    }, 20);
  }
};

// Método para generar cactus de forma aleatoria
const generateCactus = () => {
  if (!gameOver) {
    let randomStart = Math.random() * 4000;
    let cactusPosition = 2500;
    let cactus = document.createElement("DIV");
    cactus.classList.add("cactus");
    grid.appendChild(cactus);
    cactus.style.left = cactusPosition + "px";

    // Movimiento para cada cactus
    const moveCactus = () => {
      let timer = setInterval(() => {
        if (gameOver) {
          // Si el juego ha terminado, detiene el movimiento
          clearInterval(timer);
        }

        // Detecta colisión entre dinosaurio y cactus, condición de final de partida
        if (cactusPosition > 0 && cactusPosition < 50 && dinoPosition < 60) {
          text.style.display = "block";
          score.textContent += cactusCounter;
          score.style.display = "block";
          restart.style.display = "block";
          clearInterval(timer);
          gameOver = true;
          // Elimina todos los cactus de la pantalla
          while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
          }
        }

        // Animación de desplazamiento del cactus
        cactusPosition -= 6;
        cactus.style.left = cactusPosition + "px";

        // Elimina el cactus al salir y aumenta el contador
        if (cactusPosition < -60) {
          clearInterval(timer);
          cactus.remove();
          cactusCounter++;
        }
      }, 20);
    };

    // Inicio del movimiento del cactus
    moveCactus();

    // Genera el siguiente cactus con un intervalo aleatorio
    setTimeout(generateCactus, randomStart);
  }
};

// Genera cactus al iniciar el juego
generateCactus();

// Método para reiniciar el juego al hacer clic en el botón restart
const reload = (event) => {
  if (event.target.src.includes("restart")) {
    location.reload();
  }
};

document.addEventListener("keydown", jump);
document.addEventListener("click", reload);
