/**************************************************************/
let canvas;
let div;
function init() {
  div = document.getElementById("div1");
  let level = parseInt(document.getElementById("level").value);
  if (level === 0) {
    alert("select level");
    return;
  }
  div.style.display = "none";
  canvas = document.getElementById("myCanvas");
  canvas.style.backgroundColor = "rgb(0,200,120)";

  canvas.style.display = "block";

  if (window.innerHeight < window.innerWidth) {
    canvas.height = canvas.width = window.innerHeight;
  } else {
    canvas.width = canvas.height = window.innerWidth;
  }

  canvas.width =
    canvas.width % 10 === 0 ? canvas.width : canvas.width - (canvas.width % 10);
  canvas.height =
    canvas.height % 10 === 0
      ? canvas.height
      : canvas.height - (canvas.height % 10);

  let sizeComp = parseInt((canvas.width / 100) * 3);
  sizeComp =
    sizeComp % 10 === 0
      ? sizeComp
      : sizeComp % 10 > 5
      ? sizeComp + 10 - (sizeComp % 10)
      : sizeComp - (sizeComp % 10);

  if (sizeComp > 10) {
    canvas.width =
      canvas.width % 20 === 0
        ? canvas.width
        : canvas.width - (canvas.width % 20);
    canvas.height =
      canvas.height % 20 === 0
        ? canvas.height
        : canvas.height - (canvas.height % 20);
  }

  if (sizeComp > 20) {
    sizeComp = 20;
  }
  play(level, canvas, sizeComp);
}
/**************************************************************/
function play(g_level, canvas, sizeComp) {
  let context1 = new Context(canvas);
  let snake1 = new Snake(
    sizeComp,
    sizeComp,
    sizeComp,
    sizeComp,
    "purple",
    context1
  );
  let food1 = new Food(
    sizeComp * 3,
    sizeComp,
    sizeComp,
    sizeComp,
    "rgb(0,250,250)",
    context1
  );
  change_location_food();
  let lvl = new Level(g_level, sizeComp, "rgb(120,0,0)", context1);
  let canvsColor = canvas.style.backgroundColor;
  let btnRight = new Button(
    context1.width / 2,
    context1.height / 4,
    context1.width / 2,
    context1.height / 2,
    ">",
    canvsColor,
    "white"
  );
  let btnLeft = new Button(
    0,
    context1.height / 4,
    context1.width / 2,
    context1.height / 2,
    "<",
    canvsColor,
    "white"
  );
  let btnUp = new Button(
    0,
    0,
    context1.width,
    context1.height / 4,
    "^",
    canvsColor,
    "white"
  );
  let btnDown = new Button(
    0,
    context1.height - context1.height / 4,
    context1.width,
    context1.height / 4,
    "-",
    canvsColor,
    "white"
  );

  let score = 0;

  let keyRightPress = false;
  let keyLeftPress = false;
  let keyUpPress = false;
  let keyDownPress = false;
  let animate = setInterval(animation, 200);
  /**************************************************************/
  document.addEventListener("keydown", keyDownHandler, false);
  window.addEventListener("blur", stopGame);
  window.addEventListener("focus", starGame);
  canvas.addEventListener("click", function (e) {
    if (btnDown.isInside(canvas, e)) {
      if (keyUpPress === false) {
        keyDownPress = true;
        keyLeftPress = keyRightPress = keyUpPress = false;
      }
    }
    if (btnUp.isInside(canvas, e)) {
      if (keyDownPress === false) {
        keyUpPress = true;
        keyLeftPress = keyRightPress = keyDownPress = false;
      }
    }
    if (btnLeft.isInside(canvas, e)) {
      if (keyRightPress === false) {
        keyLeftPress = true;
        keyUpPress = keyDownPress = keyRightPress = false;
      }
    }
    if (btnRight.isInside(canvas, e)) {
      if (keyLeftPress === false) {
        keyRightPress = true;
        keyLeftPress = keyUpPress = keyDownPress = false;
      }
    }
  });
  /**************************************************************/
  function stopGame() {
    clearInterval(animate);
  }
  function endGame() {
    stopGame();
    //window.removeEventListener("blur",this.window);
    //window.removeEventListener("focus",this.window);
    alert("game Over! your Score: " + score);
    canvas.style.display = "none";
    div.style.display = "block";
  }
  /**************************************************************/
  function starGame() {
    //animate=setInterval(animation,200);
  }
  /**************************************************************/
  function keyDownHandler(e) {
    switch (e.key) {
      case "ArrowRight":
        if (keyLeftPress === false) {
          keyRightPress = true;
          keyLeftPress = false;
          keyUpPress = false;
          keyDownPress = false;
        }
        break;
      case "ArrowLeft":
        if (keyRightPress === false) {
          keyRightPress = false;
          keyLeftPress = true;
          keyUpPress = false;
          keyDownPress = false;
        }
        break;
      case "ArrowUp":
        if (keyDownPress === false) {
          keyRightPress = false;
          keyLeftPress = false;
          keyUpPress = true;
          keyDownPress = false;
        }
        break;
      case "ArrowDown":
        if (keyUpPress === false) {
          keyRightPress = false;
          keyLeftPress = false;
          keyUpPress = false;
          keyDownPress = true;
        }
        break;
    }
  }
  /**************************************************************/
  function animation() {
    context1.ctx.clearRect(0, 0, context1.width, context1.height);

    if (keyDownPress) snake1.moveDown(sizeComp);
    if (keyLeftPress) snake1.moveLeft(sizeComp);
    if (keyRightPress) snake1.moveRight(sizeComp);
    if (keyUpPress) snake1.moveUp(sizeComp);

    draw();
    collision();
  }
  /**************************************************************/
  function draw() {
    btnRight.drawButton(context1.ctx);
    btnLeft.drawButton(context1.ctx);
    btnUp.drawButton(context1.ctx);
    btnDown.drawButton(context1.ctx);

    snake1.drawSnake();
    food1.drawFood();
    lvl.drawLevel();
    drawScore();
  }
  /**************************************************************/
  function change_location_food() {
    let x1 =
      getRandomArbitrary(0, (context1.width - sizeComp) / sizeComp) * sizeComp;
    let y1 =
      getRandomArbitrary(0, (context1.height - sizeComp) / sizeComp) * sizeComp;
    while (x1 % sizeComp != 0) {
      x1 = getRandomArbitrary(0, context1.width / sizeComp) * sizeComp;
    }
    while (y1 % sizeComp != 0) {
      y1 = getRandomArbitrary(0, context1.height / sizeComp) * sizeComp;
    }
    food1.changeLocation(x1, y1);
  }
  /**************************************************************/
  function is_snake_eat_food() {
    if (food1.x === snake1.body[0].x && food1.y === snake1.body[0].y) {
      snake1.eatFood();
      change_location_food();
      score += g_level * 10;
    }
  }
  /**************************************************************/
  function is_snake_clash_obstacle() {
    for (let i in lvl.obstacle) {
      if (
        lvl.obstacle[i].x === snake1.body[0].x &&
        lvl.obstacle[i].y === snake1.body[0].y
      ) {
        endGame();
      }
    }
  }
  /**************************************************************/
  function is_snake_clash_self() {
    for (let i = 2; i < snake1.body.length; i++) {
      if (
        snake1.body[i].x === snake1.body[0].x &&
        snake1.body[i].y === snake1.body[0].y
      ) {
        endGame();
      }
    }
  }
  /**************************************************************/
  function is_food_inside_obstacle() {
    for (let i in lvl.obstacle) {
      if (lvl.obstacle[i].x === food1.x && lvl.obstacle[i].y === food1.y) {
        change_location_food();
      }
    }
  }
  /**************************************************************/
  function is_food_inside_snake() {
    for (let i in snake1.body) {
      if (snake1.body[i].x === food1.x && snake1.body[i].y === food1.y) {
        change_location_food();
      }
    }
  }
  /**************************************************************/
  function collision() {
    is_snake_eat_food();
    is_snake_clash_obstacle();
    is_food_inside_obstacle();
    is_food_inside_snake();
    is_snake_clash_self();
  }
  /**************************************************************/
  function drawScore() {
    context1.ctx.beginPath();
    context1.ctx.font = "20px Arial";
    context1.ctx.fillStyle = "yellow";
    context1.ctx.fillText(
      `Score: ${score} `,
      0,
      15,
      sizeComp * 15,
      sizeComp * 15
    );
    context1.ctx.fill();
    context1.ctx.closePath();
  }
}
/**************************************************************/
function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}
/**************************************************************/
