var orbs = [];
var attractor;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  attractor = new Attractor();
  for (var i = 0; i <= 10; i++) {
    orb = new Orb();
    orbs.push(orb);
  }
}

function draw() {
  background(255);
  orbs.forEach(function(orb) {
    attraction = attractor.calculateAttractionForce(orb);

    orb.applyForce(attraction);

    orb.move();

    attractor.display();
    orb.display();
  });

}

// NOTE: issue with mouse starting in wrong place.need to subtract somewhere

function Orb() {
  this.position = createVector(random(0, width / 2), random(0, height / 2));
  this.vectorAcceleration = createVector(0, 0);
  this.size = random(1);
  this.acceleration = createVector();
  this.velocity = createVector();
  this.g = random(0, 255);

  this.display = function() {
    fill(150, 150, this.g, 20);
    stroke(0);
    ellipse(this.position.x, this.position.y, this.size * 20, this.size * 20);
  }

  this.applyForce = function(force) {
    // acceleration = force / size
    // this accounts for changes in force depending on object size
    var force = p5.Vector.div(force, this.size);
    this.acceleration.add(force);
  }

  // moves towards orb towards mouse attractor
  this.move = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

}

function Attractor() {

  this.position = createVector(width / 2, height / 2);
  this.size = 20;
  this.g = 2; // the gravitational constant

  this.calculateAttractionForce = function(orb) {
    var force = p5.Vector.sub(this.position, orb.position);
    var distance = force.mag();
    // create direction of force. This will either be 1 or -1
    force.normalize();
    distance = constrain(distance, 5, 25); // constrain distance of force
    // now, get the strength of force
    var strength = (this.g * this.size * orb.size) / (distance * distance);
    // multiply strength and direction of the force to get gravitational attraction
    force.mult(strength);
    return force;
  }

  this.move = function() {
    this.position = createVector(mouseX, mouseY);
  }

  this.display = function() {
    fill(150, 150, 60, 20);
    stroke(0);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }


}