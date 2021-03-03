class StatObserver {
  update(data){
   var nameRank = $('.statsNameRank'),
    experience = $('.statsExperience'),
    cash = $('.statsCash'),
    quests = $('.statsQuests'),
    level = $('.statsLevel'),
    guts = $('.statsGuts'),
    wits = $('.statsWits'),
    charm = $('.statsCharm'),
    weaponAndArmor = $('.statsWeaponAndArmor');
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
	  
	  weaponAndArmor.html(statEquipment);
	  guts.html((data.stats.guts == data.stats.gutsMax) ? data.stats.guts : data.stats.guts+"/"+data.stats.gutsMax);
	  wits.html((data.stats.wits == data.stats.witsMax) ? data.stats.wits : data.stats.wits+"/"+data.stats.witsMax);
	  charm.html((data.stats.charm == data.stats.charmMax) ? data.stats.charm : data.stats.charm+"/"+data.stats.charmMax);
	  quests.html((data.quests == data.questsMax) ? data.quests : data.quests+"/"+data.questsMax);
	  cash.html(data.cash);
	  level.html(data.level);
	  experience.html(data.experience);
	  nameRank.html(DC.Player.getRankString(data.rank)+' '+DC.models.User.name);
  }
}