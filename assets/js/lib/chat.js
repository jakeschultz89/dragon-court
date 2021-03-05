class Chat {
 container = {};
 
 constructor(){
  this.container = $('.chatDiv');
  this.attach();
  this.init();
 }
 
 attach(){
  $(document).on('click', '#chatSubmit', function(e){
   e.preventDefault();
   
   var message = $('input[name=chatInput]').val();
   if(message == ''){
		return;
   }
   
   new Ajax('api/chat/submit', 'message='+message, (result) => {
		console.log(JSON.stringify(result));
   });
  });
 }
 
 init(){
	var ms = Date.now()
  new Ajax('api/chat/poll', 'time='+Math.floor(Date.now()/1000), (result) => {
		console.log(JSON.stringify(result));
  });
 }
}

