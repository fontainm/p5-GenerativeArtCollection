let PLANETSIZE;
let maskedGraphic;
let planet;
let planetClone;
let bgClone;
let seed;
let patterns;

//Parameters
let priColor;
let secColor;
let pattern;
let patternCount;
let clouds;
let cloudCount;
let ring;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	angleMode(DEGREES);
	noStroke();
	noLoop();

	patterns = ["Lines", "Lines Unicolor", "Stripes", "Holes", "Noise", "Horizontal Noise"];
	PLANETSIZE = windowHeight*0.6;
	seed = random(1000);
	drawBG();

	randomPlanetButton = createButton("Random Planet");
	newSeedButton = createButton("New Seed");

	//UI-Events
	randomPlanetButton.mouseReleased(createRandomPlanet);
	newSeedButton.mouseReleased(function() { seed = random(1000); newPlanet(); });

	createRandomPlanet();
}

function drawBG() {
	background(0,0,20);
	//Sprinkling stars:
	push();
		for (let x = 0; x < windowWidth; x+=10) {
			for (let y = 0; y < windowHeight; y+=10) {
				if(random(1) > 0.97) {
					stroke(100);
					strokeWeight(random(1, 5));
					point(x,y);
				}
			}
		}
	pop();
	bgClone = get();
}

function createRandomPlanet() {
	seed = random(1000);

	//Random UI-Settings
	priColor = random(0,255);
	secColor = random(0,255);
	pattern = patterns[Math.floor(random(patterns.length))];
	patternCount = random(2,15);
	clouds = random(1)>0.5;
	cloudCount = random(30,100);
	ring = random(1)>0.5;

	newPlanet();
}

function newPlanet() {
	noiseSeed(seed);
	randomSeed(seed);
	planet = new Planet();
	image(bgClone,0,0);
	image(planetClone,0,0);
	push();
		translate(width/2, height/2);
		if(ring) planet.drawRing();
	pop();
	drawUI();
}

function drawUI() {
	push();
		fill(0,0,100);
		textAlign(CENTER);
		textSize(24);
		textStyle(BOLD);
		text("GENERATIVE PLANETS", width/2, 30);

		textSize(14);
		textStyle(NORMAL);
		textAlign(LEFT, TOP);

		randomPlanetButton.size(width/2-7.5, 50);
		randomPlanetButton.position(5,height-55);

		newSeedButton.size(width/2-7.5, 50);
		newSeedButton.position(width/2, height-55);
	pop();
}

class Planet {
	constructor() {
		push();
			translate(width/2, height/2);
			push();
				this.priColor = priColor
				this.secColor = secColor;
				this.drawPriColor();
				switch(pattern) {
					case "Holes":
						this.drawHoles();
						break;
					case "Noise":
						this.drawNoise();
						break;
					case "Horizontal Noise":
						this.drawNoiseHorizontal();
						break;
					case "Stripes":
						this.drawStripes();
						break;
					case "Lines":
						this.drawRoundLinesColor();
						break;
					case "Lines Unicolor":
						this.drawRoundLinesUni();
						break;
					default:
						break;
				}
				if(clouds) this.drawClouds();
			pop();
			this.drawShadowHighlights();
			this.maskPlanet();
		pop();
	}

	drawPriColor() {
		push();
			fill(this.priColor, 50, 80);
			ellipse(0,0, PLANETSIZE, PLANETSIZE);
		pop();
	}

	drawStripes() {
		let numStripes =  patternCount;
		let stripeHeight = PLANETSIZE/numStripes;
		for (let i = 0; i < numStripes; i++) {
			push();
				fill(this.secColor, random(50,80), random(40,90), .5);
				rect(-PLANETSIZE/2, -PLANETSIZE/2 + i * stripeHeight, PLANETSIZE, stripeHeight);
			pop();
		}
	}

	drawRoundLinesColor() {
		let numStripes = map(patternCount, 2, 15, 15, 50);
		for (let i = 0; i < numStripes; i++) {
			push();
				noFill();
				stroke(this.secColor, random(0,80), random(90,100));
				strokeWeight(random(PLANETSIZE/50,PLANETSIZE/10));
				let xPos = random(-PLANETSIZE, PLANETSIZE);
				let yPos = random(-PLANETSIZE/2, PLANETSIZE/2);
				line(xPos, yPos, xPos + random(-PLANETSIZE, PLANETSIZE), yPos);
			pop();
		}
	}

	drawRoundLinesUni() {
		let numStripes = map(patternCount, 2, 15, 15, 50);
		for (let i = 0; i < numStripes; i++) {
			push();
				noFill();
				stroke(this.secColor, 60, 80);
				strokeWeight(random(PLANETSIZE/15,PLANETSIZE/6));
				let xPos = random(-PLANETSIZE, PLANETSIZE);
				let yPos = random(-PLANETSIZE/2, PLANETSIZE/2);
				line(xPos, yPos, xPos + random(-PLANETSIZE, PLANETSIZE), yPos);
			pop();
		}
	}

