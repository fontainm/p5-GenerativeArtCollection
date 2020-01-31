var drops = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  noFill();
  stroke(255);
  strokeWeight(1);
}

function mouseClicked() {
  drops.push(new Drop(mouseX, mouseY, random(2,6), random(20,60), random(1,2)));
}

function draw() {
  background(0,100,120);
  for (var i = 0; i < drops.length; i++) {
    drops[i].draw();
    if(drops[i].over) drops.splice(i,1);
  }
  if (random(0,1) > 0.95) {
    drops.push(new Drop(random(0, width), random(0, height), random(2,6), random(20,60), random(1, 2) ));
  }
}

function Drop(x, y, limit, timing, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.count = 0;
  this.limit = limit;
  this.ripcount = 0;
  this.timing = int(timing);
  this.stop = false;
  this.over = false;
  this.ripples = [];

  this.draw = function() {
    if(this.count % this.timing == 0 && !this.stop) {
      this.ripples.push(new Ripple(this.x, this.y, this.speed));
      this.ripcount++;
    }
    if(this.ripcount > this.limit)
      this.stop = true;
    if(this.stop && this.ripples.length == 0)
      this.over = true;

    for (var i = 0; i < this.ripples.length; i++) {
      this.ripples[i].move();
      if(this.ripples[i].s >= 255) this.ripples.splice(i,1);
    }
    this.count++;
  }
}

function Ripple(x,y, speed) {
  this.x = x;
  this.y = y;
  this.s = speed;
  this.speed = speed;
  this.move = function() {
    stroke(255, 150-this.s)
    ellipse(this.x,this.y,this.s);
    this.s+=this.speed;
  }
}
