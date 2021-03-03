var Player = require('../models/player');

class PlayerService{
 constructor(){}
  
 create(obj, callback){
  obj.rank = 0;
  obj.skillFighter = 0;
  obj.skillMagic = 0;
  obj.skillTrade = 0;
  
  switch(obj.charClass){
    default:
    case "peasant":
    break;
    case "noble":
      obj.rank = 1;
    break;
    case "warrior":
      obj.skillFighter = 1;
    break;
    case "wizard":
      obj.skillMagic = 1;
    break;
    case "trader":
      obj.skillTrade = 1;
    break;
  }
  
  var q = "INSERT INTO players (owner,region,char_class,background,guild,effects,guts,max_guts,wits,max_wits,charm,max_charm,attack,defend,skill,skill_fighter,skill_fighter_max,skill_magic,skill_magic_max,skill_trade,skill_trade_max,level,experience,quests,max_quests,cash,rank,storage,max_storage,fame,favor,skilled) VALUES ("+obj.owner+",'town','"+obj.charClass+"','"+obj.bg+"',0,'',"+obj.guts+","+obj.guts+","+obj.wits+","+obj.wits+","+obj.charm+","+obj.charm+",1,1,4,"+obj.skillFighter+","+obj.skillFighter+","+obj.skillMagic+","+obj.skillMagic+","+obj.skillTrade+","+obj.skillTrade+",1,0,5,5,"+obj.cash+","+obj.rank+",0,20,0,0,0)";
  db.query(q).then((results) => {
   if(results.affectedRows){
    var query = 'UPDATE users SET has_char = 1 WHERE id = '+obj.owner;
    db.query(query).then((result) => {
     global.User.hasChar = 1;
     callback(obj.owner);
    }).catch((err) => {
     console.log(err);
    });
   };
  }).catch((err) => {
   console.log(err);
  });
 }
 
 getRankString(rank){
  var title;
  switch(rank){
   default:
   case 0:
    title = "Peasant";
    break;
   case 1:
    title = "Squire";
    break;
   case 2:
    title = "Knight";
    break;
   case 3:
    title = "Captain";
    break;
   case 4:
    title = "Baron";
    break;
   case 5:
    title = "Count";
    break;
   case 6:
    title = "Viscount";
    break;
   case 7:
    title = "Marquis";
    break;
   case 8:
    title = "Earl";
    break;
   case 9:
    title = "Duke";
    break;
   case 10:
    title = "Prince";
    break;
   case 11:
    title = "Viceroy";
    break;
   case 12:
    title = "Regent";
    break;
   case 13:
    title = "Seneschal";
    break;
  }
  return title;
 }
 
 get(id, callback){
  var query = 'SELECT * FROM players WHERE owner = '+id;
  db.query(query).then((results) => {
   var data = results[0];
   data.rankString = this.getRankString(data.rank);
   data.nameRankString = data.rankString +' '+global.User.name;
   
   var p = global.Player = new Player(data);
   callback(p);
  }).catch((err) => {
   console.log(err);
  });
 }
 
 update(obj, callback){
		var query = "UPDATE players SET region='"+obj.region+"',char_class='"+obj.charClass+"',background='"+obj.background+"',guild="+obj.guild+", effects='"+obj.effects+"',guts="+obj.stats.guts+",max_guts="+obj.stats.gutsMax+",wits="+obj.stats.wits+",max_wits="+obj.stats.witsMax+",charm="+obj.stats.charm+",max_charm="+obj.stats.charmMax+",attack="+obj.stats.attack+",defend="+obj.stats.defend+",skill="+obj.stats.skill+",skill_fighter="+obj.skills.fighter.skill+",skill_fighter_max="+obj.skills.fighter.max+",skill_magic="+obj.skills.magic.skill+",skill_magic_max="+obj.skills.magic.max+",skill_trade="+obj.skills.trade.skill+",skill_trade_max="+obj.skills.trade.max+",level="+obj.level+",experience="+obj.experience+",quests="+obj.quests+",max_quests="+obj.questsMax+",cash="+obj.cash+",rank="+obj.rank+",storage="+obj.storage+",max_storage="+obj.storageMax+",fame="+obj.fame+",favor="+obj.favor+",skilled="+obj.skilled+" WHERE owner = "+obj.owner;
		db.query(query).then((result) => {
			callback(obj);
		}).catch((err) => {
			console.log(err);
		});
	}
}

module.exports = () => {
  return new PlayerService();
}

