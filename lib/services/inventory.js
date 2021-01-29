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
     equipped: results[i].pi_equipped,
     identified: results[i].pi_identified,
     abilities: results[i].pi_abilities,
     timesEnchanted: results[i].pi_times_enchanted,
     inStorage: results[i].pi_in_storage,
     name: results[i].name,
     region: results[i].region,
     shop: results[i].shop,
     funcs: results[i].funcs,
     effects: results[i].effects,
     cost: results[i].cost,
     equippable: results[i].equippable,
     level: results[i].lvl,
     maxEnchants: results[i].max_enchants,
     dropRate: results[i].drop_rate,
     isSilver: results[i].is_silver,
     isCrystal: results[i].is_crystal
    };
    items.push(data);
   }
   callback(items);
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

