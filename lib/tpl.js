var fs = require('fs'),
 GameStrings = require('./game-strings');

class Tpl {
 constructor(){
  this.creationStrings = GameStrings.creation();
  this.awakenStrings = GameStrings.awaken();
  this.shopStrings = GameStrings.shops();
  this.encounterStrings = GameStrings.encounter();
 }
 
 render(file, callback){
  fs.readFile("views/partials/"+file+".html", "UTF8", (err, html) => {
   if (err) { throw err };
   callback(html);
  })
 }
 
 format(str, args){
  return str.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n){
   if(m == "{{"){
    return "{";
   }
   if(m == "}}"){
    return "}";
   }
   return args[n];
  }); 
 }
 
 encounterBlurb(){
  var main = this.encounterStrings['main'][Math.floor(Math.random()*this.encounterStrings['main'].length)];
  var attack = this.encounterStrings['attack'][Math.floor(Math.random()*this.encounterStrings['attack'].length)];
  var flee = this.encounterStrings['flee'][Math.floor(Math.random()*this.encounterStrings['flee'].length)];
  
  return {main, attack, flee};
 }
 
 shopBlurb(shop){
  return this.shopStrings[shop][Math.floor(Math.random()*this.shopStrings[shop].length)];
 }
 
 awakenText(place, loc){
  var text,
   t = this;
  
  if(User.firstRun){
   text = t.awakenStrings.first;
  }else{
   switch(User.region){
    case 'town':
     switch(place){
      case 'tavern':
       text += t.awakenStrings.place.tavern;
       switch(loc){
        default:
        case 'floor':
         text += t.awakenStrings.location.floor;
         break;
        case 'room':
         text += t.awakenStrings.location.room;
         break;
        case 'suite':
         text += t.awakenStrings.location.suite;
         break;
       }
       break;
      case 'outside':
       
       break;
     }
     break;
    
    case 'fields':
     
     break;
   }
   
   var getStipend = false;
   if(Player.rankString != 'Peasant'){
    getStipend = true;
   }
   
   if(getStipend){
    var base = 2048;
    var gain = Math.floor((base * Player.rank) * (Player.level / 2));
    Player.cashToday = Player.cashToday + gain;
    Player.cash = Player.cash + gain;
    console.log(t.awakenStrings);
    text += "<br /><br />"+t.format(t.awakenStrings.stipend, gain);
   }
  }
  
  return text;
 }
 
 generateBackstory(){
  
  let r = this.creationStrings.race[Math.floor(Math.random()*this.creationStrings.race.length)],
   a = this.creationStrings.adj[Math.floor(Math.random()*this.creationStrings.adj.length)],
   l = this.creationStrings.loc[Math.floor(Math.random()*this.creationStrings.loc.length)],
   d = this.creationStrings.desc[Math.floor(Math.random()*this.creationStrings.desc.length)];
  let story = ["You are a " + a + " " + r + " from " + l + ", who " + d +"."];
  return story;
 }
}

module.exports = new Tpl();