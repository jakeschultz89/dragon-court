class Creature {
 observers = new Set();
 guts = 0;
 wits = 0;
 level = 0;
 exp = 0;
 fame = 0;
 abilities = '';
 options = '';
 region = '';
 items = '';
 
 constructor(data){
	this.guts = data.guts;
	this.wits = data.wits;
  this.region = data.region;
  this.abilities = data.abilities;
  this.options = data.options;
  this.level = data.level;
  this.exp = data.exp;
  this.fame = data.fame;
  this.items = data.items;
 }
 
 subscribe(observer){
  this.observers.add(observer);
 }
 
 notify(message){
  this.observers.forEach((observer) => {
   observer.update(message);
  });
 }
}

