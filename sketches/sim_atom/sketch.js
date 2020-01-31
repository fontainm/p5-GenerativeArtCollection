var sizeBox = 100;
var sizeSphere = 20;

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
  strokeWeight(20);
  background(50,90,110);
}

function draw() {
  background(50,90,110);
  rotateY(frameCount/50);
  translate(sizeBox/2,sizeBox/2,sizeBox/2);

  stroke(255);
  beginShape();
    vertex(0,0,0);
    vertex(-sizeBox/2,-sizeBox/2,-sizeBox/2);
  endShape();

  noStroke();
  fill(77,220,180);
  sphere(sizeSphere);
  translate(-sizeBox,0,0);

  stroke(255);
  beginShape();
    vertex(0,0,0);
    vertex(sizeBox/2,-sizeBox/2,-sizeBox/2);
  endShape();
  noStroke();

  sphere(sizeSphere);
  translate(0,-sizeBox,0);

  stroke(255);
  beginShape();
    vertex(0,0,0);
    vertex(sizeBox/2,sizeBox/2,-sizeBox/2);
  endShape();
  noStroke();

  sphere(sizeSphere);
  translate(sizeBox,0,0);

  stroke(255);
  beginShape();
    vertex(0,0,0);
    vertex(-sizeBox/2,sizeBox/2,-sizeBox/2);
  endShape();
  noStroke();

  sphere(sizeSphere);
  translate(0,0,-sizeBox);

  stroke(255);
  beginShape();
    vertex(0,0,0);
    vertex(-sizeBox/2,sizeBox/2,sizeBox/2);
  endShape();
  noStroke();

  sphere(sizeSphere);
  translate(-sizeBox,0,0);

  stroke(255);
  beginShape();
    vertex(0,0,0);
    vertex(sizeBox/2,sizeBox/2,sizeBox/2);
  endShape();
  noStroke();

  sphere(sizeSphere);
  translate(0,sizeBox,0);

  stroke(255);
  beginShape();
    vertex(0,0,0);
    vertex(sizeBox/2,-sizeBox/2,sizeBox/2);
  endShape();
  noStroke();

  sphere(sizeSphere);
  translate(sizeBox,0,0);

  stroke(255);
  beginShape();
    vertex(0,0,0);
    vertex(-sizeBox/2,-sizeBox/2,sizeBox/2);
  endShape();
  noStroke();

  sphere(sizeSphere);


  translate(-sizeBox/2,-sizeBox/2,sizeBox/2);
  sphere(sizeSphere*3);

  sizeBox = map(cos(frameCount/25),-1,1,150,250);
}
