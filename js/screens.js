Game.Screen = {};

// Define our initial start screen
Game.Screen.startScreen = {
	enter: function() { 
		console.log("Entered start screen"); 
	},
	exit: function() {
		console.log("Exited start screen"); 
	},
	render: function(display) {
		// Render our prompt to the screen
		display.drawText(1,1,"%c{yellow}Javascript Roguelike");
		display.drawText(1,2, "Press [ENTER] to start!");
	},
	handleInput: function(inputType, inputData) {
		if(inputType == 'keyup') {
			if(inputData.keyCode === ROT.VK_RETURN) {
				Game.switchScreen(Game.Screen.playScreen);
			}
		}
	}
}

//Define our playing screen
Game.Screen.playScreen = {
    _map : null,
    _player: null,
    
	enter: function() { 
		console.log("Entered play screen"); 

		// create an empty map
		var map = [];
		var mapWidth = 100;
		var mapHeight = 48;
	    for (var x = 0; x < mapWidth; x++) {
	        // Create the nested array for the y values
	        map.push([]);
	        // Add all the tiles
	        for (var y = 0; y < mapHeight; y++) {
	            map[x].push(Game.Tile.nullTile);
	        }
	    }
	    
	    var caveGenerator = new ROT.Map.Cellular(mapWidth, mapHeight);
	    caveGenerator.randomize(0.5);

	    var totalIterations = 3;
	    // Iteratively smoothen the map
	    for (var i = 0; i < totalIterations - 1; i++) {
	    	caveGenerator.create();
	    }
	    // Smoothen it one last time and then update our map
	    caveGenerator.create(function(x,y,v) {
	        if (v === 1) {
	            map[x][y] = Game.Tile.floorTile;
	        } else {
	            map[x][y] = Game.Tile.wallTile;
	        }
	    });
        // Create our player and set the position
        this._player = new Game.Entity(Game.PlayerTemplate);
	    // Create our map from the tiles
	    this._map = new Game.Map(map, this._player);
	    // Start the map's engine
        this._map.getEngine().start();
	},
	exit: function() {
		console.log("Exited play screen"); 
	},
	render: function(display) {
        var screenWidth = Game.getScreenWidth();
        var screenHeight = Game.getScreenHeight();
        // Make sure the x-axis doesn't go to the left of the left bound
        var topLeftX = Math.max(0, this._player.getX() - (screenWidth / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftX = Math.min(topLeftX, this._map.getWidth() - screenWidth);
        // Make sure the y-axis doesn't above the top bound
        var topLeftY = Math.max(0, this._player.getY() - (screenHeight / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftY = Math.min(topLeftY, this._map.getHeight() - screenHeight);
        
	    // Iterate through all map cells
	    for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
	        for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
	            // Fetch the glyph for the tile and render it to the screen
	        	// at the offset position
	            var tile = this._map.getTile(x, y);
	            display.draw(
            		x - topLeftX, 
            		y - topLeftY,
            		tile.getChar(), 
            		tile.getForeground(), 
            		tile.getBackground());
	        }
	    }

        // Render the cursor
        display.draw(
            this._player.getX() - topLeftX, 
            this._player.getY() - topLeftY,
            this._player.getChar(),
            this._player.getForeground(),
            this._player.getBackground()
        );
        
        // Render the entities
        var entities = this._map.getEntities();
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            // Only render the entitiy if they would show up on the screen
            if (entity.getX() >= topLeftX && entity.getY() >= topLeftY &&
                entity.getX() < topLeftX + screenWidth &&
                entity.getY() < topLeftY + screenHeight) {
                display.draw(
                    entity.getX() - topLeftX, 
                    entity.getY() - topLeftY,    
                    entity.getChar(), 
                    entity.getForeground(), 
                    entity.getBackground()
                );
            }
        }

        // Get the messages in the player's queue and render them
        var messages = this._player.getMessages();
        var messageY = 0;
        for (var i = 0; i < messages.length; i++) {
            // Draw each message, adding the number of lines
            messageY += display.drawText(
                0, 
                messageY,
                '%c{white}%b{black}' + messages[i]
            );
        }

        // Render player HP 
        var stats = '%c{white}%b{black}';
        stats += vsprintf('HP: %d/%d ', [this._player.getHp(), this._player.getMaxHp()]);
        display.drawText(0, screenHeight, stats);
	},
	handleInput: function(inputType, inputData) {
		if(inputType == 'keyup') {
			// If enter is pressed, go to the win screen
            if (inputData.keyCode === ROT.VK_RETURN) {
                Game.switchScreen(Game.Screen.winScreen);
                
            // If escape is pressed, go to lose screen
            } else if (inputData.keyCode === ROT.VK_ESCAPE) {
                Game.switchScreen(Game.Screen.loseScreen);
            }
		}
		if(inputType=='keydown') {

            // Movement
            if (inputData.keyCode === ROT.VK_LEFT) {
                this.move(-1, 0);
            } else if (inputData.keyCode === ROT.VK_RIGHT) {
                this.move(1, 0);
            } else if (inputData.keyCode === ROT.VK_UP) {
                this.move(0, -1);
            } else if (inputData.keyCode === ROT.VK_DOWN) {
                this.move(0, 1);
            }
            
            this._map.getEngine().unlock();
		}
	},
	move: function(dX, dY) {
        var newX = this._player.getX() + dX;
        var newY = this._player.getY() + dY;
        // Try to move to the new cell
        this._player.tryMove(newX, newY, this._map);
	}
}

//Define our winning screen
Game.Screen.winScreen = {
	enter: function() { 
		console.log("Entered win screen"); 
	},
	exit: function() {
		console.log("Exited win screen"); 
	},
	render: function(display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            // Generate random background colors
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var background = ROT.Color.toRGB([r, g, b]);
            display.drawText(2, i + 1, "%b{" + background + "}You win!");
        }
        display.drawText(2, 23, "%c{red}%b{white}Press [Enter] to start over.");
	},
	handleInput: function(inputType, inputData) {
		if(inputType == 'keyup') {
		  // If enter is pressed, start over
          if (inputData.keyCode === ROT.VK_RETURN) {
              Game.switchScreen(Game.Screen.startScreen);
          }
		}
	}
}

//Define our losing screen
Game.Screen.loseScreen = {
	enter: function() { 
		console.log("Entered lose screen"); 
	},
	exit: function() {
		console.log("Exited lose screen"); 
	},
	render: function(display) {
      // Render our prompt to the screen
      for (var i = 0; i < 22; i++) {
          // Generate random background colors
          var r = Math.round(Math.random() * 255);
          var g = Math.round(Math.random() * 255);
          var b = Math.round(Math.random() * 255);
          var background = ROT.Color.toRGB([r, g, b]);
          display.drawText(2, i + 1, "%b{red}You lose! :(");
      }
      display.drawText(2, 23, "%c{red}%b{white}Press [Enter] to start over.");
	},
	handleInput: function(inputType, inputData) {
		if(inputType == 'keyup') {
			// If enter is pressed, start over
	        if (inputData.keyCode === ROT.VK_RETURN) {
	            Game.switchScreen(Game.Screen.startScreen);
	        }
		}
	}
}

