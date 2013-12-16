// Player template
Game.PlayerTemplate = {
    character: '@',
    foreground: 'yellow',
    maxHp: 50,
    attackValue: 10,
    defenseValue: 0,
    sightRadius: 10,
    inventorySlots: 22,
    mixins: [Game.EntityMixins.PlayerActor,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.InventoryHolder, 
             Game.EntityMixins.FoodConsumer,
             Game.EntityMixins.Sight, 
             Game.EntityMixins.MessageRecipient,
             Game.EntityMixins.Equipper,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.PlayerStatGainer,
             Game.EntityMixins.Digger,
             Game.EntityMixins.Poisonable]
};

// Create our central entity repository
Game.EntityRepository = new Game.Repository('entities', Game.Entity);

Game.EntityRepository.define('fungus', {
    name: 'Fungi from Yuggoth',
    type: ['infernal', 'magical'],
    character: 'F',
    foreground: 'palegreen',
    attackValue: 2,
    maxHp: 5,
    mixins: [Game.EntityMixins.Attacker, 
             Game.EntityMixins.FungusActor, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('rat', {
    name: 'Rat',
    type: ['cave', 'forest', 'dirt', 'animal'],
    character: 'r',
    foreground: 'LightSlateGray',
    maxHp: 5,
    attackValue: 4,
	tasks: ['hunt', 'wander'],
    speed: 900,
    meatDropRate: 25,
    foodValue: 10,
    mixins: [Game.EntityMixins.TaskActor,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.MeatDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('worm', {
    name: 'Giant Worm',
    type: ['cave', 'dirt', 'animal'],
    character: 'w',
    foreground: 'lawngreen',
    maxHp: 10,
    attackValue: 6,
	sightRadius: 5,
	tasks: ['hunt', 'wander'],
    speed: 1000,
    mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.Digger,
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('beaver', {
    name: 'Beaver',
    type: ['forest', 'animal'],
    character: 'b',
    foreground: 'sienna',
    maxHp: 5,
    attackValue: 4,
	sightRadius: 4,
	tasks: ['hunt', 'wander'],
    speed: 750,
    meatDropRate: 75,
    foodValue: 30,
    mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.MeatDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.Digger,
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('byakhee', {
    name: 'Byakhee',
    type: ['infernal'],
    character: 'B',
    foreground: 'purple',
    maxHp: 25,
    attackValue: 8,
	sightRadius: 8,
	tasks: ['hunt', 'wander'],
    speed: 1500,
    mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('frog', {
    name: 'Poisonous Frog',
    type: ['cave', 'forest', 'dirt', 'animal'],
    character: 'f',
    foreground: 'mediumvioletred',
    poisonous: true,
    poisonRate: 2,
    poisonDuration: 3,
    maxHp: 3,
    attackValue: 2,
    speed: 250,
    meatDropRate: 100,
    foodValue: -200,
    mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.MeatDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('shoggoth', {
	name: 'Shoggoth',
    type: ['infernal'],
	character: 'S',
	foreground:'pink',
	maxHp: 65,
	attackValue: 10,
    defenseValue: 6,
	sightRadius: 10,
    speed: 750,
	tasks: ['hunt', 'wander'],
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('ghoul', {
	name: 'Ghoul',
    type: ['infernal'],
	character: 'g',
	foreground:'darkseagreen',
	maxHp: 30,
	attackValue: 6,
	sightRadius: 5,
	tasks: ['hunt', 'wander'],
    speed: 1000,
    itemDropList: ['bone'],
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ItemDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('wolf', {
	name: 'Wolf',
    type: ['cave', 'forest', 'dirt', 'animal'],
	character: 'w',
	foreground:'lightgrey',
	maxHp: 35,
	attackValue: 4,
	sightRadius: 15,
	tasks: ['hunt', 'wander'],
    meatDropRate: 75,
    foodValue: 25,
    speed: 1250,
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.MeatDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('deepone', {
	name: 'Deep One',
    type: ['infernal'],
	character: 'D',
	foreground:'blue',
	maxHp: 120,
	attackValue: 15,
    defenseValue: 4,
	sightRadius: 4,
    speed: 800,
	tasks: ['hunt', 'wander'],
    itemDropRate: 10,
    itemDropList: ['tiara'],
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ItemDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('huntinghorror', {
	name: 'Hunting Horror',
    type: ['infernal'],
	character: 'H',
	foreground:'slategrey',
	maxHp: 35,
	attackValue: 6,
	sightRadius: 6,
    speed: 1600,
	tasks: ['hunt', 'wander'],
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('cultist', {
	name: 'Cultist',
    type: ['cave', 'dirt', 'magical'],
	character: 'C',
	foreground:'red',
	maxHp: 30,
    poisonous: true,
    poisonRate: 5,
    poisonDuration: 5,
	attackValue: 8,
    defenseValue: 2,
	sightRadius: 6,
    speed: 1000,
	tasks: ['hunt', 'wander'],
    itemDropList: ['dagger','robes'],
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ItemDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('chaos', {
	name: 'Chaos Warrior',
    type: ['magical', 'cave', 'infernal'],
	character: 'W',
	foreground:'purple',
	maxHp: 120,
	attackValue: 10,
    defenseValue: 10,
	sightRadius: 5,
    speed: 1200,
	tasks: ['hunt', 'wander'],
    itemDropList: ['spikedarmor', 'mace', 'axe', 'chainmail'],
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ItemDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('deathknight', {
	name: 'Death Knight',
    type: ['magical', 'infernal'],
	character: 'D',
	foreground:'slateblue',
	maxHp: 180,
	attackValue: 14,
    defenseValue: 14,
	sightRadius: 7,
    speed: 900,
	tasks: ['hunt', 'wander'],
    itemDropList: ['spikedarmor', 'sword', 'axe', 'platemail'],
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ItemDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('elder', {
	name: 'Elder Cultist',
    type: ['unique'],
	character: 'E',
	foreground:'tomato',
	maxHp: 90,
	attackValue: 16,
    defenseValue: 4,
	sightRadius: 8,
    speed: 800,
	tasks: ['hunt', 'wander'],
    itemDropList: ['staff'],
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ItemDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('highpriest', {
	name: 'The High Priest',
    type: ['unique'],
	character: 'H',
	foreground:'gold',
	maxHp: 150,
	attackValue: 22,
    defenseValue: 6,
	sightRadius: 10,
    speed: 1000,
	tasks: ['hunt', 'wander'],
    itemDropList: ['blade'],
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ItemDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('shubniggurath', {
    name: 'Dark Young of Shub-Niggurath', 
    type: ['unique'],
    character: 'Y',
    foreground: 'hotPink',
    maxHp: 200,
    attackValue: 25,
    defenseValue: 12,
    level: 7,
    sightRadius: 24,
    speed: 900,
    mixins: [Game.EntityMixins.GiantBossActor, 
             Game.EntityMixins.Sight,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('slime', {
    name: 'Formless Spawn',
    type: ['infernal'],
    character: 's',
    foreground: 'lightGreen',
    maxHp: 40,
    attackValue: 10,
    sightRadius: 5,
    tasks: ['hunt', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, 
             Game.EntityMixins.Sight,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});