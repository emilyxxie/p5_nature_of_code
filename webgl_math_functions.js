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
        tan(frameCount * 0.01 + x) * 100,
        tan(frameCount * 0.001 + x) * 20,
        i * 0.0001
      );
      rotateZ(frameCount * 0.002);
      push();
      torus(8);
      pop();
    }
    pop();
    rotateX(frameCount * 0.001);
  }
}