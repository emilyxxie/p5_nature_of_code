var yNoise = 0;
var mappedXWidth;

function setup() {
  createCanvas(screen.availWidth / 2, screen.availHeight /2 );
  mappedXWidth = width;

}

function draw() {
  background(0);
  noFill();
  stroke(255);
  beginShape();
  for (var x = 0; x < width; x++) {
    mappedX = map(x, 0, mappedXWidth, 0, 2);
    var y = height * noise(mappedX, yNoise);
    vertex(x, y);
  }
  yNoise += 0.01;
  endShape();
}