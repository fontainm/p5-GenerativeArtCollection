var anzahl;
var inc = TWO_PI / 25;
var val;
var change = false;

function setup(){
  createCanvas(windowWidth, windowHeight);
  frameRate(25);
  noFill();
  colorMode(HSB, 500, 100, 100, 100);
  background(15);
}

function draw(){
  background(15);
  val = sin(frameCount/20);
  anzahl = map(val, -1, 1, 1, 18); //Letzer Wert: Anzahl Halbkreise
  if (val <= -0.9997) change = !change;
  if (change) drawRainbow(anzahl, 1);
  else drawRainbow(anzahl, -1);
  anzahl = anzahl + inc;
}

function drawRainbow(count, dir) {
  m = 500/count; //Radius
  c = 100/count; //Color-Range
  for (var i = 0; i < count; i++) {
    strokeWeight(2);
    stroke(c*i,80,100);
    arc(width/2+(i*m/4)*dir, height/2, 500-i*m, 500-i*m, PI, TWO_PI);
    stroke(c*i+220,80,100);
    arc(width/2-(i*m/4)*dir, height/2, 500-i*m, 500-i*m, 0, PI);
  }
}
