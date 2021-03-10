class ChatService {
	constructor(){
	 this.dateOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
	}
	
	init(channel, callback){
	 var now = Math.floor(new Date() / 1000);
	 var then = now - 3600;
	 
	 var query = 'SELECT c.*, u.name FROM chat c LEFT JOIN users u ON sender = u.id WHERE channel = "'+channel+'" AND time BETWEEN '+then+' AND '+now;
	 db.query(query).then((results) => {
	  var msgs = [];
	  
	  for(var i = 0; i < results.length; i++){
	   var dateStr = new Date(results[0].time).toLocaleDateString("en-US", this.dateOpts);
	   var d = {
	    dateString: dateStr,
	    channel: results[0].channel,
	    author: '<a href="#" data-uid="'+results[0].sender+'">'+results[0].name+'</a>',
	    message: results[0].message
	   };
	   msgs.push(d);
	  }
	  callback(msgs);
	 }).catch((err) => {
	  console.log(err);
	 });
	}
	
	insert(message, callback){
	 var date = new Date();
	 var dateStamp = Math.floor(date / 1000);
	 var query = 'INSERT INTO chat (sender, time, channel, message) VALUES ('+User.id+', '+dateStamp+', "'+User.chat+'", "'+message+'")';
	 db.query(query).then((results) => {
	  var d = {
	   dateString: date.toLocaleDateString("en-US", this.dateOpts),
	   channel: User.chat,
	   author: '<a href="#" data-uid="'+User.id+'">'+User.name+'</a>',
	   message: message
	  };
	  callback(d);
	 }).catch((err) => {
	  console.log(err);
	 });
	}
}

module.exports = () => {
    return new ChatService();
}