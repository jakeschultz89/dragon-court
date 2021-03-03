const router = express.Router();
var jwt = require('jsonwebtoken');

const UserService = require('../lib/services/user')();
const PlayerService = require('../lib/services/player')();

var Router = function(){
 router.get('/game/', (req, res) => {
  var token = req.query.t;
  
  if(token == null || token == "undefined"){
   return res.redirect('user/login/');
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
   if(err){
    console.log(err);
    res.redirect('/user/login');
   }
   
   UserService.get(decoded.data, (u) => {
    console.log(u);
    if(u.id == 'undefined'){
     res.redirect('/user/login');
    }
    global.User = u;
    PlayerService.get(u.id, (p) => {
     if(p.owner == 'undefined'){
      global.Player = {
       owner: 0,
       region: '',
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
        skill: 0
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
       level: 0,
       experience: 0,
       quests: 0,
       questsMax: 0,
       storage: 0,
       storageMax: 0,
       cash: 0,
       rank: 0,
       fame: 0,
       favor: 0,
       skilled: 0
      };
      global.Player.rankString = '';
      global.Player.nameRankString = '';
     }else{
      global.Player = p;
     }
     
     res.render('game-main', {
      layout: 'game',
      pageTitle: 'Play',
      User: User,
      Player: Player,
      token: token
     });
    });
   });
  });
 });
 
 router.get("/", (req, res) => {
  res.render('site-home', {
   layout: 'site',
   pageTitle: 'Home'
  });
 });
 
 return router;
};

module.exports = Router();



