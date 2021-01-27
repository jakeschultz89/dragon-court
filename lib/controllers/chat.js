ChatService = require("../services/chat")(db);
var fs = require('fs');

module.exports = {init};
var S;
function init(socket){
	S = socket;
	global.socketId = S.id;
 
	socket.on('chat-message', (data) => {
		console.log(data);
		ChatService.insert(data, function(result){
			console.log(result);
			fs.readFile("views/partials/chat.html", "UTF8", (err, html) => {
				if (err) { throw err };
				var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
				var dateStr = result.date.toLocaleDateString("en-US", options);
				result.dateString = dateStr;
				
				var d = {
					data: result,
					html: html
				};
				S.emit('chat-broadcast', d);
			});
		});
	});
 
	socket.on('chat-open', () => {
		ChatService.build(function(data){
   
		});
	});
}



