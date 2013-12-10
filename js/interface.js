Game.Interface = {
	_status: null,
	
	init: function(){
		this._status = new Game.Interface.Status();
	},
	
	update: function() {
		// update all sub-categories
		this._status.update();
	},
	
	getStatus: function(){
		return this._status;
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
		this._output = this.writeOutput();
		this._target.innerHTML = this._output;
	}
}

Game.Interface.Status = function() {
	properties = {
			divId: 'status',
			items: {
				'location': 'Forest',
				'depth': 1
			}
	};
	Game.Interface.Category.call(this, properties);
	console.log('init Game.Interface.Status');
}

// inherit all the functionality from Category
Game.Interface.Status.extend(Game.Interface.Category);

Game.Interface.Status.prototype.writeOutput = function() {
	var output = "== Status ==";
	output += vsprintf("<br/>Location: %s<br/>Depth: %d", 
        [
     		this._items['location'],
     		this._items['depth']
		]);
	return output;
}

Game.Interface.Status.prototype.updateItems = function(arItems) {
	for(key in arItems){
		this._items[key] = arItems[key];
	}
	this.update();
}