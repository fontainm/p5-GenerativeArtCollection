var count1 = 3;
var rad1 = 200;

var count2 = 3;
var rad2 = 100;

var count3 = 1;
var rad3 = 50;

var count4 = 3;
var rad4 = 25;

function setup() {
  createCanvas(windowWidth,windowHeight);
  fill(38,46,54);
  strokeWeight(1);
  angleMode(DEGREES);
}

function draw() {
  background(255);
  translate(width/2, height/2);
  noStroke();
  ellipse(0,0,800);
  stroke(240,230,180);
  rotate(frameCount/4);
  for (var i = 0; i < 360; i+=360/count1) {
    line(0,0,rad1*cos(i), rad1*sin(i));
    ellipse(0,0,rad1/2);

    push();
    translate(rad1*cos(i), rad1*sin(i));
    rotate(frameCount/2);
    for(var j = 0; j < 360; j+=360/count2) {
      line(0,0,rad2*cos(j), rad2*sin(j));
      ellipse(0,0,rad2/2);

      push();
      translate(rad2*cos(j), rad2*sin(j));
      rotate(frameCount);
      for(var k = 0; k <360; k+=360/count3) {
        line(0,0,rad3*cos(k), rad3*sin(k));
        ellipse(0,0,rad3/2);

        push();
        translate(rad3*cos(k), rad3*sin(k));
        rotate(frameCount*4);
        for(var l = 0; l <360; l+=360/count4) {
          line(0,0,rad4*cos(l), rad4*sin(l));
          ellipse(0,0,rad4/2);

          push();
          translate(rad4*cos(l), rad4*sin(l));
          ellipse(0,0,rad4/2);
          pop();
        }
        pop();


      }
      pop();
    }
    pop();
  }

  /*
  rotate(frameCount/20);
  line(0,0,0, -200);
  line(0,0,200,0);
  translate(0, -200);
  rotate(frameCount/10);
  line(0,0,0,-100);
  translate(0,-100);
  ellipse(0,0,50);
  */
}
