/* global $, sessionStorage*/

$(document).ready(function() {
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// INITIALIZATION ///////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FPS = 60;
  var KEY = {
    "UP": 38,
    "DOWN": 40,

    "W": 83,
    "S": 87,
  };

  var BOARD_WIDTH = $('#board').width(); // Number: the maximum X-Coordinate of the screen
  var BOARD_HEIGHT = $('#board').height();

  // Game Item Objects

  function GameItem(x, y, speedX, speedY, id) {
    var gameItemInstance = {
      x: x,
      y: y,
      h: $(id).height(),
      w: $(id).width(),
      speedX: speedX,
      speedY: speedY,
      id: id,
    };
    return gameItemInstance;
  }

  var paddleLeft = GameItem(20, 200, 0, 0, "#paddleLeft");
  paddleLeft.name = prompt("Player One's Name");

  var paddleRight = GameItem(BOARD_WIDTH - 20 - $('#paddleRight').width(), 200, 0, 0, "#paddleRight");
  paddleRight.name = prompt("Player Two's Name");

  var ball = GameItem(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3), "#ball");

  $("#playAgain").hide() 

  // other game variables

  var scorePL = 9;
  var scorePR = 9;
  var paddleLeftWins = paddleLeft.name + " WINS!";
  var paddleRightWins = paddleRight.name + " WINS!";
  var winner = "#winner";
  var mySound;

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // turn on event handlers
  var interval = setInterval(newFrame, 1000 / FPS); // execute newFrame 60 times per second.
  $(document).on('keydown', handleKeyDown); // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); // change 'eventType' to the type of event you want to handle

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

  function newFrame() {
    drawPlayerNames();
    drawScore();
    drawGameObject(paddleLeft);
    drawGameObject(paddleRight);
    drawGameObject(ball);
    updateGameObject(paddleLeft);
    updateGameObject(paddleRight);
    updateGameObject(ball);
    checkBoundaries(paddleLeft);
    checkBoundaries(paddleRight);
    handlePoints();
    handleLeftRightWallHit();
    handleTopBottomWallHit();
    handlePaddleHits();
    handleWinner();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {

    if (event.which === KEY.UP) {
      paddleRight.speedY = -7;
    }
    if (event.which === KEY.DOWN) {
      paddleRight.speedY = 7;
    }

    if (event.which === KEY.W) {
      paddleLeft.speedY = 7;
    }
    if (event.which === KEY.S) {
      paddleLeft.speedY = -7;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      paddleRight.speedY = 0;
    }
    if (event.which === KEY.W || event.which === KEY.S) {
      paddleLeft.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Movement Helpers
  /////////////////////////////////////////////////////////////////////////

  function drawGameObject(obj) {

    $(obj.id).css("top", obj.y); 
    $(obj.id).css("left", obj.x);
  }

  function updateGameObject(obj){
    obj.y += obj.speedY; 
    obj.x += obj.speedX;
  }

  function checkBoundaries(obj) {
    if (obj.y > BOARD_HEIGHT - obj.h) {
      obj.y = BOARD_HEIGHT - obj.h;
    }
    if (obj.y < 0) {
      obj.y = 0;
    }
  }
  
  function handleTopBottomWallHit() {
    if (ball.y > BOARD_HEIGHT - ball.h) {
      mySound = new sound("audio_top_bottom_wall.wav");
      mySound.play();
      ball.speedY *= -1;
    }
    if (ball.y < 0) {
      mySound = new sound("audio_top_bottom_wall.wav");
      mySound.play();
      ball.speedY *= -1;
    }
  }

  function handlePaddleHits() {
    if (doCollide(ball, paddleLeft)) {
      mySound = new sound("audio_paddle.wav");
      mySound.play();
      ball.speedX *= -1;
      changeBallSpeed();
    }
    if (doCollide(ball, paddleRight)) {
      mySound = new sound("audio_paddle.wav");
      mySound.play();
      ball.speedX *= -1;
      changeBallSpeed();
    }
  }

  function changeBallSpeed() {
    if (ball.speedX >= 0) {
      ball.speedX += .5;
    }
    else {
      ball.speedX -= .5;
    }
    if (ball.speedY >= 0) {
      ball.speedY += .5;
    }
    else {
      ball.speedY -= .5;
    }
  }
  
  function doCollide(obj1, obj2) {

    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.x + obj1.w;
    obj1.bottomY = obj1.y + obj1.h;


    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + obj2.w;
    obj2.bottomY = obj2.y + obj2.h;

    if (obj1.leftX < obj2.rightX &&
      obj1.rightX > obj2.leftX &&
      obj1.bottomY > obj2.topY &&
      obj1.topY < obj2.bottomY) {
      return true;
    }
    else {
      return false;
    }
  }

  // Game Info Helpers
  /////////////////////////////////////////////////////////////////////////
  
  function drawScore() {
    $('#scorePaddleLeft').text(scorePL);
    $('#scorePaddleRight').text(scorePR);
  }

  function drawPlayerNames() {
    $('#playerName1').text(paddleLeft.name);
    $('#playerName2').text(paddleRight.name);
  }

  function drawWinner() {
    $(winner.id).css("top", BOARD_HEIGHT / 2 - $("#winner").height() / 2);
    $(winner.id).css("left", BOARD_WIDTH / 2 - $("#winner").width() / 2);
  }

  function drawPlayAgainButton() {
    $("#playAgain").text("PLAY AGAIN");
    $("#playAgain").css("top", BOARD_HEIGHT - $("#playAgain").height());
    $("#playAgain").css("left", BOARD_WIDTH / 2 - $("#playAgain").width() / 2);
    $("#playAgain").show();
  }
  
  // Scoring Helpers
  /////////////////////////////////////////////////////////////////////////
  
  function handleWinner() {
    if (scorePL === 11) {
      endGame();
      $(winner.id).text(paddleLeftWins);
      drawWinner();
      drawPlayAgainButton();
    }
    else if (scorePR === 11) {
      endGame();
      $(winner.id).text(paddleRightWins);
      drawWinner();
      drawPlayAgainButton();
    }
  }


  function handlePoints() {
    if (ball.x > BOARD_WIDTH - ball.w) {
      scorePL++;
    }
    if (ball.x < 0) {
      scorePR++;
    }
  }

  function handleLeftRightWallHit() {
    if (ball.x > BOARD_WIDTH - ball.w) {
      mySound = new sound("audio_left_right_wall.wav");
      mySound.play();
      reset();
    }
    if (ball.x < 0) {
      mySound = new sound("audio_left_right_wall.wav");
      mySound.play();
      reset();
    }
  }

  function reset() {

    if (scorePL !== 11 || scorePR !== 11) {
        paddleLeft = GameItem(20, 200, 0, 0, "#paddleLeft");
        paddleRight = GameItem(BOARD_WIDTH - 20 - $('#paddleRight').width(), 200, 0, 0, "#paddleRight");
        ball = GameItem(BOARD_WIDTH / 2, BOARD_HEIGHT / 2, (Math.random() > 0.5 ? -3 : 3), (Math.random() > 0.5 ? -3 : 3), "#ball");
    }
    else {
      paddleLeft.y = 200;
      paddleLeft.speedY = 0;
      paddleLeft.speedX = 0;

      paddleRight.y = 200;
      paddleRight.speedY = 0;
      paddleRight.speedX = 0;

      ball.x = BOARD_WIDTH / 2;
      ball.y = BOARD_HEIGHT / 2;
      ball.speedX = 0;
      ball.speedY = 0;
    }
  }
  
  // Other Helpers
  /////////////////////////////////////////////////////////////////////////

  /** excellent helper! */
  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
      this.sound.play();
    };
    this.stop = function() {
      this.sound.pause();
    };
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

});
