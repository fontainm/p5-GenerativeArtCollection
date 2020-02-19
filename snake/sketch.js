//* Responsive
//* Animation in anderen Browsern
//* Gameplay Regeln
//* Highscore in mongodb

let snake;
let fieldCount = 6;
let space;
let easing = 0.8;
let fields = [];
let score = 0;
let highscore = 0;
let priColor;
let secColor;
let bgColor = 35;
let gameOver = false;

function setup() {
	let screensize = (windowWidth < 800) ? windowWidth * 0.9 : 800;
	let canvas = createCanvas(screensize, screensize);
	canvas.parent('sketch');
	colorMode(HSB);
	rectMode(CENTER);
	space = width/fieldCount;
	setBackgroundCSS();
	setGameOver(false);

	// set options to prevent default behaviors for swipe, pinch, etc
	var options = {
		preventDefault: true
	};
	
	// document.body registers gestures anywhere on the page
	var hammer = new Hammer(document.body, options);
	hammer.get('swipe').set({
	direction: Hammer.DIRECTION_ALL
	});

	hammer.on("swipe", swiped);

	restartGame();
}

function draw() {
	background(bgColor/255*100);
	priColor = map(sin(frameCount/500), -1, 1, 0, 255);
	secColor = map(sin((frameCount+255)/500), -1, 1, 0, 255);
	drawGrid();
	drawFields();
	snake.display();
	drawHUD();
	drawGameOver();
}

function restartGame()
{
	let sketchHTML = select('#sketch');
	sketchHTML.removeClass('hide');
	sketchHTML.addClass('show');

	fields = [];
	if (score > highscore) highscore = score;
	score = 0;
	fillFieldsArray();	
	createSnake();
	createStar();
}

function setBackgroundCSS()
{
	let bg = select('body');
	bg.style('background-color', '#' + hex(bgColor, 2) + hex(bgColor, 2) + hex(bgColor, 2)); // + hex(bgColor, 2));
}

function setGameOver(show)
{
	gameOver = show;
	let gameOverHTML = select('#gameover');
	gameOverHTML.html("<p id='gameover-hl'></p><p id ='gameover-txt'>TOUCH OR HIT ENTER TO RESTART</p>"); //TODO: Einfacher

	if(show) 
	{
		gameOverHTML.removeClass('hideGO');
		gameOverHTML.addClass('showGO');
	}
	else 
	{
		gameOverHTML.removeClass('showGO');
		gameOverHTML.addClass('hideGO');
	}
	//if(show) 	noLoop();
}

function drawGameOver()
{
	let headline = "GAME OVER";// "SCORE: " + score;
	let letters = headline.split("");
	let gameOverHL = select('#gameover-hl');
	gameOverHL.html("");
	for(let i = 0; i < letters.length; i++)
	{
		let span = createSpan(letters[i]);
		let newColor = map(i, 0, letters.length, priColor, secColor);
		span.style('color', 'hsl(' + newColor + ', 60%, 60%');
		span.parent("#gameover-hl");
	}
	//gameOverHL.style('color', 'hsl(' + secColor + ', 60%, 60%');

	let gameOverTXT = select('#gameover-txt');
	gameOverTXT.style('color', 'hsl(' + priColor + ', 60%, 60%');
}

function drawHeadline() 
{
	let headline = "MY SNAKE GAME";
	let letters = headline.split("");
	let headerHTML = select("#headline");
	headerHTML.html("");
	for(let i = 0; i < letters.length; i++)
	{
		let span = createSpan(letters[i]);
		let newColor = map(i, 0, letters.length, priColor, secColor);
		span.style('color', 'hsl(' + newColor + ', 60%, 60%');
		span.parent("#headline");
	}
}

function drawGrid()
{
	for(let i = 1; i < fieldCount; i++)
	{
		stroke(map(i, 0, fieldCount, priColor, secColor), 40, 50);
		strokeWeight(1);
		line(0, i*space, width, i*space); 				//Linien nach rechts
		line(i*space, 0, i*space, fieldCount * space);	//Linien nach unten
	}
}

