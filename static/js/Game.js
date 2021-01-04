DC.Game = {
 container: {},
 region: {},
 init: function(){
  DC.Game.container = $('#gameDiv');
  Socket.on('game-start-cmd', (data) => {
   console.log('game-start-cmd');
   DC.Game.statScreen();
  });
  
  Socket.on('tpl-awaken-result', (data) => {
   DC.Game.container.html(DC.Tpl.buildTemplate(data));
   $(document).on('click', '#statsStart', function(e){
    e.preventDefault();
    
    function callback(){
     DC.Game.play();
    }
    
    if(DC.models.User.firstRun){
     DC.models.User.firstRun = 0;
     Socket.emit('user-update', DC.models.User);
     callback();
	   }else{
	    callback();
	   }
	  });
	 });
	 
	 DC.Game.start();
	},
	start: function(){
	 if(DC.models.User.firstRun || !DC.models.User.hasChar){
	  DC.Creation.init(function(){
	   DC.Game.statScreen();
	  });
	 }else{
	  DC.Game.statScreen();
	 }
	},
	statScreen: () => {
	    Socket.emit('player-get', DC.models.User.id);
	    
	    setTimeout(function(){
	     var awakenText;
	     if(DC.models.Player.quests){
	      if(DC.models.User.firstRun){
	       awakenText = "You arrive in Town one sunny morning, ready to begin your adventure.";
	       DC.Game.region = new Town();
	      }else{
	       DC.Game.region = RegionFactory.get(DC.models.Player.region);
	       awakenText = DC.Game.region.awakenText();
	       var getStipend = false;
	       
	       if(DC.models.Player.charClass == 'Noble'){
	        getStipend = true;
	       }else if(DC.models.Player.rankString != 'Peasant'){
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
	       if(DC.controllers.Player.hasEffect("Bless")){
	        percentage = 10;
	       }
	       
	       if(!DC.controllers.Player.hasEffect("Bless")){
	        if(Inventory.hasItemByName("Camp Tent")){
	         percentage -= 20;
	        }
	        
	        if(Inventory.hasItemByName("Sleeping Bag")){
	         percentage -= 10;
	        }
	        
	        if(Inventory.hasItemByName("Cooking Gear")){
	         percentage -= 10;
	        }
	       }
	       //apply rust effects
	      }
	      
	      Socket.emit('tpl-awaken', awakenText);
	     }else{
	      // display game over / exit
	     }
	    }, 1500);
	   },
	   play: () => {
	    DC.Game.region.build();
	    DC.controllers.Player.buildStats();
	   },
	   regionChange: (id) => {
	    DC.models.Player.region = id;
	    DC.Game.region = RegionFactory.get(DC.models.Player.region);
	    DC.Game.region.build();
	    DC.controllers.Player.buildStats();
	   }
};