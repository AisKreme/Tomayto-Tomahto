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
girlWalkRightFive.src = "./images/girlWalkingRightFive.png";

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

// load boomerang

let boomerangOne = new Image();
boomerangOne.src = "./images/boomerangOne.png";

let boomerangTwo = new Image();
boomerangTwo.src = "./images/boomerangTwo.png";

let boomerangThree = new Image();
boomerangThree.src = "./images/boomerangThree.png";

let boomerangFour = new Image();
boomerangFour.src = "./images/boomerangFour.png";

let boomArr = [boomerangFour, boomerangThree, boomerangTwo, boomerangOne];

// load fire

let fireOne = new Image();
fireOne.src = "./images/fireOne.png";

let fireTwo = new Image();
fireTwo.src = "./images/fireTwo.png";

let fireThree = new Image();
fireThree.src = "./images/fireThree.png";

let fireFour = new Image();
fireFour.src = "./images/fireFour.png";

let fireArr = [fireOne, fireTwo, fireThree, fireFour];

let fireX = canvas.width;
let fireY = canvas.height;
let fireBool = false;

// load music

let morty = new Audio(
  "https://raw.githubusercontent.com/AisKreme/Tomayto-Tomahto/master/audioFunThree.mp3"
);
let pokemon = new Audio(
  "https://raw.githubusercontent.com/AisKreme/Tomayto-Tomahto/master/audioFunTwo.mp3"
);
let gameSound = new Audio(
  "https://raw.githubusercontent.com/AisKreme/Tomayto-Tomahto/master/audioMain.mp3"
);

let video = document.createElement("video");
video.src =
  "https://raw.githubusercontent.com/AisKreme/Tomayto-Tomahto/master/images/rickVideo.mp4";

morty.volume = 0.08;
pokemon.volume = 0.05;

gameSound.volume = 0.1;
video.volome = 0.05;

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
let gravityCheck = document.querySelector("#gravity");

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
  jumpHeight = 50;
let keyPressCount = 0;
let isRight = false,
  isLeft = false,
  jump = false;
let looksRight = true;
let looksLeft = false;
let jumpFree = true;

// boomerang
let boomThrow = false;
let boomFree = true;

let index = 0;
let boomX = girlRightX;
let boomY = girlRightY + 20;
let boomThrowArr = [{ x: boomX, y: boomY, height: 0, width: 0 }];

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

let shootLive = 0;

//gravity & fun
let gravity = false;
let fun = false;

// set speed
let speed = 2;
let girlSpeed = 3;
let snailSpeed = 1;
let levelSpeed = 1.2;
let boomSpeed = 6;

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

// fps handling
let fps = 60;
let now;
let then = Date.now();
let interval = 1000 / fps;
let delta;

function draw() {
  if (isGameOver) {
    cancelAnimationFrame(intervalId);
    handleGameOver();
  } else {
    intervalId = requestAnimationFrame(draw);
  }

  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    then = now - (delta % interval);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    handleMoreFun();
    // fire & Live score
    ctx.drawImage(fireArr[0], canvas.width - fireArr[0].width - 23, 8);
    fireLive();
    ctx.font = "bold 35px Courier New";
    ctx.fillText(`${shootLive}/10`, canvas.width - fireArr[0].width - 35, 140);
    liveState();
    timer.innerText = `Timer: ${countTime}s`;

    // gravity mode
    showGravity();

    // objects & animation
    tomatos();
    chickens();

    if (score >= 3) {
      snailRight();
    }

    throwBoom();
    movement();
    jumpMove();
    animation();

    // score, floor & foreground
    ctx.drawImage(floor, 0, canvas.height - floor.height);
    ctx.drawImage(foreground, 0, canvas.height - foreground.height);
    ctx.font = "bold 35px Courier New";
    ctx.fillText(`Score: ${score}`, 30, 120);

    liveState();
  }
}

