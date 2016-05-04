var lsys;
var mover;
var startString = ['F'];
var rotation = 22.5;
var generations = 4;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(255);
  var rule = new Rule().plantA;

  var initialLength = height / 20;
  var turtle = new Turtle(initialLength, rotation);
  turtle.initiate();

  lsys = new LSystem(startString, rule, turtle);
  // for (var i = 0; i <= generations; i++) {
  //   lsys.generate();
  // }
  // console.log(lsys.axiom);
}

function draw() {
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
    ],
    angle: 22.5,
  }

  this.plantB = {
    a: ['F', 'F'],
    b: [
          'F', '-', '[', '[', 'G', ']', '+', 'G', ']',
          '+', 'F', '[', '+', 'F', 'G', ']', '-', 'G'
        ],
    angle: 22.5,
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
      } else {
        nextString.push(character);
      }
      // } else if (character == 'G') {
      //   that.rule.b.forEach(function(charB) {
      //     nextString.push(charB);
      //   });
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
      }
    });
  }
  this.turtle.shrink();
}

function Turtle(length, degreeRotation) {
  this.length = length;
  this.rotateRight = radians(degreeRotation);
  this.rotateLeft = -radians(degreeRotation);
  this.x = 0;
  this.y = 0;

  this.initiate = function() {
    translate(width/2, height - 50);
  }

  this.shrink = function() {
    this.length = this.length / 5;
  }

}

function mouseClicked() {
  lsys.generate();
}
