var balls = [];

function setup() {
  createCanvas(screen.availWidth, screen.availHeight);
  for (var i = 0; i <= 5; i++) {
    ball = new Ball();
    balls.push(ball);
  }
  console.log(balls);
}

function draw() {
  background(255);
  balls.forEach(function(ball) {
    gravity = createVector(0, 0.3);
    gravity.mult(ball.size);
    ball.applyForce(gravity);
    wind = createVector(-1, 0);
    if (mouseIsPressed) {
      ball.applyForce(wind);
    }
    ball.render();
    ball.update();
  });

}

function Ball() {
  this.location = createVector(random(width), height / 2);
  this.velocity = createVector();
  this.acceleration = createVector();
  this.size = random(100);

  this.applyForce = function(force) {
    var force = p5.Vector.div(force, this.size);
    this.acceleration.add(force);
  }

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
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
    fill(0, 40);
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }
}



