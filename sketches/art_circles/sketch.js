var kreise = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  noFill();
  stroke(120,210,240);
  background(255);
  for (var i = 0; i < 120; i++) {
    kreise.push(new Kreis());
    kreise[i].newTarget();
  }
}

function draw() {
  if(frameCount%(120*4) == 0) {
    background(255);
    kreise = [];
    for (var i = 0; i < 120; i++) {
      kreise.push(new Kreis());
      kreise[i].newTarget();
    }
  }
  translate(width/2, height/2);
  for (var i = 0; i < kreise.length; i++) {
    kreise[i].move();
  }
}

function Kreis() {
  this.x = 0;
  this.y = 0;
  this.tarX;
  this.tarY;

  this.newTarget = function() {
    this.tarX = random(-width/2, width/2);
    this.tarY = random(-height/2, height/2);
  }

  this.move = function() {
    if(frameCount % 120 == 0) this.newTarget();
    if(this.tarX) {
      this.x = lerp(this.x, this.tarX, 0.08);
      this.y = lerp(this.y, this.tarY, 0.08);
      stroke(40 ,190-abs(this.x/1.8)-abs(this.y/1.8));
      ellipse(this.x, this.y, 50+abs(this.x/3)+abs(this.y/3));
    }
  }
}
