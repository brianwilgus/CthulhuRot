Game.Screen = {};


lovecraftQuotes = [
      "Ultimate horror often paralyses memory in a merciful way.",
      "Searchers after horror haunt strange, far places.",
      "In his house at R'lyeh, dead Cthulu waits dreaming.",
      "If I am mad, it is mercy! May the gods pity the man who in his callousness can remain sane to the hideous end!",
      "The world is indeed comic, but the joke is on mankind.",
      "That is not dead which can eternal lie, yet with stranger eons, even death may die.",
      "I felt myself on the edge of the world; peering over the rim into a fathomless chaos of eternal night.",
      "That is not dead which can eternal lie, yet with stranger eons, even death may die.",
      "And where Nyarlathotep went, rest vanished, for the small hours were rent with the screams of nightmare.",
      "Something was creeping and waiting to be seen and felt and heard."
];

endingType = "";

// Define our initial start screen
Game.Screen.startScreen = {
	fillQuotes: function() {
		this._quotes = [];
		
		this._quotes[0] = [
		   		 	"Along the shore the cloud waves break,",
		 		 	"The twin suns sink behind the lake,",
			 		"The shadows lengthen...",
			 		"In Carcosa."
		 		];
		
		this._quotes[1] = [
		 		 	"Strange is the night where black stars rise,",
		 		 	"And strange moons circle through the skies,",
			 		"But stranger still is...",
			 		"Lost Carcosa."
		 		];
		
		this._quotes[2] = [
		 		 	"Songs that the Hyades shall sing,",
		 		 	"Where flap the tatters of the King,",
			 		"Must die unheard in...",
			 		"Dim Carcosa."
		 		];
		
		this._quotes[3] = [
		 		 	"Song of my soul, my voice is dead,",
		 		 	"Die thou, unsung, as tears unshed",
			 		"Shall dry and die in...",
			 		"Lost Carcosa."
		 		];
	},
	enter: function() { 
		console.log("Entered start screen"); 
		this.fillQuotes();
	},
	exit: function() {
		console.log("Exited start screen"); 
	},
	render: function(display) {
		var ycount = 2;		
		
		// Render our prompt to the screen
		
		for(var i = 0; i < this._quotes.length; i++){
			for(line in this._quotes[i]){
				if(!isNaN(line)){
					display.drawText(2, ycount++, this._quotes[i][line]);
				}
			}
			ycount++;
		}
		ycount++;
		display.drawText(2, ycount++, "%c{white}- Cassilda's Song in 'The King in Yellow' Act 1, Scene 2");
		ycount += 2;
		display.drawText(2, ycount++, "%c{lightgreen}Press [ENTER] to begin.");
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
    _gameEnded: null,
    _subScreen: null,
    
	enter: function() { 
		this._gameEnded = false;
        // Create a map based on our size parameters
        var width = 100;
        var height = 48;
        var depth = 7;
        // Create our map from the tiles and player
        this._player = new Game.Entity(Game.PlayerTemplate);
        var tiles = new Game.Builder(width, height, depth).getTiles();
        var map = new Game.Map.Cave(tiles, this._player);
        // Start the map's engine
        map.getEngine().start();
        
        // Start the interface
        Game.Interface.getStatus().updateItems(
        		{
        			depth:1,
        			locationNames:[
        				           'Dark Forest', 
        			               'Beast Dens', 
        			               'Deep Undergrowth', 
        			               'Stone Quarry', 
        			               'Monster Lairs', 
        			               'Eldritch Caverns', 
        			               'Infernal Passages'
        			              ]
        		});
    	Game.Interface.update();

		Game.Narrator.helpText("start");
	},
	exit: function() {
		console.log("Exited play screen"); 
	},
    render: function(display) {
        // Render subscreen if there is one
        if (this._subScreen) {
            this._subScreen.render(display);
            return;
        }
                        
        var screenWidth = Game.getScreenWidth();
        var screenHeight = Game.getScreenHeight()-1;
        // Make sure the x-axis doesn't go to the left of the left bound
        var topLeftX = Math.max(0, this._player.getX() - (screenWidth / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftX = Math.min(topLeftX, this._player.getMap().getWidth() - screenWidth);
        topLeftX = Math.ceil(topLeftX);// fix fractional numbers
        // Make sure the y-axis doesn't above the top bound
        var topLeftY = Math.max(0, this._player.getY() - (screenHeight / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftY = Math.min(topLeftY, this._player.getMap().getHeight() - screenHeight);
        topLeftY = Math.ceil(topLeftY);// fix fractional numbers
        // This object will keep track of all visible map cells
        var visibleCells = {};
        this.keys = {};
        this.keys['entities']= [];
        
        
        //console.log("render: topLeftX "+topLeftX+" topLeftY "+topLeftY);

        // Store this._player.getMap() and player's z to prevent losing it in callbacks
        var map = this._player.getMap();
        var currentDepth = this._player.getZ();
        
        // Find all visible cells and update the object
        map.getFov(currentDepth).compute(
            this._player.getX(), this._player.getY(),
            this._player.getSightRadius(),
            function(x, y, radius, visibility) {
                visibleCells[x + "," + y] = true;
                // Mark cell as explored
                map.setExplored(x, y, currentDepth, true);
            });
        
        // Render the explored map cells
        for (var x = topLeftX; x < topLeftX + screenWidth; x++) {
            for (var y = topLeftY; y < topLeftY + screenHeight; y++) {
                if (map.isExplored(x, y, currentDepth)) {
                    // Fetch the glyph for the tile and render it to the screen
                    // at the offset position.
                    var glyph = map.getTile(x, y, currentDepth);
                    var foreground = glyph.getForeground();
                    // If we are at a cell that is in the field of vision, we need
                    // to check if there are items or entities.
                    if (visibleCells[x + ',' + y]) {
                        // Check for items first, since we want to draw entities
                        // over items.
                        var items = map.getItemsAt(x, y, currentDepth);
                        // If we have items, we want to render the top most item
                        if(items) {
                            glyph = items[items.length - 1];
                            this.keys['entities'].push(glyph);
                            if(Game.Narrator.getHelpItem("foodPickup")){
                            	for(obj in items){
                            		if(items[obj].hasMixin){
                                		if(items[obj].hasMixin("Edible")){
                                			Game.Narrator.helpText("foodPickup", {glyph:glyph});
                                			break;
                                    	}
                            		}
                            	}
                            } 
                        	if(Game.Narrator.getHelpItem("weaponPickup")){
                            	for(obj in items){
                            		if(items[obj].hasMixin){
                                		if(items[obj].hasMixin("Equippable")){
                                    		if(items[obj].isWieldable()){
                                    			Game.Narrator.helpText("weaponPickup", {glyph:glyph});
                                    			break;
                                        	}
                                		}
                            		}
                            	}
                            } 
                        	if(Game.Narrator.getHelpItem("armorPickup")){
                            	for(obj in items){
                            		if(items[obj].hasMixin){
                                		if(items[obj].hasMixin("Equippable")){
    	                            		if(items[obj].isWearable()){
    	                            			Game.Narrator.helpText("armorPickup", {glyph:glyph});
    	                            			break;
    	                                	}
                                		}
                            			
                            		}
                            	}
                            }
                        }
                        // Check if we have an entity at the position
                        if (map.getEntityAt(x, y, currentDepth)) {
                            glyph = map.getEntityAt(x, y, currentDepth);
                            this.keys['entities'].push(glyph);
                        }
                        // Update the foreground color in case our glyph changed
                        foreground = glyph.getForeground();
                        background = glyph.getBackground();
                    } else {
                        // Since the tile was previously explored but is not
                        // visible, we want to change the foreground color to
                        // dark gray.
                        foreground = '#232323';
                        background = '#000';
                    }
                    display.draw(
                        x - topLeftX,
                        y - topLeftY,
                        glyph.getChar(),
                        foreground,
                        background);
                }
            }
        }
        
        // Get the messages in the player's queue and render them
        var messages = this._player.getMessages();
        var messageY = 0;
        for (var i = 0; i < messages.length; i++) {
            // Draw each message, adding the number of lines
            messageY += display.drawText(
                1,
                messageY,
                '%c{white}%b{black}' + messages[i]
            );
        }
        
        // return a key for all entities that are within our line of sight
        Game.Interface.getKey().updateItems(this.keys);
        Game.Interface.update();
    },
    handleInput: function(inputType, inputData) {
        // If the game is over, enter will bring the user to the losing screen.
        if (this._gameEnded) {
            if (inputType === 'keydown' && inputData.keyCode === ROT.VK_RETURN) {
                Game.switchScreen(Game.Screen.loseScreen);
            }
            // Return to make sure the user can't still play
            return;
        }
        // Handle subscreen input if there is one
        if (this._subScreen) {
            this._subScreen.handleInput(inputType, inputData);
            return;
        }
        if (inputType === 'keydown') {
            // Movement
            if (inputData.keyCode === ROT.VK_LEFT || inputData.keyCode === ROT.VK_NUMPAD4) {
                this.move(-1, 0, 0);
            } else if (inputData.keyCode === ROT.VK_RIGHT || inputData.keyCode === ROT.VK_NUMPAD6) {
                this.move(1, 0, 0);
            } else if (inputData.keyCode === ROT.VK_UP || inputData.keyCode === ROT.VK_NUMPAD8) {
                this.move(0, -1, 0);
            } else if (inputData.keyCode === ROT.VK_DOWN || inputData.keyCode === ROT.VK_NUMPAD2) {
                this.move(0, 1, 0);
            } else if (inputData.keyCode === ROT.VK_NUMPAD9) { // up right
                this.move(1, -1, 0); 	
            } else if (inputData.keyCode === ROT.VK_NUMPAD3) { // down right
                this.move(1, 1, 0); 	
            } else if (inputData.keyCode === ROT.VK_NUMPAD7) { //up left
                this.move(-1, -1, 0); 	
            } else if (inputData.keyCode === ROT.VK_NUMPAD1) { // down left
                this.move(-1, 1, 0); 	
            } else if (inputData.keyCode === ROT.VK_I) {
                // Show the inventory screen
                this.showItemsSubScreen(Game.Screen.inventoryScreen, this._player.getItems(),
                    'You are not carrying anything.');
                return;
            } else if (inputData.keyCode === ROT.VK_D) {
                // Show the drop screen
                this.showItemsSubScreen(Game.Screen.dropScreen, this._player.getItems(),
                    'You have nothing to drop.');
                return;
            } else if (inputData.keyCode === ROT.VK_E) {
                // Show the drop screen
                this.showItemsSubScreen(Game.Screen.eatScreen, this._player.getItems(),
                   'You have nothing to eat.');
                return;
            } else if (inputData.keyCode === ROT.VK_W) {
                if (inputData.shiftKey) {
                    // Show the wear screen
                    this.showItemsSubScreen(Game.Screen.wearScreen, this._player.getItems(),
                        'You have nothing to wear.');
                } else {
                    // Show the wield screen
                    this.showItemsSubScreen(Game.Screen.wieldScreen, this._player.getItems(),
                        'You have nothing to wield.');
                }
                return;
            } else if (inputData.keyCode === ROT.VK_COMMA) {
                var items = this._player.getMap().getItemsAt(this._player.getX(), 
                    this._player.getY(), this._player.getZ());
                // If there is only one item, directly pick it up
                if (items && items.length === 1) {
                    var item = items[0];
                    if (this._player.pickupItems([0])) {
                        Game.sendMessage(this._player, "You pick up %s.", [item.describeA()]);
                    } else {
                        Game.sendMessage(this._player, "Your inventory is full! Nothing was picked up.");
                    }
                } else {
                    this.showItemsSubScreen(Game.Screen.pickupScreen, items,
                        'There is nothing here to pick up.');
                } 
                
            /** dev command to test end boss  **/
            } else if (inputData.keyCode === ROT.VK_F1) {
            	console.log("warp to end boss");
                Game.sendMessage(this._player, "warp to end boss");
                this._player.switchMap(new Game.Map.BossCavern());
                Game.sendMessage(this._player, "You enter the lair of Shub-Niggurath...");
                Game.Interface.getStatus().updateItems(
            		{
            			depth:1,
            			locationNames:["Lair of Shub-Niggurath"]
            		});
                
            /** dev command to test win screen **/
    		} else if(inputData.keyCode === ROT.VK_F2) {
                Game.switchScreen(Game.Screen.winScreen);
            
            /** dev command to test lose screen **/
    		} else if(inputData.keyCode === ROT.VK_F3) {
                Game.switchScreen(Game.Screen.loseScreen);
                
            } else if (inputData.keyCode === ROT.VK_SPACE || inputData.keyCode === ROT.VK_NUMPAD5) { // wait
            	Game.sendMessage(this._player, "You rest a turn.");
            	
            } else if(inputData.keyCode === ROT.VK_SHIFT) {
                // passthrus SHIFT, ALT, CNTRL
            	return;
    		} else {
            	// Not a valid key
    			//this.clearMessages();
    			//console.log(inputData.keyCode + " unrecognized.");
    			Game.sendMessage(this._player, "Not a valid key command. Press <?> for help.");
                Game.refresh();
            	return;	
            }
            
            // Unlock the engine
            this._player.getMap().getEngine().unlock();
            
        } else if (inputType === 'keypress') {
            var keyChar = String.fromCharCode(inputData.charCode);
            if (keyChar === '>') {
                this.move(0, 0, 1);
            } else if (keyChar === '<') {
                this.move(0, 0, -1);
                
            } else if (keyChar === "?") { // help
                // Show the wear screen
                this.setSubScreen(Game.Screen.helpScreen);
                
            } else if (keyChar === "T") { // help
                // Show the wear screen
                this.setSubScreen(Game.Screen.tipsScreen);
                
            } else {
                // Not a valid key
            	// Game.sendMessage(this._player, "Not a valid key command.  Press <?> for help.");
            	//this.clearMessages();
    			return;
            }
            
            // Unlock the engine
            this._player.getMap().getEngine().unlock();
        }
    },
    setGameEnded: function(gameEnded) {
        this._gameEnded = gameEnded;
    },
	move: function(dX, dY, dZ) {
        var newX = this._player.getX() + dX;
        var newY = this._player.getY() + dY;
        var newZ = this._player.getZ() + dZ;
        // Try to move to the new cell
        this._player.tryMove(newX, newY, newZ, this._player.getMap());
	},
    setSubScreen: function(subScreen) {
        this._subScreen = subScreen;
        // Refresh screen on changing the subscreen
        Game.refresh();
    },
    showItemsSubScreen: function(subScreen, items, emptyMessage) {
        if (items && subScreen.setup(this._player, items) > 0) {
            this.setSubScreen(subScreen);
        } else {
            Game.sendMessage(this._player, emptyMessage);
            Game.refresh();
        }
    },
    getPlayer: function(){
    	return this._player;
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
        display.drawText(2, 1, "%c{white}You have defeated the minions of Shub-Niggurath!");
        display.drawText(2, 2, "%c{white}Into the darkness you madly run for your life.");
        display.drawText(2, 3, "%c{white}You are alive, for now...");
        display.drawText(2, 5, "%c{lightgreen}Press [Enter] to start over.");

		// draw the moon ascii art
		var ycount = 7;
		for(var i = 0; i < moonAscii.length; i++){
			display.drawText(0, ycount++, "%c{darkmagenta}"+moonAscii[i]);
		}
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
		Game.Interface.clearAll();
	},
	exit: function() {
		console.log("Exited lose screen"); 
	},
	render: function(display) {
		
		// Render our prompt to the screen
	      if(endingType == "combat"){
		      display.drawText(2, 2, "%c{red}Mortally wounded and drawing last breaths you hear dark voices chanting over you:");
		      display.drawText(2, 5, "%c{white}Ia! Ia! Shub-Niggurath!");
		      display.drawText(2, 6, "%c{white}The Black Goat of the Woods with a Thousand Young!");
	      } else if(endingType == "infernal") {
		      display.drawText(2, 2, "%c{red}As you lay dying you hear a buzzing imitation of human speech:");
		      display.drawText(2, 5, "%c{white}Ia! Ia! Shub-Niggurath!");
		      display.drawText(2, 6, "%c{white}The All-Mother and wife of the Not-to-Be-Named-One!");
	      } else if(endingType == "starvation") {
		      display.drawText(2, 2, "%c{red}You have starved to death!");
		      display.drawText(2, 5, lovecraftQuotes.random());
	      } else if(endingType == "gluttony") {
		      display.drawText(2, 2, "%c{red}You choked to a gluttonous death!");
		      display.drawText(2, 5, "%c{white}From even the greatest of horrors irony is seldom absent.");
	      } else {
		      display.drawText(2, 2, "%c{red}You have died!");
		      display.drawText(2, 5, lovecraftQuotes.random());
	      }
	      display.drawText(2, 9, "%c{lightgreen}Press [Esc] to try again");
	},
	handleInput: function(inputType, inputData) {
		if(inputType == 'keyup') {
			// If enter is pressed, start over
	        if (inputData.keyCode === ROT.VK_ESCAPE) {
	            Game.switchScreen(Game.Screen.playScreen);
	        }
		}
	}
}

Game.Screen.ItemListScreen = function(template) {
    // Set up based on the template
    this._caption = template['caption'];
    this._okFunction = template['ok'];
    // By default, we use the identity function
    this._isAcceptableFunction = template['isAcceptable'] || function(x) {
        return x;
    }
    // Whether the user can select items at all.
    this._canSelectItem = template['canSelect'];
    // Whether the user can select multiple items.
    this._canSelectMultipleItems = template['canSelectMultipleItems'];
    // Whether a 'no item' option should appear.
    this._hasNoItemOption = template['hasNoItemOption'];
};

Game.Screen.ItemListScreen.prototype.setup = function(player, items) {
    this._player = player;
    // Should be called before switching to the screen.
    var count = 0;
    // Iterate over each item, keeping only the acceptable ones and counting
    // the number of acceptable items.
    var that = this;
    this._items = items.map(function(item) {
        // Transform the item into null if it's not acceptable
        if (that._isAcceptableFunction(item)) {
            count++;
            return item;
        } else {
            return null;
        }
    });
    // Clean set of selected indices
    this._selectedIndices = {};
    return count;
};

Game.Screen.ItemListScreen.prototype.render = function(display) {
    var letters = 'abcdefghijklmnopqrstuvwxyz';
    // Render the caption in the top row
    display.drawText(0, 0, this._caption);
    // Render the no item row if enabled
    if (this._hasNoItemOption) {
        display.drawText(0, 1, '0 - no item');
    }
    var row = 0;
    for (var i = 0; i < this._items.length; i++) {
        // If we have an item, we want to render it.
        if (this._items[i]) {
            // Get the letter matching the item's index
            var letter = letters.substring(i, i + 1);
            // If we have selected an item, show a +, else show a dash between
            // the letter and the item's name.
            var selectionState = (this._canSelectItem && this._canSelectMultipleItems &&
                this._selectedIndices[i]) ? '+' : '-';
            // Check if the item is worn or wielded
            var suffix = '';
            if (this._items[i] === this._player.getArmor()) {
                suffix = ' (wearing)';
            } else if (this._items[i] === this._player.getWeapon()) {
                suffix = ' (wielding)';
            }
            // Render at the correct row and add 2.
            display.drawText(0, 2 + row,  letter + ' ' + selectionState + ' ' +
                this._items[i].describe() + suffix);
            row++;
        }
    }
};

Game.Screen.ItemListScreen.prototype.executeOkFunction = function() {
    // Gather the selected items.
    var selectedItems = {};
    for (var key in this._selectedIndices) {
        selectedItems[key] = this._items[key];
    }
    // Switch back to the play screen.
    Game.Screen.playScreen.setSubScreen(undefined);
    // Call the OK function and end the player's turn if it return true.
    if (this._okFunction(selectedItems)) {
        this._player.getMap().getEngine().unlock();
    }
};

Game.Screen.ItemListScreen.prototype.handleInput = function(inputType, inputData) {
    if (inputType === 'keydown') {
        // If the user hit escape, hit enter and can't select an item, or hit
        // enter without any items selected, simply cancel out
        if (inputData.keyCode === ROT.VK_ESCAPE || 
            (inputData.keyCode === ROT.VK_RETURN && 
                (!this._canSelectItem || Object.keys(this._selectedIndices).length === 0))) {
            Game.Screen.playScreen.setSubScreen(undefined);
         // Handle pressing return when items are selected
        } else if (inputData.keyCode === ROT.VK_RETURN) {
            this.executeOkFunction();
        // Handle pressing zero when 'no item' selection is enabled
        } else if (this._canSelectItem && this._hasNoItemOption && inputData.keyCode === ROT.VK_0) {
            this._selectedIndices = {};
            this.executeOkFunction();
        // Handle pressing a letter if we can select
        } else if (this._canSelectItem && inputData.keyCode >= ROT.VK_A &&
            inputData.keyCode <= ROT.VK_Z) {
            // Check if it maps to a valid item by subtracting 'a' from the character
            // to know what letter of the alphabet we used.
            var index = inputData.keyCode - ROT.VK_A;
            if (this._items[index]) {
                // If multiple selection is allowed, toggle the selection status, else
                // select the item and exit the screen
                if (this._canSelectMultipleItems) {
                    if (this._selectedIndices[index]) {
                        delete this._selectedIndices[index];
                    } else {
                        this._selectedIndices[index] = true;
                    }
                    // Redraw screen
                    Game.refresh();
                } else {
                    this._selectedIndices[index] = true;
                    this.executeOkFunction();
                }
            }
        }
    }
};

Game.Screen.inventoryScreen = new Game.Screen.ItemListScreen({
    caption: 'Inventory',
    canSelect: false
});

Game.Screen.pickupScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose the items you wish to pickup',
    canSelect: true,
    canSelectMultipleItems: true,
    ok: function(selectedItems) {
        // Try to pick up all items, messaging the player if they couldn't all be
        // picked up.
        if (!this._player.pickupItems(Object.keys(selectedItems))) {
            Game.sendMessage(this._player, "Your inventory is full! Not all items were picked up.");
        }
        return true;
    }
});

Game.Screen.dropScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose the item you wish to drop',
    canSelect: true,
    canSelectMultipleItems: false,
    ok: function(selectedItems) {
        // Drop the selected item
        this._player.dropItem(Object.keys(selectedItems)[0]);
        return true;
    }
});

Game.Screen.eatScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose the item you wish to eat',
    canSelect: true,
    canSelectMultipleItems: false,
    isAcceptable: function(item) {
        return item && item.hasMixin('Edible');
    },
    ok: function(selectedItems) {
        // Eat the item, removing it if there are no consumptions remaining.
        var key = Object.keys(selectedItems)[0];
        var item = selectedItems[key];
        Game.sendMessage(this._player, "You eat %s.", [item.describeThe()]);
        item.eat(this._player);
        if (!item.hasRemainingConsumptions()) {
            this._player.removeItem(key);
        }
        return true;
    }
});

