var lineCount;
var distance = 10;

function setup() {
  createCanvas(windowWidth,windowHeight);
  strokeWeight(5);
  noFill();
  colorMode(HSB);
}

function draw() {
  lineCount = map(cos(frameCount/50),-1,1,40,50);
  background(190,40,20);
  translate(width/2,height/2);
  rotate(frameCount/40);

  for (var i = 1; i < lineCount; i++) {
    distance = width/lineCount/2;
    stroke(165+i*(40/lineCount),80,80);
    arc(0, 0,
      map(cos(frameCount/50),-1,1,width-(i*distance),(i*distance)),
      map(cos(frameCount/50),-1,1,width-(i*distance),(i*distance)),
      0, 6*TWO_PI/lineCount);
    rotate(distance/8);
  }
}
