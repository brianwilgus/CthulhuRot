Game.Tile = function(properties) {
    properties = properties || {};
    // Call the Glyph constructor with our properties
    Game.Glyph.call(this, properties);
    // Set up the properties. We use false by default.
    this._walkable = properties['walkable'] || false;
    this._diggable = properties['diggable'] || false;
    this._floor = properties['floor'] || false;
    this._wall = properties['wall'] || false;
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
Game.Tile.prototype.isWall = function() {
    return this._wall;
}
Game.Tile.prototype.isFloor = function() {
    return this._floor;
}

Game.Tile.prototype.getGlyph = function() {
    return this._glyph;
};

Game.Tile.nullTile = new Game.Tile();

Game.Tile.floorTile = new Game.Tile({
    character: '.',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.wallTile = new Game.Tile({
    character: '#',
    foreground: 'goldenrod',
    diggable: true,
    wall: true
});
Game.Tile.solidWall = new Game.Tile({
    character: '#',
    foreground: 'grey',
    diggable: false,
    wall: true
});
Game.Tile.grassFloor = new Game.Tile({
    character: '.',
    foreground: 'forestgreen',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.grassFloorLight = new Game.Tile({
    character: '.',
    foreground: 'green',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.grassFloorDark = new Game.Tile({
    character: '.',
    foreground: 'darkgreen',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.dirtFloor = new Game.Tile({
    character: '.',
    foreground: 'saddlebrown',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.dirtFloorLight = new Game.Tile({
    character: '.',
    foreground: '#8A5129',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.dirtFloorDark = new Game.Tile({
    character: '.',
    foreground: '#7D3E11',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.stoneFloor = new Game.Tile({
    character: '.',
    foreground: '#7A7A52',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.stoneFloorLight = new Game.Tile({
    character: '.',
    foreground: '#8A8A5C',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.stoneFloorDark = new Game.Tile({
    character: '.',
    foreground: '#6B6B47',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.evilFloor = new Game.Tile({
    character: '.',
    foreground: '#520052',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.evilFloorLight = new Game.Tile({
    character: '.',
    foreground: '#5C005C',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.evilFloorDark = new Game.Tile({
    character: '.',
    foreground: '#470047',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.wetFloor = new Game.Tile({
    character: '.',
    foreground: '#0F3D3D',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.wetFloorDarkLight = new Game.Tile({
    character: '.',
    foreground: '#006BB2',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.wetFloorDark = new Game.Tile({
    character: '.',
    foreground: '#004C80',
    walkable: true,
    blocksLight: false,
    floor: true
});
Game.Tile.forestWall = new Game.Tile({
    character: '#',
    foreground: 'olivedrab',
    diggable: true,
    wall: true
});
Game.Tile.forestWallLight = new Game.Tile({
    character: '#',
    foreground: 'forestgreen',
    diggable: true,
    wall: true
});
Game.Tile.forestWallDark = new Game.Tile({
    character: '#',
    foreground: 'darkolivegreen',
    diggable: true,
    wall: true
});
Game.Tile.stoneWall = new Game.Tile({
    character: '#',
    foreground: '#B8B894',
    diggable: false,
    wall: true
});
Game.Tile.stoneWallLight = new Game.Tile({
    character: '#',
    foreground: '#C2C2A3',
    diggable: false,
    wall: true
});
Game.Tile.stoneWallDark = new Game.Tile({
    character: '#',
    foreground: '#ADAD85',
    diggable: false,
    wall: true
});
Game.Tile.dirtWall = new Game.Tile({
    character: '#',
    foreground: '#CC6600',
    diggable: true,
    wall: true
});
Game.Tile.dirtWallLight = new Game.Tile({
    character: '#',
    foreground: '#D17519',
    diggable: true,
    wall: true
});
Game.Tile.dirtWallDark = new Game.Tile({
    character: '#',
    foreground: '#B85C00',
    diggable: true,
    wall: true
});
Game.Tile.evilWall = new Game.Tile({
    character: '#',
    foreground: '#751975',
    diggable: false,
    wall: true
});
Game.Tile.evilWallLight = new Game.Tile({
    character: '#',
    foreground: '#853385',
    diggable: false,
    wall: true
});
Game.Tile.evilWallDark = new Game.Tile({
    character: '#',
    foreground: '#660066',
    diggable: false,
    wall: true
});

Game.Tile.wetWall = new Game.Tile({
    character: '#',
    foreground: '#0099FF',
    diggable: false,
    wall: true
});

Game.Tile.wetWallDark = new Game.Tile({
    character: '#',
    foreground: '#007ACC',
    diggable: false,
    wall: true
});

Game.Tile.wetWallLight = new Game.Tile({
    character: '#',
    foreground: '#19A3FF',
    diggable: false,
    wall: true
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