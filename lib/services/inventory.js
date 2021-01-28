class Inventory{
 constructor(db){
  this.DB = db;
 }
 
 get(id, callback){
  var query = 'SELECT i.*, pi.* FROM player_items pi INNER JOIN items i ON pi.pi_item = i.id WHERE pi.pi_player = '+id;
  this.DB.query(query).then((results) => {
   var items = [];
   for(var i = 0; i < results.length; i++){
    var data = {
     id: results[i].pi_id,
     item: results[i].pi_item,
     qty: results[i].pi_qty,
     equipped: 
     identified: 
     abilities: 
     timesEnchanted:
     inStorage: 
     name
     region
     shop
     funcs
     effects
     cost
     level
     maxEnchants
     dropRate
     isSilver
     isCrystal
    };
    items.push(data);
   }
   callback(results);
  }).catch((err) => {
   console.log(err);
  });
 }
 
 add(item, callback){
  var query = 'INSERT INTO player_items SET pi_item = '+item.id+', pi_player = '+Player.owner+', pi_qty = '+item.qty+', pi_equipped = '+item.equipped+', pi_identified = '+item.identified+', pi_abilities = "'+item.abilities+'", pi_guts = '+item.guts+', pi_wits = '+item.wits+', pi_charm = '+item.charm+', pi_attack = '+item.attack+', pi_defend = '+item.defend+', pi_skill = '+item.skill+', pi_times_enchanted = '+item.timesEnchanted+', pi_in_storage = '+item.inStorage;
  this.DB.query(query).then((results) => {
   this.get(Player.owner, (inv) => {
    callback(inv);
   });
  }).catch((err) => {
   console.log(err);
  });
  
 }
 
 remove(item, callback){
  
 }
}

module.exports = (db) => {
  return new Inventory(db);
}

