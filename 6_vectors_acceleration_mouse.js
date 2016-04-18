var circle;
var mouseVector;
// acceleration towards mouse

function setup() {
  createCanvas(screen.availWidth, screen.availHeight);
  circle = new Circle();
}

function draw() {
  background(255);
  circle.drawCircle();
  circle.move();
}

function Circle() {
  this.position = createVector(0, 0);
  this.vectorAcceleration = createVector(0, 0);
  this.size = 20;
  this.acceleration = createVector();
  this.topSpeed = 5;
  this.velocity = createVector();

  this.drawCircle = function() {
    fill(0);
    stroke(0);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  // moves towards mouse
  this.move = function() {
    var mouseVector = createVector(mouseX, mouseY);
    this.acceleration = mouseVector.sub(this.position);
    this.acceleration.setMag(0.3);
    this.velocity.limit(5);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);


  }

}

