var currentKochLines = [];
var previousKochLines = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  var start = createVector(0, height - 100);
  var end = createVector(width, height - 100);
  var initialKochLine = new KochLine(start, end);
  var kochGroup = [];
  kochGroup.push(initialKochLine);
  currentKochLines.push(kochGroup);
}

function draw() {
  background(255);
  currentKochLines.forEach(function(kochGroup) {
    kochGroup.forEach(function(kochLine) {
      kochLine.display();
    });
  });
}

function KochLine(start, end) {
  this.start = start.copy();
  this.end = end.copy();

  // get the amount that comprises of a third of the line
  this.third = p5.Vector.sub(this.end, this.start).div(3);

  this.display = function() {
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

  this.createKochGroup = function() {
    var kochGroup = [
      new KochLine(this.pointA(), this.pointB()),
      new KochLine(this.pointB(), this.pointC()),
      new KochLine(this.pointC(), this.pointD()),
      new KochLine(this.pointD(), this.pointE())
    ];
    return kochGroup;
  }
}

function mouseClicked() {
  previousKochLines = currentKochLines;
  currentKochLines = [];
  previousKochLines.forEach(function(kochGroup) {
    kochGroup.forEach(function(kochLine) {
      var kochGroup = kochLine.createKochGroup();
      currentKochLines.push(kochGroup);
    });
  });
}

