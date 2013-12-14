Game.Entity = function(properties) {
    properties = properties || {};
    // Call the dynamic glyph's constructor with our set of properties
    Game.DynamicGlyph.call(this, properties);
    // Instantiate any properties from the passed object
    this._x = properties['x'] || 0;
    this._y = properties['y'] || 0;
    this._z = properties['z'] || 0;
    this._map = null;
    this._alive = true;
    // Acting speed
    this._speed = properties['speed'] || 1000;
    this._name = properties['name'] || false;
    this._type = properties['type'] || false;
    this._attackValue = properties['attackValue'] || 0;
    this._defenseValue = properties['defenseValue'] || 0;
};

// Make entities inherit all the functionality from glyphs
Game.Entity.extend(Game.DynamicGlyph);

Game.Entity.prototype.setX = function(x) {
    this._x = x;
};
Game.Entity.prototype.setY = function(y) {
    this._y = y;
};
Game.Entity.prototype.setZ = function(z) {
    this._z = z;
};
Game.Entity.prototype.setMap = function(map) {
    this._map = map;
};
Game.Entity.prototype.setAttack = function(value) {
    this._attackValue = value;
};
Game.Entity.prototype.setDefense = function(value) {
    this._defenseValue = value;
};
Game.Entity.prototype.setPosition = function(x, y, z) {
    var oldX = this._x;
    var oldY = this._y;
    var oldZ = this._z;
    // Update position
    this._x = x;
    this._y = y;
    this._z = z;
    // If the entity is on a map, notify the map that the entity has moved.
    if (this._map) {
        this._map.updateEntityPosition(this, oldX, oldY, oldZ);
    }
};
Game.Entity.prototype.setSpeed = function(speed) {
    this._speed = speed;
};

Game.Entity.prototype.getX = function() {
    return this._x;
};
Game.Entity.prototype.getY = function() {
    return this._y;
};
Game.Entity.prototype.getZ = function() {
    return this._z;
};
Game.Entity.prototype.getMap = function() {
    return this._map;
};
Game.Entity.prototype.getSpeed = function() {
    return this._speed;
};
Game.Entity.prototype.getName = function() {
	return this._name || 'Player';
}
Game.Entity.prototype.getType = function() {
	return this._type;
}
Game.Entity.prototype.hasType = function(value) {
	for(item in this._type){
		if(this._type[item] == value){
			return true;
		}
	}
	return false;
}
Game.Entity.prototype.getAttack = function() {
	return this.getAttackValue();
}
Game.Entity.prototype.getDefense = function() {
	return this.getDefenseValue();
}

