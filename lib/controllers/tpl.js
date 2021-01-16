var fs = require('fs');

class Tpl {
  constructor(game){
    this.game = game;
  }
	
  init(socket){
    socket.on('tpl-creation', (data) => {
      fs.readFile("views/partials/creation.html", "UTF8", (err, data) => {
        if (err) { throw err };
        
        let json = {
          data: {
	           freePts: 20,
	           backstory: this.game.generateBackstory()
	         },
	         html: data
	       };
        socket.emit('tpl-creation-result', json);
      });
    });
    
    socket.on('tpl-awaken', (text) => {
      fs.readFile("views/partials/gameStats.html", "UTF8", (err, data) => {
        if(err) { throw err };
        
        let json = {
          data: {
            name: User.name,
            awaken: text
          },
          html: data
        };
       
        socket.emit('tpl-awaken-result', json);
      });
    });
    
    socket.on('tpl-region', (id) => {
      fs.readFile("views/partials/regions/"+id+".html", "UTF8", (err, html) => {
        if (err) { throw err };
        
        let json = {
          data: {},
          html: html
        };
        socket.emit('tpl-region-result', json);
      });
    });
    
    socket.on('tpl-statbar', (id) => {
      fs.readFile("views/partials/statbar.html", "UTF8", (err, data) => {
        if(err) { throw err };
        
        let json = {
          data: {},
          html: data
        };
        socket.emit('tpl-statbar-result', json);
      });
    });
    
    socket.on('tpl-character', (id) => {
      fs.readFile("views/partials/character.html", "UTF8", (err, data) => {
        if(err) throw err;
        
        let json = {
          data: {},
          html: data
        };
        socket.emit('tpl-character-result', json);
      });
    });
    
    socket.on('tpl-shop', (data) => {
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
          socket.emit('tpl-shop-result', json);
        });
      });
    });
  }
}

module.exports = (game) => {
    return new Tpl(game);
}