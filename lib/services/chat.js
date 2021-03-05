class ChatService{
 constructor(){}
  
 submit(text){
	console.log(User);
  
  db.query(q).then((results) => {
   callback(obj.owner);
  }).catch((err) => {
   console.log(err);
  });
 }
 
 get(){
  var query = 'SELECT * FROM players WHERE owner = '+id;
  db.query(query).then((results) => {
   
   callback(p);
  }).catch((err) => {
   console.log(err);
  });
 }
}

module.exports = () => {
  return new ChatService();
}

