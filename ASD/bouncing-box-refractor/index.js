
/* global $ */
'use strict'
$(document).ready(function(){
	//////////////////////////////////////////////////////////////////
	/////////////////// INITIALIZATION//////////////////////////
	//////////////////////////////////////////////////////////////////

	var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen
	var BOARD_HEIGHT= $('#window').height();
	
	// Every 50 milliseconds, call the update Function (see below)
	setInterval(update, 50);

	// Every time the box is clicked, call the handleBoxClick Function (see below)
	$('#box').on('click', handleBoxClick);
	
	
	var positionX = 0;
	var speedX = 10;
	var points = 0;

	//////////////////////////////////////////////////////////////////
	/////////////////// CORE LOGIC /////////////////////////
	//////////////////////////////////////////////////////////////////

	/* 
	This Function will be called 20 times/second. Each time it is called,
	it should move the Box to a new location. If the box drifts off the screen
	turn it around! 
	*/
	function update() {
		checkSides();
		redrawAndMoveBox();
	}

	/* 
	This Function will be called each time the box is clicked. Each time it is called,
	it should increase the points total, increase the speed, and move the box to
	the left side of the screen.
	*/
	function handleBoxClick() {
		changeSpeed();
		increasePoints();
		resetBox();
		
	}

	//////////////////////////////////////////////////////////////////
	/////////////////// HELPER FUNCTIONS /////////////////////////
	//////////////////////////////////////////////////////////////////


	function checkSides(){
		if (positionX > BOARD_WIDTH) { 
			changeDirection();
		}
		else if (positionX < 0) {
			changeDirection();
		}
	}
	
	function redrawAndMoveBox(){
		positionX += speedX; //moves box
		$('#box').css("left", positionX);  //redraw's box on new position
	}
	
	function changeSpeed(){
		if (speedX >= 0) {
			speedX += 3; //if moving to the right increase by positive 3
		} 
		else {
			speedX -= 3; //if moving to the left make negative 3
		}
	}
	
	function increasePoints(){
		$('#box').text(points); //shows new points on box
		points += 1; //increases points by one
	}
	
	function resetBox(){ //resets box once clicked to the left side of the screen
		positionX = 0;
	}
	
	function changeDirection(){
		speedX = -speedX; //changes direction of box movement
	}


}); // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE
