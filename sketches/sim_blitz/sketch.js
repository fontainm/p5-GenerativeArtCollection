var lightnings = [];
var createNew = false;
var newLightningX = 0;
var newLightningY = 0;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  noFill();
  strokeWeight(1);
  stroke(20,100,120,20);
  //frameRate(10);
  lightnings.push(new Lightning(width/2, 0, 1));
}

function draw() {
  for (var i = 0; i < lightnings.length; i++) {
    lightnings[i].addPoint();
    lightnings[i].drawPoints();
    if (random(1) >= 0.9 && !createNew) createNew = true;
  }
  if (createNew) {
    lightnings.push(new Lightning(newLightningX, newLightningY, random(2)));
    createNew = false;
  }
  //background(0,50,60,5);
}

function clearAll() {
  lightnings = [];
  background(255,62);
  lightnings.push(new Lightning(width/2, 0, 1));
}


function LightningPoint(x,y) {
  this.x = x;
  this.y = y;
}

function Lightning(startX, startY, drag) {
  this.x = startX;
  this.y = startY;
  this.drag = drag;
  var lPoints = [];
  var distribution = 10;
  lPoints.push(new LightningPoint(startX, startY));

  this.addPoint = function() {
    lPoints.push(new LightningPoint(random(lPoints[lPoints.length-1].x-distribution*(drag),
                                           lPoints[lPoints.length-1].x+distribution*(2-drag)),
                                    random(this.y+lPoints.length*distribution+distribution/2,
                                           this.y+lPoints.length*distribution+distribution)
                                    ));
    newLightningX = lPoints[lPoints.length-1].x;
    newLightningY = lPoints[lPoints.length-1].y;
  }

  this.drawPoints = function() {
    beginShape();
      for (var i = 0; i < lPoints.length; i++) {
        vertex(lPoints[i].x, lPoints[i].y);
      }
    endShape();
    if (lPoints[lPoints.length-1].y >= height*2) clearAll();
  }
}
