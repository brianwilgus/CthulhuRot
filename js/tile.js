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
    this._description = properties['description'] || false;
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

Game.Tile.prototype.getDescription = function() {
    return this._description;
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
    wall: true,
    description: "You cannot pass through this way."
});
Game.Tile.grassFloor = new Game.Tile({
    character: '.',
    foreground: 'forestgreen',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is covered in green grass."
});
Game.Tile.grassFloorLight = new Game.Tile({
    character: '.',
    foreground: 'green',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is covered in light grass."
});
Game.Tile.grassFloorDark = new Game.Tile({
    character: '.',
    foreground: 'darkgreen',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is covered in dark grass."
});
Game.Tile.dirtFloor = new Game.Tile({
    character: '.',
    foreground: 'saddlebrown',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is covered in dirt."
});
Game.Tile.dirtFloorLight = new Game.Tile({
    character: '.',
    foreground: '#8A5129',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is covered in dirt and sand."
});
Game.Tile.dirtFloorDark = new Game.Tile({
    character: '.',
    foreground: '#7D3E11',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is covered in mud."
});
Game.Tile.stoneFloor = new Game.Tile({
    character: '.',
    foreground: '#7A7A52',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is made of solid rock."
});
Game.Tile.stoneFloorLight = new Game.Tile({
    character: '.',
    foreground: '#8A8A5C',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is made of light rock."
});
Game.Tile.stoneFloorDark = new Game.Tile({
    character: '.',
    foreground: '#6B6B47',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is made of dark rock."
});
Game.Tile.evilFloor = new Game.Tile({
    character: '.',
    foreground: '#520052',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is made of shifting cut stone."
});
Game.Tile.evilFloorLight = new Game.Tile({
    character: '.',
    foreground: '#5C005C',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is made of runes cut into strange stones."
});
Game.Tile.evilFloorDark = new Game.Tile({
    character: '.',
    foreground: '#470047',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is made of eerie dark stone."
});
Game.Tile.wetFloor = new Game.Tile({
    character: '.',
    foreground: '#0F3D3D',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is made of wet stone."
});
Game.Tile.wetFloorLight = new Game.Tile({
    character: '.',
    foreground: '#006BB2',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is made of light wet stone."
});
Game.Tile.wetFloorDark = new Game.Tile({
    character: '.',
    foreground: '#004C80',
    walkable: true,
    blocksLight: false,
    floor: true,
    description: "The floor is made of dark wet stone."
});
Game.Tile.forestWall = new Game.Tile({
    character: '#',
    foreground: 'olivedrab',
    diggable: true,
    wall: true,
    description: "Trees and brush block the way."
});
Game.Tile.forestWallLight = new Game.Tile({
    character: '#',
    foreground: 'forestgreen',
    diggable: true,
    wall: true,
    description: "Light trees and brush block the way."
});
Game.Tile.forestWallDark = new Game.Tile({
    character: '#',
    foreground: 'darkolivegreen',
    diggable: true,
    wall: true,
    description: "Thick trees and brush block the way."
});
Game.Tile.forestWallBlock = new Game.Tile({
    character: '#',
    foreground: 'darkolivegreen',
    diggable: false,
    wall: true,
    description: "You cannot pass through this way."
});
Game.Tile.stoneWall = new Game.Tile({
    character: '#',
    foreground: '#B8B894',
    diggable: false,
    wall: true,
    description: "Stone wall blocks the way."
});
Game.Tile.stoneWallLight = new Game.Tile({
    character: '#',
    foreground: '#C2C2A3',
    diggable: false,
    wall: true,
    description: "Stone wall blocks the way."
});
Game.Tile.stoneWallDark = new Game.Tile({
    character: '#',
    foreground: '#ADAD85',
    diggable: false,
    wall: true,
    description: "Stone wall blocks the way."
});
Game.Tile.dirtWall = new Game.Tile({
    character: '#',
    foreground: '#CC6600',
    diggable: true,
    wall: true,
    description: "Mud and dirt block the way."
});
Game.Tile.dirtWallLight = new Game.Tile({
    character: '#',
    foreground: '#D17519',
    diggable: true,
    wall: true,
    description: "Mud and dirt block the way."
});
Game.Tile.dirtWallDark = new Game.Tile({
    character: '#',
    foreground: '#B85C00',
    diggable: true,
    wall: true,
    description: "Mud and dirt block the way."
});
Game.Tile.evilWall = new Game.Tile({
    character: '#',
    foreground: '#751975',
    diggable: false,
    wall: true,
    description: "Dark stones inscribed with runes block the way."
});
Game.Tile.evilWallLight = new Game.Tile({
    character: '#',
    foreground: '#853385',
    diggable: false,
    wall: true,
    description: "Strange bricks block the way."
});
Game.Tile.evilWallDark = new Game.Tile({
    character: '#',
    foreground: '#660066',
    diggable: false,
    wall: true,
    description: "Faintly glowing brick blocks the way."
});

Game.Tile.wetWall = new Game.Tile({
    character: '#',
    foreground: '#0099FF',
    diggable: false,
    wall: true,
    description: "Wet stone blocks the way."
});

Game.Tile.wetWallDark = new Game.Tile({
    character: '#',
    foreground: '#007ACC',
    diggable: false,
    wall: true,
    description: "Wet dark stone blocks the way."
});

Game.Tile.wetWallLight = new Game.Tile({
    character: '#',
    foreground: '#19A3FF',
    diggable: false,
    wall: true,
    description: "Wet light stone blocks the way."
});

Game.Tile.stairsUpTile = new Game.Tile({
    character: '<',
    foreground: 'peru',
    walkable: true,
    blocksLight: false,
    description: "You see a passage leading upward to a higher elevation."
});
Game.Tile.stairsDownTile = new Game.Tile({
    character: '>',
    foreground: 'peru',
    walkable: true,
    blocksLight: false,
    description: "You see a passage descending into dark depths."
});
Game.Tile.holeToCavernTile = new Game.Tile({
    character: 'O',
    foreground: 'peru',
    walkable: true,
    blocksLight: false,
    description: "Human and animal bones litter the entrance to a foul smelling den."
});
Game.Tile.waterTile = new Game.Tile({
    character: '~',
    foreground: 'blue',
    walkable: false,
    blocksLight: false,
    description: "Swiftly flowing water blocks any crossing."
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