// array lists in order to manage systems
// in order to model a particle system, we need to create a class to create a particle.
var particles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (var i = 0; i <= 10; i++) {
    particle = new Particle();
    particles.push(particle);
  }
}

function draw() {
  background(255);
  particles.push(new Particle());

  particles.forEach(function(particle, index) {
    particle.move();
    particle.fade();
    particle.display();
    if (particle.isDead()) {
      particles.splice(index, 1);
    }
  });
}

function Particle() {
  // slightly randomize the start positions
  var halfWidth = width / 2;
  this.position = createVector(
    random(halfWidth - 20, halfWidth + 20),
    random(20, 100)
  );
  this.velocity = createVector(
    random(-1, 1),
    // to begin with, velocity goes slightly upward
    // until acceleration in opposition direction
    // surpasses it
    // this creates a "bouncing" effect
    random(-1, 0)
  );
  this.acceleration = createVector(0, 0.08);
  this.lifespan = 0;
  this.fadeInterval = 1.8;
  this.size = 20;
  this.r = 0;
  this.g = 0;
  this.b = 0;

  this.move = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  this.fade = function() {
    this.lifespan += this.fadeInterval;
    this.r += this.fadeInterval;
    this.g += this.fadeInterval;
    this.b += this.fadeInterval;
  }

  this.display = function() {
    stroke(this.lifespan);
    strokeWeight(2);
    fill(this.r, this.g, this.b, 95);
    ellipse(
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  // remove particles so that they are no longer stored
  // so that the array doesn't infinitely grow
  this.isDead = function() {
    return this.lifespan >= 255;
  }
}