function drawFields()
{
	for(let y = 0; y < fieldCount; y++)
	{
		for(let x = 0; x < fieldCount; x++)
		{
			fields[x][y].display();
		}
	}
}

function drawHUD()
{
	drawHeadline();

	let scoreHTML = select('#score');
	scoreHTML.style('color', 'hsl(' + secColor + ', 60%, 60%');
	scoreHTML.html("SCORE: " + score);

	let highscoreHTML = select('#highscore');
	highscoreHTML.style('color', 'hsl(' + priColor + ', 60%, 60%');
	highscoreHTML.html("HIGHSCORE: " + highscore);
}

function fillFieldsArray() 
{	
	for(let x = 0; x < fieldCount; x++)
	{
		fields[x] = [];
		for(let y = 0; y < fieldCount; y++)
		{
			fields[x].push(new Field(x, y));
		}
	}
}

function createStar()
{
	let freeFields = [];
	for(let x = 0; x < fieldCount; x++)
	{
		for(let y = 0; y < fieldCount; y++)
		{
			if(fields[x][y].free)
			{
				freeFields.push(fields[x][y]); //sammle alle freien Felder
			}
		}
	}	
	let rand = Math.floor(random(freeFields.length));
	if (freeFields.length > 0)
	{
		freeFields[rand].hasStar = true;
	}
}

function eatStar()
{
	score += 10;
	createStar();
}

function createSnake()
{
	xCoord = Math.floor(random(fieldCount));
	yCoord = Math.floor(random(fieldCount));
	fields[xCoord][yCoord].notFree(); //Startfeld auf besetzt gesetzt
	snake = new Snake(xCoord, yCoord);
}

function keyPressed()
{
	if(snake.moveDir == null)
	{
		console.log(keyCode);
		snake.move(keyCode);
	}
	if(keyCode === ENTER && gameOver)
	{
		let sketchHTML = select('#sketch');
		sketchHTML.addClass('hide');
		setGameOver(false);
		setTimeout(restartGame, 300);
	}
}

function swiped(event) 
{
	console.log(event);
	if (event.direction == 4) { //RIGHT
	  snake.move(39);
	} else if (event.direction == 8) { //UP
	  snake.move(38);
	} else if (event.direction == 16) { //DOWN
	  snake.move(40);
	} else if (event.direction == 2) { //LEFT
	  snake.move(37);
	}
}

function touchStarted()
{
	if (gameOver) 
	{
		let sketchHTML = select('#sketch');
		sketchHTML.addClass('hide');
		setGameOver(false);
		setTimeout(restartGame, 300);
	}
}

class Snake
{
	constructor(x, y)
	{
		this.x = x; //x-Koordinate zwischen 0 und fieldCount
		this.y = y; //y-Koordinate zwischen 0 und fieldCount
		this.xPos = x * space + space/2;
		this.yPos = y * space + space/2;
		this.moveDir;
		this.target = createVector(this.xPos, this.yPos);
		this.size = space/2;
		this.color = priColor;
		this.trail = []; //Array mit gespeicherten Stopp-Punkten
	}

	move(dir)
	{
		this.trail.push(createVector(this.xPos, this.yPos));
		switch(dir)
		{
			case UP_ARROW:
				for(let i = 1; i <= this.y; i++)
				{
					if(fields[this.x][this.y-i].free)
					{
						this.target.y = this.yPos - i*space;
					}
					else break;
				}
				break;
			case DOWN_ARROW:
				for(let i = 1; i < fieldCount - this.y; i++)
				{
					if(fields[this.x][this.y+i].free)
					{
						this.target.y = this.yPos + i*space;
					}
					else break;
				}
				break;
			case LEFT_ARROW:
				for(let i = 1; i <= this.x; i++)
				{
					if(fields[this.x-i][this.y].free)
					{
						this.target.x = this.xPos - i*space;
					}
					else break;
				}
				break;
			case RIGHT_ARROW:
				for(let i = 1; i < fieldCount - this.x; i++)
				{
					if(fields[this.x+i][this.y].free)
					{
						this.target.x = this.xPos + i*space;
					}
					else break;
				}
				break;
			default:
				break;
		}
		this.moveDir = dir;	
	}

