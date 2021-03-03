class Player {
 
 constructor(data){
  this.observers = new Set();
  
  this.owner = data.owner;
  this.region = data.region;
  this.charClass = data.char_class;
  this.background = data.background;
  this.guild = data.guild;
  this.effects = data.effects;
  this.stats = {
   guts: data.guts,
   gutsMax: data.max_guts,
   wits: data.wits,
   witsMax: data.max_wits,
   charm: data.charm,
   charmMax: data.max_charm,
   attack: data.attack,
   defend: data.defend,
   skill: data.skill,
  };
  this.skills = {
   fighter: {
    skill: data.skill_fighter,
    max: data.skill_fighter_max
   },
   magic: {
    skill: data.skill_magic,
    max: data.skill_magic_max
   },
   trade: {
    skill: data.skill_trade,
    max: data.skill_trade_max
   }
  };
  this.level = data.level;
  this.experience = data.experience;
  this.quests = data.quests;
  this.questsMax = data.max_quests;
  this.storage = data.storage;
  this.storageMax = data.max_storage;
  this.cash = data.cash;
  this.rank = data.rank;
  this.fame = data.fame,
  this.favor = data.favor;
  this.skilled = data.skilled;
  this.rankString = data.rankString;
  this.nameRankString = data.nameRankString;
 }
 
 subscribe(observer){
  this.observers.add(observer);
 }
 
 notify(message){
  this.observers.forEach((observer) => {
   observer.update(message);
  });
 }
}

module.exports = Player;