Game.Screen.wieldScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose the item you wish to wield',
    canSelect: true,
    canSelectMultipleItems: false,
    hasNoItemOption: true,
    isAcceptable: function(item) {
        return item && item.hasMixin('Equippable') && item.isWieldable();
    },
    ok: function(selectedItems) {
        // Check if we selected 'no item'
        var keys = Object.keys(selectedItems);
        if (keys.length === 0) {
            this._player.unwield();
            Game.sendMessage(this._player, "You are empty handed.")
        } else {
            // Make sure to unequip the item first in case it is the armor.
            var item = selectedItems[keys[0]];
            this._player.unequip(item);
            this._player.wield(item);
            Game.sendMessage(this._player, "You are wielding %s.", [item.describeA()]);
        }
        return true;
    }
});

Game.Screen.wearScreen = new Game.Screen.ItemListScreen({
    caption: 'Choose the item you wish to wear',
    canSelect: true,
    canSelectMultipleItems: false,
    hasNoItemOption: true,
    isAcceptable: function(item) {
        return item && item.hasMixin('Equippable') && item.isWearable();
    },
    ok: function(selectedItems) {
        // Check if we selected 'no item'
        var keys = Object.keys(selectedItems);
        if (keys.length === 0) {
            this._player.unwield();
            Game.sendMessage(this._player, "You are not wearing anthing.")
        } else {
            // Make sure to unequip the item first in case it is the weapon.
            var item = selectedItems[keys[0]];
            this._player.unequip(item);
            this._player.wear(item);
            Game.sendMessage(this._player, "You are wearing %s.", [item.describeA()]);
        }
        return true;
    }
});

