PlayerService = require('../services/player')(db);

class Player {
 constructor(game){
  this.game = game;
 }
 
 init(socket){
  socket.on('player-get', (id) => {
  PlayerService.get(id, function(result){
   socket.emit('player-seed', result);
  });
 });
 
 socket.on('player-creation', (data) => {
  fs.readFile("views/partials/creation.html", "UTF8", (err, data) => {
   if (err) { throw err };
   
   let json = {
    data: {
     freePts: 20,
     backstory: this.game.generateBackstory()
    },
    html: data
   };
   socket.emit('player-creation-result', json);
  });
 });
 
 socket.on('player-create', (data) => {
  PlayerService.create(data, function(owner){
   PlayerService.get(owner, function(result){
    socket.emit('player-seed', result);
   });
  });
 });
 
 socket.on('player-awaken', (text) => {
  fs.readFile("views/partials/gameStats.html", "UTF8", (err, data) => {
   if(err) { throw err };
   
   let json = {
    data: {
     name: User.name,
     awaken: text
    },
    html: data
   };
   
   socket.emit('player-awaken-result', json);
  });
 });
 
 socket.on('player-statbar', (id) => {
      fs.readFile("views/partials/statbar.html", "UTF8", (err, data) => {
        if(err) { throw err };
        
        let json = {
          data: {},
          html: data
        };
        socket.emit('player-statbar-result', json);
      });
    });
  socket.on('player-character', (id) => {
      fs.readFile("views/partials/character.html", "UTF8", (err, data) => {
        if(err) throw err;
        
        let json = {
          data: {},
          html: data
        };
        socket.emit('player-character-result', json);
      });
    });
    
  socket.on('region-init', (id) => {
      fs.readFile("views/partials/regions/"+id+".html", "UTF8", (err, html) => {
        if (err) { throw err };
        
        let json = {
          data: {},
          html: html
        };
        socket.emit('region-init-result', json);
      });
    });
 }
}

module.exports = (game) => {
    return new Player(game);
}