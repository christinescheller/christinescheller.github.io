/* global $, sessionStorage*/

$(document).ready(function(){
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// INITIALIZATION ///////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FPS = 10;
  
    var KEY = {
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
  };
  
  var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen
	var BOARD_HEIGHT= $('#board').height();
	var SQUARE_SIZE = $("#apple").width();  // the size of the apple is the same size as all squares
  var ROWS = BOARD_WIDTH / SQUARE_SIZE;
  var COLUMNS = BOARD_HEIGHT / SQUARE_SIZE;
  
  // Game Item Objects
  
  function Snake(x, y, speedX, speedY, id){
    return {
      x: x,
      y: y,
      speedX: speedX,
      speedY: speedY,
      id: id,
    };
  }

  var snakeHead = Snake(460, 240, 0, 0, "#snake-head");
    
  var apple = {};
  apple.x = Math.floor(Math.random() * 45) * 20;
  apple.y = Math.floor(Math.random() * 25) * 20;
  apple.id = "#apple";
    
  // other game variables
  
  var points = 0;
  var snake = [snakeHead];
  

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  // turn on event handlers
  var interval = setInterval(newFrame, 1000 / FPS);   // execute newFrame 60 times per second.
  $(document).on('keydown', handleKeyDown);             // change 'eventType' to the type of event you want to handle

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawScore();
    repositionSnake();
    repositionAndRedrawSnakeHead();
    checkBoundaries(snakeHead);
    drawObject(apple);
    snakeEatApple();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
  	if (event.which === KEY.LEFT){
  	  snakeHead.speedX = -20;
  	  snakeHead.speedY = 0;
  	}
  	if (event.which === KEY.RIGHT){
  	  snakeHead.speedX = 20;
  	  snakeHead.speedY = 0;
	  }
    if (event.which === KEY.UP){
      snakeHead.speedY = -20;
      snakeHead.speedX = 0;
    }
    if (event.which === KEY.DOWN){
      snakeHead.speedY = 20;
      snakeHead.speedX = 0;
	  }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
 

 function repositionAndRedrawSnakeHead(){
   snakeHead.x += snakeHead.speedX;
   snakeHead.y += snakeHead.speedY;
   drawObject(snakeHead);
 }
 
 function repositionSnake(){
   for (var i = snake.length - 1; i >= 1; i--){
     snake[i].x = snake[i - 1].x;
     snake[i].y = snake[i - 1].y;
     drawObject(snake);
   }
   
 }
 
 function drawObject(object) {
   $(object.id).css("left", object.x);
   $(object.id).css("top", object.y);
 }
 
 function drawScore(){
   $('#score').text("Score:" + points);
 }
 
  function checkBoundaries(obj){
		if (obj.x > BOARD_WIDTH - 10|| obj.x < 0 || obj.y > BOARD_HEIGHT - 25|| obj.y < 0){ 
    	  endGame();
		}
  }
  
  function snakeEatApple(){
    if (snakeHead.x === apple.x && snakeHead.y === apple.y){
      points++;
      apple.x = Math.floor(Math.random() * 45) * 20;
      apple.y = Math.floor(Math.random() * 25) * 20;
      increaseBody();
    }
  }
  
  function increaseBody(){
    var newID = "snake" + snake.length;
    
    $("<div>")
        .addClass("snake")
        .attr('id', newID)
        .appendTo("#board");
    
    var tail = snake[snake.length - 1];    
    var newBodyPiece = Snake(tail.x, tail.y, 0, 0, "#" + newID);
    
    // drawObject(newBodyPiece) here
    
    snake.push(newBodyPiece);
  }
  
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
});
