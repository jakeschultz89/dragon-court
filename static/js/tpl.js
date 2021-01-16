DC.Tpl = {
 init: () => {
  
 },
 build: (data) => {
  var template = Handlebars.compile(data.html);
  return template(data.data);
 },
 buildModal: (id, html) => {
  if(id == "error"){
   console.log(html);
  }
  var $el = $('<div id="'+id+'" class="modal">'+html+'</div>');
  
  var modalhtml = '<div id="'+id+'" class="modal-body">'+
      '<p>'+html+'</p>'+
     '</div>';
  
  $('body').append(modalhtml);
  $('#'+id).modal();
 },
 buildChat: () => {
  if(DC.models.Chat.length){
   for(var i = 0; i < DC.models.Chat.length; i++){
    var el = $('<li><div class="row"><div class="col-2">'+DC.models.Chat[i].time+'</div></div><div class="row"><div class="col-3">'+DC.models.Chat[i].senderName+'</div><div class="col-9">'+DC.models.Chat[i].message+'</div></div></li>');
    $('#chatDiv>#chatHistory>ul').append(el);
   }
  }else{
   var el = $('<li><div class="row"><div class="col-2">Nothing is heard except thesound of crickets...</div></div></li>');
   $('#chatDiv>#chatHistory>ul').append(el);
  }
 }
};

Handlebars.registerHelper('iff', (a, operator, b, opts) => {
 var bool = false;
 switch(operator) {
  case '==':
   bool = a == b;
   break;
  case '>':
   bool = a > b;
   break;
  case '<':
   bool = a < b;
   break;
  default:
   throw "Unknown operator " + operator;
 }
 
 if (bool) {
  return opts.fn(this);
 } else {
		return opts.inverse(this);
	}
});