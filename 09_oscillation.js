var radius = 150;
var angle;
var aVelocity = 0;
var aAcceleration = 0.001;

function setup() {
  angle = PI / 4;
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  var x = radius * cos(angle);
  var y = radius * sin(angle);
  background(0);

  translate(width / 2, height / 2);
  stroke(255);
  line(0,0,x,y);
  ellipse(x, y, 50, 50);

  angle += aVelocity;
  aVelocity += aAcceleration;

  aVelocity = constrain(aVelocity, 0, 0.1);

}
