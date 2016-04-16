var ball;
var yCounter = 0;

function setup() {
  createCanvas(800, 800);
  background(0);
  ball = new Ball();
}

function draw() {
  fill(255);
  background(0);
  ball.draw();
  ball.move();
}

function Ball() {
  this.location = createVector(width / 2, height / 2);
  this.velocity = createVector(2, 3);
  this.acceleration = createVector(0, 0.2);

  this.move = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    if (this.velocity.y > 0) {
      this.location.y++;
    }
    if (this.location.y >=height) {
      yCounter++;
    }
    console.log(yCounter);
    if (yCounter > 20) {
      this.velocity.x = this.velocity.x / 1.005;
    }
    this.bounce();
  }

  this.draw = function() {
    this.location.y = constrain(this.location.y, 0, height);
    ellipse(this.location.x, this.location.y, 20, 20);
  }

  this.bounce = function() {
    if (this.location.x > width || this.location.x < 0) {
      // making it negative will change the direction
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.y > height || this.location.y < 0) {
      this.velocity.y = this.velocity.y * -1;
    }
  }
}