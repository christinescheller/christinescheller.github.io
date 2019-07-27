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
                {type: 'tardis', x:8600, y:groundY-120},
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
            
            createSawBlade(600, groundY - 110);
            createSawBlade(2000, groundY - 110);
            createSawBlade(2900, groundY - 110);
            
            //level 2 sawblades
            createSawBlade(5000, groundY - 110);
            createSawBlade(5100, groundY - 110);
            createSawBlade(5200, groundY - 110);
            
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
                obstacleImage.y = -32;
        }
                
            createSpikes(1000, groundY - 18);
            createSpikes(1400, groundY - 18);
            createSpikes(2200, groundY - 18);
            createSpikes(2700, groundY - 18);
            createSpikes(3200, groundY - 18);
            createSpikes(3800, groundY - 18);
            
            //level 2 spikes
            
            createSpikes(4800, groundY - 18);
            createSpikes(5400, groundY - 18);
            createSpikes(5600, groundY - 18);
            createSpikes(6000, groundY - 18);
            createSpikes(6200, groundY - 18);
            createSpikes(6400, groundY - 18);
            
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
        
        createEnemy(600, groundY - 50);
        createEnemy(2000, groundY - 50);
        createEnemy(2700, groundY - 50);
        
function createGhost2 (x,y) {
            var enemy =  game.createGameItem('ghost2',30);
                enemy.x = x;
                enemy.y = y;
                enemy.velocityX = -1.8;
                
            var ghost2 = draw.bitmap('img/ghost2.png');
                ghost2.x = -39;
                ghost2.y = -40;
            
                
            enemy.addChild(ghost2);
                
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
        
        createGhost2(5000, groundY - 50);
        createGhost2(5100, groundY - 50);
        createGhost2(5200, groundY - 50);

//level 1 reward :
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
        
            createReward(1000, groundY - 100);
            createReward(1400, groundY - 100);
            createReward(2200, groundY - 100);
            createReward(2700, groundY - 100);
            createReward(3200, groundY - 100);
            createReward(3800, groundY - 100);

//level 2 reward            
    function createReward2 (x,y) {
            var cherry = game.createGameItem('cherry', 17);
                cherry.x = x;
                cherry.y = y;
                cherry.velocityX = -2;
                
            var blueSquare = draw.bitmap('img/cherry.png');
                blueSquare.x = -20;
                blueSquare.y = -23;
                
            cherry.addChild(blueSquare);
            
            game.addGameItem(cherry);
            
            cherry.onPlayerCollision = function() {
                game.increaseScore(50);
                cherry.fadeOut();
            };
        }
        
            createReward2(4800, groundY - 100);
            createReward2(5400, groundY - 100);
            createReward2(5600, groundY - 100);
            createReward2(6000, groundY - 100);
            createReward2(6200, groundY - 100);
            createReward2(6400, groundY - 100);

function createTardis (x,y) {
            var hitZoneSize = 50;
            var tardis = game.createGameItem('tardis', hitZoneSize);
                tardis.x = x;
                tardis.y = y + 50;
                tardis.velocityX = - 2.2;
                
            var blueSquare = draw.bitmap('img/tardis.png');
                blueSquare.x = - 70;
                blueSquare.y = - 175;
            
            tardis.addChild(blueSquare);
            
            game.addGameItem(tardis);
            
            tardis.onPlayerCollision = function() {
                 game.changeIntegrity(+50);
                tardis.fadeOut();
            };
        }
        
            createTardis(4500, groundY - 129);
            
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}