// var degreeRotate;
var trees = [];

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);
  for (var i = 0; i <= 8; i++) {

    var xAxis = noise(i) * width;
    var branchSize = random(height / 10, height / 2);
    var color = branchSize / 2;
    var tree = {
      xAxis: xAxis,
      branchSize: branchSize,
      degreeRotate: radians(random(10, 50)),
      color: color
    }
    trees.push(tree);
  }
  noLoop();
}

function draw() {
  // tree one
  trees.forEach(function(tree) {
    push();
    translate(tree.xAxis, height);
    // debugger;
    drawBranch(
      tree.branchSize,
      tree.degreeRotate,
      tree.color
    );
    pop();

  });
}

function drawBranch(branchLength, degreeRotate, color) {
  branchLength = branchLength * (2/3);

  var strokeWidth = branchLength / 12;
  strokeWeight(strokeWidth);
  stroke(color);
  line(0, 0, 0, -branchLength);
  translate(0, -branchLength);

  if (branchLength >= 2) {
    // left branch
    push();
    rotate(-degreeRotate);
    drawBranch(branchLength, degreeRotate, color);
    pop();
    // right branch
    push();
    rotate(degreeRotate);
    drawBranch(branchLength, degreeRotate, color);
    pop();

  }
}

