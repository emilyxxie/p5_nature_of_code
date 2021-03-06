var noiseFactor = 0;
var totalFrames = 0;

function setup() {
  createCanvas(screen.availWidth, screen.availHeight);
  mappedXWidth = width;
  background(0);
  stroke(255, 10);
  noFill();
}

function draw() {
  totalFrames++;
  if (totalFrames > 5000) {
    background(255);
    totalFrames = 0;
  }
  var xAnchor = width / 2;

  var x1 = width * noise(noiseFactor + width / 5),
      y1 = height * noise(noiseFactor + height / 4),
      x2 = width * noise(noiseFactor + width / 2),
      y2 = height * noise(noiseFactor + height / 2),
      x3 = width * noise(noiseFactor + width / 0.1),
      y3 = height * noise(noiseFactor + height / 0.1),
      x4 = width * noise(noiseFactor + width / 0.2),
      y4 = height * noise(noiseFactor + height / 0.2);
  bezier(x1, y1, x2, y2, x3, y3, xAnchor, height);
  noiseFactor += 0.003;

}
