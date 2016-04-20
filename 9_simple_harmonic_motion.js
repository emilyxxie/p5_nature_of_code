/*
  y = sin(x)
  Looks like a nice smooth curve
  we can use this to our advantage to model different things on a screen
  Waves have different characteristics:
    1) amplitude
      Amplitude is the differnece between max and min
    2) period
      How long it takes before it repeats
      Smaller period, faster oscillations
    3) frequency
      How many cycles in one unit of time

      sin will always be between 1 and -1
    x = AMP * sin(_______);

*/

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