let b = 0;
function throwBoom() {
  let boomImage;
  b++;
  if (b % 10 == 0) {
    index++;
  }

  boomImage = boomArr[index % boomArr.length];
  if (looksRight) {
    for (let i = 0; i < boomThrowArr.length; i++) {
      // throw boomerang
      if (boomThrow) {
        boomThrowArr[i].x = boomThrowArr[i].x + boomSpeed;
        boomThrowArr[i].y = boomThrowArr[i].y;
        boomX = boomThrowArr[i].x;
        boomY = boomThrowArr[i].y;
        boomThrowArr[0].height = 55;
        boomThrowArr[0].width = 55;
      }
      // comeback
      else {
        if (boomThrowArr[i].x + boomImage.width < girlRightX) {
          boomThrowArr[i].x = boomThrowArr[i].x + boomSpeed;
          boomX = boomThrowArr[i].x;
          boomThrowArr[0].height = 55;
          boomThrowArr[0].width = 55;
        } else if (boomThrowArr[i].x > girlRightX + girlRight.width) {
          boomThrowArr[i].x = boomThrowArr[i].x - boomSpeed;
          boomX = boomThrowArr[i].x;
          boomY = boomThrowArr[i].y;
          boomThrowArr[0].height = 55;
          boomThrowArr[0].width = 55;
        } else {
          boomThrowArr[i].x = girlRightX - 5;
          boomThrowArr[i].y = girlRightY + 18;
          boomX = boomThrowArr[i].x;
          boomY = boomThrowArr[i].y;
          boomFree = true;
        }
      }
    }
  } else {
    for (let i = 0; i < boomThrowArr.length; i++) {
      if (boomThrow) {
        boomThrowArr[i].x = boomThrowArr[i].x - boomSpeed;
        boomThrowArr[i].y = boomThrowArr[i].y;
        boomX = boomThrowArr[i].x;
        boomThrowArr[0].height = 55;
        boomThrowArr[0].width = 55;
      } else {
        if (boomThrowArr[i].x > girlRightX + girlRight.width) {
          boomThrowArr[i].x = boomThrowArr[i].x - boomSpeed;
          boomX = boomThrowArr[i].x;
          boomY = boomThrowArr[i].y;
          boomThrowArr[0].height = 55;
          boomThrowArr[0].width = 55;
        } else if (boomThrowArr[i].x + boomImage.width < girlRightX) {
          boomThrowArr[i].x = boomThrowArr[i].x + boomSpeed;
          boomX = boomThrowArr[i].x;
          boomY = boomThrowArr[i].y;
          boomThrowArr[0].height = 55;
          boomThrowArr[0].width = 55;
        } else {
          boomThrowArr[i].x = girlRightX - 5;
          boomThrowArr[i].y = girlRightY + 18;
          boomX = boomThrowArr[i].x;
          boomY = boomThrowArr[i].y;
          boomFree = true;
        }
      }
    }
  }

  ctx.drawImage(
    boomImage,
    boomX,
    boomY,
    boomThrowArr[0].height,
    boomThrowArr[0].width
  );
}

let c = 0;
let keys = [];
function animation() {
  let girlImage;
  c++;
  if (isLeft && c % 5 == 0) {
    girlLeftCount++;
  } else if (isRight && c % 5 == 0) {
    girlRightCount++;
  }

  if (jump) {
    boomThrowArr[0].height = 0;
    boomThrowArr[0].width = 0;
    if (isLeft) {
      girlImage = girlLeftArr[5 + keyPressCount];
    } else if (isRight) {
      girlImage = girlRightArr[5 + keyPressCount];
    } else {
      girlImage = girlStandDirection();
    }
  } else {
    boomThrowArr[0].height = 0;
    boomThrowArr[0].width = 0;
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
    looksLeft = true;
    looksRight = false;
    return girlLeftArr[0];
  }
  looksLeft = false;
  looksRight = true;
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

  if (gravity) {
    if (keys.includes("space") && girlOffsetY - girlRightY - jumpHeight < 280) {
      girlY = girlRightY - 5;
    } else if (girlOffsetY - girlRightY > 0) {
      girlY = girlRightY + 5;
      keys.splice(keys.indexOf("space"), 1);
    }
  } else if (jump) {
    girlY = girlOffsetY - jumpHeight;
  } else if (girlOffsetY - girlRightY > 0) {
    girlY = girlRightY + 8;
    keys.splice(keys.indexOf("space"), 1);
  }
  girlRightY = girlY;
}

