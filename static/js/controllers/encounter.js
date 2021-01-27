DC.Encounter = {
	creature: {},
	init: (location) => {
		DC.Encounter.listeners.init();
		DC.Encounter.events.init();
  
		Socket.emit("encounter-init", location);
	},
	listeners: {
		init: () => {
			Socket.on("encounter-init-result", (data) => {
				var html = DC.Tpl.build(data);
				DC.Game.container.html(html);
				
				DC.Encounter.creature = new Creature(data.creature);
				DC.Encounter.creature.subscribe(new CreatureObserver);
			});
			
			Socket.on("encounter-action-result", (data) => {
				
			});
		}
	},
	events: {
		init: () => {
			$(document).on('click', '#encounterAttack', function(e){
				e.preventDefault();
				
				Socket.emit("encounter-attack");
			});
			
			$(document).on('click', '#encounterFlee', function(e){
				e.preventDefault();
				
				Socket.emit("encounter-flee");
			});
			
			$(document).on('click', '.encounterOption', function(e){
				e.preventDefault();
				
				var type = $(this).data('option');
				
				Socket.emit("encounter-option", type);
			});
		}
	}
};