Game.Screen.gainStatScreen = {
    setup: function(entity) {
        // Must be called before rendering.
        this._entity = entity;
        this._options = entity.getStatOptions();
    },
    render: function(display) {
        var letters = 'abcdefghijklmnopqrstuvwxyz';
        display.drawText(0, 0, 'Choose a stat to increase: ');

        // Iterate through each of our options
        for (var i = 0; i < this._options.length; i++) {
            display.drawText(0, 2 + i, 
                letters.substring(i, i + 1) + ' - ' + this._options[i][0]);
        }

        // Render remaining stat points
        display.drawText(0, 4 + this._options.length,
            "Remaining points: " + this._entity.getStatPoints());   
    },
    handleInput: function(inputType, inputData) {
        if (inputType === 'keydown') {
            // If a letter was pressed, check if it matches to a valid option.
            if (inputData.keyCode >= ROT.VK_A && inputData.keyCode <= ROT.VK_Z) {
                // Check if it maps to a valid item by subtracting 'a' from the character
                // to know what letter of the alphabet we used.
                var index = inputData.keyCode - ROT.VK_A;
                if (this._options[index]) {
                    // Call the stat increasing function
                    this._options[index][1].call(this._entity);
                    // Decrease stat points
                    this._entity.setStatPoints(this._entity.getStatPoints() - 1);
                    // If we have no stat points left, exit the screen, else refresh
                    if (this._entity.getStatPoints() == 0) {
                        Game.Screen.playScreen.setSubScreen(undefined);
                    } else {
                        Game.refresh();
                    }
                }
            }
        }
    }
};


