var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    var tree;
    var sTree;
    var sTree2;
    var sTree3;
    var falcon;
    var tardis;
    var level2;
    var delorean;
    var enterprise;
    var buildings = [];
    
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
        
        // add objects for display in background
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();
            
            
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var ctx = canvas.getContext("2d"); 
            var grd = ctx.createLinearGradient(0,canvasHeight,0,0);
            grd.addColorStop(0.26, "#ffffff");
            grd.addColorStop(0.3,"#C724B1");
            grd.addColorStop(1,"#000000"); 
            grd.addColorStop(0.1,"#000000");
            var backgroundFill = draw.rect(canvasWidth, groundY, grd);
            background.addChild(backgroundFill);
            //thanks Tony
            
            // TODO: 3 - Add a moon and starfield   
            
                
                var circle;
                    for(var i=0;i<100;i++) {
                        circle = draw.circle(1,'white','LightGray',2);
                        circle.x = canvasWidth*Math.random();
                        circle.y = groundY*Math.random();
                        background.addChild(circle);
                    }

                 var moon = draw.bitmap('img/moon.png');
                    moon.x = canvasWidth - 300;
                    moon.y = 25;
                    moon.scaleX = .4;
                    moon.scaleY = .4;
                    background.addChild(moon);
                 
                                  
                 var logo = draw.bitmap('img/insertcoingif.gif');
                    logo.x = 400;
                    logo.y = 25;

                    background.addChild(logo);
            
            /* Did it but don't want it.
            TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
                    var buildingHeight = 300;
                    var building;
                    var buildingColors = ["Black", "LightGray", "Blue", "Black", "LightBlue"]
                    var buildingHeightDifferent = [175, 195, 130, 175, 150]
                    for (var i = 0; i < 5; ++i) {
                         building = draw.rect(75,buildingHeightDifferent[i],buildingColors[i],'Black',1);
                         building.x = 150*i;
                        building.y = groundY-buildingHeightDifferent[i];
                        background.addChild(building);
                        buildings.push(building);
                 }
                  
                    
             TODO 4: Part 1 - Add a tree
                tree = draw.bitmap('img/tree.png');
                tree.x = 175;
                tree.y = groundY - 250;
                background.addChild(tree);
            */

//millenium falcon      
            falcon = draw.bitmap('img/falcon.png');
                falcon.x = 2500;
                falcon.y = groundY - 500;
                falcon.scaleX = .6;
                falcon.scaleY = .6;
                background.addChild(falcon);
                
//enterprise     
            enterprise = draw.bitmap('img/enterprise.png');
                enterprise.x = 5000;
                enterprise.y = groundY - 400;
                enterprise.scaleX = 1.2;
                enterprise.scaleY = 1.2;
                background.addChild(enterprise);
              
                
//trees
            sTree = draw.bitmap('img/silhouettetree.png');
                sTree.x = 1500;
                sTree.y = groundY - 400;
                sTree.scaleX = .5;
                sTree.scaleY = .5;
                background.addChild(sTree);
                
            sTree2 = draw.bitmap('img/silhouettetree.png');
                sTree2.x = 800;
                sTree2.y = groundY - 320;
                sTree2.scaleX = .4;
                sTree2.scaleY = .4;
                background.addChild(sTree2);
        
             sTree3 = draw.bitmap('img/treesil2.png');
                sTree3.x = 2000;
                sTree3.y = groundY - 233;
                sTree3.scaleX = .12;
                sTree3.scaleY = .12;
                background.addChild(sTree3);
                
//Level 2
            
                level2 = draw.bitmap('img/level2.png');
                level2.x = 5000;
                level2.y = groundY - 400 ;
                level2.scaleX = 2; 
                level2.scaleY = 2;    
                background.addChild(level2);

//Delorean
            
                delorean = draw.bitmap('img/delorean.png');
                delorean.x = 4500;
                delorean.y = groundY - 135;
                delorean.scaleX = .4; 
                delorean.scaleY = .4;    
                background.addChild(delorean);
                  
       
// Do not delete
        }
        

        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            
            
            // TODO 4: Part 2 - Move the tree!
                // tree.x = tree.x - 3;
                // if(tree.x < -200) {
                //     tree.x = canvasWidth;
                // }
                
                 sTree.x = sTree.x - 2;

                if (sTree.x < -500) {
                     sTree.x = canvasWidth;
                 }
                 
                 sTree2.x = sTree2.x - 1;
                if (sTree2.x < -500) {
                     sTree2.x = canvasWidth;
                 }
                 
                 sTree3.x = sTree3.x - 1;
                if (sTree3.x < -500) {
                     sTree3.x = canvasWidth;
                 }
                
// millenium falcon
                falcon.x = falcon.x - 4;
                
//Level 2
               level2.x = level2.x - 2.5;
               
//enterprise
               enterprise.x = enterprise.x - 4;

//enterprise
               delorean.x = delorean.x - 2;   
                 
            // TODO 5: Part 2 - Parallax
                
                
              
            //for (var i = 0; i < buildings.length; i++) {
            //    var building = buildings[i];
            //    building.x = building.x - 1;
            //    if(building.x < -200) {
            //        building.x = canvasWidth;
            //    }
            //}


        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