let d = 0;
let gravityOn = false;
let gravityOff = false;
function showGravity() {
  let intervalId = setInterval(() => {
    d++;
    if (d > 600) {
      clearInterval(intervalId);
      gravityOn = false;
      gravityOff = false;
    }
  }, 200);

  ctx.font = "bold 35px Courier New";
  if (gravityOn) {
    ctx.fillText(`Gravity Mode: ON`, 360, 60);
  }
  if (gravityOff) {
    ctx.fillText(`Gravity Mode: OFF`, 360, 60);
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
      let xTomatoRandom = Math.floor(Math.random() * canvas.width);
      if (xTomatoRandom >= 0 && xTomatoRandom <= canvas.width - tomato.width)
        tomatoArr[i].x = xTomatoRandom;
    }
    // tomato gets caught
    if (
      tomatoArr[i].x < girlRightX + girlRight.width &&
      tomatoArr[i].x + tomato.width > girlRightX &&
      tomatoArr[i].y < girlRightY + girlRight.height &&
      tomatoArr[i].y + tomato.height > girlRightY
    ) {
      score++;
      tomatoArr[i].y = canvas.height;

      if (!(score % 5)) {
        speed = speed + levelSpeed;
        girlSpeed = girlSpeed + levelSpeed;
        boomSpeed = boomSpeed + levelSpeed;
        jumpHeight = jumpHeight + 10;
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
      chickenArr[i].x < girlRightX + girlRight.width &&
      chickenArr[i].x + chicken.width > girlRightX &&
      chickenArr[i].y < girlRightY + girlRight.height &&
      chickenArr[i].y + chicken.height > girlRightY
    ) {
      fireBool = false;
      a = 0;
      chickenArr[i].y = canvas.height;
      liveCount = liveCount - 1;
    }
    if (
      chickenArr[i].x < boomX + boomArr[0].width &&
      chickenArr[i].x + chicken.width > boomX &&
      chickenArr[i].y < boomY + boomArr[0].height &&
      chickenArr[i].y + boomArr[0].height > boomY
    ) {
      fireX = chickenArr[0].x - 8;
      fireY = chickenArr[0].y - 40;
      a = 0;
      fireBool = true;
      chickenArr[i].y = canvas.height;
      chickenArr[i].x = chickenArr[i].x - 1;

      score++;
      shootLive++;
    }
  }
  handleFire();
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
      fireBool = false;
      a = 0;
      snailArr[i].y = canvas.height;
      snailArr[i].x = snailArr[i].x - 1;
      liveCount = liveCount - 1;
    }
    if (
      snailArr[i].x < boomX + boomArr[0].width &&
      snailArr[i].x + snail.width > boomX &&
      snailArr[i].y < boomY + boomArr[0].height &&
      snailArr[i].y + boomArr[0].height > boomY
    ) {
      fireX = snailArr[0].x - 10;
      fireY = snailArr[0].y - 45;
      a = 0;
      fireBool = true;
      snailArr[i].y = canvas.height;
      snailArr[i].x = snailArr[i].x - 1;

      score++;
      shootLive++;
    }
  }
  handleFire();
}

let a = 0;
function handleFire() {
  let setIntervalId = setInterval(() => {
    a++;
    if (a > 200) {
      clearInterval(setIntervalId);
      fireBool = false;
    }
  }, 200);
  if (fireBool) {
    ctx.drawImage(fireArr[a % fireArr.length], fireX, fireY);
  }
}

