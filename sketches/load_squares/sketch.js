var thingCount = 2;
var thingRadius = 60;
var distance = 40;

function setup() {
  createCanvas(windowWidth,400);
  noFill();
  //saveFrames("out","png",30,25);
}

function draw() {
  background(255);
  thingCount = map(cos(frameCount/40),-1,1,-10,10);
  distance = map(sin(frameCount/40),-1,1,60,10);
  //thingRadius = map(sin(frameCount/20),-1,1,0,100);
  translate(width/2, height/2);
  for (var i = 0; i < thingCount; i++) {
    drawThing(distance*(i-(thingCount-1)/2),0,thingRadius, 255/thingCount*i);
  }
  for (var i = 0; i > thingCount; i--) {
    drawThing(distance*(i-(thingCount-1)/2),0,thingRadius, 255/thingCount*i);
  }
}

function drawThing(x,y,r,c) {
  //fill(c,100,100,1);
  stroke(c);
  beginShape();
    vertex(x-r, y);
    vertex(x, y-r);
    vertex(x+r, y);
    vertex(x,y+r);
    vertex(x-r, y);
  endShape();
}
