DC.Inventory = {
 items: [],
 equipment: {},
 numItemsUsable: 0,
 selectedItem: 0,
 lastDumped: 0,
 init: () => {
  DC.Inventory.listeners.init();
  
  Socket.emit('inv-get', DC.models.User.id);
 },
 listeners: {
  init: () => {
   Socket.on("inv-get-incoming", (data) => {
    DC.Inventory.equipment = new Equipment();
    for(var i = 0; i < data.length; i++){
     var itmJson = data[i];
     var item = new Item(data[i].id, data[i].name, data[i].region, data[i].shop, data[i].guts+data[i].guts, data[i].wits+data[i].wits, data[i].charm+data[i].charm, data[i].attack+data[i].attack, data[i].defend+data[i].defend, data[i].skill+data[i].skill, data[i].cost, data[i].func, data[i].equippable, data[i].qty, data[i].equipped, data[i].identified, data[i].abilities, data[i].max_enchants, data[i].times_enchanted, data[i].in_storage, data[i].drop_rate, data[i].lvl, data[i].is_silver, data[i].is_crystal);
     if(item.equipped){
      var itemFunctions = item.func.split(":");
      
      if(item.abilities.includes("Bless")){
       DC.Player.addEffect(element);
      }
      if(itemFunctions[1] == "head"){
       DC.Inventory.equipment.head = item;
      }
      if(itemFunctions[1] == "body"){
       DC.Inventory.equipment.body = item;
       DC.Inventory.equipment.armor = item;
      }
      if(itemFunctions[1] == "feet"){
       DC.Inventory.equipment.feet = item;
      }
      if(itemFunctions[1] == "right"){
       DC.Inventory.equipment.right = item;
       DC.Inventory.equipment.weapon = item;
      }
      if(itemFunctions[1] == "left"){
       if(DC.Inventory.equipment.weapon == null){
        DC.Inventory.equipment.weapon = item;
       }
       DC.Inventory.equipment.left = item;
      }
      if(itemFunctions[1] == "both"){
       DC.Inventory.equipment.weapon = item;
       DC.Inventory.equipment.right = item;
       DC.Inventory.equipment.left = item;
      }
     }else{
      DC.Inventory.items.push(item);
     }
    }
    console.log(DC.Inventory);
   });
  }
 },
 hasItemByName: (name) => {
  var result = DC.Inventory.items.filter(obj => {
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
  var result = DC.Inventory.items.filter(obj => {
   if(obj.id == id){
    return obj;
   }
  });
  return result;
 },
 addItem: (obj, qty = null) => {
  if(obj.shop == 'trade' || obj.shop == 'gems'){
   if(DC.Inventory.hasItemByName(obj.name)){
    var item = DC.Inventory.getItem(obj.id);
    item.qty = item.qty + (qty != null) ? qty : 1;
   }else{
    DC.Inventory.items.push(obj);
    DC.Player.storage = DC.Player.storage + 1;
   }
  }else{
   DC.Inventory.items.push(obj);
   DC.Player.storage = DC.Player.storage + 1;
  }
 },
 drop: () => {
  if(DC.Inventory.selectedItem != 0){
   DC.Inventory.lastDumped = DC.Inventory.items.filter(obj => {
    if(obj.id == DC.Inventory.selectedItem){
     return obj;
    }
   });
   var newItems = DC.Inventory.items.filter(obj => {
    return obj != selectedItem;
   });
   DC.Inventory.items = newItems;
   DC.Player.storage = DC.Player.storage - 1;
  }else{
   // show error modal
  }
 },
 equip: () => {
 
 },
 use: () => {
  if(DC.Inventory.selectedItem != 0){
   var item = DC.Inventory.items.filter(obj => {
    if(obj.id == DC.Inventory.selectedItem){
     return obj;
    }
   });
   var itemFunctions = item.func;
   var functions = itemFunctions.split(",");
   
   if(itemFunctions.includes("Battle")){
    if(!DC.Player.isInEncounter()){
     // item cannot be used outside battle
    }else{
     if(DC.Inventory.numItemsUsable > 0){
      DC.Inventory.numItemsUsable = DC.Inventory.numItemsUsable - 1;
     }else{
      // no longer able to use items. increase skill.
     }
    }
   }
   
   if(item.abilities.includes("Bless")){
    DC.Player.addEffect(element);
   }
   if(itemFunctions[1] == "head"){
    DC.Inventory.equipment.head = item;
   }
   if(itemFunctions[1] == "body"){
    DC.Inventory.equipment.body = item;
    DC.Inventory.equipment.armor = item;
   }
   if(itemFunctions[1] == "feet"){
    DC.Inventory.equipment.feet = item;
   }
       if(itemFunctions[1] == "right"){
         DC.Inventory.equipment.right = item;
         DC.Inventory.equipment.weapon = item;
       }
       if(itemFunctions[1] == "left"){
         if(DC.Inventory.equipment.weapon == null){
           DC.Inventory.equipment.weapon = item;
         }
         DC.Inventory.equipment.left = item;
       }
       if(itemFunctions[1] == "both"){
         DC.Inventory.equipment.weapon = item;
         DC.Inventory.equipment.right = item;
         DC.Inventory.equipment.left = item;
       }
     }else{
       // show error modal
     }
   }
 };