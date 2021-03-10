const router = express.Router();
var Tpl = require('../../lib/tpl');

const EncounterService = require('../../lib/services/encounter')();

router.use(global.tokenAuth);

router.post('/init', (req, res) => {
 EncounterService.get(Player.region, (creature) => {
  var {main, attack, flee} = Tpl.encounterBlurb();
  var mainStr = Tpl.format(main, [creature.region, creature.name]);
  
  var options = '';
  if(creature.options !== ''){
   if(creature.options.includes('Trade')){
    options += '<input type="button" class="encounterOption" data-option="trade" value="Trade"><br>';
   }
   if(creature.options.includes('Pay')){
    options += '<input type="button" class="encounterOption" data-option="pay" value="Pay"><br>';
   }
   if(creature.options.includes('Help')){
    options += '<input type="button" class="encounterOption" data-option="help" value="Help"><br>';
   }
   if(creature.options.includes('Feed')){
    options += '<input type="button" class="encounterOption" data-option="feed" value="Feed"><br>';
   }
   if(creature.options.includes('Answer')){
    options += '<input type="button" class="encounterOption" data-option="answer" value="Answer"><br>';
   }
   if(creature.options.includes('Seduce')){
    options += '<input type="button" class="encounterOption" data-option="seduce" value="Seduce"><br>';
   }
  }
  
  Tpl.render('encounter', (html) => {
   var creatureNameLower = creature.name.toLowerCase();
   var creatureNameNormalized = creatureNameLower.replace(' ', '_');
   var data = {
    data: {
     blurb: mainStr,
     image: "/images/game/monsters/"+creatureNameNormalized+".jpg",
     attackStr: attack,
     fleeStr: flee,
     creature: creature,
     hasOpts: (options !== '') ? true : false,
     options: options
    },
    html: html
   };
   var r = {
    error: false,
    data: data
   };
   
   res.json(r);
  });
 });
});

module.exports = router;



