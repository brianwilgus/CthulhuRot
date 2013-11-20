var Game = {
    _display: null,
    _currentScreen: null,
    
    init: function() {
        // Any necessary initialization will go here.
        this._display = new ROT.Display({width: 80, height: 24});
        
        // create a helper function for binding to the current screen
        var game = this;  // make sure we keep our scope
        var bindEventToScreen = function(event) {
        	window.addEventListener(event, function(e) {
        		// forward events to active screen
        		if(game._currentScreen !== null) {
        			game._currentScreen.handleInput(event, e);
        		}
        	})
        }
        
        // Bind keyboard input events
        bindEventToScreen('keydown');
        bindEventToScreen('keyup');
        bindEventToScreen('keypress');
    },
    
    getDisplay: function() {
        return this._display;
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
    		this._currentScreen.render(this._display);
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

// dropoff http://www.codingcookies.com/2013/04/03/building-a-roguelike-in-javascript-part-2/