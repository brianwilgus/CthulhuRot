Game.ItemRepository = new Game.Repository('items', Game.Item);

Game.ItemRepository.define('apple', {
    name: 'apple',
    character: '%',
    foreground: 'red',
    foodValue: 50,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('melon', {
    name: 'melon',
    character: '%',
    foreground: 'lightGreen',
    foodValue: 35,
    consumptions: 4,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('rock', {
    name: 'rock',
    character: '*',
    foreground: 'white'
});

Game.ItemRepository.define('corpse', {
	    name: 'corpse',
	    character: '%',
	    foodValue: 75,
	    consumptions: 1,
	    mixins: [Game.ItemMixins.Edible]
	}, {
	    disableRandomCreation: true
	}
);


// Weapons
// ======================================
Game.ItemRepository.define('dagger', {
    name: 'Cultist Dagger',
    character: '+',
    foreground: 'gray',
    attackValue: 6,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('sword', {
    name: 'Eldritch Blade',
    character: 't',
    foreground: 'dimgrey',
    attackValue: 15,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('staff', {
    name: 'Withered Staff',
    character: 'f',
    foreground: 'yellow',
    attackValue: 5,
    defenseValue: 3,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});


// Wearables
//======================================
Game.ItemRepository.define('robes', {
    name: 'tattered robes',
    character: '{',
    foreground: 'white',
    defenseValue: 2,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('scalemail', {
    name: 'scale armor',
    character: 'M',
    foreground: 'bluegrey',
    defenseValue: 10,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('platemail', {
    name: 'plate armor',
    character: 'A',
    foreground: 'aliceblue',
    defenseValue: 14,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('leatherarmor', {
    name: 'leather armor',
    character: 'L',
    foreground: 'tan',
    defenseValue: 6,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});


// Combo Items
//======================================

//try to wear, wield and eat the pumpkin!
Game.ItemRepository.define('pumpkin', {
 name: 'rotten pumpkin',
 character: 'P',
 foreground: 'orange',
 foodValue: 50,
 attackValue: 2,
 defenseValue: 2,
 wearable: true,
 wieldable: true,
 mixins: [Game.ItemMixins.Edible, Game.ItemMixins.Equippable]
});