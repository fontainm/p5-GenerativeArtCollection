var r = 150;

function setup() {
  createCanvas(windowWidth,windowHeight);
  noFill();
  stroke(255);
  angleMode(DEGREES);
  background(255);
}

function draw() {
  translate(width/2, height/2);
  scale(map(sin(frameCount/20),-1,1,0,2));
  rotate(map(cos(frameCount/2),-1,1,-360,360));
  for (var i = 0; i < 8; i++) {
    scale(map(sin(frameCount),-1,1,1,1.2));
    if(random(1) < 0.6) stroke(120,80,70,20-i*2);
    else stroke(190,120,120,20-i*2);
    beginShape();
      vertex(cos(120)*r,sin(120)*r);
      vertex(cos(240)*r,sin(240)*r);
      vertex(cos(360)*r,sin(360)*r);
    endShape(CLOSE);
  }
}
