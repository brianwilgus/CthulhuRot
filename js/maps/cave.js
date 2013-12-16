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
        
        // 20 entities per floor
        for (var i = 0; i < 20; i++) {
            var entity = Game.EntityRepository.createRandomFromTypes(getTypes);
            // Add a random entity
            this.addEntityAtRandomPosition(entity, z);
            // Level up the entity based on the floor
            var boost = z + Math.floor(3 * ROT.RNG.getUniform());
            if (entity.hasMixin('ExperienceGainer')) {
                for (var level = 0; level < boost; level++) {
                    entity.giveExperience(entity.getNextLevelExperience() -
                        entity.getExperience());
                }
            }
        }

        // mid-boss
        this.addEntityAtRandomPosition(Game.EntityRepository.create('highpriest'), 6);
    }
    // Add weapons and armor to the map in random positions and floors
    var lowtemplates = ['staff', 'dagger', 'chainmail', 'leatherarmor', 'mace', 'axe'];
    for (var i = 0; i < lowtemplates.length; i++) {
        this.addItemAtRandomPosition(Game.ItemRepository.create(lowtemplates[i]),
            Math.floor(4 * ROT.RNG.getUniform()));
    }
    var hightemplates = [ 'chainmail', 'mace', 'sword', 'axe', 'platemail', 'platemail', 'spikedarmor', 'spikedarmor' ];
    for (var i = 0; i < hightemplates.length; i++) {
        this.addItemAtRandomPosition(Game.ItemRepository.create(hightemplates[i]),
            Math.floor(4 * ROT.RNG.getUniform())+2);
    }
    
    // Add a couple holes to the final cavern on the last level.
    for(i = 0; i < 2; i++){
	    var holePosition = this.getRandomFloorPosition(this._depth - 1);
	    this._tiles[this._depth - 1][holePosition.x][holePosition.y] = Game.Tile.holeToCavernTile;
    }
};
Game.Map.Cave.extend(Game.Map);