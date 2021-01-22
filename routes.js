const router = express.Router();
var PlayerService = require('./lib/services/player')(db);
var ChatService = require('./lib/services/chat')(db);

var Router = function(io){
 router.get("/", (req, res) => {
  res.render('site-home', {
   layout: 'site',
   pageTitle: 'Home',
  });
 });
 
 router.get('/login/', (req, res) => {
  res.render('user-login', {
   layout: 'site',
   pageTitle: 'Home',
  });
 });
 
 router.get('/register/', (req, res) => {
  res.render('user-register', {
   layout: 'site',
   pageTitle: 'Home',
  });
 });
 
 router.get('/game/', (req, res) => {
  if(typeof User == 'undefined'){
   res.redirect('/login/');
  }else{
   var data = {};
   data.pageTitle = 'Play';
   data.User = User;
   
   data.Player = {
    owner: 0,
    region: 'town',
    nameRankStr: '',
    charClass: '',
    background: '',
    guild: 0,
    effects: '',
    stats: {
     guts: 0,
     gutsMax: 0,
     wits: 0,
     witsMax: 0,
     charm: 0,
     charmMax: 0,
     attack: 0,
     defend: 0,
     skill: 0,
    },
    skills: {
     fighter: {
      skill: 0,
      max: 0
     },
     magic: {
      skill: 0,
      max: 0
     },
     trade: {
      skill: 0,
      max: 0
     }
    },
    level: 1,
    experience: 0,
    quests: 5,
    questsMax: 5,
    storage: 0,
    storageMax: 20,
    cash: 0,
    rank: 0,
    fame: 0,
    favor: 0,
    skilled: 0
   };
   
   data.Chat = {};
   
   ChatService.bulk(User.chat, (result) => {
    data.Chat = result;
    
    if(User.hasChar){
     console.log("game route", User);
     PlayerService.get(User.id, (p) => {
      console.log('game route PS.get res', p);
      var rankStr = PlayerService.getRankString(p.rank)
      data.Player = p;
      data.Player.rankString = rankStr;
      data.Player.nameRankString = rankStr+' '+User.name;
      
      res.render('game-main', data);
     });
    }else{
     res.render('game-main', data);
    }
   });
  }
 });
 
 return router;
};

module.exports = Router;