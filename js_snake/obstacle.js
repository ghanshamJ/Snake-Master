function Obstacle(x, y, width, height, color, canv) {
  this.context = canv;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.color = color;
  /**************************************************************/
  this.drawObstacle = function () {
    this.context.ctx.beginPath();
    this.context.ctx.fillStyle = this.color;
    this.context.ctx.rect(this.x, this.y, this.width, this.height);
    this.context.ctx.fill();
    this.context.ctx.closePath();
  };
  /**************************************************************/
}
