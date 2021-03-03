PlayerService = require('./player')();
InventoryService = require('./inventory')();

class ShopService{
 constructor(){}
 
 get(type, callback){
  var q = 'SELECT * FROM shops WHERE type = "'+type+'"';
  db.query(q).then((result) => {
   var data = {
    id: result[0].id,
    name: result[0].name,
    type: result[0].type,
    region: result[0].region
   };
   callback(data);
  }).catch((err) => {
   console.log(err);
  });
 }
 
 items(type, region, callback){
  var query = 'SELECT * FROM items WHERE shop = "'+type+'" AND region = "'+region+'"';
  db.query(query).then((results) => {
   var items = [];
   for(var i = 0; i < results.length; i++){
    var item = {
     id: results[i].id,
     name: results[i].name,
     region: results[i].region,
     shop: results[i].shop,
     guts: results[i].guts,
     wits: results[i].wits,
     charm: results[i].charm,
     attack: results[i].attack,
     defend: results[i].defend,
     skill: results[i].skill,
     cost: results[i].cost,
     func: results[i].func,
     equippable: results[i].equipable,
     qty: 1000,
     equipped: false,
     identified: true,
     abilities: '',
     max_enchants: results[i].max_enchants,
     times_enchanted: 0,
     in_storage: 0,
     drop_rate: results[i].drop_rate
    };
    items.push(item);
   }
   callback(items);
  }).catch((err) => {
   console.log(err);
  });
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

module.exports = () => {
  return new ShopService();
}

