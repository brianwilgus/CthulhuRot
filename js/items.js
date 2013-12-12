Game.ItemRepository = new Game.Repository('items', Game.Item);

Game.ItemRepository.define('apple', {
    name: 'Apple',
    character: 'a',
    foreground: 'red',
    foodValue: 45,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('melon', {
    name: 'Melon',
    character: 'o',
    foreground: 'lightGreen',
    foodValue: 80,
    consumptions: 2,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('mushrooms', {
    name: 'Fresh Mushrooms',
    character: ':',
    foreground: 'tan',
    foodValue: 50,
    consumptions: 2,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('rock', {
    name: 'Rock',
    character: '*',
    foreground: 'grey'
});

Game.ItemRepository.define('bone', {
    name: 'Freshly Gnawed Bone',
    character: '/',
    foreground: 'white'
});

Game.ItemRepository.define('rotten', {
    name: 'Rotten Corpse',
    character: '%',
    foreground: 'DarkOliveGreen'
});

Game.ItemRepository.define('corpse', {
	    name: 'Corpse',
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
    character: '!',
    foreground: 'dimgrey',
    attackValue: 15,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('staff', {
    name: 'Withered Staff',
    character: '/',
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
    name: 'Padded Cloth Armor',
    character: '{',
    foreground: 'white',
    defenseValue: 4,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('chainmail', {
    name: 'Chainmail Armor',
    character: '{',
    foreground: 'bluegrey',
    defenseValue: 10,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('platemail', {
    name: 'Heavy Plate Mail',
    character: '{',
    foreground: 'aliceblue',
    defenseValue: 14,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('spikedarmor', {
    name: 'Spiked Armor',
    character: '{',
    foreground: 'slategrey',
    defenseValue: 10,
    attackValue: 3,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('leatherarmor', {
    name: 'Banded Leather Armor',
    character: '{',
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
 name: 'Rotten Pumpkin',
 character: 'p',
 foreground: 'orange',
 foodValue: 50,
 attackValue: 2,
 defenseValue: 2,
 wearable: true,
 wieldable: true,
 mixins: [Game.ItemMixins.Edible, Game.ItemMixins.Equippable]
});


Game.ItemRepository.define('tiara', {
name: 'Tiara of the Deep Ones',
character: 'T',
foreground: 'PaleGoldenRod',
attackValue: 8,
defenseValue: 16,
wearable: true,
wieldable: false,
mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('blade', {
name: 'Writhing Blade of the High Priest',
character: '?',
foreground: 'PaleGoldenRod',
attackValue: 20,
defenseValue: -5,
wearable: false,
wieldable: true,
mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});