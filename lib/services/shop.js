PlayerService = require('./player');
InventoryService = require('./inventory');
class Shop{
 constructor(db){
  this.DB = db;
 }
 
 buy(item, callback){
 console.log(item);
  Player.cash = Player.cash - item.cost;
  PlayerService.update(Player, (obj) => {
   InventoryService.add(item, (inv) => {
    callback(obj, inv);
   });
  });
 }
 
 sell(data, callback){
  var uid = data.id,
   item = data.itm;
  
  console.log(item);
 }
 
 polish(data, callback){
  var uid = data.id,
   item = data.itm;
  
  console.log(item);
 }
 
 identify(data, callback){
  var uid = data.id,
   item = data.itm;
  
  console.log(item);
 }
}

module.exports = (db) => {
  return new Shop(db);
}

