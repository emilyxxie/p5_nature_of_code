var a = 0;
var angularVelocity = 0;
var angularAcceleration = 0.01;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(255);
  a += angularAcceleration;
  angularVelocity += angularAcceleration;

  // changes the way rectangles are drawn
  // in other words, changes the way parameters to this are interpreted
  // first two parameters are the shape's center point
  // third and routh parameters are height and with
  rectMode(CENTER);
  // rect();
  // translate(width / 2, height /2 );
  translate(400, 600);
  fill(0);
  // rotate(PI / 4);
  rect(0, 0, 20, 80);


}
