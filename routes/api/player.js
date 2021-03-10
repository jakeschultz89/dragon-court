const router = express.Router();
var Tpl = require('../../lib/tpl');

const PlayerService = require('../../lib/services/player')();

router.use(global.tokenAuth);

router.post("/get", (req, res) => {
 var id = req.body.id;
 PlayerService.get(id, function(result){
  var r = {
   error: false,
   data: result
  };
 
  res.json(r);
 });
});

router.post("/creation", (req, res) => {
 Tpl.render('creation', (html) => {
   let json = {
    data: {
     freePts: 20,
     backstory: Tpl.generateBackstory()
    },
    html: html
   };
  
   var r = {
    error: false,
    data: json
   };
 
   res.json(r);
	});
});

router.post("/create", (req, res) => {
 PlayerService.create(req.body, function(owner){
  PlayerService.get(owner, function(result){
   var r = {
    error: false,
    data: result
   };
   
   res.json(r);
  });
 });
});

router.post("/awaken", (req, res) => {
 Tpl.render('gameStats', (html) => {
  var text = Tpl.awakenText('tavern', 'room');
  let json = {
   data: {
    name: User.name,
    awaken: text
   },
   html: html
  };
  
  var r = {
   error: false,
   data: json
  };
  
  res.json(r);
 });
});

router.post("/statbar", (req, res) => {
 Tpl.render('statbar', (html) => {
  let json = {
   data: {},
   html: html
  };
  
  var r = {
   error: false,
   data: json
  };
  
  res.json(r);
 });
});

router.post("/character", (req, res) => {
 Tpl.render('character', (html) => {
  let json = {
   data: {},
   html: data
  };
  
  var r = {
   error: false,
   data: json
  };
  
  res.json(r);
 });
});

module.exports = router;