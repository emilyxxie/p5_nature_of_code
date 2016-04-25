var currentKochLines = [];
var previousKochLines = [];
var colors = [];
var totalColors = 360;
var colorIncrement = 20;
var mouseClickedCounter = 0;

function setup() {
  background(0);
  createCanvas(window.innerWidth, window.innerHeight);
  // set up array of colors to cache
  colors = Array.apply(null, Array(totalColors)).map(function(_, num) {
    return color('hsl(' + num + ',80%, 60%)');
  });

  ///////////// now set up grid of triangles

  // here are the x-axis variables
  var triangleCountX = 5;
  // set the size of the triangle
  var triangleWidth = width / triangleCountX;

  // here are the y-axis variables
  // use Pythagorean theorum to get height of triangle
  var halfTW = triangleWidth / 2;
  var triangleHeight = (triangleWidth * triangleWidth) - (halfTW * halfTW);
  triangleHeight = sqrt(triangleHeight);
  var triangleCountY = height / triangleHeight;

  //
  var hPadding = sin(radians(60)) * (triangleWidth / 3);
  for (var i = 0; i <= triangleCountX; i++) {
    for (var j = 0; j <= triangleCountY; j++) {
      var kochGroup = createKochTriangle(
        (i * triangleWidth),
        (j * (triangleHeight + hPadding)),
        triangleWidth
      );
      currentKochLines.push(kochGroup);
    }
  }

}

function createKochTriangle(x, y, triangleWidth) {
  var color = colorIncrement;
  var start = createVector(x, y);
  var end = createVector(x + triangleWidth, y);
  var koch1 = new KochLine(start, end, color);

  // koch 2
  var kochEnd2 = end.copy();
  var point2 = p5.Vector.sub(start.copy(), kochEnd2);
  point2.rotate(-radians(60));
  kochEnd2.add(point2);
  color += colorIncrement;
  var koch2 = new KochLine(end.copy(), kochEnd2, color);

  // koch 3
  var kochEnd3 = kochEnd2.copy();
  var point3 = p5.Vector.sub(koch2.start.copy(), kochEnd3);
  point3.rotate(-radians(60));
  kochEnd3.add(point3);
  color += colorIncrement;
  var koch3 = new KochLine(kochEnd2.copy(), kochEnd3, color);

  var kochGroup = [
    koch1,
    koch2,
    koch3
  ];
  return kochGroup;
}

function draw() {
  background(0);
  currentKochLines.forEach(function(kochGroup) {
    kochGroup.forEach(function(kochLine) {
      kochLine.display();
      kochLine.colorIndex += colorIncrement;
    });
  });
}

function KochLine(start, end, color) {
  this.start = start.copy();
  this.end = end.copy();
  this.colorIndex = color;

  // get the amount that comprises of a third of the line
  this.third = p5.Vector.sub(this.end, this.start).div(3);

  this.display = function() {
    stroke(colors[this.colorIndex % totalColors]);
    strokeWeight(1);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  this.pointA = function() {
    return this.start.copy();
  }

  this.pointB = function() {
    return this.start.copy().add(this.third);
  }

  this.pointC = function() {
    var pointC = this.start.copy();
    var third = this.third.copy();
    pointC.add(third);
    third.rotate(-radians(60));
    pointC.add(third);
    return pointC;
  }

  this.pointD = function() {
    return this.end.copy().sub(this.third);
  }

  this.pointE = function() {
    return this.end.copy();
  }

  // display point for debugging purposes
  this.displayPoint = function(point) {
    ellipse(point.x, point.y, 10, 10);
  }

  this.incrementColor = function(increment) {
    this.colorIndex += increment;
    return this.colorIndex;
  }

  this.createKochGroup = function() {
    var kochGroup = [
      new KochLine(
        this.pointA(),
        this.pointB(),
        this.incrementColor(colorIncrement)
      ),
      new KochLine(
        this.pointB(),
        this.pointC(),
        this.incrementColor(colorIncrement)
      ),
      new KochLine(
        this.pointC(),
        this.pointD(),
        this.incrementColor(colorIncrement)
      ),
      new KochLine(
        this.pointD(),
        this.pointE(),
        this.incrementColor(colorIncrement)
      )
    ];
    return kochGroup;
  }
}

function mouseClicked() {
  mouseClickedCounter++;
  if (mouseClickedCounter >= 5) {
    return;
  }
  previousKochLines = currentKochLines;
  currentKochLines = [];
  previousKochLines.forEach(function(kochGroup) {
    kochGroup.forEach(function(kochLine) {
      var kochGroup = kochLine.createKochGroup();
      currentKochLines.push(kochGroup);
    });
  });
}

