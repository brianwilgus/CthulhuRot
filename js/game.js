var Game = {
    _display: null,
    _currentScreen: null,
    _screenWidth: 60,
    _screenHeight: 18,
    
    init: function() {
    	// our seed for future random number generation
    	//var seed = ROT.RNG.getSeed();
    	ROT.RNG.setSeed(12345);
    	
    	// Any necessary initialization will go here.
        this._display = new ROT.Display({
        	width: this._screenWidth, 
        	height: this._screenHeight +1, // adding one extra line for the player status bar
        	fontSize: 18,
        	fontFamily: "droid sans mono, monospace",
        	fg: '#dedede',
        	bg: '#000'
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
    setScreenWidth: function(value) {
    	this._screenWidth = value;
    },
    getScreenHeight: function() {
        return this._screenHeight;
    },
    setScreenHeight: function(value) {
    	this._screenHeight = value;
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
		alert("The rot.js library isn't supported by your browser. Please use a modern browser that supports the HTML5 canvas element such as Chrome or Firefox.");
	} else {
        // Initialize the game
        Game.init();
        // Add the container to our HTML page
        document.getElementById('RotDisplay').appendChild(Game.getDisplay().getContainer());   
        // Load the start screen
        Game.switchScreen(Game.Screen.startScreen);
        // re-size accordingly now that we have a Display, startScreen and init
    	resizeRotDisplay();
	}
}

// resize the rotDisplay to fill the available browser space dynamically
window.onresize = function(event){
	resizeRotDisplay(event);
};

resizeRotDisplay = function(e){
	rotDisplay = Game.getDisplay();
	rotDisplayDiv = document.getElementById('RotDisplay');
	
	// determine our available size, in character blocks
	sizingResults = rotDisplay.computeSize(rotDisplayDiv.offsetWidth, rotDisplayDiv.offsetHeight);
	
	// resize the rotDisplay
	rotDisplay.setOptions({
		width:sizingResults[0],
		height:sizingResults[1],
		fontSize: 18,
		fontFamily: "droid sans mono, monospace",
		fg: '#dedede',
		bg: '#000'
	});
	Game.setScreenWidth(sizingResults[0]);
	Game.setScreenHeight(sizingResults[1]);
	Game.refresh();// clear and re-render the new display port
}