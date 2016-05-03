var currentString = [];
var nextString = [];
var yStart = 10;
var charSize = yStart;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);
  var totalChars = random(1, 5);
  for (var i = 0; i <= totalChars; i++) {
    var letter = Math.round(Math.random()) ? 'a' : 'b';
    currentString.push(letter);
  }
  currentString.push("a", "a", "b");
}


function draw() {
  var words = currentString.toString();
  fill(255);
  textSize(charSize);
  text(words, 10, yStart);
}

function mousePressed() {
  currentString.forEach(function(letter) {
    // var letter = currentString[index];
    if (letter == 'a') {
      nextString.push('a', 'b', 'a');
    } else if (letter == 'b') {
      nextString.push('b', 'b', 'b');
    }
  });
  currentString = nextString;
  yStart += charSize;
}