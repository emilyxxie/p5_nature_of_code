var lsys;
var turtle;
var startString = ['F'];
var rotation = 22.5;
var clicks = 0;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  var rule = new Rule().plantA;

  var initialLength = height / 4.5;
  turtle = new Turtle(initialLength, rotation);
  // turtle.initiate();

  lsys = new LSystem(startString, rule, turtle);
  // for (var i = 0; i <= generations; i++) {
  //   lsys.generate();
  // }
  // console.log(lsys.axiom);
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
*/
function Rule() {
  this.plantA = {
    a: [
      'F', 'F', '+', '[', '+', 'F', '-', 'F', '-', 'F',
      ']', '-', '[', '-', 'F', '+', 'F', '+', 'F', ']'
    ]
  }


  this.plantC = {
    a: ['F', 'F'],
    b: [
      '[', 'F', '-', '[', '[', 'X', ']', '+', 'X', ']',
      '+', 'F', '[', '+', 'F', 'X', ']', '-', 'X'
      ]
  }

  this.plantB = {
    a: ['F', 'F'],
    b: [
          'F', '-', '[', '[', 'G', ']', '+', 'G', ']',
          '+', 'F', '[', '+', 'F', 'G', ']', '-', 'G'
        ]
  }
}

function LSystem(axiom, rule, turtle) {
  this.axiom = axiom;
  this.rule = rule;
  this.turtle = turtle;

  this.generate = function() {
    var nextString = [];
    var that = this;
    this.axiom.forEach(function(character) {
      if (character == 'F') {
        that.rule.a.forEach(function(charA) {
          nextString.push(charA);
        });
      } else if (character == 'X') {
          that.rule.b.forEach(function(charB) {
            nextString.push(charB);
        });
      }
      else {
        nextString.push(character);
      }
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

function Turtle(length, degreeRotation) {
  this.length = length;
  this.rotateRight = radians(degreeRotation);
  this.rotateLeft = -radians(degreeRotation);
  this.x = 0;
  this.y = 0;

  this.shrink = function() {
    this.length = this.length / 2;
  }

}

function mouseClicked() {
  if (clicks <= 4) {
    lsys.generate();
    turtle.shrink();
  }
  clicks++;
}
