var {mysql, database} = require('./mysql');

var Database = function(){};

Database.prototype.query = (sql) => {
 return new Promise((resolve, reject) => {
  database.query(sql, (error, results) => {
   if (error){
    return reject(error);
   }else{
    resolve(results);
   }
  });
 });
};

Database.prototype.close = () => {
 return new Promise((resolve, reject) => {
  database.end(err => {
   if(err)
    return reject(err);
   resolve();
  });
 });
};

module.exports = new Database();