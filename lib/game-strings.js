class GameStrings {
 constructor(){
  this.strings = require('./strings');
 }
 
 creation(){
  return this.strings[0];
 }
 
 awaken(){
  return this.strings[1];
 }
 
 shops(){
  return this.strings[2];
 }
 
 encounter(){
  return this.strings[3];
 }
}


module.exports = new GameStrings();