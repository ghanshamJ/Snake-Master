function Snake(x, y, width, height, color, canv) {
  this.context = canv;
  this.x = x;
  this.y = y;
  this.body = [];
  this.height = height;
  this.width = width;
  this.color = color;

  /*******************initial body*******************************************/
  for (let i = 3; i >= 1; i--) {
    this.body.push({
      x: this.x + this.width * i,
      y: this.height,
      width: this.width,
      height: this.height,
      color: this.color,
    });
  }
  /**************************************************************/
  this.moveDown = function (dist) {
    this.move();
    if (this.body[0].y + this.height < this.context.height)
      this.body[0].y += dist;
    else this.body[0].y = 0;
  };
  /**************************************************************/
  this.moveUp = function (dist) {
    this.move();
    if (this.body[0].y > 0) this.body[0].y -= dist;
    else this.body[0].y = this.context.height - this.height;
  };
  /**************************************************************/
  this.moveLeft = function (dist) {
    this.move();
    if (this.body[0].x > 0) this.body[0].x -= dist;
    else this.body[0].x = this.context.width - this.width;
  };
  /**************************************************************/
  this.moveRight = function (dist) {
    this.move();
    if (this.body[0].x + this.width < this.context.width)
      this.body[0].x += dist;
    else this.body[0].x = 0;
  };
  /**************************************************************/
  this.drawSnake = function () {
    for (let i in this.body) {
      this.context.ctx.beginPath();
      this.context.ctx.fillStyle = this.color;
      this.context.ctx.rect(
        this.body[i].x,
        this.body[i].y,
        this.body[i].width,
        this.body[i].height
      );
      this.context.ctx.fill();
      this.context.ctx.closePath();
    }
  };
  /**************************************************************/
  this.move = function () {
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
  };
  /**************************************************************/
  this.eatFood = function () {
    this.body.push({
      x: this.body[this.body.length - 1].x + this.width,
      y: this.body[this.body.length - 1].y + this.height,
      width: this.width,
      height: this.height,
      color: this.color,
    });
  };
  /**************************************************************/
}
