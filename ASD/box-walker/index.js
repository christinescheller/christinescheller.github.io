/* global $, sessionStorage*/

$(document).ready(function(){
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// INITIALIZATION ///////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FPS = 60;
  var KEY = {
    "ENTER": 13,
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
    "SPACE": 32,
    
    "A": 68,
    "W": 83,
    "S": 87,
    "D": 65,
    
  };
  
  var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen
	var BOARD_HEIGHT= $('#board').height();
	var GAMEITEM_WIDTH = $('#gameItem').width();	// Number: the maximum X-Coordinate of the screen
	var GAMEITEM_HEIGHT= $('#gameItem').height();
	var GAMEITEM2_WIDTH = $('#gameItem2').width();	// Number: the maximum X-Coordinate of the screen
	var GAMEITEM2_HEIGHT= $('#gameItem2').height();


  // Game Item Objects
  
  var gameItem = {};
    gameItem.x = 0;
    gameItem.y = 0;
    gameItem.speedX = 0;
    gameItem.speedY = 0;
    gameItem.id = "#gameItem";
  
  var gameItem2 = {};
    gameItem2.speedX = 0;
    gameItem2.speedY = 0;
    gameItem2.x = 0;
    gameItem2.y = 0;
    gameItem2.id = "#gameItem2";

  

  // other game variables
  

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  
  
  // turn on event handlers
  var interval = setInterval(newFrame, 1000 / FPS);        // execute drawNewFrame 60 times per second.
  $(document).on('keydown', handleKeyDown);               // change 'eventType' to the type of event you want to handle

  $(document).on('keyup', handleKeyUp);               // change 'eventType' to the type of event you want to handle
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    checkBoundaries();
    repositionAndRedrawGameItems();
  }
  
  
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
   // if (event.which === KEY.ENTER){
     // $("#gameItem").css("background-color", randomColorChange());
  	//	console.log("enter pressed");
  	//}
  	if (event.which === KEY.LEFT){
  	  gameItem.speedX = -5;
  	}
  	if (event.which === KEY.RIGHT){
  	  gameItem.speedX = 5;
	  }
    if (event.which === KEY.UP){
      gameItem.speedY = -5;
    }
    if (event.which === KEY.DOWN){
      gameItem.speedY = 5;
	  }
	  
	  if (event.which === KEY.A){
  	  gameItem2.speedX = -5;
  	}
  	if (event.which === KEY.D){
  	  gameItem2.speedX = 5;
  	}
    if (event.which === KEY.W){
      gameItem2.speedY = -5;
    }
    if (event.which === KEY.S){
      gameItem2.speedY = 5;
	  }
  }
  
  function handleKeyUp(event) {

  	if (event.which === KEY.LEFT || event.which === KEY.RIGHT){
  	  gameItem.speedX = 0;
  	}
    if (event.which === KEY.UP || event.which === KEY.DOWN){
      gameItem.speedY = 0;
    }
	  if (event.which === KEY.A || event.which === KEY.D){
  	  gameItem2.speedX = 0;
  	}
    if (event.which === KEY.W || event.which === KEY.S){
      gameItem2.speedY = 0;
    }

  }
  
  function checkBoundaries(){
    if (gameItem.x > BOARD_WIDTH - GAMEITEM_WIDTH){ 
    	  gameItem.x = BOARD_WIDTH - GAMEITEM_WIDTH;
		}
		if (gameItem.x < 0){ 
    	  gameItem.x = 0;
		}
		if (gameItem.y > BOARD_HEIGHT - GAMEITEM_HEIGHT){ 
    	  gameItem.y  = BOARD_HEIGHT - GAMEITEM_HEIGHT;
		}
		if (gameItem.y < 0){ 
    	  gameItem.y  = 0;
		}
		if (gameItem2.x > BOARD_WIDTH - GAMEITEM2_WIDTH){ 
    	  gameItem2.x = BOARD_WIDTH - GAMEITEM2_WIDTH;
		}
		if (gameItem2.x < 0){ 
    	  gameItem2.x = 0;
		}
		if (gameItem2.y > BOARD_HEIGHT - GAMEITEM2_HEIGHT){ 
    	  gameItem2.y= BOARD_HEIGHT - GAMEITEM2_HEIGHT;
		}
		if (gameItem2.y < 0){ 
    	  gameItem2.y= 0;
		}
  }
  


  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function repositionAndRedrawGameItems(){
    gameItem.x += gameItem.speedX;    // update the position of Indy along the x-axis
    gameItem.y += gameItem.speedY;   // update the position of Indy along the x-axis
    $(gameItem.id).css("left", gameItem.x);    // draw the gameItem in the new location, positionX pixels away from the "left"
    $(gameItem.id).css("top", gameItem.y);    // draw the gameItem in the new location, positionY pixels away from the "top"
    gameItem2.x += gameItem2.speedX;    // update the position of Hitler along the x-axis
    gameItem2.y  += gameItem2.speedY;   // update the position of Hitler along the x-axis
    $(gameItem2.id).css("right", gameItem2.x);    // draw the gameItem in the new location, positionX pixels away from the "left"
    $(gameItem2.id).css("bottom", gameItem2.y);    // draw the gameItem in the new location, positionY pixels away from the "top"
  }
  
  
  //function randomColorChange(){
    //return '#'+(Math.floor(Math.random()*16777216)&0xFFFFFF).toString(16); //changes the color of the player when enter is pressed to a random color
  //}
  
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
});
