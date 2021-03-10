require('dotenv').config();

var express = require('express'),
 app = express();
const db = require('./lib/db'),
 http = require('http').Server(app),
 Handlebars = require("handlebars"),
 hb  = require('express-handlebars'),
 fs = require('fs'),
 bodyParser = require('body-parser'),
 jwt = require("jsonwebtoken");

global.express = express;
global.db = db;
global.HB = Handlebars;
global.tokenAuth = function(req, res, next){
 var token = req.body.token;
 if(!token){
  return res.status(401).send({ status: "error", error: 'No token provided.' });
 }
 
 jwt.verify(token, process.env.SECRET, function(err, decoded){
  if(err){
   return res.status(500).send({ status: 'error', error: 'Failed to authenticate token.' });
  }
  next();
 });
};

process.on('uncaughtException', (err) => {
	console.log("Uncaught Exception:", err);
	process.exit(1);
});

app.use(bodyParser.urlencoded({
 extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/assets/'));

handlebars = hb.create({
	extname: '.html',
	defaultLayout: 'game',
	layoutsDir: __dirname+'/views/layouts/',
	partialsDir: __dirname+'/views/partials/',
});
app.engine('html', handlebars.engine);
app.set('view engine', 'html');

var userRoutes = require('./routes/user');
app.use('/user', userRoutes);

var playerApi = require('./routes/api/player');
app.use('/api/player', playerApi);
  
var shopApi = require('./routes/api/shop');
app.use('/api/shop', shopApi);
  
var invApi = require('./routes/api/inventory');
app.use('/api/inventory', invApi);
  
var encounterApi = require('./routes/api/encounter');
app.use('/api/encounter', encounterApi);

var chatApi = require('./routes/api/chat');
app.use('/api/chat', chatApi);

var apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

var siteRoutes = require('./routes/base');
app.use('/', siteRoutes);

http.listen(process.env.PORT, () => {
	console.log('listening on '+process.env.HOST+':'+process.env.PORT);
});



