var myArcs = [];

var distance;
var stwidth;
var space;

function setup() {
  createCanvas(windowWidth,windowHeight);
  strokeCap(SQUARE);
  noFill();
  distance = 5;
  stwidth = 5;
  space = 2;
  for (var i = 0; i < 7; i++) {
    distance+=stwidth/2 + space + stwidth;
    if(i%2==0) nowSpeed = random(-1,-0.5);
    else nowSpeed = random(0.5,1);
    console.log(i, stwidth, distance, nowSpeed);
    myArcs.push(new myArc(distance, stwidth, random(-PI,PI), random(0,PI), nowSpeed));
    stwidth*=2;
  }
}

function draw() {
  background(255);
  translate(width/2,height/2);
  for (var i = 0; i < myArcs.length; i++) {
    myArcs[i].moveArc();
  }
}

function myArc(distance, stweight, start, end, speed) {
  this.distance = distance;
  this.start = start;
  this.end = end;
  this.speed = speed;
  this.stweight = stweight;

  this.moveArc = function() {
    rotate(frameCount/30*speed);
    strokeWeight(this.stweight);
    stroke(40);
    arc(0,0,this.distance,this.distance, this.start, this.end);
  }
}