function fireLive() {
  if (shootLive / 10 == 1) {
    shootLive = 0;

    if (liveCount < 4) {
      fireX = canvas.width - fireArr[0].width - 23;
      fireY = 6;

      handleFire();
      liveCount++;
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
  pokemon.currentTime = 0;
  video.pause();
  video.currentTime = 0;
  video.volume = 0.2;
  morty.pause();
  morty.currentTime = 0;
  gameSound.pause();
  gameSound.currentTime = 0;
  muteBtn.style.display = "none";
}

function handleMoreFun() {
  if (fun) {
    video.play();
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    video.volume = 0.05;
  }
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
        fun = true;
        i = nameList.length + 1;
        return;
      }
    }
  } else {
    gameSound.play();
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
  gravityCheck.style.display = "none";

  scoreCount.innerText = `Score: ${score}`;

  tomato.src = "./images/tomato.png";
  live.src = "./images/live.png";
  isGameOver = false;
  score = 0;
  liveCount = 4;
  tomatoArr[0].y = 0;
  tomatoArr[0].x = 600;
  chickenArr[0].y = -200;
  chickenArr[0].x = 300;
  snailArr[0].x = -200;
  girlRightX = 200;
  boomX = girlRightX;
  boomY = girlRightY;

  jumpHeight = 50;
  speed = 2;
  girlSpeed = 3;
  snailSpeed = 1;
  levelSpeed = 1;
  boomSpeed = 6;

  gravity = false;

  handleMute();
}

function handleStart() {
  document.addEventListener("keydown", (event) => {
    if (event.key == "p") {
      tomato.src = "./images/potato.png";
      chicken.src = "./images/chickenTwo.png";
      live.src = "./images/potatoLive.png";
      background.src = "./images/backgroundTwo.png";
      foreground.src = "./images/foregroundTwo.png";
      floor.src = "./images/floorTwo.png";
    }
    if (event.key == "t") {
      tomato.src = "./images/tomato.png";
      chicken.src = "./images/chicken.png";
      live.src = "./images/live.png";
      background.src = "./images/background.png";
      foreground.src = "./images/foreground.png";
      floor.src = "./images/floor.png";
    }
    if (event.key == "r") {
      if (!fun) {
        background.src = "./images/background.png";
        foreground.src = "./images/foreground.png";
        floor.src = "./images/floor.png";
        pokemon.pause();
        morty.pause();
        gameSound.pause();
        fun = true;
        handleMoreFun();
      }
    }
    if (event.key == "b") {
      fun = false;
      video.pause();
      pokemon.pause();
      morty.pause();
      gameSound.play();
    }
    if (event.key == "m") {
      fun = false;
      video.pause();
      pokemon.pause();
      gameSound.pause();
      morty.play();
    }
    if (event.key == "u") {
      fun = false;
      video.pause();
      morty.pause();
      gameSound.pause();
      pokemon.play();
    }
  });

  startBtn.style.display = "none";
  startScreen.style.display = "none";
  restartBtn.style.display = "none";
  quitBtn.style.display = "none";
  resetScreen.style.display = "none";
  title.style.display = "none";
  gravityCheck.style.display = "block";
  muteBtn.style.display = "block";
  canvas.style.display = "block";
  canvas.style.imageRendering = "pixelated";
  girlRight.style.imageRendering = "pixelated";
  countTime = 0;
  handleFun(userInput.value);
  startTimer();

  draw();
}

window.addEventListener("load", () => {
  canvas.style.display = "none";
  scoreCount.style.display = "none";
  muteBtn.style.display = "none";

  document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowLeft") {
      isLeft = true;
      isRight = false;
      looksLeft = true;
      looksRight = false;
    }
    if (event.key == "ArrowRight") {
      isRight = true;
      isLeft = false;
      looksLeft = false;
      looksRight = true;
    }
    if (event.key == " " && keyPressCount < 2) {
      jump = true;
      keyPressCount++;
      keys.push("space");
    } else {
      jump = false;
    }

    if (event.key == "g") {
      if (!gravity) {
        gravity = true;
        gravityOn = true;
        gravityOff = false;
        d = 0;
      } else {
        gravity = false;
        gravityOn = false;
        gravityOff = true;
        d = 0;
      }
    }
    if (event.key == "x" && boomFree) {
      boomThrow = true;
      boomFree = false;
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
      keys.pop("space");
      jump = false;
      keyPressCount = 0;
    }
    if (event.key == "x") {
      boomThrow = false;

      let count = 0;
      let intervalId = setInterval(() => {
        count++;
        if (index > 3) {
          index--;
          index--;
          index--;
        }
        if (count > 60) {
          clearInterval(intervalId);
        }
      }, 200);
    }
  });

  loginBtn.addEventListener("click", () => {
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
  gravityCheck.addEventListener("click", () => {
    gravity = true;
  });
});
