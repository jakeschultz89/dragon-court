const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class User{
  constructor(db){
    this.DB = db;
  }
  
  generateToken(email){
   return jwt.sign(email, process.env.SECRET, { expiresIn: '3600s' });
  }
  
  create(data, callback){
    var error,
     token = this.generateToken(data.email);
    
    var query = 'SELECT id FROM users WHERE email = "'+data.email+'"';
    this.DB.query(query).then((result) => {
      if(Array.isArray(result) && result.length){
        error = 'Already Registered.';
      }else{
        var query = 'INSERT INTO users SET email = "'+data.email+'", name = "'+data.name+'", pass = "'+data.hash+'", token = "'+token+'"';
        this.DB.query(query).then((results) => {
          if(results.insertId){
            data.uid = results.insertId;
            callback(data);
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  
  login(data, callback){
   var query = 'SELECT * FROM users WHERE name = "'+data.name+'"';
   db.query(query).then((results) => {
    if(results.length){
     bcrypt.compare(data.password, results[0].pass, function(err, result){
      if(err){
       callback({
        status: "error",
        error: err
       });
      }else{
       if(result){
        var u = {
         id: results[0].id,
         name: results[0].name,
         email: results[0].email,
         hasChar: results[0].has_char,
         firstRun: results[0].first_run,
         chat: 0,
        };
        callback({
         status: "ok",
         data: u
        });
       }else{
        callback({
         status: "error",
         error: "Incorrect username/password"
        });
       }
      }
     });
    }
   }).catch((err) => {
    console.log(err);
   });
  }
  
  get(id, callback){
    var query = 'SELECT * FROM users WHERE id = '.id;
    this.DB.query(query).then((results) => {
     var token;
     if(results[0].token == ''){
      token = this.generateToken(results[0].email);
      
      var query = 'UPDATE users SET token = "'+token+'" WHERE id = '+id;
      this.DB.query(query).then((results) => {
        var data = {
         id: results[0].id,
         email: results[0].email,
         token: token
       };
      
       callback(data);
      }).catch((err) => {
        console.log(err);
      });
     }else{
      token = results[0].token;
      var data = {
        id: results[0].id,
        email: results[0].email,
        token: token
      };
      
      callback(data);
     }
    }).catch((err) => {
      console.log(err);
    });
  }
  
  update(data, callback){
    bcrypt.hash(data.password, 10, function(err, hash) {
      var query = 'UPDATE users SET email = "'+data.email+'", pass = "'+hash+'" WHERE id = '+data.id;
      this.DB.query(query).then((results) => {
        callback(results);
      }).catch((err) => {
        console.log(err);
      });
    });
  }
}

module.exports = (db) => {
  return new User(db);
}