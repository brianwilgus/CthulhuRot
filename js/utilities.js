Game.extend = function(src, dest) {
    // Create a copy of the source.
	console.log("game.extend: "+src+" "+dest);
    var result = {};
    for (var key in src) {
        result[key] = src[key];
    }
    // Copy over all keys from dest
    for (var key in dest) {
        result[key] = dest[key];
    }
    return result;
};