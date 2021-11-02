// canvas
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 598;

// load images
// girl right side
let girlRight = new Image();
girlRight.src = "./images/girlStandRight.png";

let girlWalkRightOne = new Image();
girlWalkRightOne.src = "./images/girlWalkingRightOne.png";

let girlWalkRightTwo = new Image();
girlWalkRightTwo.src = "./images/girlWalkingRightTwo.png";

let girlWalkRightThree = new Image();
girlWalkRightThree.src = "./images/girlWalkingRightThree.png";

let girlWalkRightFour = new Image();
girlWalkRightFour.src = "./images/girlWalkingRightFour.png";

let girlWalkRightFive = new Image();
girlWalkRightFive.src = "./images/girlWalkingRIghtFive.png";

let girlWalkRightSix = new Image();
girlWalkRightSix.src = "./images/girlWalkingRightSix.png";

let girlRightArr = [
  girlRight,
  girlWalkRightOne,
  girlWalkRightTwo,
  girlWalkRightThree,
  girlRight,
  girlWalkRightFour,
  girlWalkRightFive,
  girlWalkRightSix,
];

let girlRightCount = 0;

// girl left side
let girlLeft = new Image();
girlLeft.src = "./images/girlStandLeft.png";

let girlWalkLeftOne = new Image();
girlWalkLeftOne.src = "./images/girlWalkingLeftOne.png";

let girlWalkLeftTwo = new Image();
girlWalkLeftTwo.src = "./images/girlWalkingLeftTwo.png";

let girlWalkLeftThree = new Image();
girlWalkLeftThree.src = "./images/girlWalkingLeftThree.png";

let girlWalkLeftFour = new Image();
girlWalkLeftFour.src = "./images/girlWalkingLeftFour.png";

let girlWalkLeftFive = new Image();
girlWalkLeftFive.src = "./images/girlWalkingLeftFive.png";

let girlWalkLeftSix = new Image();
girlWalkLeftSix.src = "./images/girlWalkingLeftSix.png";

let girlLeftArr = [
  girlLeft,
  girlWalkLeftOne,
  girlWalkLeftTwo,
  girlWalkLeftThree,
  girlLeft,
  girlWalkLeftFour,
  girlWalkLeftFive,
  girlWalkLeftSix,
];

let girlLeftCount = 0;

// rest
let tomato = new Image();
tomato.src = "./images/tomato.png";

let chicken = new Image();
chicken.src = "./images/chicken.png";

let snail = new Image();
snail.src = "./images/snail.png";

let live = new Image();
live.src = "./images/live.png";

let background = new Image();
background.src = "./images/background.png";

let floor = new Image();
floor.src = "./images/floor.png";

let foreground = new Image();
foreground.src = "./images/foreground.png";

// load music

let rick = new Audio(
  "https://raw.githubusercontent.com/AisKreme/Tomayto-Tomahto/master/audioFun.mp3"
);
let morty = new Audio(
  "https://raw.githubusercontent.com/AisKreme/Tomayto-Tomahto/master/audioFunThree.mp3"
);
let pokemon = new Audio(
  "https://raw.githubusercontent.com/AisKreme/Tomayto-Tomahto/master/audioFunTwo.mp3"
);
let gameSound = new Audio(
  "https://raw.githubusercontent.com/AisKreme/Tomayto-Tomahto/master/audioMain.mp3"
);

morty.volume = 0.08;
pokemon.volume = 0.05;
rick.volume = 0.05;
gameSound.volume = 0.1;

// buttons & header & screen
let startBtn = document.querySelector("#startBtn");
let restartBtn = document.querySelector("#restartBtn");
let loginBtn = document.querySelector("#loginBtn");
let quitBtn = document.querySelector("#quitBtn");
let muteBtn = document.querySelector("#muteBtn");
let title = document.querySelector("#title");
let startScreen = document.querySelector("#startScreen");
let resetScreen = document.querySelector("#resetScreen");
let loginScreen = document.querySelector("#loginScreen");
let userName = document.querySelector("#username");
let userInput = document.querySelector("#userInput");
let timer = document.querySelector("#timer");
let scoreCount = document.querySelector("#scoreCount");

// gamestate
let intervalId = 0;
let liveCount = 4;
let countTime = 0;
let isGameOver = false;
let timeId;
let walk;

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
let snailX = canvas.width,
  snailY = 510;
let snailArr = [{ x: snailX, y: snailY }];
// score
let score = 0;

// set speed
let speed;
let girlSpeed;
let snailSpeed;
let levelSpeed;

