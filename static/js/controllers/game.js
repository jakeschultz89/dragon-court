DC.Game = {
 container: {},
 events: {
  init: () => {
   $(document).on('click', '#statsStart', function(e){
    e.preventDefault();
    DC.Game.play();
   });
  }
 },
 listeners: {
  init: () => {
   Socket.on('player-awaken-result', (data) => {
    DC.Game.container.html(DC.Tpl.build(data));
   });
  }
 },
 init: ()=> {
  console.log('Game init');
  DC.Game.events.init();
  DC.Game.listeners.init();

  DC.Player.init();
  DC.Inventory.init();
  DC.Region.listeners.init();
  DC.Region.events.init();
  DC.Shop.listeners.init();
  //DC.Chat.init();
  
  DC.Game.container = $('#gameDiv');
  gameStart(() => {
		  setVisible('#gameDiv', true);
		  setVisible('#loading', false);
		  DC.Game.start();
		 });
	},
	start: () => {
	 if(!DC.models.User.hasChar){
	  DC.Creation.init();
	 }else{
	  DC.Game.statScreen();
	 }
	},
	statScreen: () => {
	 setTimeout(function(){
	  var awakenText;
	  
	  if(DC.models.Player.quests){
	   if(DC.models.User.firstRun){
	    awakenText = "You arrive in Town one sunny morning, ready to begin your adventure.";
	   }else{
	    awakenText = DC.Region.data.awakenText();
	    var getStipend = false;
	    
	    if(DC.models.Player.rankString != 'Peasant'){
	     getStipend = true;
	    }
	    
	    if(getStipend){
	     var base = 2048;
	     var gain = Math.floor((base * DC.models.Player.rank) * (DC.models.Player.level / 2));
	     DC.models.Player.cashToday = DC.models.Player.cashToday + gain;
	     DC.models.Player.cash = DC.models.Player.cash + gain;
	     
	     awakenText += "<br /><br />You receive "+gain+" marks as stipend from your family's lands.";
	    }
	    
	    var percentage = 80;
	    if(DC.Player.hasEffect("Bless")){
	     percentage = 10;
	    }
	    
	    if(!DC.Player.hasEffect("Bless")){
	     if(DC.Inventory.hasItemByName("Camp Tent")){
	      percentage -= 20;
	     }
	     
	     if(DC.Inventory.hasItemByName("Sleeping Bag")){
	      percentage -= 10;
	     }
	     
	     if(DC.Inventory.hasItemByName("Cooking Gear")){
	      percentage -= 10;
	     }
	    }
	    //apply rust effects
	   }
	   
	   Socket.emit('player-awaken', awakenText);
	  }else{
	   // display game over / exit
	  }
	 }, 1500);
	},
	play: () => {
	console.log("play"); DC.Region.init(DC.models.Player.region);
	 DC.Player.buildStats();
	}
};