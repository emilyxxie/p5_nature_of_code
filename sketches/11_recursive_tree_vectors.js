var degreeRotate = 60;
var times = 0;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(255);
  noLoop();
}

function draw() {
  // evaluate trunk and return endpoint vector
  // to pass off to drawBranch()
  var endPoints = drawTrunk();
  drawBranch(endPoints[0], endPoints[1], 0);
}

function drawTrunk() {
  translate(width / 2, height);
  var trunkStart = createVector(0, 0);
  var trunkEnd = createVector(0, -(height / 3));
  line(
    trunkStart.x,
    trunkStart.y,
    trunkEnd.x,
    trunkEnd.y
  );
  return [trunkStart, trunkEnd];
}

function drawBranch(start, end, color) {
  times++;

  var branchStart = end.copy();
  var branchEnd = p5.Vector.sub(start, end);
  branchEnd.mult(2/3);

  console.log(branchEnd);

  stroke(color);
  line(
    branchStart.x,
    branchStart.y,
    branchEnd.x,
    branchEnd.y
  );

  if (times >= 2) {
    return;
  }

  if (p5.Vector.dist(branchStart, branchEnd) >= 20) {
    // right branch
    push();
    var radiansRight = radians(degreeRotate);
    branchEnd.rotate(PI / 4);
    drawBranch(branchStart.copy(), branchEnd.copy(), 180);
    pop();

    // // left branch
    // push();
    // var radiansLeft = radians(-degreeRotate);
    // branch.rotate(radiansLeft);
    // drawBranch(endPoint, branch);
    // pop();

  }
}



