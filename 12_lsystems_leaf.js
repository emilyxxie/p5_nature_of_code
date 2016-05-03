var lsys;
var mover;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(255);

  var startString = ['F'];
  var rule = new Rule().plantA;

  var turtle = new Turtle(height / 3);
  turtle.initiate();

  lsys = new LSystem(startString, rule, turtle);
  lsys.generate();
  lsys.generate();
  noLoop();
}

function draw() {
  console.log(lsys.axiom);
  lsys.render();
}

/*
Rule contains all the rules for various plants
Employs standard rule set:
    F: Draw a line and move forward
    G: Move forward (without drawing a line)
    +: Rotate right
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
          console.log(that.turtle.length);
          line(0, 0, -that.turtle.length, 0);
          // var segmentLength = -that.length;
          // line(0, 0, 0, -that.length);
          translate(-that.length, 0);
          // that.turtle.shrink();
          break;
        case 'G':
          translate(0, -that.turtle.length);
          that.turtle.shrink();
          break;
        case '+':
          console.log("HERE I AM");
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
}

function Turtle(length, degreeRotation) {
  this.length = length;
  this.rotateRight = radians(degreeRotation);
  this.rotateLeft = -radians(degreeRotation);
  this.x = 0;
  this.y = 0;


  this.initiate = function() {
    translate(width/2, height - 100);
  }

  this.shrink = function() {
    this.length = this.length / 3;
  }

}
