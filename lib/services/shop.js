class Shop{
 constructor(db){
  this.DB = db;
 }
 
 buy(data, callback){
  var uid = data.id,
   item = data.itm;
  
  console.log(item);
 }
 
 sell(data, callback){
  var uid = data.id,
   item = data.itm;
  
  console.log(item);
 }
 
 polish(data, callback){
  var uid = data.id,
   item = data.itm;
  
  console.log(item);
 }
 
 identify(data, callback){
  var uid = data.id,
   item = data.itm;
  
  console.log(item);
 }
}

module.exports = (db) => {
  return new Shop(db);
}

