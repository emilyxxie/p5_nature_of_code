var lineX = 0;
var lineWidth = 2;
var randomThreshold = 1.15;
var randomNumberTotal = 2;

function setup() {
  createCanvas(800, 800);
}


function draw() {
  var create = false;
  // draws line of randomly generated height that gets increasingly taller on average.
  // spare time: get the "dips" in the graph to get increasingly smaller
  while (!create) {
    var randomNumber = random(randomNumberTotal);
    if (randomNumber < randomThreshold) {
      randomNumberTotal = randomNumberTotal * 1.025;
      randomThreshold = randomThreshold * randomThreshold;
      strokeWeight(lineWidth);
      lineX += lineWidth;
      line(lineX, height, lineX, height - randomNumber);
      create = true;
    }
  }
}