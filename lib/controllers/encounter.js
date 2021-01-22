EncounterService = require("../services/encounter")(db);
EncounterStrings = require("../encounterStrings");
game = require("../game");
var fs = require('fs');

module.exports = {init};

function init(socket){
 socket.on('encounter-init', (location) => {
  EncounterService.getCreature(location, (creature) => {
   console.log(creature);
   var str = EncounterStrings.main[Math.floor(Math.random()*EncounterStrings.main.length)];
   
   var blurb = game.formatString(str, [creature.region, creature.name]);
   
   var options = '';
   if(creature.options !== ''){
    if(creature.options.includes('Trade')){
     options += '<input type="button" id="encounterTrade" value="Trade"><br>';
    }
    
    if(creature.options.includes('Pay')){
     options += '<input type="button" id="encounterPay" value="Pay"><br>';
    }
    
    if(creature.options.includes('Help')){
     options += '<input type="button" id="encounterHelp" value="Help"><br>';
    }
    
    if(creature.options.includes('Feed')){
     options += '<input type="button" id="encounterFeed" value="Feed"><br>';
    }
    
    if(creature.options.includes('Answer')){
     options += '<input type="button" id="encounterAnswer" value="Answee"><br>';
    }
    
    if(creature.options.includes('Seduce')){
     options += '<input type="button" id="encounterSeduce" value="Seduce"><br>';
    }
   }
   
   fs.readFile("views/partials/encounter.html", "UTF8", (err, html) => {
    if (err) { throw err };
   
    var data = {
     data: {
      blurb: blurb,
      attackStr: EncounterStrings.attack[Math.floor(Math.random()*EncounterStrings.attack.length)],
      fleeStr: EncounterStrings.flee[Math.floor(Math.random()*EncounterStrings.flee.length)],
      creature: creature,
      hasOpts: (options !== '') ? true : false,
      options: options
     },
     html: html
    };
    socket.emit('encounter-init-result', data);
   });
  });
 });
}