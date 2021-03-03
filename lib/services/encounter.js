class EncounterService{
  constructor(){}
  
  get(location, callback){
    var query = 'SELECT * FROM creatures WHERE region = "'+location+'" ORDER BY RAND() LIMIT 1';
    db.query(query).then((results) => {
     var data = {
      id: results[0].id,
      name: results[0].name,
      guts: results[0].guts,
      wits: results[0].wits,
      exp: results[0].exp,
      fame: results[0].fame,
      abilities: results[0].abilities,
      options: results[0].options,
      region: results[0].region,
      items: results[0].items,
      level: results[0].lvl,
     };
      callback(data);
    }).catch((err) => {
      console.log(err);
    });
  }
}

module.exports = () => {
  return new EncounterService();
}