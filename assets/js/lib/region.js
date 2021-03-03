class Region {
 constructor(id){
  DC.Player.region = id;
  new Ajax('api/region/init/', 'id='+id, (result) => {
	  DC.Tpl.display(result.data);
	  this.attach();
	  DC.Player.buildStats();
	 });
 }
 
 attach(){
  $(document).on('click', '.shop', function(e){
   e.preventDefault();
    
   var type = $(this).data().id;
   new Shop(type);
  });
   
  $(document).on('click', '.region-change', function(e){
   e.preventDefault();
   
   var id = $(this).data().id;
   new Region(id);
  });
   
  $(document).on('click', '.quest', function(e){
   e.preventDefault();
   
   var r = $(this).data().id;
   new Encounter(r);
  });
 }
}
