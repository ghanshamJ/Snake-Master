function Level(lvl, size, color, ctx) {
  this.context = ctx;
  this.obstacle = [];
  this.color = color;
  this.size = size;
  /**************************************************************/
  switch (lvl) {
    case 2:
      for (let i = 0; i < this.context.width; i += this.size) {
        this.obstacle.push(
          new Obstacle(i, 0, this.size, this.size, this.color, this.context)
        );
        this.obstacle.push(
          new Obstacle(
            i,
            this.context.width - this.size,
            this.size,
            this.size,
            this.color,
            this.context
          )
        );
        this.obstacle.push(
          new Obstacle(0, i, this.size, this.size, this.color, this.context)
        );
        this.obstacle.push(
          new Obstacle(
            this.context.height - this.size,
            i,
            this.size,
            this.size,
            this.color,
            this.context
          )
        );
      }
      break;
    case 4:
      for (
        let i = this.size * 4;
        i < this.context.width - this.size * 4;
        i += this.size
      ) {
        for (
          let j = this.size * 5;
          j < this.context.width - this.size * 4;
          j += this.size * 5
        ) {
          this.obstacle.push(
            new Obstacle(i, j, this.size, this.size, this.color, this.context)
          );
        }
      }
      break;
    case 6:
      for (
        let i = this.size * 2;
        i < this.context.width - this.size * 2;
        i += this.size * 3
      ) {
        for (
          let j = this.size * 2;
          j < this.context.width;
          j += this.size * 4
        ) {
          this.obstacle.push(
            new Obstacle(i, j, this.size, this.size, this.color, this.context)
          );
        }
      }
      break;
    case 3:
      for (
        let i = this.size * 2;
        i < this.context.width - this.size * 2;
        i += this.size
      ) {
        for (
          let j = this.size * 2;
          j < this.context.width;
          j += this.size * 5
        ) {
          if (
            !(
              i <= this.context.width / 2 + this.size * 4 &&
              i >= this.context.width / 2 - this.size * 4
            )
          )
            this.obstacle.push(
              new Obstacle(i, j, this.size, this.size, this.color, this.context)
            );
        }
      }
      break;
    case 5:
      for (
        let j = this.size * 4;
        j < this.context.width - this.size * 4;
        j += this.size
      ) {
        for (
          let i = this.size * 5;
          i < this.context.width - this.size * 4;
          i += this.size * 5
        ) {
          this.obstacle.push(
            new Obstacle(i, j, this.size, this.size, this.color, this.context)
          );
        }
      }
      break;
  }
  this.drawLevel = function () {
    for (let i in this.obstacle) {
      this.obstacle[i].drawObstacle();
    }
  };
}
