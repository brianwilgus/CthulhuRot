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
    name: 'fungus',
    character: 'F',
    foreground: 'green',
    maxHp: 10,
    speed: 250,
    mixins: [Game.EntityMixins.FungusActor, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('bat', {
    name: 'bat',
    character: 'B',
    foreground: 'white',
    maxHp: 5,
    attackValue: 4,
    speed: 2000,
    corpseDropRate: 90,
    mixins: [Game.EntityMixins.TaskActor,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('newt', {
    name: 'newt',
    character: ':',
    foreground: 'yellow',
    maxHp: 3,
    attackValue: 2,
    corpseDropRate: 80,
    mixins: [Game.EntityMixins.TaskActor,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('kobold', {
	name: 'kobold',
	character: 'k',
	foreground:'brown',
	maxHp: 6,
	attackValue: 4,
	sightRadius: 5,
	tasks: ['hunt', 'wander'],
	mixins: [Game.EntityMixins.TaskActor,
	         Game.EntityMixins.Sight,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.Attacker, 
             Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, 
             Game.EntityMixins.RandomStatGainer]
});