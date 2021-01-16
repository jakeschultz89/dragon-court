require('dotenv').config();
const db = require('./lib/db');
var express = require('express');

global.db = db;
global.express = express;

var url;
var globalVars = {
	port: process.env.PORT
};

if(process.env.PRODUCTION){
	url = "http://"+process.env.HOST;
	globalVars.host = process.env.HOST;
}else{
	url = "http://"+process.env.IP+":"+process.env.PORT;
	globalVars.host = process.env.IP;
}

let hb  = require('express-handlebars');
let bodyParser = require('body-parser');

process.on('uncaughtException', (err) => {
	console.log("Uncaught Exception:", err);
	process.exit(1);
});

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/static/'));

handlebars = hb.create({
	extname: '.html',
	defaultLayout: 'game',
	layoutsDir: __dirname+'/views/layouts/',
	partialsDir: __dirname+'/views/partials/',
	helpers: {
		section: (name, options) => {
			if(!this._sections){
				this._sections = {};
			}
			this._sections[name] = options.fn(this);
			return null;
		},
		globalVar: (k) => {
			return globalVars[k];
		},
		iff: (a, operator, b, options) => {
			var bool = false;
			switch (operator) {
				case '==':
					bool = a == b;
				break;
				case '>':
					bool = a > b;
				break;
				case '<':
					bool = a < b;
				break;
				default:
					throw "Unknown operator " + operator;
			}
			
			if (bool) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		}
	}
});
app.engine('html', handlebars.engine); app.set('view engine', 'html');

var game = require('./lib/game');
var UserController = require('./lib/controllers/user');
var PlayerController = require('./lib/controllers/player')(game);
var ShopController = require('./lib/controllers/shop');
var EncounterController = require('./lib/controllers/encounter');

const routes = require("./routes")(io);
app.use(routes);

io.use(function(socket, next){
 if(socket.handshake.query && socket.handshake.query.token){
  jwt.verify(socket.handshake.query.token, process.env.SECRET, function(err, decoded){
   if (err) return
   next(new Error('Authentication error'));
   socket.decoded = decoded;
   next();
  });
 }else{
  next(new Error('Authentication error'));
 }
}).on('connection', function(socket){
	UserController.init(socket);
	PlayerController.init(socket);
	ShopController.init(socket);
	EncounterController.init(socket);
});

server.listen(process.env.PORT, function () {
	console.log('DC app listening on port '+process.env.PORT+'! Go to '+url)
});