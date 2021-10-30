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

// buttons & header & screen
let startBtn = document.querySelector("#startBtn");
let restartBtn = document.querySelector("#restartBtn");
let title = document.querySelector("#title");
let startScreen = document.querySelector("#startScreen");
let resetScreen = document.querySelector("#resetScreen");

// gamestate
let intervalId = 0;
let liveCount = 4;
let speed = 1;
let isGameOver = false;

// movement Char
let girlRightX = 200,
  girlRightY = 475,
  jumpHeight = 60;
let keyPressCount = 0;
let isRight = false,
  isLeft = false,
  jump = false;
let girlSpeed = 2;

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
let snailX = canvas.width + 200,
  snailY = 510;
let snailArr = [{ x: snailX, y: snailY }];
// score
let score = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);

  liveState();
  tomatos();
  chickens();

  if (score >= 3) {
    snailRight();
  }

  ctx.drawImage(girlRight, girlRightX, girlRightY);
  ctx.drawImage(girlLeft, 0, 0);

  movement();

  ctx.drawImage(floor, 0, canvas.height - floor.height);
  ctx.drawImage(foreground, 0, canvas.height - foreground.height);
  ctx.font = "bold 35px Courier New";
  ctx.fillText(`Score: ${score}`, 30, 120);
  liveState();

  if (isGameOver) {
    cancelAnimationFrame(intervalId);
    handleGameOver();
  } else {
    intervalId = requestAnimationFrame(draw);
  }
}

function movement() {
  let jumpGirlRightY = 475 - jumpHeight;
  if (isRight && girlRightX + girlRight.width < canvas.width) {
    girlRightX = girlRightX + girlSpeed;
  }
  if (isLeft && girlRightX > 0) {
    girlRightX = girlRightX - girlSpeed;
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
    tomatoArr[i].y = tomatoArr[i].y + speed;

    // tomato falls down
    if (tomatoArr[i].y + tomato.height > canvas.height) {
      tomatoArr[i].y = 0;
      tomatoArr[i].x = Math.floor(Math.random() * canvas.width - tomato.width);
    }
    // tomato gets caught // rightRightY <= tomatoArr[i].y + tomato.height ?!
    if (
      girlRightY <= tomatoArr[i].y + tomato.height &&
      girlRightX + girlRight.width >= tomatoArr[i].x &&
      girlRightX <= tomatoArr[i].x + tomato.width &&
      !(girlRightY + girlRight.width < tomatoArr[i].y)
    ) {
      score++;
      tomatoArr[i].y = canvas.height;
      if (score == 3) {
        speed = speed + 0.5;
      }
      if (score == 5) {
        speed = speed + 0.5;
        girlSpeed = girlSpeed + 0.5;
      }
      if (score == 10) {
        speed = speed + 0.5;
      }
    }
  }
}

function chickens() {
  for (let i = 0; i < chickenArr.length; i++) {
    ctx.drawImage(chicken, chickenArr[i].x, chickenArr[i].y);

    // let chicken rain
    chickenArr[i].y = chickenArr[i].y + speed;

    // chicken fall down
    if (chickenArr[i].y + chicken.height > canvas.height) {
      chickenArr[i].y = 0;
      chickenArr[i].x = Math.floor(
        Math.random() * canvas.width - chicken.width
      );
    }
    if (
      girlRightY <= chickenArr[i].y + chicken.height &&
      girlRightX + girlRight.width >= chickenArr[i].x &&
      girlRightX <= chickenArr[i].x + chicken.width &&
      !(girlRightY + girlRight.width < chickenArr[i].y)
    ) {
      chickenArr[i].y = canvas.height;
      liveCount = liveCount - 1;
    }
  }
}

function snailRight() {
  for (let i = 0; i < snailArr.length; i++) {
    ctx.drawImage(snail, snailArr[i].x, snailArr[i].y);

    snailArr[i].x = snailArr[i].x - 0.4;

    if (snailArr[i].x + snail.width < 0) {
      snailArr[i].x = canvas.width + 300;
      snailArr[i].y = snailY;
    }
    if (
      girlRightX <= snailArr[i].x + snail.width &&
      girlRightX + girlRight.width >= snailArr[i].x &&
      girlRightY + girlRight.height >= snailArr[i].y
    ) {
      snailArr[i].y = canvas.height;
      liveCount = liveCount - 1;
    }
  }
}

function liveState() {
  if (liveCount == 4) {
    ctx.drawImage(live, 20, 20);
    ctx.drawImage(live, live.width + 20, 20);
    ctx.drawImage(live, live.width + live.width + 20, 20);
  }

  if (liveCount == 3) {
    ctx.drawImage(live, 20, 20);
    ctx.drawImage(live, live.width + 20, 20);
  }

  if (liveCount == 2) {
    ctx.drawImage(live, 20, 20);
  }
  if (liveCount == 0) {
    isGameOver = true;
  }
}

function handleGameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.drawImage(background, 0, 0);
  // ctx.drawImage(girlRight, girlRightX, girlRightY);
  // ctx.drawImage(floor, 0, canvas.height - floor.height);
  // ctx.drawImage(foreground, 0, canvas.height - foreground.height);
  canvas.style.display = "none";
  restartBtn.style.display = "block";
  resetScreen.style.display = "block";
  isGameOver = false;
  score = 0;
  liveCount = 4;
  // tomatoY = 0;
  // tomatoX = 500;
  tomatoArr[0].y = 0;
  tomatoArr[0].x = 600;
  // chickenY = 0;
  // chickenX = 300;
  chickenArr[0].y = -200;
  chickenArr[0].x = 300;
  girlRightX = 200;
  speed = 1;
  girlSpeed = 2;
  // snailX = canvas.width;
  snailArr[0].x = canvas.width;
}

function handleStart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  startBtn.style.display = "none";
  startScreen.style.display = "none";
  restartBtn.style.display = "none";
  resetScreen.style.display = "none";
  title.style.display = "none";
  canvas.style.display = "block";
  canvas.style.imageRendering = "pixelated";
  //girlRight.style.imageRendering = "pixelated";
  draw();
}

window.addEventListener("load", () => {
  canvas.style.display = "none";
  restartBtn.style.display = "none";
  resetScreen.style.display = "none";

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
    if (event.key == " " && keyPressCount < 3) {
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
