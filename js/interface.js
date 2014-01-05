Game.Interface = {
	_status: null,
	_key: null,
	_playerStats:null,
	
	init: function(){
		this._status = new Game.Interface.Status();
		this._key = new Game.Interface.Key();
		this._playerStats = new Game.Interface.PlayerStats();
	},
	
	update: function() {
		// update all sub-categories
		this._playerStats.update();
		this._status.update();
	},
	
	getStatus: function(){
		return this._status;
	},
	
	getKey: function(){
		return this._key;
	},
	
	getPlayerStats: function(){
		return this._playerStats;
	},
	
	clearAll: function(){
		this._playerStats.clear();
		this._status.clear();
		this._key.clear();
	}
};

Game.Interface.Category = function(properties) {
	properties = properties || {};
	this._items = properties['items'] || {};
	this._target = document.getElementById(properties['divId']) || false;
	this._output = "";
}

Game.Interface.Category.prototype.writeOutput = function() {
	// overwrite this specifically per Category 
	return "placeholder text";
}

Game.Interface.Category.prototype.update = function() {
	if(this._target) {
		this._target.style.display = "block";
		this._output = this.writeOutput();
		this._target.innerHTML = this._output;
	}
}

Game.Interface.Category.prototype.clear = function() {
	if(this._target) {
		this._target.style.display = "none";
		this._output = "";
		this._target.innerHTML = this._output;
	}
}

Game.Interface.Category.prototype.updateItems = function(arItems) {
	for(key in arItems){
		this._items[key] = arItems[key];
	}
	this.update();
}

Game.Interface.Category.prototype.getItem = function(key) {
	return this._items[key] || false;
}

Game.Interface.PlayerStats = function() {
	properties = {
			divId: 'stats',
			items: {
				conditions:[]
			}
	};
	Game.Interface.Category.call(this, properties);
	console.log('init Game.Interface.PlayerStats');
}

//inherit all the functionality from Category
Game.Interface.PlayerStats.extend(Game.Interface.Category);

Game.Interface.PlayerStats.prototype.writeOutput = function() {
	var output = "<span style='color:yellow'>@</span><span style='color:white'>: Your Player</span>";
	var player = Game.Screen.playScreen.getPlayer();
	output += "<br/>";
	var hp = player.getHp();
	var mhp = player.getMaxHp();
	var hcolor = "white";
	if(hp < mhp*.25) { 
		hcolor = "red"; 
	} else if(hp < mhp*.5) { 
		hcolor = "yellow";
	} else if(hp == mhp) {
		hcolor = "lightgreen";
	} else { 
		hcolor = "white"; 
	}
	
	output += vsprintf(
			'Health:<span style="color:%s">%d</span>/%d<br/>Level:%d(%d%%)', 
        [
         	hcolor,
         	hp, 
         	mhp,
         	player.getLevel(),
         	Math.ceil((player.getExperience()/player.getNextLevelExperience())*100)
		 ]);
	
	var fn = player.getFullness();
	var mfn = player.getMaxFullness();

	if(fn < mfn*.25) { 
		ncolor = "red"; 
	} else if(fn < mfn*.5) { 
		ncolor = "yellow";
	} else if(fn == mfn*.75) {
		ncolor = "lightgreen";
	} else { 
		ncolor = "white"; 
	}
	
	// conditions
	var poisonStateOutput = "";
	var poisonState = player.getPoisonState();
	if(poisonState[0]){
		// if poisoned append this snippet to conditions with the length
		poisonStateOutput += ' <span style="color:yellowgreen">Poisoned';
		if(poisonState[1]>0){
			poisonStateOutput += ' ['+poisonState[1]+' turn';
			if(poisonState[1]>1){
				poisonStateOutput += 's';
			}
			poisonStateOutput += ']';
		}
		poisonStateOutput += '</span>';
	}
	
	output += vsprintf(
			'<br/>Attack:%d<br/>Defense:%d<br/>Sight:%d<br/>Nutrition:<span style="color:%s">%d</span>/%d<br/>Condition(s): <span style="color:%s">%s</span>%s',
		[
			player.getAttack(),
			player.getDefense(),
			player.getSightRadius(),
			ncolor,
			fn,
			mfn,
			ncolor,
			player.getHungerState(),
			poisonStateOutput
		]);
    return output;
}

Game.Interface.Status = function() {
	properties = {
			divId: 'status',
			items: {
				locationNames:[],
				depth: 1
			}
	};
	Game.Interface.Category.call(this, properties);
}

// inherit all the functionality from Category
Game.Interface.Status.extend(Game.Interface.Category);

