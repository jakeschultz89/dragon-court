global.ChatService = require("../services/chat")(db);

module.exports = {init};

function init(socket){
 socket.on('chat-message', (data) => {
  ChatService.insert(data, function(result){
   socket.broadcast.emit('chat-broadcast', result);
  });
 });
}