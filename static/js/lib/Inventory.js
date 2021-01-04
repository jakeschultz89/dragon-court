DC.Inventory = {
 items: [],
 equipment: {},
 numItemsUsable: 0,
 selectedItem: 0,
 lastDumped: 0,
 init: () => {
  Socket.on("inv-get-incoming", (data) => {
   Inventory.equipment = new Equipment();
   for(var i = 0; i < data.length; i++){
    var itmJson = data[i];
    var item = new Item(data[i].id, data[i].name, data[i].region, data[i].shop, data[i].guts+data[i].guts, data[i].wits+data[i].wits, data[i].charm+data[i].charm, data[i].attack+data[i].attack, data[i].defend+data[i].defend, data[i].skill+data[i].skill, data[i].cost, data[i].func, data[i].equippable, data[i].qty, data[i].equipped, data[i].identified, data[i].abilities, data[i].max_enchants, data[i].times_enchanted, data[i].in_storage, data[i].drop_rate, data[i].lvl, data[i].is_silver, data[i].is_crystal);
    if(item.equipped){
     var itemFunctions = item.func.split(":");
	     if(item.abilities.includes("Bless")){
	      Player.addEffect(element);
	     }
	     if(itemFunctions[1] == "head"){
	      Inventory.equipment.head = item;
	     }
	     if(itemFunctions[1] == "body"){
	      Inventory.equipment.body = item;
	      Inventory.equipment.armor = item;
	     }
	     if(itemFunctions[1] == "feet"){
	      Inventory.equipment.feet = item;
	     }
	     if(itemFunctions[1] == "right"){
	      Inventory.equipment.right = item;
	      Inventory.equipment.weapon = item;
	     }
	     if(itemFunctions[1] == "left"){
	      if(Inventory.equipment.weapon == null){
	       Inventory.equipment.weapon = item;
	      }
	      Inventory.equipment.left = item;
	     }
	     if(itemFunctions[1] == "both"){
	      Inventory.equipment.weapon = item;
	      Inventory.equipment.right = item;
	      Inventory.equipment.left = item;
	     }
	    }else{
	     Inventory.items.push(item);
	    }
	   }
	   console.log(Inventory);
	  });
	  
	  Socket.emit('inv-get', User.id);
	 },
	 hasItemByName: (name) => {
	  var result = Inventory.items.filter(obj => {
	   if(obj.name == name){
	    return obj;
	   }
	  });
	  if(result.length){
	   return true;
	  }else{
	   return false;
	  }
	 },
	 getItem: (id) => {
     var result = Inventory.items.filter(obj => {
       if(obj.id == id){
         return obj;
       }
     });
     return result;
   },
   addItem: (obj, qty = null) => {
     if(obj.shop == 'trade' || obj.shop == 'gems'){
       if(Inventory.hasItemByName(obj.name)){
         var item = Inventory.getItem(obj.id);
         item.qty = item.qty + (qty != null) ? qty : 1;
       }else{
         Inventory.items.push(obj);
         Player.storage = Player.storage + 1;
       }
     }else{
       Inventory.items.push(obj);
       Player.storage = Player.storage + 1;
     }
   },
   drop: () => {
     if(Inventory.selectedItem != 0){
       Inventory.lastDumped = Inventory.items.filter(obj => {
         if(obj.id == Inventory.selectedItem){
           return obj;
         }
       });
       var newItems = Inventory.items.filter(obj => {
         return obj != selectedItem;
       });
       Inventory.items = newItems;
       Player.storage = Player.storage - 1;
     }else{
       // show error modal
     }
   },
   equip: () => {
    
   },
   use: () => {
     if(Inventory.selectedItem != 0){
       var item = Inventory.items.filter(obj => {
         if(obj.id == Inventory.selectedItem){
           return obj;
         }
       });
       var itemFunctions = item.func;
       var functions = itemFunctions.split(",");
       if(itemFunctions.includes("Battle")){
         if(!Player.isInEncounter()){
           // item cannot be used outside battle
         }else{
           if(Inventory.numItemsUsable > 0){
             Inventory.numItemsUsable = Inventory.numItemsUsable - 1;
           }else{
             // no longer able to use items. increase skill.
           }
         }
       }
      
       if(item.abilities.includes("Bless")){
         Player.addEffect(element);
       }
       if(itemFunctions[1] == "head"){
         Inventory.equipment.head = item;
       }
       if(itemFunctions[1] == "body"){
         Inventory.equipment.body = item;
         Inventory.equipment.armor = item;
       }
       if(itemFunctions[1] == "feet"){
         Inventory.equipment.feet = item;
       }
       if(itemFunctions[1] == "right"){
         Inventory.equipment.right = item;
         Inventory.equipment.weapon = item;
       }
       if(itemFunctions[1] == "left"){
         if(Inventory.equipment.weapon == null){
           Inventory.equipment.weapon = item;
         }
         Inventory.equipment.left = item;
       }
       if(itemFunctions[1] == "both"){
         Inventory.equipment.weapon = item;
         Inventory.equipment.right = item;
         Inventory.equipment.left = item;
       }
     }else{
       // show error modal
     }
   }
 };