Game.Interface.Status.prototype.writeOutput = function() {
	var output = "<span style='color:orange'>Status</span>";
	output += vsprintf("<br/>Location: %s<br/>Depth: %d", 
        [
     		this._items['locationNames'][this._items['depth']-1],
			this._items['depth']
		]);

	output += "<br/><span style='color:lightgreen'>Press &#60;?&#62; for help</span>"; 
	return output;
}

Game.Interface.Key = function() {
	properties = {
			divId: 'key',
			items: {
				entities:[]
			}
	};
	Game.Interface.Category.call(this, properties);
	//console.log('init Game.Interface.Key');
}

// inherit all the functionality from Category
Game.Interface.Key.extend(Game.Interface.Category);

Game.Interface.Key.prototype.writeOutput = function() {
	var output = "<span style='color:orange'>Key</span>";
	for(entity in this._items['entities']){
		if(!isNaN(entity)){
			if(this._items['entities'][entity].hasMixin(Game.EntityMixins.PlayerActor)){
				// skip player?
				/*
				output += vsprintf("<br/><span style='color:%s'>%s</span>: %s", 
				        [
				     		this._items['entities'][entity].getForeground(),
				     		this._items['entities'][entity].getChar(),
				     		this._items['entities'][entity].getName()
						]);
						*/
			} else if(this._items['entities'][entity].hasMixin(Game.EntityMixins.Destructible)){
				// monsters
				//console.log("writeOutput monster "+this._items['entities'][entity].getChar());
				output += vsprintf("<br/><span style='color:%s'>%s</span>: %s", 
				        [
				     		this._items['entities'][entity].getForeground(),
				     		this._items['entities'][entity].getChar(),
				     		this._items['entities'][entity].getName()
						]);

				output += "<div class='monsterStats'>";
				output += vsprintf("LV:%d HP:%d/%d AT:%d DF:%d", 
				        [
				     		this._items['entities'][entity].getLevel(),
				     		this._items['entities'][entity].getHp(),
				     		this._items['entities'][entity].getMaxHp(),
				     		this._items['entities'][entity].getAttackValue(),
				     		this._items['entities'][entity].getDefenseValue(),
						]);
				output += "</div>";

				if(this._items['entities'][entity].hasMixin(Game.EntityMixins.FungusActor) ||
				   this._items['entities'][entity].hasMixin(Game.EntityMixins.TaskActor) ||
				   this._items['entities'][entity].hasMixin(Game.EntityMixins.Digger) ||
				   this._items['entities'][entity].hasType("infernal")){
					
					output += "<div class='condition'>";
					// available attributes
					if(this._items['entities'][entity].hasMixin(Game.EntityMixins.FungusActor)){
						output += " <span style='color:lightgreen'>grows</span>";
					}
					if(this._items['entities'][entity].hasMixin(Game.EntityMixins.TaskActor)){
						if(this._items['entities'][entity].canDoTask("hunt")){
							output += " <span style='color:red'>hunting</span>";
						} else {
							output += " <span style='color:yellow'>wandering</span>";
						}
					}
					if(this._items['entities'][entity].hasMixin(Game.EntityMixins.Digger)){
						output += " <span style='color:tan'>digger</span>";
					}
					if(this._items['entities'][entity].hasType("infernal")){
						output += " <span style='color:tomato'>infernal</span>";
					}
					if(this._items['entities'][entity].isPoisonous()){
						output += " <span style='color:yellowgreen'>poisoning</span>";
					}
					output += "</div>";
				}
				
			} else {
				// items
				// console.log("writeOutput item "+this._items['entities'][entity].getChar());
				output += vsprintf("<br/><span style='color:%s'>%s</span>: %s", 
				        [
				     		this._items['entities'][entity].getForeground(),
				     		this._items['entities'][entity].getChar(),
				     		this._items['entities'][entity].getName()
						]);
				if(this._items['entities'][entity].hasMixin(Game.ItemMixins.Edible) ||
				   this._items['entities'][entity].hasMixin(Game.ItemMixins.Equippable )){
					output += "<div class='condition'>";
					// available attributes
					if(this._items['entities'][entity].hasMixin(Game.ItemMixins.Edible)){
						output += " <span style='color:lightgreen'>edible</span>";
					}
					
					if(this._items['entities'][entity].hasMixin(Game.ItemMixins.Equippable)){
				    	if(this._items['entities'][entity].isWieldable()){
							output += " <span style='color:lightgreen'>wieldable</span>";
				    	}
				    	if(this._items['entities'][entity].isWearable()){
							output += " <span style='color:lightgreen'>wearable</span>";
				    	}
				    }
					output += "</div>";
				}
			}
		}
	}
	return output;
}