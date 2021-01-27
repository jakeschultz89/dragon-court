EncounterService = require("../services/encounter")(db);
EncounterStrings = require("../encounterStrings");
game = require("../game");
var fs = require('fs');

module.exports = {init};
var Creature;
function init(socket){
	socket.on('encounter-attack', () => {
		
	});
	socket.on('encounter-flee', () => {
		
	});
	socket.on('encounter-option', (type) => {
		
	});
 socket.on('encounter-init', (location) => {
  EncounterService.getCreature(location, (creature) => {
		Creature = creature;
   var str = EncounterStrings.main[Math.floor(Math.random()*EncounterStrings.main.length)];
   
   var blurb = game.formatString(str, [creature.region, creature.name]);
   
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
   
   fs.readFile("views/partials/encounter.html", "UTF8", (err, html) => {
    if (err) { throw err };
    
    var creatureNameLower = creature.name.toLowerCase();
    var creatureNameNormalized = creatureNameLower.replace(' ', '_');
   
    var data = {
     data: {
      blurb: blurb,
      image: "/images/game/monsters/"+creatureNameNormalized+".jpg",
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