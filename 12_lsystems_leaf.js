// render 5 times, sleep for 5 seconds, clear
// cycle through each plant
var lsys;
// var plant;
var turtle;
var clicks = 0;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  plant = new Plant().plantH;
  turtle = new Turtle(plant);
  lsys = new LSystem(plant, turtle);
}

function draw() {
  background(0);
  translate(
    width / 2,
    height - 100
  );
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
  // bush
  this.plantA = {
    axiom: 'F',
    rules: {
      F: 'FF-[-F+F+F]+[+F-F-F]'
    },
    rotation: 22.5,
    lengthFactor: 0.5,
    initialLength: height / 4.5,
    maxClicks: 4
  };

  this.plantB = {
    axiom: 'F',
    rules: {
      F: 'F[+F]F[-F][F]'
    },
    rotation: 20,
    lengthFactor: 0.5,
    initialLength: height / 3,
    maxClicks: 5
  };

  this.plantC = {
    axiom: 'X',
    rules: {
      X: 'F-[[X]+X]+F[+FX]-X',
      F: 'FF'
    },
    rotation: 20,
    lengthFactor: 0.5,
    initialLength: height / 3.5,
    maxClicks: 6
  }

  this.plantD = {
    axiom: 'X',
    rules: {
      X: 'F[+X][-X]FX',
      F: 'FF'
    },
    rotation: 25.7,
    lengthFactor: 0.5,
    initialLength: height / 3,
    maxClicks: 8
  };

  this.plantE = {
    axiom: 'X',
    rules: {
      X: 'F[+X]F[-X]+X',
      F: 'FF'
    },
    rotation: 20,
    lengthFactor: 0.5,
    initialLength: height / 3,
    maxClicks: 8
  }

  // my own pattern - japanese waves-esque
  this.plantF = {
    axiom: 'X',
    rules: {
      X: 'FFF-[+F+[F]+F[X]+X]+F[+FX]-X',
      F: 'FF'
    },
    rotation: 22.5,
    lengthFactor: 0.5,
    initialLength: height / 6,
    maxClicks: 6
  };

  // the cookie monster
  this.plantG = {
    axiom: 'X',
    rules: {
      X: '-[++[]+F[X]+X]+F[+FX]-X',
      F: 'FF'
    },
    rotation: 22.5,
    lengthFactor: 0.5,
    initialLength: height / 2,
    maxClicks: 8
  };

  // spiral fan
  this.plantH = {
    axiom: 'X',
    rules: {
      X: '-[++[]+[X]+X]+F[+FX]-X',
      F: 'FF'
    },
    rotation: 20,
    lengthFactor: 0.5,
    initialLength: height / 2.5,
    maxClicks: 7
  }


}

function LSystem(plant, turtle) {
  this.axiom = plant.axiom;
  this.rules = plant.rules;
  this.turtle = turtle;

  this.generate = function() {
    var nextString = [];
    // dynamically generate a given plant's rules
    for (var i = 0; i <= this.axiom.length; i++) {
      var character = this.axiom.charAt(i);
      // dynamically generate the rules
      if (character in this.rules) {
        nextString.push(
          this.rules[character]
        );
      } else {
        nextString.push(character);
      }
    }
    this.axiom = nextString.toString();
  }


  this.render = function() {
    for (var i = 0; i < this.axiom.length; i++) {
      var character = this.axiom.charAt(i);
      switch(character) {
        case 'F':

          line(0, 0, 0, -this.turtle.length);
          translate(0, -this.turtle.length);
          break;
        case 'G':
          translate(0, -this.turtle.length);
          break;
        case '+':
          rotate(this.turtle.rotateRight);
          break;
        case '-':
          rotate(this.turtle.rotateLeft);
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
    }
  }

}

function Turtle(plant) {
  this.length = plant.initialLength;
  this.rotateRight = radians(plant.rotation);
  this.rotateLeft = -radians(plant.rotation);
  this.lengthFactor = plant.lengthFactor;

  this.shrink = function() {
    this.length = this.length * this.lengthFactor;
  }

}

function mouseClicked() {
  if (clicks <= plant.maxClicks) {
    lsys.generate();
    turtle.shrink();
  }
  clicks++;
}
