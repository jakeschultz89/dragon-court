class Player{
 constructor(db){
  this.DB = db;
 }
  
 create(obj, callback){
  var q = "INSERT INTO players (owner,region,class,background,guild,effects,guts,max_guts,wits,max_wits,charm,max_charm,attack,defend,skill,skill_fighter,skill_fighter_max,skill_magic,skill_magic_max,skill_trade,skill_trade_max,level,experience,quests,max_quests,cash,rank,storage,max_storage,fame,favor,skilled) VALUES ("+obj.id+",'town','"+obj.charClass+"','"+obj.bg+"',0,'',"+obj.guts+","+obj.guts+","+obj.wits+","+obj.wits+","+obj.charm+","+obj.charm+",1,1,4,"+obj.skillFighter+","+obj.skillFighter+","+obj.skillMagic+","+obj.skillMagic+","+obj.skillTrade+","+obj.skillTrade+",1,0,5,5,"+obj.cash+","+obj.rank+",0,20,0,0,0)";
  this.DB.query(query).then((results) => {
   if(results.insertId){
    obj.id = results.insertId;
    callback(obj);
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
  this.DB.query(query).then((results) => {
   var data = {
    owner: id,
    region: results[0].region,
    charClass: results[0]..char_class,
    background: results[0].background,
    guild: results[0].guild,
    effects: results[0].effects,
    stats: {
     guts: results[0].guts,
     gutsMax: results[0].max_guts,
     wits: results[0].wits,
     witsMax: results[0].max_wits,
     charm: results[0].charm,
     charmMax: results[0].max_charm,
     attack: results[0].attack,
     defend: results[0].defend,
     skill: results[0].skill,
    },
    skills: {
     fighter: {
      skill: results[0].skill_fighter,
      max: results[0].skill_fighter_max,
     },
     magic: {
      skill: results[0].skill_magic,
      max: results[0].skill_magic_max,
     },
     trade: {
      skill: results[0].skill_trade,
      max: results[0].skill_trade_max,
     }
    },
    level: results[0].level,
    experience: results[0].experience,
    quests: results[0].quests,
    max_quests: results[0].max_quests,
    storage: results[0].storage,
    max_storage: results[0].max_storage,
    cash: results[0].cash,
    rank: results[0].rank,
    fame: results[0].fame,
    favor: results[0].favor,
    skilled: results[0].skilled,
   };
   callback(data);
  }).catch((err) => {
   console.log(err);
  });
 }
}

module.exports = (db) => {
  return new Player(db);
}