Game.Entity.prototype.tryMove = function(x, y, z, map) {
    var map = this.getMap();
    // Must use starting z
    var tile = map.getTile(x, y, this.getZ());
    var target = map.getEntityAt(x, y, this.getZ());
    // If our z level changed, check if we are on stair
    if (z < this.getZ()) { // only players go up stairs
        if (tile != Game.Tile.stairsUpTile) {
            Game.sendMessage(this, "You can't go up here!");
        } else {
        	locationName = Game.Interface.getStatus().getItem('locationNames')[z];
            Game.sendMessage(this, "You climb up into the %s!", [locationName]);
            this.setPosition(x, y, z);
            Game.Interface.getStatus().updateItems({depth:z+1});
        }
    } else if (z > this.getZ()) { // only players go down stairs
        if (tile === Game.Tile.holeToCavernTile) {
            // Switch the entity to a boss cavern!
            this.switchMap(new Game.Map.BossCavern());
            Game.sendMessage(this, "You enter the lair of Shub-Niggurath...");
            Game.Interface.getStatus().updateItems({depth:0,locations:"Lair of Shub-Niggurath"});
        } else if (tile != Game.Tile.stairsDownTile) {
            Game.sendMessage(this, "You can't go down here!");
        } else {
            this.setPosition(x, y, z);
            locationName = Game.Interface.getStatus().getItem('locationNames')[z];
            Game.sendMessage(this, "You descend into the %s!", [locationName]);
            Game.Interface.getStatus().updateItems({depth:z+1});
        }
    // If an entity was present at the tile
    } else if (target) {
        // An entity can only attack if the entity has the Attacker mixin and
        // either the entity or the target is the player.
        if (this.hasMixin('Attacker') &&
            (this.hasMixin(Game.EntityMixins.PlayerActor) ||
             target.hasMixin(Game.EntityMixins.PlayerActor))) {
            this.attack(target);
            return true;
        }
        // If not nothing we can do, but we can't
        // move to the tile
        return false;
    // Check if we can walk on the tile
    // and if so simply walk onto it
    } else if (tile.isWalkable()) {
        // Update the entity's position
        this.setPosition(x, y, z);
        // Notify the entity that there are items at this position
        var items = this.getMap().getItemsAt(x, y, z);
        if (items && this.hasMixin(Game.EntityMixins.PlayerActor)) {
            if (items.length === 1) {
                Game.sendMessage(this, "You see %s.", [items[0].describeA()]);
            } else {
                Game.sendMessage(this, "There are several objects here.");
            }
        }
        // describe our location by tile
        var desc = tile.getDescription();
        if(desc && !Game.Narrator.isSuppressing() && this.hasMixin(Game.EntityMixins.PlayerActor)){
        	Game.sendMessage(this, desc);
        }
        return true;
    // Check if the tile is diggable
    } else if (this.hasMixin(Game.EntityMixins.Digger)) {
        // Only dig if the the entity is capable
        if (tile.isDiggable()) {
        	if(this.hasMixin(Game.EntityMixins.PlayerActor)){
        		if(tile.getDigName()==="forest"){
            		Game.sendMessage(this, "You chop through the "+tile.getDigName()+".");
        		} else {
            		Game.sendMessage(this, "You dig through the "+tile.getDigName()+".");
        		}
        	} else {
        		if(tile.getDigName()==="forest"){
        			Game.sendMessageNearby(this.getMap(),
    	            		this.getX(), this.getY(), this.getZ(),
    	                    "The "+this.getName()+" chopped through the "+tile.getDigName()+"!");
        		} else {
        			Game.sendMessageNearby(this.getMap(),
    	            		this.getX(), this.getY(), this.getZ(),
    	                    "The "+this.getName()+" dug through the "+tile.getDigName()+"!");
        		}
        	}
            map.dig(x, y, z);
            return true;
        } else {
        	if(this.hasMixin(Game.EntityMixins.PlayerActor)){
        		if(tile.getDigName()==="forest"){
        			Game.sendMessage(this, "The "+tile.getDigName()+" is too thick here, you cannot chop through.");
        		} else {
        			Game.sendMessage(this, "The "+tile.getDigName()+" is solid, you cannot dig through it.");
        		}
        	}
        }
        // If not nothing we can do, but we can't
        // move to the tile
        return false;
    }
    return false;
};

Game.Entity.prototype.isAlive = function() {
    return this._alive;
};
Game.Entity.prototype.kill = function(type, message) {
    // Only kill once!
    if (!this._alive) {
        return;
    }
    this._alive = false;
    if (message) {
        Game.sendMessage(this, message);
    }

    // Check if the player died, and if so call their act method to prompt the user.
    if (this.hasMixin(Game.EntityMixins.PlayerActor)) {
        endingType = type;
        this.act();
    } else {
        this.getMap().removeEntity(this);
    }
};

Game.Entity.prototype.switchMap = function(newMap) {
    // If it's the same map, nothing to do!
    if (newMap === this.getMap()) {
        return;
    }
    this.getMap().removeEntity(this);
    // Clear the position
    this._x = 0;
    this._y = 0;
    this._z = 0;
    // Add to the new map
    newMap.addEntity(this);
};