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
  
  const BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen
  const BOARD_HEIGHT= $('#board').height();
  const SQUARE_SIZE = $("#apple").width();  // the size of the apple is the same size as all squares
  const ROWS = BOARD_WIDTH / SQUARE_SIZE;
  const COLUMNS = BOARD_HEIGHT / SQUARE_SIZE;
  var canLeft = false;
  var canRight = true;
  var canUp = true;
  var canDown = true;
  
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
  var snakeSegments = [snakeHead];
  
  $("#playAgain").hide() 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  // turn on event handlers
  var interval = setInterval(newFrame, 800/ FPS);   // execute newFrame 60 times per second.
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
    checkSelf();
    snakeEatSelf();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which == KEY.LEFT) {
      if (snakeHead.speedX == 0 && canLeft) {
        snakeHead.speedY = 0;
        snakeHead.speedX = -20;
      }
    }
  	if (event.which === KEY.RIGHT){
      if (snakeHead.speedX == 0 && canRight) {
        snakeHead.speedY = 0;
        snakeHead.speedX = 20;
      }
	  }
    if (event.which === KEY.UP){
      if (snakeHead.speedY == 0 && canUp) {
        snakeHead.speedY = -20;
        snakeHead.speedX = 0;
      }
     
    }
    if (event.which === KEY.DOWN){
      if (snakeHead.speedY == 0 && canDown) {
        snakeHead.speedY = 20;
        snakeHead.speedX = 0;
      }
     
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
   for (var i = snakeSegments.length - 1; i >= 1; i--){
      snakeSegments[i].x = snakeSegments[i - 1].x;
      snakeSegments[i].y = snakeSegments[i - 1].y;
      drawObject(snakeSegments[i]);
   }
   
 }

 function drawPlayAgainButton() {
  $("#playAgain").text("PLAY AGAIN");
  $("#playAgain").css("top", BOARD_HEIGHT/2 - $("#playAgain").height());
  $("#playAgain").css("left", BOARD_WIDTH + 10);
  $("#playAgain").show();
}

 function checkSelf() {
  snakeHead.x > snakeHead.prevX ? canLeft = false : canLeft = true;
  snakeHead.x < snakeHead.prevX ? canRight = false : canRight = true;
  snakeHead.y > snakeHead.prevY ? canUp = false : canUp = true;
  snakeHead.y < snakeHead.prevY ? canDown = false : canDown = true;
}

 function drawObject(object) {
   $(object.id).css("left", object.x);
   $(object.id).css("top", object.y);
 }
 
 function drawScore(){
   $('#score').text("Score:" + points);
 }
 
  function checkBoundaries(obj){
		if (obj.x > BOARD_WIDTH - 20|| obj.x < 0 || obj.y > BOARD_HEIGHT - 20|| obj.y < 0){ 
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

  function snakeEatSelf(){
    for (var i = 1; i < snakeSegments.length; i++) {
      if (snakeHead.x == snakeSegments[i].x && snakeHead.y == snakeSegments[i].y){
        console.log("eat");
          endGame();
      }
    }
  }
  
  function increaseBody(){
    var newID = "snake" + snakeSegments.length;
    
    $("<div>")
        .addClass("snake")
        .attr('id', newID)
        .appendTo("#board")
    
    var tail = snakeSegments[snakeSegments.length - 1];    
    var newBodyPiece = Snake(tail.x + 2, tail.y, 0, 0, "#" + newID);
    
    drawObject(newBodyPiece);    
    snakeSegments.push(newBodyPiece);

  }
  
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
    drawPlayAgainButton()
  }
  
});
