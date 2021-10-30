// canvas
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 598;

// load images
let girlRight = new Image();
girlRight.src = "/images/girlStandRight.png";

let girlLeft = new Image();
girlLeft.src = "";

let tomato = new Image();
tomato.src = "/images/tomato.png";

let chicken = new Image();
chicken.src = "/images/chicken.png";

let snail = new Image();
snail.src = "/images/snail.png";

let live = new Image();
live.src = "/images/live.png";

let background = new Image();
background.src = "/images/background.png";

let floor = new Image();
floor.src = "/images/floor.png";

let foreground = new Image();
foreground.src = "/images/foreground.png";

// buttons
let startBtn = document.querySelector("#startBtn");
let restartBtn = document.querySelector("#restartBtn");

// gamestate
let intervalId = 0;
let isGameOver = false;

// movement Char
let girlRightX = 200,
  girlRightY = 475,
  jumpHeight = 60;
let keyPressCount = 0;
let isRight = false,
  isLeft = false,
  jump = false;

// tomatos

let tomatoX = 500,
  tomatoY = 0;
let tomatoArr = [{ x: tomatoX, y: tomatoY }];
let falling = true;
// chicken
let chickenX = 200,
  chickenY = -300;
let chickenArr = [{ x: chickenX, y: chickenY }];

// snail
let snailX = 700,
  snailY = 510;
// score
let score = 0;

function draw() {
  ctx.drawImage(background, 0, 0);
  tomatos();
  chickens();
  ctx.drawImage(snail, snailX, snailY);
  ctx.drawImage(girlRight, girlRightX, girlRightY);
  ctx.drawImage(girlLeft, 0, 0);

  movement();

  let liveOne = ctx.drawImage(live, 20, 20);
  let liveTwo = ctx.drawImage(live, live.width + 20, 20);
  let liveThree = ctx.drawImage(live, live.width + live.width + 20, 20);

  ctx.drawImage(floor, 0, canvas.height - floor.height);
  ctx.drawImage(foreground, 0, canvas.height - foreground.height);
  ctx.font = "bold 35px Courier New";
  ctx.fillText(`Score: ${score}`, 30, 120);

  if (isGameOver) {
    cancelAnimationFrame(intervalId);
  } else {
    intervalId = requestAnimationFrame(draw);
  }
}

function movement() {
  let jumpGirlRightY = 475 - jumpHeight;
  if (isRight && girlRightX + girlRight.width < canvas.width) {
    girlRightX = girlRightX + 2;
  }
  if (isLeft && girlRightX > 0) {
    girlRightX = girlRightX - 2;
  }
  if (jump && girlRightY > jumpGirlRightY) {
    girlRightY = girlRightY - jumpHeight;
  }
  if (!jump && girlRightY == jumpGirlRightY) {
    girlRightY = girlRightY + jumpHeight;
  }
}

function tomatos() {
  for (let i = 0; i < tomatoArr.length; i++) {
    ctx.drawImage(tomato, tomatoArr[i].x, tomatoArr[i].y);

    // let tomato rain
    tomatoArr[i].y = tomatoArr[i].y + 1;

    // tomato falls down
    if (tomatoArr[i].y + tomato.height > canvas.height) {
      tomatoArr[i].y = 0;
      tomatoArr[i].x = Math.floor(Math.random() * canvas.width - tomato.width);
    }
  }

  //if (falling) tomatoY = tomatoY + 2;
  // if (girlRightX + girlRight.width >= tomato[i].x &&
  //   girlRightX <= tomato[i].x + tomato.width &&
  //   (girlRightY <= tomato[i].y + tomato.height) {
  //   score++;
  // }
}

function chickens() {
  for (let i = 0; i < chickenArr.length; i++) {
    ctx.drawImage(chicken, chickenArr[i].x, chickenArr[i].y);

    // let chicken rain
    chickenArr[i].y = chickenArr[i].y + 1;

    // chicken fall down
    if (chickenArr[i].y + chicken.height > canvas.height) {
      chickenArr[i].y = 0;
      chickenArr[i].x = Math.floor(
        Math.random() * canvas.width - chicken.width
      );
    }
  }
}

function handleStart() {
  startBtn.style.display = "none";
  restartBtn.style.display = "none";
  canvas.style.display = "block";
  canvas.style.imageRendering = "pixelated";
  //girlRight.style.imageRendering = "pixelated";
  draw();
}

window.addEventListener("load", () => {
  canvas.style.display = "none";
  restartBtn.style.display = "none";

  //handleStart();

  document.addEventListener("keydown", (event) => {
    console.log(event.key);
    if (event.key == "ArrowLeft") {
      isLeft = true;
      isRight = false;
    }
    if (event.key == "ArrowRight") {
      isRight = true;
      isLeft = false;
    }
    if (event.key == " " && keyPressCount < 2) {
      jump = true;
      keyPressCount++;
      console.log(keyPressCount);
    } else {
      jump = false;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key == "ArrowRight") {
      isRight = false;
    }

    if (event.key == "ArrowLeft") {
      isLeft = false;
    }
    if (event.key == " ") {
      jump = false;
      keyPressCount = 0;
    }
  });

  startBtn.addEventListener("click", () => {
    handleStart();
  });

  restartBtn.addEventListener("click", () => {
    handleStart();
  });
});
