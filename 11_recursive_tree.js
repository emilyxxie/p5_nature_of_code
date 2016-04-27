var trees = [];
var marginX = 150;
var bigTreeMargin = 100;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);
  generateTrees();
  noLoop();
}

function generateTrees() {
  numTrees = random(3, 7);
  for (var i = 0; i <= numTrees; i++) {
    var xAxis = random(marginX, width - marginX);
    xAxis = constrain(xAxis, marginX, width - marginX);//random(marginX, width - marginX);
    var branchSize = random(height / 12, height / 5);
    var color = branchSize / 1.9;
    var tree = {
      xAxis: xAxis,
      branchSize: branchSize,
      degreeRotate: radians(random(10, 40)),
      color: color
    }
    trees.push(tree);
  }

  numBigTrees = random(1, 3);
  for (var i = 0; i <=  numBigTrees; i++) {
    var xAxis = random((marginX + bigTreeMargin), width - (marginX + bigTreeMargin));
    var branchSize = random(height / 4, height / 2);
    var color = branchSize / 1.9;
    var tree = {
      xAxis: xAxis,
      branchSize: branchSize,
      degreeRotate: radians(random(10, 40)),
      color: color
    }
    trees.push(tree);
  }

  trees.sort(function (a, b) {
    if (a.branchSize > b.branchSize) {
      return 1;
    }
    if (a.branchSize < b.branchSize) {
      return -1;
    }
    return 0;
  });
}

function draw() {
  trees.forEach(function(tree) {
    push();
    translate(tree.xAxis, height);
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

function mouseClicked() {
  background(0);
  // reset trees
  trees = [];
  generateTrees();
  redraw();
}

function windowResized() {
  resizeCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);
  redraw();
  // mouseClicked();
}
