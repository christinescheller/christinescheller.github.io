
    /* global $ */
    'use strict'
    $(document).ready(function(){
        //////////////////////////////////////////////////////////////////
        /////////////////// SETUP DO NOT DELETE //////////////////////////
        //////////////////////////////////////////////////////////////////

        var BOARD_WIDTH = $('.board').width();	// Number: the maximum X-Coordinate of the screen

        // Every 50 milliseconds, call the update Function (see below)
        setInterval(update, 50);

        // Every time the box is clicked, call the handleBoxClick Function (see below)
        $('.box').on('click', handleBoxClick);

        //////////////////////////////////////////////////////////////////
        /////////////////// YOUR CODE BELOW HERE /////////////////////////
        //////////////////////////////////////////////////////////////////

        var positionX = 0;
        var speedX = 10;
        var points = 0;

        /* 
        This Function will be called 20 times/second. Each time it is called,
        it should move the Box to a new location. If the box drifts off the screen
        turn it around! 
        */
        function update() {
            positionX += speedX;
            $('.box').css("left", positionX);

            if (positionX > BOARD_WIDTH) {
                speedX = -speedX;
            }
            else if (positionX < 0) {
                speedX = -speedX;
            }
        };

        /* 
        This Function will be called each time the box is clicked. Each time it is called,
        it should increase the points total, increase the speed, and move the box to
        the left side of the screen.
        */
        function handleBoxClick() {
            points += 1;
            $('.box').text(points);
            
            if (speedX >= 0) {
                speedX += 3;
            } 
            else {
                speedX -= 3;
            }
            
            positionX = 0;
        };


    }); // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE
