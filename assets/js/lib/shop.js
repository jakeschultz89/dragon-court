class Shop{
 type = '';
 selectedItem = 0;
 transactionType = 'buy';
 data = {};
 items = [];
 
 constructor(type){
  this.type = type;
  console.log(this.type);
  new Ajax('api/shop/init/', 'id='+this.type, (result) => {
   for(var i = 0; i < result.data.data.items.length; i++){
    var item = new Item(result.data.data.items[i].id, result.data.data.items[i].name, result.data.data.items[i].region, result.data.data.items[i].shop, result.data.data.items[i].guts, result.data.data.items[i].wits, result.data.data.items[i].charm, result.data.data.items[i].attack, result.data.data.items[i].defend, result.data.data.items[i].skill, result.data.data.items[i].cost, result.data.data.items[i].func, result.data.data.items[i].equippable, 1000, 0, 1, '', result.data.data.items[i].max_enchants, result.data.data.items[i].times_enchanted, result.data.data.items[i].in_storage, result.data.data.items[i].drop_rate, 1, 0, 0);
    this.items.push(item);
   }
   DC.Tpl.display(result.data);
   this.attach();
  });
 }
 
 attach(){
  var t = this;
  $(document).on('click', '.shop-item', function(e){
   e.preventDefault();
    
   t.selectedItem = $(this).data().id;
   
   $(this).css('background-color', '#ccc');
   $(this).siblings().css('background-color', 'transparent');
  });
   
  $(document).on('click', '#shopTrade', function(e){
   e.preventDefault();
   t.transaction();
  });
   
  $(document).on('click', '#shopExit', function(e){
   e.preventDefault();
   new Region(DC.Player.region);
  });
   
  $(document).on('click', '#shopBuy', function(e){
   e.preventDefault();
   // load shop inventory
  });
   
  $(document).on('click', '#shopSell', function(e){
   e.preventDefault();
   // load player inventory
  });
   
  $(document).on('click', '#shopInfo', function(e){
   e.preventDefault();
   t.info();
  });
   
  $(document).on('click', '#shopPolish', function(e){
   e.preventDefault();
   t.polish();
  });
   
  $(document).on('click', '#shopIdentify', function(e){
   e.preventDefault();
   t.identify();
  });
 }
 
 polish(){
  if(this.selectedItem){
   if(this.transactionType == 'buy'){
    // only player inventory
   }else{
    if(DC.Player.cash >= 40){
     var item = DC.Inventory.getItem(this.selectedItem);
     new Ajax('api/shop/polish', {id: DC.Player.owner, itm: item}, (result) => {
     
     });
				}else{
					DC.Tpl.modal("error", "Oops!", "<strong>You still have enough Marks to purchase.</strong>");
				}
			}
		}else{
			DC.Tpl.modal("error", "Oops!", "<strong>You must select an item first.</strong>");
		}
 }
 
 identify(){
  if(this.selectedItem){
			if(this.transactionType == 'buy'){
				// only player inventory
			}else{
				if(DC.Player.cash >= 40){
					var item = DC.Inventory.getItem(this.selectedItem);
					new Ajax('api/shop/identify/', {item: item}, (result) => {
					
					});
				}else{
					DC.Tpl.modal("error", "Oops",  "<strong>You still have enough Marks to purchase.</strong>");
				}
			}
		}else{
			DC.Tpl.modal("error", "Oops",  "<strong>You must select an item first.</strong>");
		}
 }
 
 transaction(){
  if(this.selectedItem){
			if(this.transactionType == 'buy'){
				this.buy();
			}else{
				this.sell();
			}
		}else{
			DC.Tpl.modal("error", "Oops!", "<strong>You must select an item first.</strong>");
		}
 }
 
 info(){
  if(this.selectedItem){
			
		}else{
			DC.Tpl.modal("error", "Oops!", "<strong>You select an item first.</strong>");
		}
 }
 
 buy(){
  var item = this.getItem(this.selectedItem);
		var item = item[0];
		item.qty = 1;
		if(DC.Player.cash >= item.cost){
		 new Ajax('api/shop/buy/', {item: item}, (result) => {
		  DC.Tpl.modal("info", "Success!", "<strong>You have successfully purchased 1 "+result.data+".</strong>");
		 });
		}else{
			DC.Tpl.modal("error", "Oops!", "<strong>You do not have enough Marks to purchase.</strong>");
		}
 }
 
 sell(){
 
 }
 
 getItem(id){
  var result = this.items.filter(obj => {
			if(obj.id == id){
				return obj;
			}
		});
		return result;
 }
}