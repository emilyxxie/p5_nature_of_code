var img;

function setup(){
  createCanvas(
    window.innerWidth,
    window.innerHeight,
    WEBGL
  );
}

function draw(){

  background(0);
  for(var x = 0; x < 5; x++){
    rotateY(frameCount * 0.001);
    push();
    for(var i = 0; i < 60; i++){
      translate(
        tan(frameCount * 0.002 + x) * 100,
        tan(frameCount * 0.0001 + x) * 50,
        sin(i * 0.001)
      );
      rotateZ(frameCount * 0.002);
      push();
      sphere(13);
      pop();
    }
    pop();
    rotateX(frameCount * 0.001);
  }
}