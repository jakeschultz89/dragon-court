global.ChatService = require("../services/chat")(db);

module.exports = {init};

function init(socket){
 socket.on('chat-message', (data) => {
  ChatService.insert(data, function(results){
   socket.emit('chat-incoming', {message : data.message, username : UserService.name});
  });
 });
}