(function () {

  if (typeof SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function (dimX, dimY) {
    this.dimX = dimX;
    this.dimY = dimY;
    this.snake = new SnakeGame.Snake(
      SnakeGame.Coord.randomPos(this.dimX, this.dimY)
    );
    this.applePos = this.appleGen();
  }

  Board.prototype.appleGen = function () {
    var randomPos = SnakeGame.Coord.randomPos(this.dimX, this.dimY);
    if (SnakeGame.Coord.collidesWithArray(randomPos, this.snake.body)) {
      this.appleGen();
    } else {
      this.applePos = randomPos;
    }
  }

  Board.prototype.snakeHitWall = function () {
    var head = this.snake.head();
    if (head[0] < 0 || head[0] >= this.dimX) {
      return true;
    } else if (head[1] < 0 || head[1] >= this.dimY) {
      return true;
    }

    return false;
  }

  Board.prototype.lose = function () {
    return this.snake.collidedWithSelf() || this.snakeHitWall();
  }

})();
