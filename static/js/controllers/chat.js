DC.Chat = {
	container: {},
	channel: '',
	init: () => {
		DC.Chat.container = $('.chatHistory');
		DC.Chat.channel = DC.models.User.chat;
		
		DC.Chat.listeners.init();
		DC.Chat.events.init();
		
		DC.Chat.update();
	},
	update: () => {
		var elems = $('.chatEntry[data-type="'+DC.Chat.channel+'"]');
		$('.chatEntry').not(elems).hide();
		elems.show();
	},
	listeners: {
		init: () => {
			Socket.on("chat-broadcast", (data) => {
				var html = DC.Tpl.build(data);
				DC.Chat.container.prepend(html);
			});
	  
			Socket.on("chat-pop", (data) => {
				console.log(data);
			});
		}
	},
	events: {
		init: () => {
			$(document).on('click', '.chatSelect', function(e){
				e.preventDefault();
				
				var type = $(this).data('type');
				if(type == 'region'){
					DC.Chat.channel = DC.Player.region;
				}else{
					DC.Chat.channel = type;
				}
				
				DC.Chat.update();
			});
			
			$(document).on('click', '.chatSubmit', function(e){
				e.preventDefault();
    
				var text = $('input[name=chatInput]').val();
				console.log(text);
     
				if(text !== ''){
					Socket.emit('chat-message', {channel: DC.Chat.channel, message: text});
					$('input[name=chatInput]').val('');
				}
			});
   
			
		}
	}
};