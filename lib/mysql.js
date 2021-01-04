const mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var pool  = mysql.createPool({
    connectionLimit : 10,
    timeout         : 60 * 60 * 1000,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_DB
});

var database = new MySQLStore({
	expiration: 10800000,
	createDatabaseTable: true,
    schema: {
		tableName: 'user_sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
}, pool);

 module.exports = {mysql, database};