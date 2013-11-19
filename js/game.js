var Game = {
    _display: null,
    init: function() {
        // Any necessary initialization will go here.
        this._display = new ROT.Display({width: 80, height: 24});
    },
    getDisplay: function() {
        return this._display;
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

    	var foreground, background, colors;
	    for (var i = 0; i < 15; i++) {
	        // Calculate the foreground color, getting progressively darker
	        // and the background color, getting progressively lighter.
	        foreground = ROT.Color.toRGB([255 - (i*20),
	                                      255 - (i*20),
	                                      255 - (i*20)]);
	        background = ROT.Color.toRGB([i*20, i*20, i*20]);
	        // Create the color format specifier.
	        colors = "%c{" + foreground + "}%b{" + background + "}";
	        // Draw the text two columns in and at the row specified
	        // by i
	        Game.getDisplay().drawText(2, i, colors + "Hello, world!");
	    }
	}
}

// dropoff http://www.codingcookies.com/2013/04/03/building-a-roguelike-in-javascript-part-2/