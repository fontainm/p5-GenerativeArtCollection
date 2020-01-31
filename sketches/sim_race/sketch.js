var particles = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  stroke(255);
}

function draw() {
  background(30,40,50);
  if (frameCount % 2 == 0) {
    var p = new Particle(random(10, width),0,random(255));
    particles.push(p);
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].display();
    if (particles[i].y >= height+40) particles.splice(i,1);
  }
}

function Particle(x,y, color) {
  this.x = x;
  this.y = y;
  this.drawHistory = [];

  this.move = function() {
    this.ellPosition = createVector(this.x,this.y);
    this.drawHistory.push(this.ellPosition);
    if(this.drawHistory.length > 20) this.drawHistory.splice(0,1);
    this.x+=random(-2,2);
    this.y+=random(-2,5);
  }

  this.display = function() {
    noFill();
    beginShape();
    for (var i = 0; i < this.drawHistory.length; i++) {
      stroke(255,color);
      var pos = this.drawHistory[i];
      vertex(pos.x, pos.y);
    }
    endShape();
  }
}
