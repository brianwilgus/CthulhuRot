Game.Tile = function(properties) {
    properties = properties || {};
    // Call the Glyph constructor with our properties
    Game.Glyph.call(this, properties);
    // Set up the properties. We use false by default.
    this._walkable = properties['walkable'] || false;
    this._diggable = properties['diggable'] || false;
    this._blocksLight = (properties['blocksLight'] !== undefined) ?
            properties['blocksLight'] : true;
};

// Make tiles inherit all the functionality from glyphs
Game.Tile.extend(Game.Glyph);

//Standard getters
Game.Tile.prototype.isWalkable = function() {
    return this._walkable;
}
Game.Tile.prototype.isDiggable = function() {
    return this._diggable;
}
Game.Tile.prototype.isBlockingLight = function() {
    return this._blocksLight;
}

Game.Tile.prototype.getGlyph = function() {
    return this._glyph;
};

Game.Tile.nullTile = new Game.Tile();

Game.Tile.floorTile = new Game.Tile({
    character: '.',
    walkable: true,
    blocksLight: false
});
Game.Tile.wallTile = new Game.Tile({
    character: '#',
    foreground: 'goldenrod',
    diggable: true
});
Game.Tile.grassFloor = new Game.Tile({
    character: '.',
    foreground: 'darkgreen',
    walkable: true,
    blocksLight: false
});
Game.Tile.dirtFloor = new Game.Tile({
    character: '.',
    foreground: 'saddlebrown',
    walkable: true,
    blocksLight: false
});
Game.Tile.stoneFloor = new Game.Tile({
    character: '.',
    foreground: 'dimgray',
    walkable: true,
    blocksLight: false
});
Game.Tile.evilFloor = new Game.Tile({
    character: '.',
    foreground: 'darkmagenta',
    walkable: true,
    blocksLight: false
});
Game.Tile.forestWall = new Game.Tile({
    character: '#',
    foreground: 'olivedrab',
    diggable: true
});
Game.Tile.stoneWall = new Game.Tile({
    character: '#',
    foreground: 'darkgray',
    diggable: false
});
Game.Tile.dirtWall = new Game.Tile({
    character: '#',
    foreground: 'peru',
    diggable: true
});
Game.Tile.evilWall = new Game.Tile({
    character: '#',
    foreground: 'magenta',
    diggable: false
});
Game.Tile.stairsUpTile = new Game.Tile({
    character: '<',
    foreground: 'peru',
    walkable: true,
    blocksLight: false
});
Game.Tile.stairsDownTile = new Game.Tile({
    character: '>',
    foreground: 'peru',
    walkable: true,
    blocksLight: false
});
Game.Tile.holeToCavernTile = new Game.Tile({
    character: 'O',
    foreground: 'peru',
    walkable: true,
    blocksLight: false
});
Game.Tile.waterTile = new Game.Tile({
    character: '~',
    foreground: 'blue',
    walkable: false,
    blocksLight: false
});

// helper function to shuffle the list of neighbor tiles
Game.getNeighborPositions = function(x, y) {
    var tiles = [];
    // Generate all possible offsets
    for (var dX = -1; dX < 2; dX ++) {
        for (var dY = -1; dY < 2; dY++) {
            // Make sure it isn't the same tile
            if (dX == 0 && dY == 0) {
                continue;
            }
            tiles.push({x: x + dX, y: y + dY});
        }
    }
    return tiles.randomize();
}