var lineX = 0;
var lineWidth = 2;
var randomThreshold = 1.15;
var randomNumberTotal = 2;
var bIncrement;
var colorB = 0;

function setup() {
  createCanvas(800, 800);
  // total color divided by total strokes)
  bIncrement = 255 / (width / lineWidth);
}


function draw() {
  var create = false;
  // draws line of randomly generated height that gets increasingly taller on average.
  // spare time: get the "dips" in the graph to get increasingly smaller
  while (!create) {
    colorB += bIncrement;
    var randomNumber = random(randomNumberTotal);
    if (randomNumber < randomThreshold) {
      randomNumberTotal = randomNumberTotal * 1.025;
      randomThreshold = randomThreshold * randomThreshold;
      strokeWeight(lineWidth);
      lineX += lineWidth;
      stroke(0, 0, colorB);
      line(lineX, height, lineX, height - randomNumber);
      create = true;
    }
  }
}