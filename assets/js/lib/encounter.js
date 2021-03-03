class Encounter{
 creature = {};
 
 constructor(location){
  new Ajax('api/encounter/init/', 'location='+location, (result) => {
  console.log(JSON.stringify(result));
   DC.Tpl.display(result.data);
   
   this.creature = new Creature(data.creature);
   this.creature.subscribe(new CreatureObserver);
   this.attach();
  });
 }
 
 attach(){
  $(document).on('click', '#encounterAttack', function(e){
   e.preventDefault();
   
   new Ajax('api/encounter/attack/', {}, (result) => {
   
   });
  });
  
  $(document).on('click', '#encounterFlee', function(e){
   e.preventDefault();
				
		new Ajax('api/encounter/flee/', {}, (result) => {
   
   });
  });
  
  $(document).on('click', '.encounterOption', function(e){
   e.preventDefault();
   
   var type = $(this).data('option');
   
   new Ajax('api/encounter/option/', {action: type}, (result) => {
   
   });
  });
 }
}