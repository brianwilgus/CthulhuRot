Game.Narrator = {
	_turn: null,
	_player: null,
	_isSuppressing: true,
	_helpOnce: {
		// these are the flags that control the help system
        drop:true,
        foodPickup:true,
        armorPickup:true,
        weaponPickup:true,
        edible:true,
        wieldable:true,
        wearable:true,
        poison:true
	},
    
    getHelpItem: function(type) {
    	for(item in this._helpOnce){
    		if(item == type && this._helpOnce[item] == true){
    			return true;
    		}
    	}
    	return false;
    },
	
	isSuppressing: function() {
		return this._isSuppressing;
	},

	setSuppress: function(value) {
		this._isSuppressing = value;
	},
	
	processNarrationTurn: function(player){
		if(this._player == null){
			this._player = player;
		}
		if(this._turn == null){
			this._turn = 0;
		} else {
			this._turn++;
		}
		
		//
		console.log("processNarrationTurn["+this._turn+"]");
		
		if(this._turn == 0){
			// the beginning...
	        Game.sendMessage(this._player, "You awaken in a dark forest0.");
	        Game.sendMessage(this._player, "%c{lightgreen}%b{black}You are the %c{yellow}@ %c{lightgreen}symbol. " +
	        		"Use the arrow keys to move.");
		} else if(this._turn == 1){
	        Game.sendMessage(this._player, "You awaken in a dark forest1.");
	        Game.sendMessage(this._player, "%c{lightgreen}%b{black}You are the %c{yellow}@ %c{lightgreen}symbol. " +
	        		"Use the arrow keys to move.");
		} else if(this._turn == 2){
			Game.sendMessage(this._player, "Strange creatures run through the undergrowth as you step forward.");
	        Game.sendMessage(this._player, "%c{lightgreen}%b{black}To attack a creature walk into it.");
		} else if(this._turn == 3){
	        this.setSuppress(false);
		} else if(this._turn == 4){
		}
	},
	
	helpText: function(type, args) {
		console.log("called helptext "+type+" this._isSuppressing "+this._isSuppressing );
		if(!this._isSuppressing){
			for(helpItem in this._helpOnce){
				/*
				console.log("helpText type = "+type);
				console.log("this._helpOnce["+helpItem+"] "+this._helpOnce[helpItem] );
				*/
				if(helpItem == type && this._helpOnce[helpItem] == true){
					this._helpOnce[helpItem] = false;
					switch(type){
						case "drop":
							Game.sendMessage(this._player, "%c{lightgreen}%b{black}Drop items by pressing the [%c{yellow}D%c{lightgreen}] key.");
							break;
						case "foodPickup":
							Game.sendMessage(this._player, "%c{white}%b{black}Your stomach growls hungrily as you spot something edible nearby.");
							Game.sendMessage(this._player, "%c{lightgreen}%b{black}Pick up the " +
									"%c{"+args['glyph'].getForeground()+"}"+args['glyph'].getChar()+"%c{lightgreen}%c{white}: "+args['glyph']._name+"%c{lightgreen} by standing on top of it and pressing the [%c{yellow},%c{lightgreen}] key.");
					        break;
						case "weaponPickup":
							Game.sendMessage(this._player, "%c{white}%b{black}A weapon! Exactly what you need to fight these beasts.");
							Game.sendMessage(this._player, "%c{lightgreen}%b{black}Pick up the " +
									"%c{"+args['glyph'].getForeground()+"}"+args['glyph'].getChar()+"%c{lightgreen}%c{white}: "+args['glyph']._name+"%c{lightgreen} by standing on top of them and pressing the [%c{yellow},%c{lightgreen}] key.");
					        break;
						case "armorPickup":
							Game.sendMessage(this._player, "%c{white}%b{black}Your eye catches some armor nearby.");
							Game.sendMessage(this._player, "%c{lightgreen}%b{black}Pick up the " +
									"%c{"+args['glyph'].getForeground()+"}"+args['glyph'].getChar()+"%c{lightgreen}%c{white}: "+args['glyph']._name+"%c{lightgreen} by standing on top of them and pressing the [%c{yellow},%c{lightgreen}] key.");
					        break;
						case "edible":
							console.log("write edible");
							Game.sendMessage(this._player, "%c{lightgreen}%b{black}You have picked up your first Edible item! " +
									"Press [%c{yellow}E%c{lightgreen}] and choose the %c{white}"+args['glyph']._name+"%c{lightgreen} in your inventory to eat.");
					        break;
						case "wearable":
							Game.sendMessage(this._player, "%c{lightgreen}%b{black}You have picked up your first Wearable item! " +
									"Press [%c{yellow}SHIFT + W%c{lightgreen}] and choose the %c{white}"+args['glyph']._name+"%c{lightgreen} in your inventory to wear.");
							break;
						case "wieldable":
							Game.sendMessage(this._player, "%c{lightgreen}%b{black}You have picked up your first Wieldable item! " +
									"Press [%c{yellow}W%c{lightgreen}] and choose the %c{white}"+args['glyph']._name+"%c{lightgreen} in your inventory to wield.");
					        break;
						case "poison":
							Game.sendMessage(this._player, "%c{white}%b{black}One of your enemies has a poisoning attack!");
							Game.sendMessage(this._player, "%c{lightgreen}%b{black} Some enemies (such as Cultists with Poison Daggers) will have poisonous" +
									" attacks.  Poison will bypass your armor protection and damage you at a rate over time. Spot special attributes such as" +
									" 'poisoning' in the '%c{orange} Key %c{lightgreen}' section in the left hand interface after the enemy name.");
					        break;
						default: 
							break;
					}
				}
			}
		}
	}
}