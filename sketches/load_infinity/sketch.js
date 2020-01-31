var x = 0;
var y = 0;
var t;

var lines = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  smooth();
  lines.push(new p5.Vector(0,0));
  strokeWeight(2);
}

function draw() {
  background(40,50,60);

  t = frameCount/40;
  translate(width/2, height/2);
  //rotate(-y/200);
  //scale(abs(x/100)+1);
  x = map(sin(t),-1,1,200,-200);
  y = map(sin(t*2),-1,1,-50,50);
  z = map(sin(t),-1,1,-100,100);
  lines.push(new p5.Vector(x,y));
  for (var i = 1; i < lines.length; i++) {
    //strokeWeight(15-i/8);
    stroke(100,220,240, (i*2));
    line(lines[i-1].x, lines[i-1].y, lines[i].x, lines[i].y);
    //line(lines[i-1].y, lines[i-1].y, lines[i].x, lines[i].y);
    line(lines[i-1].y, lines[i-1].x, lines[i].y, lines[i].x);
    //line(lines[i-1].x, lines[i-1].x, lines[i].y, lines[i].x);
  }
  if(lines.length > 120) lines.shift();
}
