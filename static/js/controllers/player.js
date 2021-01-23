DC.Player = {
 init: () => {
  DC.Player.listeners.init();
  DC.models.Player.observers.push(new StatObserver());
  Socket.emit('player-get', DC.models.Player.owner);
 },
 listeners: {
  init: () => {
   Socket.on('player-seed', (d) => {
	   DC.models.Player.owner = d.owner;
	   DC.models.Player.region = d.region;
	   DC.models.Player.charClass = d.charClass;
	   DC.models.Player.background = d.background;
	   DC.models.Player.guild = d.guild;
	   DC.models.Player.effects = d.effects;
	   DC.models.Player.stats.guts = d.stats.guts;
	   DC.models.Player.stats.gutsMax = d.stats.gutsMax;
	   DC.models.Player.stats.wits = d.stats.wits;
	   DC.models.Player.stats.witsMax = d.stats.witsMax;
	   DC.models.Player.stats.charm = d.stats.charm;
	   DC.models.Player.stats.charmMax = d.stats.charmMax;
	   DC.models.Player.stats.attack = d.stats.attack;
	   DC.models.Player.stats.defend = d.stats.defend;
	   DC.models.Player.stats.skill = d.stats.skill;
	   DC.models.Player.skills.fighter.skill = d.skills.fighter.skill;
	   DC.models.Player.skills.fighter.max = d.skills.fighter.max;
	   DC.models.Player.skills.magic.skill = d.skills.magic.skill;
	   DC.models.Player.skills.magic.max = d.skills.magic.max;
	   DC.models.Player.skills.trade.skill = d.skills.trade.skill;
	   DC.models.Player.skills.trade.max = d.skills.trade.max;
	   DC.models.Player.level = d.level;
	   DC.models.Player.experience = d.experience;
	   DC.models.Player.quests = d.quests;
	   DC.models.Player.questsMax = d.questsMax;
	   DC.models.Player.cash = d.cash;
	   DC.models.Player.rank = d.rank;
	   DC.models.Player.storage = d.storage;
	   DC.models.Player.storageMax = d.storageMax;
	   DC.models.Player.fame = d.fame;
	   DC.models.Player.favor = d.favor;
	   DC.models.Player.skilled = d.skilled;
	   DC.models.Player.rankString = d.rankString;
	   DC.models.Player.nameAndRank = d.nameRankString;
	   DC.models.Player.totalGuildSkills = DC.models.Player.skills.fighter.skill + DC.models.Player.skills.magic.skill + DC.models.Player.skills.trade.skill;
	  });
	  
	  Socket.on('player-statbar-result', (data) => {
	  var tpl = data.html;
	  var statEquipment = "";
	 
	  if($.isEmptyObject(DC.Inventory.equipment.weapon)){
	   statEquipment = "Fists";
	  }else{ 
	   statEquipment = DC.Inventory.equipment.weapon.name;
	  }
	  statEquipment += " & ";
	 
	  if($.isEmptyObject(DC.Inventory.equipment.armor)){
	   statEquipment += "Underwear";
	  }else{
	   statEquipment += DC.Inventory.equipment.armor.name;
	  }
	  
   var statObj = {
    data: {
	    nameAndRank: DC.models.Player.nameAndRank,
	    guts: (DC.models.Player.stats.guts == DC.models.Player.stats.gutsMax) ? DC.models.Player.stats.guts : DC.models.Player.stats.guts+"/"+DC.models.Player.stats.gutsMax,
	    wits: (DC.models.Player.stats.wits == DC.models.Player.stats.witsMax) ? DC.models.Player.stats.wits : DC.models.Player.stats.wits+"/"+DC.models.Player.stats.witsMax,
	    charm: (DC.models.Player.stats.charm == DC.models.Player.stats.charmMax) ? DC.models.Player.stats.charm : DC.models.Player.stats.charm+"/"+DC.models.Player.stats.charmMax,
	    cash: DC.models.Player.cash,
	    quests: (DC.models.Player.quests == DC.models.Player.questsMax) ? DC.models.Player.quests : DC.models.Player.quests+"/"+DC.models.Player.questsMax,
	    level: DC.models.Player.level,
	    experience: DC.models.Player.experience,
	    equippedWeaponAndArmor: statEquipment
    },
	   html: tpl
	  };
	 
	  var html = DC.Tpl.build(statObj);
	  $('#statBar').html(html);
	 });
  }
 },
 hasEffect: (effect) => {
  return DC.models.Player.effects.includes(effect);
 },
 removeEffect: (effect) => {
 
 },
 calculate: () => {
  var totals = DC.Inventory.equipment.getTotals();
	 DC.models.Player.totalGuts = DC.models.Player.stats.guts + totals.guts;
	 DC.models.Player.totalWits = DC.models.Player.stats.wits + totals.wits;
	 DC.models.Player.totalCharm = DC.models.Player.stats.charm + totals.charm;
	 DC.models.Player.totalAttack = DC.models.Player.stats.attack + totals.attack;
	 DC.models.Player.totalDefend = DC.models.Player.stats.defend + totals.defend;
	     
	 var stat = DC.models.Player.stats.skill + totals.skill;
	 if(DC.Player.hasAbility("Agility")){
	  var inc = stat * 0.1;
	  skillStat = Math.ceil(stat + inc);
	 }else{
	  skillStat = stat;
	 }
	 DC.models.Player.totalSkill = skillStat;
	},
	buildCharacterSheet: () => {
	 Socket.emit('tpl-character', DC.models.Player.owner);
	 Socket.on('tpl-character-result', (data) => {
	  var tpl = data.html;
	  var statObj = {
	   data: {
	    nameAndRank: DC.models.Player.nameAndRank,
	    guts: (DC.models.Player.stats.guts == DC.models.Player.stats.gutsMax) ? DC.models.Player.stats.guts : DC.models.Player.stats.guts+"/"+DC.models.Player.stats.gutsMax,
	    wits: (DC.models.Player.stats.wits == DC.models.Player.stats.witsMax) ? DC.models.Player.stats.wits : DC.models.Player.stats.wits+"/"+DC.models.Player.stats.witsMax,
	    charm: (DC.models.Player.stats.charm == DC.models.Player.stats.charmMax) ? DC.models.Player.stats.charm : DC.models.Player.stats.charm+"/"+DC.models.Player.stats.charmMax,
	    cash: DC.models.Player.cash,
	    quests: (DC.models.Player.quests == DC.models.Player.questsMax) ? DC.models.Player.quests : DC.models.Player.quests+"/"+DC.models.Player.questsMax,
	    level: DC.models.Player.level,
	    experience: DC.models.Player.experience,
	    expThreshold: DC.expThresholds[DC.models.Player.level + 1],
	    attack: DC.models.Player.stats.attack,
	    defend: DC.models.Player.stats.defend,
	    skill: DC.models.Player.stats.skill,
	    fighterSkill: DC.models.Player.skillFighter,
	    fighterSkillMax: DC.models.Player.skillFighterMax,
	    magicSkill: DC.models.Player.skillMagic,
	    magicSkillMax: DC.models.Player.skillMagicMax,
	    tradeSkill: DC.models.Player.skillTrade,
	    tradeSkillMax: DC.models.Player.skillTradeMax,
	    head: ($.isEmptyObject(DC.Inventory.equipment.head)) ? "---" : DC.Inventory.equipment.head.getDescription(),
	    body: ($.isEmptyObject(DC.Inventory.equipment.body)) ? "---" : DC.Inventory.equipment.body.getDescription(),
	    feet: ($.isEmptyObject(DC.Inventory.equipment.feet)) ? "---" : DC.Inventory.equipment.feet.getDescription(),
	    right: ($.isEmptyObject(DC.Inventory.equipment.right)) ? "---" : DC.Inventory.equipment.right.getDescription(),
	    left: ($.isEmptyObject(DC.Inventory.equipment.left)) ? "---" : DC.Inventory.equipment.left.getDescription(),
	    backpack: DC.models.Player.storage+"/"+DC.models.Player.storageMax,
	    items: DC.Inventory.items
	   },
	   html: tpl
	  };
	  console.log(DC.Inventory.items);
	  var html = DC.Tpl.build(statObj);
	  DC.Game.container.html(html);
	 });
	},
	buildStats: () => {
	 Socket.emit('player-statbar', DC.models.Player.owner);
 },
 hasEnoughForTransaction: (cost) => {
  if(DC.models.Player.cash - cost >= 0){
   return false;
  }else{
   return true;
  }
 }
};