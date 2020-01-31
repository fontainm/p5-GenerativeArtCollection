spiralen = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB);
  strokeWeight(10);
  for (var i = 0; i < 7; i++) {
    spiralen.push(new Spirale(width/2, height/2-i*12, i*30, 18-i*2));
  }
}

function draw() {
  background(164,8,94);
  for (var i = 0; i < spiralen.length; i++) {
    spiralen[i].draw();
  }
}

function Spirale(startX,startY,color, dividor) {
  var counter = 0;
  var prevX = startX;
  var prevY = startY;
  var x;
  var y;
  var color = color;
  var strokes = [];
  var rev = false;
  strokes.push(new singleStroke(prevX, prevY, color));

  function singleStroke(x,y,colorStroke) {
    this.x = x;
    this.y = y;
    this.scolor = colorStroke;
  }
  this.draw = function() {
    x = map(cos(counter/10),-1,1,startX-counter/5,startX+counter/5);
    y = map(sin(counter/10),-1,1,startY-counter/5,startY+counter/5);
    strokes.push(new singleStroke(x, y, map(sin(counter/10),-1,1,color,color+30)));

    strokeWeight(dividor*2);
    for (var i = 1; i < strokes.length; i++) {
      stroke(strokes[i].scolor, 80, 90);
      beginShape();
        vertex(strokes[i-1].x,strokes[i-1].y);
        vertex(strokes[i].x,strokes[i].y);
      endShape();
    }
    if(strokes.length >= 25) strokes.shift();
    counter = map(sin(frameCount/120),-2,2,-500,500);

  }
}
