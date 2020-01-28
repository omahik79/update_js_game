

function loadImages(){
	// To load custom images as enemy and omar picture
	enemyImage = new Image();
	omarImage = new Image();
	green_enemy= new Image();

	enemyImage.src = "Images/enemy.png";
	omarImage.src = "Images/player.png";
    green_enemy.src = "Images/green enemy.png";
	
}


function init(){
// document.getElementById('mycanvas') retrieves the canvas element defined in the html file by using its id.
canvas = document.getElementById('mycanvas');
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
console.log(canvas);
gameover = false;

// pen is an object created using the getContext() function.
pen = canvas.getContext('2d'); // 2d is passed to make 2d games in html

W = canvas.width;
H = canvas.height;
prev_counter = 0;
counter = 0;

loadImages();

// ship is the omar picture we are creating.
ship = {
	x : 300,
	y : H-50,
	w : 50,
	h : 50,
	speed : 25,
	

	update : function(){
		//this.x = this.x + this.speed;

		// To test the boundary conditions
		//if(this.x >= W-this.w || this.x<=0){
		//	this.speed *= -1;
		//}
	},

	draw : function(){
		// pen.drawImage() is used to load a custom image
		pen.drawImage(omarImage,ship.x,ship.y,ship.w,ship.h)
	},

	
		
		
	

};

// Listener for events
function buttonGotPressed(e){
    
    
    
    if(e.key=="ArrowUp"){
		ship.y = ship.y - 40;  //move up
        if(ship.y<=0){    //for not going out
			ship.y= 0;
		}
      
		
	}
    
    if(e.key=="ArrowDown"){
		ship.y = ship.y + 40;  //move down
        if(ship.y > H-ship.h){   // for not going out
			ship.y = H-ship.h;
		}
      
		
	}
    
    
	
	if(e.key=="ArrowLeft"){
		ship.x = ship.x - 40;
		if(ship.x<=0){
			ship.x= 0;
		}
	}
	if(e.key=="ArrowRight"){
		ship.x = ship.x + 40;   //40 represent movement speed 
		if(ship.x >= W-ship.w){    
			ship.x = W-ship.w;
		}
	}
}

document.addEventListener('keydown', buttonGotPressed);   

enemies = [];

var e = new enemy(10,20,5,enemyImage);
var d = new enemy(5,20,10,green_enemy);
enemies.push(e);
 enemies.push(d);   

}



// Class defined for an enemy
function enemy(x,y,speed,draw){
	this.x = x;
	this.y = y;
	this.w = 50;
	this.h = 50;
	this.state = "active"
	this.speed = speed;

	this.draw = function(){

		pen.drawImage(draw,this.x,this.y,this.w,this.h);
      
	}

	this.update = function(){

		this.x = this.x + this.speed;

		// To test the boundary conditions
		if(this.x >= W-this.w || this.x<=0){
			this.speed *= -1;
		}

		this.y++;

		if(this.y<=0){
			this.state = "inactive"
		}
	}

}


function draw(){
	// In the canvas, towards the right, it is +ve x axis and towards bottom, it is +ve y axis.

	
	

	//to erase the old screen. Here, we erase the whole screen and redraw it again.
	pen.clearRect(0,0,W,H);

	
	//Drawing the ship
	ship.draw()

	

	//Drawing the enemy
	enemies.forEach(function(enemy){
		enemy.draw();

	});

}

function update(){
	ship.update()

	

	enemies.forEach(function(enemy){
		enemy.update();
	});

// Math.random() generates a random number between 0 and 1.
	var no =  Math.random();
	if(no<0.01){
		var x = Math.floor(Math.random()*(W-10));
		
		var y = Math.floor(Math.random()+1);

		var speed = Math.random()*2 -1;
		var negative = Math.random();
		if(negative<0.5){
			speed = -speed;
		}

		var e = new enemy(x,y,speed,enemyImage);
		enemies.push(e);
        var d = new enemy(x+5,y+5,speed-2,green_enemy);
        enemies.push(d);
	}

	enemies.forEach(function(enemy){
		if(isColliding(ship,enemy)){
            
            
           
                  alert("game over, click ok to play a new game ");
			
			gameover = true;  
                
            
           
            
		}

	});
}

function isColliding(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.w,r2.w) ; 
	var y_axis = Math.abs(r1.y - r2.y)<= Math.max(r1.h,r2.h);

	return x_axis && y_axis;
}



// a function to call update() and draw()
function render(){
	draw();
	update();
	console.log("in render");
	counter++;

	// similar to setInterval()
	if(gameover == false){
		// similar to setInterval()
		window.requestAnimationFrame(render);
	}
	else{
		startGame();
	}
	}
	
function startGame(){
	init();
	render();
    var x = 0 ;
}

startGame();





