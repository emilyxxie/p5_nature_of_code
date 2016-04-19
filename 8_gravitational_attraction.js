// sketches: create a cluster of gravitationally attracted orbs
// in varying colors
// that follows around your mouse
var orb;
var attractor;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  orb = new Orb();
  attractor = new Attractor();
}

function draw() {
  background(255);


  orb.display();
  attractor.display();

  var attraction = attractor.attract(orb);
  orb.applyForce(attraction);

  orb.move();
  attractor.move();
}

function Orb() {
  this.size = random(20, 100);
  this.color = random(0, 255);
  this.location = createVector(200, 300);
  this.acceleration = createVector();
  this.velocity = createVector(2, 0);
  this.topSpeed = 10;

  this.display = function() {
    strokeWeight(3);
    fill(150, 150, this.color, 70);
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  this.applyForce = function(force) {
    var force = p5.Vector.div(force, this.size);
    this.acceleration.add(force);
  }

  this.move = function() {
    this.acceleration = attractor.location.sub(this.location);
    this.velocity.limit(this.topSpeed);
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

}

function Attractor() {
  this.location = createVector();
  this.size = 100;
  // further math -- maybe we can calculate actual representative mass
  // by using sizd and a fixed density
  // mass = volume * density
  // if we assume a density of 1, then we can just use volume as mass
  this.g = 1; // the gravitational constant

  this.attract = function(orb) {
    // create the force of attraction
    var force = p5.Vector.sub(this.location, orb.location);
    var distance = force.mag();
    distance = constrain(distance, 5, 200);
    // create direction of force. This will either be 1 or -1
    force.normalize();
    // now, get the strength of force
    var strength = (this.g * this.size * orb.size) / (distance * distance);
    // multiply strength and direction of the force to get gravitational attraction
    force.mult(strength);
    return force;
  }

  this.display = function() {
    strokeWeight(3);
    fill(150, 150, this.color, 70);
    // ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  this.move = function() {
    this.location = createVector(mouseX, mouseY);
  }

}

function windowResized() {
  // maybe use a global variable to store the size of the canvas beforehand
  // and the size of the canvas afterward, and then use that to re-calculate
  // the position of items that use the height and width vars
  // actually, I don't need the above
  resizeCanvas(window.innerWidth, window.innerHeight);
}