ShopService = require('../services/shop')(db);
PlayerService = require('../services/player');
var fs = require('fs');

module.exports = {init};

function init(socket){
 socket.on('shop-init', (data) => {
      fs.readFile("views/partials/shop.html", "UTF8", (err, html) => {
        if (err) { throw err };
        
        var query = 'SELECT * FROM items WHERE shop = "'+data.type+'" AND region = "'+data.region+'"';
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
          
          data.items = items;
          
          let json = {
            data: data,
            html: html
          };
          socket.emit('shop-init-result', json);
        });
      });
    });
 
 socket.on('shop-buy', (data) => {
  ShopService.buy(data, () => {
   PlayerService.get(id, function(result){
    socket.emit('player-seed', result);
   });
  });
 });
 
 socket.on('shop-sell', (data) => {
  ShopService.sell(data, () => {
   PlayerService.get(id, function(result){
    socket.emit('player-seed', result);
   });
  });
 });
 
 socket.on('shop-polish', (data) => {
  ShopService.polish(data, () => {
   PlayerService.get(id, function(result){
    socket.emit('player-seed', result);
   });
  });
 });
 
 socket.on('shop-identify', (data) => {
  ShopService.identify(data, () => {
   PlayerService.get(id, function(result){
    socket.emit('player-seed', result);
   });
  });
 });
}