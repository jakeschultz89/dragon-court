require('dotenv').config();
var express = require('express'),
 app = express();
const db = require('./lib/db'),
 http = require('http').Server(app),
 hb  = require('express-handlebars'),
 fs = require('fs'),
 bodyParser = require('body-parser');;

global.express = express;
global.db = db;

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

var api = require('./routes/api');
app.use('/api', api);

var siteRoutes = require('./routes/base');
app.use('/', siteRoutes);

http.listen(process.env.PORT, () => {
	console.log('listening on '+process.env.HOST+':'+process.env.PORT);
});



