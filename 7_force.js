var balls = [];

function setup() {
  createCanvas(screen.availWidth, screen.availHeight);
  for (var i = 0; i <= 5; i++) {
    ball = new Ball();
    balls.push(ball);
  }
}

// task: create a pool of liquid.
// Once the ball hits the liquid, apply drag force to it.

function draw() {
  background(255);
  balls.forEach(function(ball) {
    gravity = createVector(0, 0.3);
    gravity.mult(ball.size);
    ball.applyForce(gravity);
    wind = createVector(-1, 0);
    ball.applyForce(wind);
    // to calculate drag:
    // speed squared * drag constant * inverse of velocity (so this means velocity * -1)
    // speed is the same as magnitude
    // as magnitude is the distance between two points
    c = 1;
    speed = ball.velocity.mag();
    dragMagnitude = c * speed * speed;
    // get a copy of the velocity
    // multiply by -1, as it is velocity-resistant
    dragForce = ball.velocity.copy();
    dragForce.mult(-1).normalize();
    dragForce.mult(dragMagnitude);
    if (mouseIsPressed) {
      ball.applyForce(dragForce);
    }
    // get a copy of the velocity vector, multiply by -1
    // imply that it is an opposing force
    // scale it accordingly
    // then apply.
    friction = ball.velocity.copy();
    friction = friction.mult(-0.03);
    ball.applyForce(friction);
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
    // acceleration = force / size
    // this accounts for changes in force depending on object size
    var force = p5.Vector.div(force, this.size);
    this.acceleration.add(force);
  }

  this.update = function() {
    // by adding acceleration to velocity every iteration
    // we are simulating increasing velocity
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



