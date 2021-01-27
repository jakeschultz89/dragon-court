class Chat {
	constructor(db){
		this.DB = db;
	}
	
  bulk(channel, callback){
   console.log(channel);
    var now = Math.floor(new Date() / 1000);
    var then = now - 3600;
    var query = 'SELECT c.*, u.name FROM chat c LEFT JOIN users u ON sender = u.id WHERE channel = '+channel+' AND time BETWEEN '+then+' AND '+now;
    this.DB.query(query).then((results) => {
     var msgs = [];
     for(var i = 0; i < results.length; i++){
      var msg = {
       id: results[0].id,
       sender: results[0].sender,
       senderName: results[0].name,
       time: results[0].time,
       channel: results[0].channel,
       message: results[0].message,
      };
      msgs.push(msg);
     }
     callback(msgs);
    }).catch((err) => {
      console.log(err);
    });
  }
  
  insert(data, callback){
		var date = new Date();
    var now = Math.floor(date / 1000);
    var query = 'INSERT INTO chat (sender, time, channel, message) VALUES ('+User.id+', '+now+', "'+data.channel+'", "'+data.message+'")';
    this.DB.query(query).then((results) => {
      var d = {
				date: date,
				channel: data.channel,
				author: '<a href="#" data-socket="'+socketId+'">'+User.name+'</a>',
				message: data.message
      };
      callback(d);
    }).catch((err) => {
      console.log(err);
    });
  }
}

module.exports = (db) => {
    return new Chat(db);
}