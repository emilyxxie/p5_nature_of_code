var walker;
// distance between dots
var distance = 6;

function setup() {
  createCanvas(screen.availWidth, screen.availHeight);
  randomWalker = new RandomWalker();
}

function draw() {
  randomWalker.walk();
  randomWalker.display();

}

function RandomWalker() {

  this.x = width / 2;
  this.y = height / 2;
  this.r = 100;

  this.walk = function() {
    var move = floor(random(4));
    if (move == 0) {
      this.x -= distance;
    } else if (move == 1) {
      this.y -= distance;
    } else if (move == 2) {
      this.x += distance;
    } else if (move == 3) {
      this.y += distance;
    }

    if (move <= 1) {
      this.r += 20;
      // this.b -= 20;
    } else {
      this.r -= 20;
      // this.b += 20;
    }

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
    this.r = constrain(this.r, 0, 255);
  }

  this.display = function() {
    noStroke();
    fill(this.r, 0, 0);
    ellipse(this.x, this.y, distance - 2, distance - 2);
  }

}