function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(8);
  mic = new p5.AudioIn();
  mic.start();
}


function draw() {
  background(255);
  translate(width/2, height/2);
  // trying to get this hooked into mic -- doesn't seem to work
  // at the moment. don't know why.
  var micLevel = mic.getLevel();
  for (var i = 0; i <= 360; i++) {
    rotate(1);
    stroke(1);
    var length = randomGaussian(0, micLevel);
    var sd = 10;
    var length = length * sd;
    line(0, 0, length, 0);
  }
}
