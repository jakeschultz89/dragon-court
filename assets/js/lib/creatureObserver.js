class CreatureObserver {
  update(data){
   var creatureGuts = $('#encounterCreatureGuts'),
    creatureWits = $('#encounterCreatureWits');
    
   creatureGuts.html(data.guts);
   creatureWits.html(data.wits);
  }
}