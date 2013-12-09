Game.Map.Cave = function(tiles, player) {
    // Call the Map constructor
    Game.Map.call(this, tiles);
    // Add the player
    this.addEntityAtRandomPosition(player, 0);
    // Add random entities and items to each floor.
    for (var z = 0; z < this._depth; z++) {
        // 15 items per floor
        for (var i = 0; i < 15; i++) {
            // Add a random entity
            this.addItemAtRandomPosition(Game.ItemRepository.createRandom(), z);
        }
        

    	/** lets get more specific with monsters per level**/
    	var getTypes = [];
    	if(z == 0){
    		getTypes.push("forest");
    	}
    	if(z < 3 && z > 0){
    		getTypes.push("dirt");
    	}
    	if(z < 5 && z > 2){
    		getTypes.push("cave");
    	}
    	if(z < 7 && z > 4){
    		getTypes.push("infernal");
    	}
        if(z > 2){
	    	//getTypes.push("infernal");
        }
        
        // 15 entities per floor
        for (var i = 0; i < 15; i++) {
            var entity = Game.EntityRepository.createRandomFromTypes(getTypes);
            // Add a random entity
            this.addEntityAtRandomPosition(entity, z);
            // Level up the entity based on the floor
            if (entity.hasMixin('ExperienceGainer')) {
                for (var level = 0; level < z; level++) {
                    entity.giveExperience(entity.getNextLevelExperience() -
                        entity.getExperience());
                }
            }
        }
    }
    // Add weapons and armor to the map in random positions and floors
    var templates = ['dagger', 'sword', 'staff', 
        'robes', 'scalemail', 'leatherarmor', 'platemail'];
    for (var i = 0; i < templates.length; i++) {
        this.addItemAtRandomPosition(Game.ItemRepository.create(templates[i]),
            Math.floor(this._depth * ROT.RNG.getUniform()));
    }
    // Add a couple holes to the final cavern on the last level.
    for(i = 0; i < 2; i++){
    var holePosition = this.getRandomFloorPosition(this._depth - 1);
    this._tiles[this._depth - 1][holePosition.x][holePosition.y] = 
        Game.Tile.holeToCavernTile;
    }
};
Game.Map.Cave.extend(Game.Map);