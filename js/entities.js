// Player template
Game.PlayerTemplate = {
    character: '@',
    foreground: 'white',
    maxHp: 40,
    attackValue: 10,
    sightRadius: 8,
    inventorySlots: 22,
    mixins: [Game.EntityMixins.PlayerActor,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.InventoryHolder, 
             Game.EntityMixins.FoodConsumer,
             Game.EntityMixins.Sight, 
             Game.EntityMixins.MessageRecipient,
             Game.EntityMixins.Equipper,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.PlayerStatGainer]
};

// Create our central entity repository
Game.EntityRepository = new Game.Repository('entities', Game.Entity);

Game.EntityRepository.define('fungus', {
    name: 'Yuggoth Fungi',
    character: 'F',
    foreground: 'palegreen',
    maxHp: 10,
    speed: 250,
    mixins: [Game.EntityMixins.FungusActor, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('bat', {
    name: 'bat',
    character: 'b',
    foreground: 'LightSlateGray',
    maxHp: 5,
    attackValue: 4,
    speed: 2000,
    corpseDropRate: 60,
    mixins: [Game.EntityMixins.TaskActor,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('byakhee', {
    name: 'Byakhee',
    character: 'B',
    foreground: 'purple',
    maxHp: 25,
    attackValue: 8,
	sightRadius: 8,
	tasks: ['hunt', 'wander'],
    speed: 1500,
    corpseDropRate: 80,
    mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('frog', {
    name: 'Frog',
    character: 'x',
    foreground: 'greenyellow',
    maxHp: 3,
    attackValue: 2,
    corpseDropRate: 40,
    speed: 250,
    mixins: [Game.EntityMixins.TaskActor,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('shoggoth', {
	name: 'Shoggoth',
	character: 'S',
	foreground:'pink',
	maxHp: 65,
	attackValue: 10,
	sightRadius: 10,
    corpseDropRate: 90,
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
	character: 'g',
	foreground:'darkseagreen',
	maxHp: 30,
	attackValue: 6,
	sightRadius: 5,
	tasks: ['hunt', 'wander'],
    corpseDropRate: 85,
    speed: 1000,
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('deepone', {
	name: 'Deep One',
	character: 'D',
	foreground:'blue',
	maxHp: 120,
	attackValue: 15,
	sightRadius: 4,
    corpseDropRate: 100,
    speed: 800,
	tasks: ['hunt', 'wander'],
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('huntinghorror', {
	name: 'Hunting Horror',
	character: 'H',
	foreground:'slategrey',
	maxHp: 45,
	attackValue: 6,
	sightRadius: 6,
    corpseDropRate: 50,
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
	character: 'C',
	foreground:'firebrick',
	maxHp: 30,
	attackValue: 8,
	sightRadius: 6,
    corpseDropRate: 100,
    speed: 1000,
	tasks: ['hunt', 'wander'],
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('shubniggurath', {
    name: 'Dark Young of Shub-Niggurath', 
    character: 'Y',
    foreground: 'midnightblue',
    maxHp: 200,
    attackValue: 25,
    defenseValue: 12,
    level: 7,
    sightRadius: 24,
    speed: 900,
    mixins: [Game.EntityMixins.GiantZombieActor, Game.EntityMixins.Sight,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('slime', {
    name: 'Formless Spawn',
    character: 's',
    foreground: 'lightGreen',
    maxHp: 10,
    attackValue: 5,
    sightRadius: 3,
    tasks: ['hunt', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});