//Define our help screen
Game.Screen.helpScreen = {
	enter: function() { 
		console.log("Entered help screen"); 
		Game.Interface.clearAll();
	},
	exit: function() {
		console.log("Exited help screen"); 
	},
	render: function(display) {
		var i = 1;
	      display.drawText(2, i++, "%c{white}To fight the minions of the elder ones, press the following keys:");
	      i++;
	      display.drawText(2, i++, "%c{lightgrey}Arrow Keys or Number Pad %c{lightgreen}to move and attack");
	      display.drawText(2, i++, "%c{lightgrey}',' %c{lightgreen}to pick up items");
	      display.drawText(2, i++, "%c{lightgrey}'w' %c{lightgreen}to wield an item as a weapon (+/- your Attack)");
	      display.drawText(2, i++, "%c{lightgrey}'SHIFT + w' %c{lightgreen}to wear an item for protection (+/- your Defense)");
	      display.drawText(2, i++, "%c{lightgrey}'e' %c{lightgreen}to eat an item (+/- nutrition)");
	      display.drawText(2, i++, "%c{lightgrey}'i' %c{lightgreen}to view your inventory");
	      display.drawText(2, i++, "%c{lightgrey}'d' %c{lightgreen}to drop an item from your inventory.");
	      display.drawText(2, i++, "%c{lightgrey}'<' %c{lightgreen}to ascend a passage or stairs.");
	      display.drawText(2, i++, "%c{lightgrey}'>' %c{lightgreen}to descend a passage or stairs.");
	      display.drawText(2, i++, "%c{lightgrey}'?' %c{lightgreen}to show the help screen (this screen).");
	      display.drawText(2, i++, "%c{lightgrey}'SHIFT + t' %c{lightgreen}to show gameplay tips.");
	      i++;
	      display.drawText(2, i++, "%c{lightgreen}Press [Esc] to return to the game");
	},
	handleInput: function(inputType, inputData) {
		if(inputType == 'keyup') {
			// If enter is pressed, start over
	        if (inputData.keyCode === ROT.VK_ESCAPE) {
	            // Switch back to the play screen.
	            Game.Screen.playScreen.setSubScreen(undefined);
	        }
		}
	}
}


