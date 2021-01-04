DC.Tpl = {
 init: () => {
  let e = document.createElement('style');
  e.innerHTML = '@font-face { font-family: "Lombardic"; src: url("/fonts/Lombardic.ttf") format("truetype"); }'+
  '@font-face { font-family: "Jarrow"; src: url("/fonts/Jarrow.ttf") format("truetype"); }';
  document.body.appendChild(e);
  
  Socket.on('tpl-region-result', (data) => {
   var html = DC.Tpl.build(data);
   DC.Game.container.html(html);
  });
 },
 build: (data) => {
  var template = Handlebars.compile(data.html);
  return template(data.data);
 },
 buildModal: (id, html) => {
  var $el = $('<div id="'+id+'" class="modal">'+html+'</div>');
  
  var modalhtml = '<div id="'+id+'" class="modal-body">'+
      '<p>'+html+'</p>'+
     '</div>';
  
  $('body').append(modalhtml);
  $('#'+id).modal();
 },
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