let nameList = [
  "hauke",
  "tamara",
  "rodrigo",
  "adel",
  "anne",
  "consuela",
  "cullen",
  "cwk",
  "wai",
  "fern",
  "hugo",
  "ines",
  "joana",
  "joanne",
  "johannes",
  "josh",
  "joshua",
  "george",
  "kaj",
  "luise",
  "manish",
  "marcos",
  "maria",
  "mario",
  "marta",
  "marvin",
  "nevra",
  "nico",
  "ricardo",
  "taka",
  "takayuki",
  "vinayak",
  "yulia",
  "julia",
  "rick",
  "morty",
  "bulbasaur",
  "charmader",
  "squirtle",
  "pikachu",
];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);
  liveState();
  tomatos();
  chickens();
  timer.innerText = `Timer: ${countTime}s`;

  if (score >= 3) {
    snailRight();
  }

  animation();
  movement();
  jumpMove();

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

function animation() {
  let girlImage;

  if (jump) {
    if (isLeft) {
      girlImage =
        girlLeftArr[(keyPressCount + girlLeftCount) % girlLeftArr.length];
    } else if (isRight) {
      girlImage =
        girlRightArr[(keyPressCount + girlRightCount) % girlRightArr.length];
    } else {
      girlImage = girlStandDirection();
    }
  } else {
    if (isLeft) {
      girlImage = girlLeftArr[girlLeftCount % girlLeftArr.length];
    } else if (isRight) {
      girlImage = girlRightArr[girlRightCount % girlRightArr.length];
    } else {
      girlImage = girlStandDirection();
    }
  }

  ctx.drawImage(girlImage, girlRightX, girlRightY);
}

function girlStandDirection() {
  if (!isLeft && !isRight && girlLeftCount > girlRightCount) {
    return girlLeftArr[0];
  }

  return girlRightArr[0];
}

function movement() {
  let girlX = girlRightX;

  if (isLeft) {
    girlX = girlRightX - girlSpeed;
  } else if (isRight) {
    girlX = girlRightX + girlSpeed;
  }

  if (girlX < 0) {
    girlX = 50;
  } else if (girlRight.width + girlRightX > canvas.width) {
    girlX = canvas.width - girlRight.width - 50;
  }
  girlRightX = girlX;
}

function jumpMove() {
  const girlOffsetY = 475;
  let girlY = girlRightY;
  if (jump) {
    girlY = girlOffsetY - jumpHeight;
  } else if (girlOffsetY - girlRightY > 0) {
    girlY = girlRightY + 8;
  }
  girlRightY = girlY;
}

