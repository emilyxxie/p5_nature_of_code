var degreeRotate;

function setup() {
  degreeRotate = radians(30);
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(255);
}

function draw() {
  // tree one
  push();
  translate(width / 2, height);
  drawBranch(height / 3);
  pop();
  // tree two
  // push();

  // push();
  // translate(width / 3, height);
  // drawBranch(height / 2);
  // // pop();
  // pop();
}

function createTree() {

}


function drawBranch(branchLength) {
  branchLength = branchLength * (2/3);

  var strokeWidth = branchLength / 12;
  strokeWeight(strokeWidth);
  line(0, 0, 0, -branchLength);
  translate(0, -branchLength);

  if (branchLength >= 2) {

    push();
    rotate(-degreeRotate);
    drawBranch(branchLength);
    pop();


    push();
    rotate(degreeRotate);
    drawBranch(branchLength);
    pop();

  }
}

