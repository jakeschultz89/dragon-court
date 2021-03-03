class Game {
 container = {};
 region = {};
 
 constructor(){
  this.container = $('.gameDiv');
  this.attach();
  this.start();
 }
 
 attach(){
  var t = this;
  $(document).on('click', '#statsStart', function(e){
   e.preventDefault();
   t.play();
  });
 }
 
 start(){
  if(!DC.User.hasChar){
	  new Creation();
	 }else{
	  new Ajax('api/player/get/', 'id='+DC.User.id, (result) => {
	   var d = result.data;
	   DC.Player = new Player({owner: d.owner, rankString: d.rankString, nameAndRank: d.nameRankString, region: d.region, charclass: d.charClass, background: d.background, guild: d.guild, effects: d.effects, stats: { guts: d.stats.guts, gutsMax: d.stats.gutsMax, wits: d.stats.wits, witsMax: d.stats.witsMax, charm: d.stats.charm, charmMax: d.stats.charmMax, attack: d.stats.attack, defend: d.stats.defend, skill: d.stats.skill }, skills: { fighter: { skill: d.skills.fighter.skill, max: d.skills.fighter.max }, magic: { skill: d.skills.magic.skill, max: d.skills.magic.max }, trade: { skill: d.skills.trade.skill, max: d.skills.trade.max } }, level: d.level, experience: d.experience, quests: d.quests, questsMax: d.questsMax, cash: d.cash, rank: d.rank, storage: d.storage, storageMax: d.storageMax, fame: d.fame, favor: d.favor, skilled: d.skilled });
	   DC.Inventory = new Inventory();
	   this.awakenScreen();
	  });
	 }
 }
 
 awakenScreen(){
  new Ajax('api/player/awaken/', '', (result) => {
	  DC.Tpl.display(result.data);
	 });
 }
 
 play(){
  new Region(DC.Player.region);
 }
}

