var ball;

function setup() {
  createCanvas(screen.availWidth, screen.availHeight);
  ball = new Ball();
}

function draw() {
  background(255);
  ball.update();
  gravity = createVector(0, 0.3);
  ball.applyForce(gravity);
  wind = createVector(-0.2, 0);
  if (mouseIsPressed) {
    ball.applyForce(wind);
  }
  ball.render();
}

function Ball() {
  this.location = createVector(width / 2, height / 2);
  this.velocity = createVector();
  this.acceleration = createVector();
  this.size = 60;

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    console.log(this.velocity);
    this.acceleration.mult(0);
    this.bounce();
  }

  this.bounce = function() {
    if (this.location.y < 0 || this.location.y > height) {
      this.velocity.y = this.velocity.y * -1;
    } else if (this.location.x < 0 || this.location.x > width) {
      this.velocity.x = this.velocity.x * -1;
    }
    this.location.x = constrain(this.location.x, 0, width);
    this.location.y = constrain(this.location.y, 0, height);
  }

  this.render = function() {
    fill(0);
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }
}



