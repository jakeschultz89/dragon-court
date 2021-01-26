global.ChatService = require("../services/chat")(db);

module.exports = {init};

function init(socket){
 var socketId = socket.id;
 socket.join('global');
 if(Player.guild !== 0){
  socket.join('guild-'+Player.guild);
 }
 socket.join(Player.region);
 
 socket.on('chat-message', (data) => {
  ChatService.insert(data, function(result){
   socket.broadcast.emit('chat-broadcast', result);
  });
 });
 
 socket.on('chat-open', () => {
  ChatService.build(function(data){
   
  });
 });
}

function join(room){
 
}