//Define our tips screen
Game.Screen.tipsScreen = {
	enter: function() { 
		console.log("Entered tips screen"); 
		Game.Interface.clearAll();
	},
	exit: function() {
		console.log("Exited tips screen"); 
	},
	render: function(display) {
		var i = 1;
	      display.drawText(2, i++, "%c{white}Here are some tips and suggestions to win:");
	      i++;
	      display.drawText(2, i++, "%c{lightgreen}Bump%c{grey} into enemies to %c{lightgrey}attack%c{grey} them.");
	      i++;
	      display.drawText(2, i++, "%c{grey}Some enemies (like wolves) %c{lightgrey}move faster and more often%c{grey} than you.");
	      i++;
	      display.drawText(2, i++, "%c{yellowgreen}Poison %c{grey}%c{lightgrey}damages over time and bypasses armor%c{grey}. Beware %c{yellowgreen}poisonous%c{grey} enemies!");
	      i++;
	      display.drawText(2, i++, "%c{grey}Do not be afraid to %c{lightgreen}run from strong enemies%c{grey}.");
	      i++;
	      display.drawText(2, i++, "%c{red}Hunting%c{grey} enemies chase by sight. %c{lightgreen}Hide to escape%c{grey}.");
	      i++;
	      display.drawText(2, i++, "%c{grey}Picking up corpses is a waste of inventory, %c{lightgrey}only carry the meat%c{grey}.");
	      i++;
	      display.drawText(2, i++, "%c{grey}Pay attention to info in the %c{orange}Key%c{grey}, it will save your life.");
	      i++;
	      display.drawText(2, i++, "%c{grey}Run out of food (Nutrition) and you will %c{lightcoral}starve%c{grey}.");
	      display.drawText(2, i++, "%c{grey}Eat too much and you will %c{lightcoral}choke to death%c{grey}!");
	      i++;
	      display.drawText(2, i++, "%c{grey}Some items (like the staff) will enhance both %c{lightgrey}Attack%c{grey} and %c{lightgrey}Defense%c{grey}!");
	      display.drawText(2, i++, "%c{grey}Likewise, some items are cursed and will %c{lightcoral}reduce%c{grey} your stats.");
	      display.drawText(2, i++, "%c{grey}So pay attention to Attack and Defense %c{lightgrey}while equipping items%c{grey}.");
	      i++; 
	      display.drawText(2, i++, "%c{grey}You only recover health when you level up...");
	      display.drawText(2, i++, "%c{grey}so %c{lightgrey}put stat points into health%c{grey} to survive long-term.");
	      i++; 
	      display.drawText(2, i++, "%c{grey}You can dig through %c{forestgreen}Forest %c{grey}and %c{#CC6600}Dirt %c{grey}walls but not stone.");
	      display.drawText(2, i++, "%c{grey}Bump into walls to dig. Some animals can dig as well.");
	      i++;
	      display.drawText(2, i++, "%c{lightgreen}Press [Esc] to return to the game");
	},
	handleInput: function(inputType, inputData) {
		if(inputType == 'keyup') {
			// If enter is pressed, start over
	        if (inputData.keyCode === ROT.VK_ESCAPE) {
	            // Switch back to the play screen.
	            Game.Screen.playScreen.setSubScreen(undefined);
	        }
		}
	}
}