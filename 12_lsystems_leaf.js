// render 5 times, sleep for 5 seconds, clear
// cycle through each plant

var lsys;
var plant;
var turtle;
var startString = ['F'];
var clicks = 0;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  var plant = new Plant().plantA;
  console.log(plant);
  turtle = new Turtle(plant);

  lsys = new LSystem(plant, turtle);
}

function draw() {
  background(0);
  translate(width / 2, height - 100);
  stroke(255, 50);
  lsys.render();
}

/*

Rule contains all the rules for various plants
Employs standard rule set:
    F: Draw a line and move forward
    G: Move forward (without drawing a line)
    +: 14 right
    -: Rotate left
   [: Save current location
   ]: Restore previous location
Contains data for rotation
Stipulates how much to shrink by each generation

*/
function Plant() {
  this.plantA = {
    axiom: 'F',
    rules: {
      F: 'FF-[-F+F+F]+[+F-F-F]'
    },
    rotation: 22.5,
    sizeFactor: 0.5,
    initialLength: height / 4.5
  }

  // this.plantB = {
  //   a: [
  //     'F', 'F', '[', '+', 'F', ']', 'F', '[', '-', 'F', ']', '[', 'F', ']'
  //   ]
  //   startString = 'F',
  //   rules: {
  //     a: 'FF-[-F+F+F]+[+F-F-F]'
  //   },
  //   rotation: 22.5,
  //   sizeFactor: 0.5,
  //   initialLength: height / 4.5

  // }

  this.plantA = {
    rules: {
      a: 'FF-[-F+F+F]+[+F-F-F]'
    },
    rotation: 22.5,
    sizeFactor: 0.5
  }

  this.plantC = {
    a: ['F', 'F'],
    b: [
      '[', 'F', '-', '[', '[', 'X', ']', '+', 'X', ']',
      '+', 'F', '[', '+', 'F', 'X', ']', '-', 'X'
      ]
  }

}

function LSystem(plant, turtle) {
  this.axiom = plant.axiom;
  this.rules = plant.rules;
  this.turtle = turtle;

  this.generate = function() {
    var nextString = [];
    var that = this;
    this.axiom.forEach(function(character) {
      // dynamically generate rules here



      // if (character == 'F') {
      //   that.rule.a.forEach(function(charA) {
      //     nextString.push(charA);
      //   });
      // } else if (character == 'X') {
      //     that.rule.b.forEach(function(charB) {
      //       nextString.push(charB);
      //   });
      // }
      // else {
      //   nextString.push(character);
      // }
    });
    this.axiom = nextString;
  }

  this.render = function() {
    var that = this;
    this.axiom.forEach(function(character) {
      switch(character) {
        case 'F':
          line(0, 0, 0, -that.turtle.length);
          translate(0, -that.turtle.length);
          break;
        case 'G':
          translate(0, -that.turtle.length);
          break;
        case '+':
          rotate(that.turtle.rotateRight);
          break;
        case '-':
          rotate(that.turtle.rotateLeft);
          break;
        case '[':
          push();
          break;
        case ']':
          pop();
          break;
        default:
          break;
      }
    });
  }
}

function Turtle(plant) {
  this.length = plant.initialLength;
  this.rotateRight = radians(plant.rotation);
  this.rotateLeft = -radians(plant.rotation);
  this.sizeFactor = plant.sizeFactor;

  this.shrink = function() {
    this.length = this.length * this.sizeFactor;
  }

}

function mouseClicked() {
  if (clicks <= 4) {
    lsys.generate();
    turtle.shrink();
  }
  clicks++;
}
