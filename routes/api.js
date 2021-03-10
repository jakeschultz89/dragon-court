const router = express.Router();

var Tpl = require('../lib/tpl');

const RegionService = require('../lib/services/region')();
const PlayerService = require('../lib/services/player')();

router.use(global.tokenAuth);

router.post("/game/init", (req, res) => {
	res.json({status: 'ok'});
});

router.post('/region/init', (req, res) => {
 var location = req.body.id;
 RegionService.get(location, (result) => {
  Tpl.render('regions/'+location, (html) => {
   if(User.firstRun){
    User.firstRun = 0;
   }
   
   Player.region = location;
   PlayerService.update(Player, () => {
    let json = {
     data: result,
     html: html
    };
    
    var r = {
     error: false,
     data: json
    };
    
    res.json(r);
   });
  });
 });
});

router.post("/", (req, res) => {
 var r = {
  error: true,
  msg: "No route"
 };
 
 res.json(r);
});

module.exports = router;



