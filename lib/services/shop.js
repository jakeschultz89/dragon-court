PlayerService = require('./player');
class Shop{
 constructor(db){
  this.DB = db;
 }
 
 buy(item, callback){
  Player.cash = item.cost;
  PlayerService.update(Player, (obj) => {
		callback(obj, item);
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

