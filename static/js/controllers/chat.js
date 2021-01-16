DC.Chat = {
 container: {},
 channel: 0,
 init: () => {
  DC.Chat.container = $('#chatHistory ul');
  DC.Chat.channel = DC.models.User.chat;
  for(var i = 0; i < DC.models.Chat.length; i++){
   var chatDiv = $('<div class="chatDiv" data-type="'+DC.models.Chat[i].channel+'"><div class="row"><div class="col-12">'+DC.models.Chat[i].time+'</div></div><div class="row"><div class="col-4">'+DC.models.Chat[i].senderName+'</div><div class="col-8">'+DC.models.Chat[i].message+'</div></div></div>');
   DC.Chat.container.append(chatDiv);
  }
 },
 listeners: {
  init: () => {
   Socket.on("chat-broadcast", (data) => {
	   console.log(data);
	   var chatDiv = $('<div class="chatDiv" data-type="'+data.channel+'"><div class="row"><div class="col-12">'+data.time+'</div></div><div class="row"><div class="col-4">'+data.senderName+'</div><div class="col-8">'+data.message+'</div></div></div>');
   DC.Chat.container.append(chatDiv);
	  });
	 }
 },
 events: {
  init: () => {
   $(document).on('click', '#chatMessageSubmit', function(e){
    e.preventDefault();
    
    var text = $('#chatMessageText').val();
     
    if(text != ''){
     Socket.emit('chat-message', text);
    }
   });
  }
 }
};