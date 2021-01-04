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
        io.emit('tpl-creation-result', json);
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
        io.emit('tpl-awaken-result', json);
      });
    });
    
    socket.on('tpl-region', (id) => {
      fs.readFile("views/partials/regions/"+id+".html", "UTF8", (err, html) => {
        if (err) { throw err };
        
        let json = {
          data: {},
          html: html
        };
        io.emit('tpl-region-result', json);
      });
    });
    
    socket.on('tpl-statbar', (id) => {
      fs.readFile("views/partials/statbar.html", "UTF8", (err, data) => {
        if(err) { throw err };
        
        let json = {
          data: {},
          html: data
        };
        io.emit('tpl-statbar-result', json);
      });
    });
    
    socket.on('tpl-character', (id) => {
      fs.readFile("views/partials/character.html", "UTF8", (err, data) => {
        if(err) throw err;
        
        let json = {
          data: {},
          html: data
        };
        io.emit('tpl-character-result', json);
      });
    });
    
    socket.on('tpl-shop', (data) => {
      fs.readFile("views/partials/shop.html", "UTF8", (err, html) => {
        if (err) { throw err };
        
        var query = 'SELECT * FROM items WHERE i_shop = "'+data.type+'" AND i_region = "'+data.region+'"';
        db.query(query).then((results) => {
          var items = [];
          for(var i = 0; i < results.length; i++){
            var item = {
              id: results[i].i_id,
              name: results[i].i_name,
              region: results[i].i_region,
              shop: results[i].i_shop,
              guts: results[i].i_guts,
              wits: results[i].i_wits,
              charm: results[i].i_charm,
              attack: results[i].i_attack,
              defend: results[i].i_defend,
              skill: results[i].i_skill,
              cost: results[i].i_cost,
              func: results[i].i_func,
              equippable: results[i].i_equipable,
              qty: 1000,
              equipped: false,
              identified: true,
              abilities: '',
              max_enchants: results[i].i_max_enchants,
              times_enchanted: 0,
              in_storage: 0,
              drop_rate: results[i].i_drop_rate
            };
            items.push(item);
          }
          
          data.items = items;
          
          let json = {
            data: data,
            html: html
          };
          io.emit('tpl-shop-result', json);
        });
      });
    });
  }
}

module.exports = (game) => {
    return new Tpl(game);
}