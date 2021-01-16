class Encounter {
  constructor(db){
    this.DB = db;
  }
  
  getCreature(location, callback){
    var query = 'SELECT RAND(*) FROM creatures WHERE region = "'+location+'"';
    
    this.DB.query(query).then((results) => {
      callback(results);
    }).catch((err) => {
      console.log(err);
    });
  }
}

module.exports = (db) => {
  return new Encounter(db);
}