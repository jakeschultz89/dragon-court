DC.Creation = {
 freePoints: 20,
 charClass: 'peasant',
 lastPointsUsed: 0,
 init: function(callback){
  Socket.emit('tpl-creation', null);
  Socket.on('tpl-creation-result', (data) => {
   var html = DC.Tpl.build(data);
   DC.Game.container.html(html);
   
   $(document).on('click', '.creationStatClick', function(e){
    e.preventDefault();
    
    var type = $(this).attr('data-type');
    var inc = $(this).attr('data-inc');
    
    DC.Creation.statClick(type, inc);
   });
   
   $(document).on('mouseup', '.creationClass', function(e){
    e.preventDefault();
    
    var type = $(this).val();
    
    if(DC.Creation.lastPointsUsed > 0){
     var addedBack = DC.Creation.freePoints + DC.Creation.lastPointsUsed;
     
     DC.Creation.pointChange(addedBack);
     DC.Creation.lastPointsUsed = 0;
    }
    
    var query,
     cost = 1,
     error,
     cause;
    
    $('.creationClass').prop('checked', false);
    if(!$('#' + type +'CreationClass').is(':checked')){
     $('#' + type +'CreationClass').prop('checked', true);
    }
    switch(type){
     case 'peasant':
      cost = 0;
      break;
     
     case 'noble':
      cost = 12;
      $("#nobleCreationClass").prop('checked', true);
      break;
     case 'warrior':
      cost = 8;
      $("#warriorCreationClass").prop('checked', true);
      break;
     case 'wizard':
      cost = 9;
      $("#wizardCreationClass").prop('checked', true);
      break;
      case 'trader':
       cost = 10;
       $("#traderCreationClass").prop('checked', true);
       break;
     }
     
     DC.Creation.lastPointsUsed = cost;
     query = (DC.Creation.freePoints - cost < 0);
     error = "You do not have enough free points!";
     cause = DC.Creation.freePoints - cost;
     
     if(query){
      DC.Tpl.buildModal("error", "<strong>"+error+"</strong>");
     }else{
      DC.Creation.charClass = type;
      DC.Creation.pointChange(cause);
     }
    });
    
    $(document).on('click', '#creationSubmit', function(e){
     e.preventDefault();
				
				if(parseInt($('#freePts').text()) > 0){
				 DC.Tpl.buildModal("error", "<strong>You still have free points to distribute.</strong>");
				 return;
				}
				
				var guts = parseInt($('#gutsStat').text());
				var wits = parseInt($('#witsStat').text());
				var charm = parseInt($('#charmStat').text());
				var cash = parseInt($('#cashStat').text());
				var bg = $('#background').text();
				
				var createObj = {
				 guts: guts,
				 wits: wits,
				 charm: charm,
				 cash: cash,
				 charClass: DC.Creation.charClass,
				 bg: bg
				};
				
				Socket.emit('player-create', createObj);
			});
		});
		callback();
	},
	statClick: function(type, inc){
	 var statPts = parseInt($('#'+type+'Stat').text());
	 var cost = 1,
	  error,
	  cause,
	  effect,
	  add;
	 
	 if(type == "guts" || type == "wits" || type == "charm"){
	  cost = 3;
	 }
	 
	 if(inc == "plus"){
	  query = (DC.Creation.freePoints - cost < 0);
	  error = "You do not have enough free points!";
	  cause = DC.Creation.freePoints - cost;
	  if(type == "cash"){
	   add = 25;
	  }else{
	   add = 1;
	  }
	  effect = statPts + add;
	 }else{
	  if(type == "cash"){
	   add = 25;
	  }else{
	   add = 1;
	  }
	  query = (statPts - add < 0);
	  error = "You cannot reduce a stat below 0!";
	  cause = DC.Creation.freePoints + cost;
	  effect = statPts - add;
	 }
	 
	 if(query){
	  DC.Tpl.buildModal("error", "<strong>"+error+"</strong>", {});
	 }else{
	  $('#'+type+'Stat').text(effect);
	  DC.Creation.pointChange(cause);
	 }
	},
	pointChange: function(amt){
	 DC.Creation.freePoints = amt;
	 $('#freePts').text(DC.Creation.freePoints);
	}
};