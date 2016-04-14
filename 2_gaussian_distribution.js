function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(8);
}


function draw() {
  background(255);
  translate(width/2, height/2);
  for (var i = 0; i <= 360; i++) {
    rotate(1);
    stroke(1);
    var length = randomGaussian(0, 10);
    var sd = 10;
    var length = length * sd;
    line(0, 0, length, 0);
  }
}
