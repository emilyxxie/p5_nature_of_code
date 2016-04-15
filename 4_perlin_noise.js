var noiseFactor = 0;

function setup() {
  createCanvas(screen.availWidth / 2, screen.availHeight /2 );
  mappedXWidth = width;
  background(255);
}

function draw() {
  stroke(0);
  noFill();
  var x1 = width * noise(noiseFactor + 10);
  var y1 = height * noise(noiseFactor + 20);
  var x2 = width * noise(noiseFactor + 40);
  var y2 = height * noise(noiseFactor + 60);
  var x3 = width * noise(noiseFactor + 70);
  var y3 = height * noise(noiseFactor + 80);
  var x4 = width * noise(noiseFactor + 90);
  var y4 = height * noise(noiseFactor + 100);
  bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  noiseFactor += 0.0025;
}