var Game = {
    _display: null,
    _currentScreen: null,
    _screenWidth: 80,
    _screenHeight: 24,
    
    init: function() {
        // Any necessary initialization will go here.
        this._display = new ROT.Display({
        	width: this._screenWidth, 
        	height: this._screenHeight +1 // adding one extra line for the player status bar
    	});
        
        // create a helper function for binding to the current screen
        var game = this;  // so we don't lose this
        var bindEventToScreen = function(event) {
            window.addEventListener(event, function(e) {
                // When an event is received, send it to the
                // screen if there is one
                if (game._currentScreen !== null) {
                    // Send the event type and data to the screen
                    game._currentScreen.handleInput(event, e);
                }
            });
        }
        
        // Bind keyboard input events
        bindEventToScreen('keydown');
        bindEventToScreen('keyup');
        bindEventToScreen('keypress');
    },

    refresh: function() {
        // Clear the screen
        this._display.clear();
        // Render the screen
        this._currentScreen.render(this._display);
    },
    
    getDisplay: function() {
        return this._display;
    },
    getScreenWidth: function() {
        return this._screenWidth;
    },
    getScreenHeight: function() {
        return this._screenHeight;
    },
    
    switchScreen: function(screen) {
    	// if we had a screen notify it that we exited
    	if(this._currentScreen !== null){
    		this._currentScreen.exit();
    	}
    	
    	// Clear the display
    	this.getDisplay().clear();
    	
    	// update our current screen
    	this._currentScreen = screen;
    	
    	// notify the new screen that we entered
    	if(!this._currentScreen !== null) {
    		this._currentScreen.enter();
    		this.refresh();
    	}
    }
}

window.onload = function() {
	if(!ROT.isSupported()) {
		alert("The rot.js library isn't supported by your browser.");
	} else {
        // Initialize the game
        Game.init();
        
        // Add the container to our HTML page
        document.body.appendChild(Game.getDisplay().getContainer());
        
        // Load the start screen
        Game.switchScreen(Game.Screen.startScreen);
	}
}

// dropoff http://www.codingcookies.com/2013/08/31/building-a-roguelike-in-javascript-part-10a/