	display()
	{		
		// MOVE
		let speedX = (this.target.x - this.xPos) * easing;
		let speedY = (this.target.y - this.yPos) * easing;

		if (speedX > space/2) speedX = space/2;
		if (speedX < -space/2) speedX = -space/2;
		if (speedY > space/2) speedY = space/2;
		if (speedY < -space/2) speedY = -space/2;

		this.xPos += speedX;
		this.yPos += speedY

		if((Math.abs(this.yPos - this.target.y) < 2) &&
		    Math.abs(this.xPos - this.target.x) < 2 ) //Wenn der Abstand kleiner ist, einfach auf zielposition bewegen
		{
			this.yPos = this.target.y;
			this.xPos = this.target.x;
			this.moveDir = null;
		}

		//KOORDINATEN NEU SETZEN
		let preX = this.x;
		let preY = this.y;
		this.x = Math.round((this.xPos - space/2) / space);
		this.y = Math.round((this.yPos - space/2) / space);

		if (preX != this.x || preY != this.y)
		{
			score++;
			//FIELDS & STAR
			fields[this.x][this.y].notFree();
			if(fields[this.x][this.y].hasStar)
			{
				fields[this.x][this.y].hasStar = false;
				eatStar();
			}
			this.checkGameOver();
		}

		//SNAKE-HEAD
		noStroke();
		fill(this.color, 60, 80);
		ellipse(this.xPos,this.yPos, this.size, this.size);

		//SNAKE-TRAIL:
		stroke(this.color, 60, 80);
		strokeWeight(this.size/2);
		for(let i = 0; i < this.trail.length; i++)
		{
			//TODO: Gradient line mit createGraphic + vertices
			if(i != this.trail.length-1) 
			{
				stroke(this.color, 60, 80);
				line(this.trail[i+1].x, this.trail[i+1].y, this.trail[i].x, this.trail[i].y);
			}
			else //Das letzte Element
			{
				stroke(this.color, 60, 80);
				line(this.xPos, this.yPos, this.trail[i].x, this.trail[i].y);
			}
		}

		//COLOR CHANGE
		this.color = priColor;
	}

	checkGameOver()
	{
		try
		{
			//Checken, ob benachbarte besetzt sind
			if ((!fields[this.x][this.y-1].free) &&
				(!fields[snake.x][snake.y+1].free) &&
				(!fields[snake.x-1][snake.y].free) &&
				(!fields[snake.x+1][snake.y].free))
			{
				setGameOver(true);
			}
		}
		catch(e) //In einer Ecke
		{	
			//Für jede Ecke checken, ob benachbarte besetzt sind.
			if ((this.y == 0 && this.x == 0 && !fields[this.x+1][this.y].free && !fields[this.x][this.y+1].free) ||
				(this.y == 0 && this.x == fieldCount-1 && !fields[this.x-1][this.y].free && !fields[this.x][this.y+1].free) ||
				(this.y == fieldCount-1 && this.x == 0 && !fields[this.x+1][this.y].free && !fields[this.x][this.y-1].free) ||
				(this.y == fieldCount-1 && this.x == fieldCount-1 && !fields[this.x-1][this.y].free && !fields[this.x][this.y-1].free)) 
			{
				setGameOver(true);
			}
		}
	}
}

class Field 
{
	constructor(x, y) 
	{
		this.x = x;
		this.y = y;
		this.xPos = x * space + space/2;
		this.yPos = y * space + space/2;
		this.free = true;
		this.hasStar = false;
	}

	display() 
	{
		if (this.hasStar)
		{
			push();
				noStroke();
				fill(secColor,60,80);
				translate(this.xPos, this.yPos);
				rotate(frameCount/100);
				rect(0, 0, space/3, space/3);
			pop();
		}
	}

	notFree() //feld wird besetzt gesetzt
	{
		this.free = false;
	}
}