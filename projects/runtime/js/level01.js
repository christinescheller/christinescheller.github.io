var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'sawblade',x:600,y:groundY},
                {type: 'sawblade',x:900,y:groundY},
                {type: 'sawblade',x:1200,y:groundY},
                {type: 'sawblade',x:1400,y:groundY},
                {type: 'spikes', x:1000,y:groundY-120},
                {type: 'spikes', x:1800, y:groundY-120},
                {type: 'spikes', x:6400, y:groundY-120},
                {type: 'spikes', x:8600, y:groundY-120},
                {type: 'reward', x:1000,y:groundY-120},
                {type: 'reward', x:1800, y:groundY-120},
                {type: 'reward', x:6400, y:groundY-120},
                {type: 'reward', x:8600, y:groundY-120},
                
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
      
    //sawblade
        
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);  
            
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            }
            
            createSawBlade(400, groundY - 110);
            createSawBlade(1800, groundY - 110);
            createSawBlade(2700, groundY - 110);
            
         //for (var i = 0; i <= levelData.gameItems.length-1; i++) {
           // var gameItem = levelData.gameItems[i];
            
         // if (gameItem.type === 'sawblade') {
              //  createSawBlade(gameItem.x,gameItem.y);
          //  }
        // }
        
     //additional obstacle
                
        function createSpikes(x,y) {
            var hitZoneSize = 23;
            var damageFromObstacle = 20;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
                myObstacle.x = x;
                myObstacle.y = y;
                
                game.addGameItem(myObstacle);
                
            var obstacleImage = draw.bitmap('img/spikes.png');
                myObstacle.addChild(obstacleImage);
                obstacleImage.x = -24;
                obstacleImage.y = -24;
        }
                
            createSpikes(800, groundY - 30);
            createSpikes(1200, groundY - 30);
            createSpikes(2000, groundY - 30);
            createSpikes(2500, groundY - 30);
            createSpikes(3000, groundY - 30);
            createSpikes(3600, groundY - 30);
//baddie
        function createEnemy (x,y) {
            var enemy =  game.createGameItem('enemy',30);
                enemy.x = x;
                enemy.y = y;
                enemy.velocityX = -1.5;
                
            var ghost = draw.bitmap('img/ghost.png');
                ghost.x = -39;
                ghost.y = -40;
                
            enemy.addChild(ghost);
                
            game.addGameItem(enemy);
            
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-30);
                enemy.fadeOut();
            };
            
            enemy.onProjectileCollision = function() {
                game.increaseScore(50);
                enemy.fadeOut();
            };
        }
        
        createEnemy(400, groundY - 50);
        createEnemy(1800, groundY - 50);
        createEnemy(2500, groundY - 50);

//reward :
        function createReward (x,y) {
            var reward = game.createGameItem('reward', 17);
                reward.x = x;
                reward.y = y;
                reward.velocityX = -2;
                
            var blueSquare = draw.bitmap('img/jewel.png');
                blueSquare.x = -20;
                blueSquare.y = -20;
                
            reward.addChild(blueSquare);
            
            game.addGameItem(reward);
            
            reward.onPlayerCollision = function() {
                game.increaseScore(50);
                reward.fadeOut();
            };
        }
        
            createReward(800, groundY - 100);
            createReward(1200, groundY - 100);
            createReward(2000, groundY - 100);
            createReward(2500, groundY - 100);
            createReward(3000, groundY - 100);
            createReward(3600, groundY - 100);
    
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}