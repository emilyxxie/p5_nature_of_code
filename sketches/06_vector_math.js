function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(255);
  var mouseVector = createVector(mouseX, mouseY);
  var center = createVector(width/2, width/2);

  // we need to subtract here in order to account for the translate.
  mouseVector.sub(center);
  // keep direction, normalize to a scale of 1.
  mouseVector.normalize();
  mouseVector.mult(700);
  translate(width / 2, height / 2);
  ellipse(0, 0, 10, 10);
  line(0, 0, mouseVector.x, mouseVector.y);
}

