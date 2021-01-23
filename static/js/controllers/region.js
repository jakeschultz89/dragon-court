DC.Region = {
 data:  {},
 listeners: {
  init: () => {
   Socket.on('region-init-result', (data) => {
	   var html = DC.Tpl.build(data);
	   DC.Game.container.html(html);
	  });
  }
 },
 events: {
  init: () => {
   $(document).on('click', '.shop', function(e){
    e.preventDefault();
    
    var type = $(this).data().id;
    DC.Shop.init(type);
   });
   
   $(document).on('click', '.region-change', function(e){
    e.preventDefault();
    
    var id = $(this).data().id;
    DC.Region.init(id);
   });
   
   $(document).on('click', '.quest', function(e){
    e.preventDefault();
    
    var r = $(this).data().id;
    DC.Encounter.init(r);
   });
  }
 },
 init: (id) => {
  DC.Player.region = id;
  DC.Region.data = RegionFactory.get(DC.Player.region);
  DC.Region.data.build();
  DC.Player.buildStats();
 }
};