var x = 0;
var y = 0;
var t;

var lines = [];

function setup() {
  createCanvas(800,800, WEBGL);
  background(30);
  smooth();
  lines.push(new p5.Vector(0,0));
}

function draw() {
  background(30);

  t = frameCount/40;
  //translate(width/2, height/2);
  //rotate(-y/200);
  //scale(abs(x/100)+1);
  rotateY(t/2);
  rotateX(t/2);
  x = map(sin(t),-1,1,200,-200);
  y = map(sin(t*2),-1,1,-50,50);
  z = map(sin(t),-1,1,-100,100);
  lines.push(new p5.Vector(x,y));
  for (var i = 1; i < lines.length; i++) {
    //strokeWeight(15-i/8);
    stroke(100,220,240, (i*2));
    line(lines[i-1].x, lines[i-1].y, lines[i].x, lines[i].y);
    //line(lines[i-1].y, lines[i-1].x, lines[i].y, lines[i].x);
  }
  if(lines.length > 120) lines.shift();
}
