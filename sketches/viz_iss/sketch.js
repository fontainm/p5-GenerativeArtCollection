var url = "http://api.open-notify.org/iss-now.json";
var lon;
var lat;
var issX = 0;
var issY = 0;
var img;

function setup() {
  createCanvas(windowWidth,windowHeight);
  img = loadImage("world.png");
  setInterval(getData, 2000);
  fill(255);
  noStroke();
}

function getData() {
  loadJSON(url, gotData);
}

function gotData(data) {
  lon = data.iss_position.longitude;
  lat = data.iss_position.latitude;
}

function draw() {
  image(img,0,0,width, height);
  fill(0);
  if(lon) {    
    issX = lerp(issX, map(lat, -180, 180, 0, width), 0.05);
    issY = lerp(issY, map(lon, -180, 180, 0, height), 0.05);
    text("ISS", issX-40, issY+7);
    text("lon: " + lon, issX+20, issY);
    text("lat: " + lat, issX+20, issY+13);
    fill(240,180,0);
    ellipse(issX, issY, 30);
  }
}