function tomatos() {
  for (let i = 0; i < tomatoArr.length; i++) {
    ctx.drawImage(tomato, tomatoArr[i].x, tomatoArr[i].y);

    // let tomato rain
    tomatoArr[i].y = tomatoArr[i].y + speed;

    // tomato falls down
    if (tomatoArr[i].y + tomato.height > canvas.height) {
      tomatoArr[i].y = 0;
      let xTomatoRandom = Math.floor(Math.random() * canvas.width);
      if (xTomatoRandom >= 0 && xTomatoRandom <= canvas.width - tomato.width)
        tomatoArr[i].x = xTomatoRandom;
    }
    // tomato gets caught // rightRightY <= tomatoArr[i].y + tomato.height ?!
    if (
      girlRightY <= tomatoArr[i].y + tomato.height &&
      girlRightX + girlRight.width >= tomatoArr[i].x &&
      girlRightX <= tomatoArr[i].x + tomato.width &&
      !(girlRightY + jumpHeight < tomatoArr[i].y)
    ) {
      score++;
      tomatoArr[i].y = canvas.height;

      if (!(score % 5)) {
        speed = speed + levelSpeed;
        girlSpeed = girlSpeed + levelSpeed;
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
      let xChickenRandom = Math.floor(Math.random() * canvas.width);
      if (xChickenRandom >= 0 && xChickenRandom <= canvas.width - chicken.width)
        chickenArr[i].x = xChickenRandom;
    }
    if (
      girlRightY <= chickenArr[i].y + chicken.height &&
      girlRightX + girlRight.width >= chickenArr[i].x &&
      girlRightX <= chickenArr[i].x + chicken.width &&
      !(girlRightY + jumpHeight < chickenArr[i].y)
    ) {
      chickenArr[i].y = canvas.height;
      liveCount = liveCount - 1;
    }
  }
}

function snailRight() {
  for (let i = 0; i < snailArr.length; i++) {
    ctx.drawImage(snail, snailArr[i].x, snailArr[i].y);

    snailArr[i].x = snailArr[i].x - snailSpeed;

    if (snailArr[i].x + snail.width < 0) {
      snailArr[i].x = canvas.width + 100;
      snailArr[i].y = snailY;
    }
    if (
      girlRightX <= snailArr[i].x + snail.width &&
      girlRightX + girlRight.width >= snailArr[i].x &&
      girlRightY + girlRight.height >= snailArr[i].y &&
      !(girlRightY + jumpHeight < snailArr[i].y)
    ) {
      snailArr[i].y = canvas.height;
      snailArr[i].x = snailArr[i].x - 1;
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
    clearInterval(timeId);
  }
}

function handleMute() {
  pokemon.pause();
  rick.pause();
  morty.pause();
  gameSound.pause();
  muteBtn.style.display = "none";
}

function handleFun(names) {
  let hack = names.toLowerCase();

  if (nameList.includes(hack)) {
    for (let i = 0; i < nameList.length; i++) {
      if (hack == "rick" || hack == "morty") {
        morty.play();
        i = nameList.length + 1;
        return;
      } else if (
        hack == "bulbasaur" ||
        hack == "charmader" ||
        hack == "squirtle" ||
        hack == "pikachu"
      ) {
        pokemon.play();
        i = nameList.length + 1;
        return;
      } else {
        rick.play();
        i = nameList.length + 1;
        return;
      }
    }
  } else {
    gameSound.play();
  }
}

function handleFrameRate() {
  if (fpsX > 70) {
    console.log(`${fpsX} FPS detected. Game Mode 1 Set.`);
    speed = 1;
    girlSpeed = 2;
    snailSpeed = 0.4;
    levelSpeed = 0.7;
  } else if (fpsX <= 70) {
    console.log(`${fpsX} FPS detected. Game Mode 2 Set.`);
    speed = 2;
    girlSpeed = 4;
    snailSpeed = 1;
    levelSpeed = 2;
  }
}

function startTimer() {
  timeId = setInterval(function () {
    if (!isGameOver) {
      countTime++;
    }
  }, 1000);
}

function handleLogin() {
  userName.innerText = `Username: ${userInput.value}`;
  startBtn.style.display = "block";
  startScreen.style.display = "flex";
  loginScreen.style.display = "none";
  loginBtn.style.display = "none";
  muteBtn.style.display = "block";
}

function handleGameOver() {
  canvas.style.display = "none";
  restartBtn.style.display = "block";
  resetScreen.style.display = "flex";
  quitBtn.style.display = "block";
  scoreCount.style.display = "flex";
  scoreCount.innerText = `Score: ${score}`;

  isGameOver = false;
  score = 0;
  liveCount = 4;
  tomatoArr[0].y = 0;
  tomatoArr[0].x = 600;
  chickenArr[0].y = -200;
  chickenArr[0].x = 300;
  snailArr[0].x = -200;
  girlRightX = 200;
  speed = 1;
  girlSpeed = 2;
}

function handleStart() {
  startBtn.style.display = "none";
  startScreen.style.display = "none";
  restartBtn.style.display = "none";
  quitBtn.style.display = "none";
  resetScreen.style.display = "none";
  title.style.display = "none";
  canvas.style.display = "block";
  canvas.style.imageRendering = "pixelated";
  girlRight.style.imageRendering = "pixelated";
  countTime = 0;
  startTimer();
  handleFrameRate();
  draw();
}

window.addEventListener("load", () => {
  canvas.style.display = "none";
  scoreCount.style.display = "none";
  muteBtn.style.display = "none";

  // document.addEventListener("keypress", (event) => {
  // });

  document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowLeft") {
      girlLeftCount++;
      isLeft = true;
      isRight = false;
    }
    if (event.key == "ArrowRight") {
      girlRightCount++;
      isRight = true;
      isLeft = false;
    }
    if (event.key == " " && keyPressCount < 2) {
      jump = true;
      keyPressCount++;
    } else {
      jump = false;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key == "ArrowRight") {
      isRight = false;
      girlLeftCount = 1;
    }

    if (event.key == "ArrowLeft") {
      isLeft = false;
      girlRightCount = 1;
    }
    if (event.key == " ") {
      jump = false;
      keyPressCount = 0;
    }
  });

  loginBtn.addEventListener("click", () => {
    handleFun(userInput.value);
    handleLogin();
  });

  startBtn.addEventListener("click", () => {
    handleStart();
  });

  restartBtn.addEventListener("click", () => {
    handleStart();
  });

  quitBtn.addEventListener("click", () => {
    location.reload();
  });
  muteBtn.addEventListener("click", () => {
    handleMute();
  });
});
