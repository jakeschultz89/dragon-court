class Chat {
 container = {};
 channel = 'global';
 lastFetch = 0;
 expanded = false;
 
 constructor(){
  this.container = $('.chatDiv');
  this.attach();
  this.init();
 }
 
 attach(){
  var t = this;
  
  if(t.expanded){
   $('#chatPop').on('hidden.bs.modal', function(e){
    t.expanded = false;
   });
  }
  
  if(isMobile && !t.expanded){
   $(document).on('click', '.chatDiv', function(e){
    new Ajax('api/chat/pop', '', (result) => {
     t.expanded = true;
     DC.Tpl.modal('chatPop', 'DC Chat', result.html);
    });
   });
  }
  
  $(document).on('click', '.chatSelect', function(e){
   var id = $(this).data('type');
   t.channel = id;
   
   new Ajax('api/chat/change', 'id='+id, (result) => {
    DC.User.chat = id;
    var elems = $('.chatEntry[data-type="'+t.channel+'"]');
    $('.chatEntry').not(elems).hide();
    elems.show();
   });
  });
  
  $(document).on('click', '.chatSubmit', function(e){
   e.preventDefault();
   
   var message;
   if(t.expanded){
    message = $('input[name=chatPopInput]').val();
    $('input[name=chatPopInput]').val('');
   }else{
    message = $('input[name=chatInput]').val();
    $('input[name=chatInput]').val('');
   }
   
   if(message == ''){
    return;
   }
   
   new Ajax('api/chat/submit', 'message='+message, (result) => {
    var html = DC.Tpl.build(result.data);
    t.container.prepend(html);
   });
  });
 }
 
 poll(){
  new Ajax('api/chat/poll', 'time='+this.lastFetch, (result) => {
   this.lastFetch = Math.floor(Date.now()/1000);
   console.log(JSON.stringify(result));
  });
 }
 
 init(){
  new Ajax('api/chat/init', 'channel='+this.channel, (result) => {
   var htmlStr = '',
    template = DC.Tpl.getTpl(result.data);
   
   for(var i = 0; i < result.data.data.length; i++){
    var m = result.data.data[i];
    htmlStr += template(m);
   }
   
   $('.chatHistory').html(htmlStr);
  });
 }
}

