function init(){
	gameover = false ;
canvas = document.getElementById("mycanvas") ;
W = H =  canvas.width = canvas.height = 500;
pen = canvas.getContext('2d') ;
cs = 50 ;
score = 5 ;

food_img = new Image() ;
food_img.src = "apple.jpeg" ;
trophy_img = new Image() ;
trophy_img.src = "trophy.jpg" ;
food = getRandomFood() ;
snake = {
	 init_len : 5 ,
	 color : "green" ,
	 cells:[],
	 direction:"right",

createsnake:function(){
	for(var i = this.init_len;i>0;i--){
		this.cells.push({x:i,y:0}) ;
	}
},

drawsnake:function(){
	for(var i = 0 ; i<this.cells.length;i++){
		pen.fillStyle = this.color ;
		pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2) ;
	
	}
},

updatesnake:function(){
	var x1 = this.cells[0].x ;
	var y1 = this.cells[0].y ;

	if(x1 == food.x && y1 == food.y){
		food = getRandomFood() ;
		score++ ;
	}
	else{
	this.cells.pop() ;
}
	
	var X ;
	var y ; 
	if(this.direction == 'right'){
	X = x1 +1 ;
	Y =  y1 ;
    }
    else if(this.direction == 'left'){
    	X = x1 - 1 ;
	    Y = y1 ;
    }
    else if(this.direction == 'down'){
    	X = x1  ;
	    Y = y1+1;
    }
    else{
    	X = x1 ;
	    Y = y1 - 1;
    }
	this.cells.unshift({x:X,y:Y}) ;
	console.log(this.cells[0].x,Math.round(W/cs)) ;
	if(this.cells[0].x >= Math.round(W/cs) || this.cells[0].y>=Math.round(H/cs) || this.cells[0].x < 0 || this.cells[0].y<0){
		gameover = true ;
	}
}

}  ;
snake.createsnake() ;


function keypressed(e){
	console.log(e.key);
	if(e.key == 'ArrowRight')
		snake.direction = 'right' ;
	else if(e.key == 'ArrowLeft')
		snake.direction = 'left' ;
	else if(e.key == 'ArrowDown')
		snake.direction = 'down' ;
	else
		snake.direction = 'up' ;
	console.log(snake.direction) ;


}

document.addEventListener("keydown",keypressed) ;
}


function draw(){
pen.clearRect(0,0,W,H) ;
snake.drawsnake() ;

pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs) ;
pen.drawImage(trophy_img,18,20,cs+25,cs+25) ; 
pen.fillStyle = "black" ;
pen.font = "20px Roboto" ; 
pen.fillText(score,48,46) ;
}

function update(){
	
	snake.updatesnake() ;
	 	}

function getRandomFood(){
	var foodx = Math.round(Math.random()*(W - cs)/cs) ;
	var foody = Math.round(Math.random()*(H - cs)/cs) ;
	var food = {
		x : foodx,
		y : foody,
		color:"yellow",
	}
	return food ;
}


function gameloop(){
	if(gameover == true){
		clearInterval(f) ;
		alert("Game over") ;
	}
	draw();
	update() ;

}
init() ;
f = setInterval(gameloop,300);