	drawClouds() {
		let numStripes = cloudCount;
		randomSeed(seed);
		for (let i = 0; i < numStripes; i++) {
			push();
				noFill();
				stroke(0, 0, 100, 0.9);
				strokeWeight(random(PLANETSIZE/40,PLANETSIZE/10));
				let xPos = random(-PLANETSIZE, PLANETSIZE);
				let yPos = random(-PLANETSIZE/2, PLANETSIZE/2);
				line(xPos, yPos, xPos + random(-PLANETSIZE/5, PLANETSIZE/5), yPos);
			pop();
		}
	}

	drawNoiseHorizontal() {
		let noiseScale = 0.02;
		let noiseVal;
		let threshold = map(patternCount, 2, 15, 0.5, 0.2);
		push();
			translate(-PLANETSIZE/2, -PLANETSIZE/2);
			for (let x = 0; x < PLANETSIZE; x++) {
				noiseDetail(2, 0.2);
				noiseVal = noise(x * noiseScale, x * noiseScale);
				stroke(this.secColor, noiseVal * 100, 70, 0.6);
				if(noiseVal > threshold) 	line(0, x, PLANETSIZE, x);
			}
		pop();
	}

	drawNoise() {
		let noiseScale = 0.02;
		let noiseVal;
		let threshold = map(patternCount, 2, 15, 0.5, 0.3);
		push();
			translate(-PLANETSIZE/2, -PLANETSIZE/2);
			for (let x = 0; x < PLANETSIZE; x+=10) {
				for (let y = 0; y < PLANETSIZE; y+=10) {
					noiseDetail(2, 0.2);
					noiseVal = noise(x * noiseScale, y * noiseScale);
					if(noiseVal > threshold) {
						stroke(this.secColor, 70, 80);
						strokeWeight(PLANETSIZE/10);
						point(x,y);
					}
				}
			}
		pop();
	}

	drawHoles() {
		let holes = [];
		let numHoles = patternCount;
		let overlapping;
		let protection = 0;
		push();
			while(holes.length < numHoles) {
				overlapping = false;
				let hole = {
					xPos: random(-PLANETSIZE/2, PLANETSIZE/2),
					yPos: random(-PLANETSIZE/2, PLANETSIZE/2),
					r: random(PLANETSIZE/20, PLANETSIZE/7)
				}

				for(let j = 0; j< holes.length; j++) {
					let other = holes[j];
					let d = dist(hole.xPos, hole.yPos, other.xPos, other.yPos);
					if(d < hole.r + other.r){
						overlapping=true;
						break;
					}
				}
				if(!overlapping) holes.push(hole);
				protection++;
				if(protection > 10000) break; //in case no position can be found
			}			
			randomSeed(seed);
			for(let i = 0; i < holes.length; i++) {
				fill(this.priColor, 30, 50);
				ellipse(holes[i].xPos, holes[i].yPos, holes[i].r*2, holes[i].r*2);
				fill(this.secColor, 20, 60);
				ellipse(holes[i].xPos-random(-PLANETSIZE/125, PLANETSIZE/125), 
						holes[i].yPos-random(-PLANETSIZE/125, PLANETSIZE/125), 
						holes[i].r*2-PLANETSIZE/100, holes[i].r*2-PLANETSIZE/100);
			}
		pop();
	}

	drawShadowHighlights() {
		push();
			fill(0,0,0, 0.4);
			beginShape();
				vertex(PLANETSIZE/10, -PLANETSIZE/2);
				bezierVertex(PLANETSIZE*2, -PLANETSIZE/2, PLANETSIZE*2, PLANETSIZE/2, PLANETSIZE/10, PLANETSIZE/2);
				bezierVertex(PLANETSIZE/2, PLANETSIZE/3, PLANETSIZE/2, -PLANETSIZE/3, PLANETSIZE/10, -PLANETSIZE/2);
			endShape();
		pop();
	}
	
	maskPlanet() {
		//Drawing the mask
		maskedGraphic = createGraphics(width,height);
		maskedGraphic.fill(0);
		maskedGraphic.ellipse(width/2, height/2, PLANETSIZE, PLANETSIZE);
		//Apply mask to clone planet
		planetClone = get();
		planetClone.mask(maskedGraphic);
	}

	drawRing() {
		randomSeed(seed);
		push();
			fill(this.priColor, random(20,50), random(50,80));
			beginShape();
				vertex(PLANETSIZE/2, 0);
				bezierVertex(PLANETSIZE*2.5, PLANETSIZE/5, -PLANETSIZE*2.5, PLANETSIZE/5, -PLANETSIZE/2, 0);
				bezierVertex(-PLANETSIZE, PLANETSIZE/10, PLANETSIZE, PLANETSIZE/10, PLANETSIZE/2, 0);
			endShape();

			fill(this.priColor, random(20,50), random(50,90));
			beginShape();
				vertex(PLANETSIZE/2, 0);
				bezierVertex(PLANETSIZE*1.75, PLANETSIZE/6, -PLANETSIZE*1.75, PLANETSIZE/6, -PLANETSIZE/2, 0);
				bezierVertex(-PLANETSIZE, PLANETSIZE/10, PLANETSIZE, PLANETSIZE/10, PLANETSIZE/2, 0);
			endShape();
		pop();
	}
}