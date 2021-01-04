var DC.Shop =  {
 type: '',
 selectedItem: 0,
 transactionType: 'buy',
 data: {},
 items: [],
 init: (id) => {
  DC.Shop.type = id;
  switch(id){
   case "trade":
    DC.Shop.data =  new Trade();
    break;
   case "armor":
    DC.Shop.data =  new Armor();
    break;
   case "weapons":
    DC.Shop.data =  new Weapons();
    break;
   case "tavern":
    DC.Shop.data =  new Tavern();
    break;
   case "healer":
    DC.Shop.data =  new Healer();
    break;
   case "court":
    DC.Shop.data =  new Court();
    break;
   case "post_office":
    DC.Shop.data =  new PostOffice();
    break;
   case "smithy":
    DC.Shop.data =  new Smithy();
    break;
   case "guild":
    DC.Shop.data =  new Skill();
    break;
   case "gems":
    break;
   case "diner":
    break;
   case "storage":
    DC.Shop.data =  new Storage();
    break;
   case "den":
    
    break;
   case "inn":
    
    break;
  }
  DC.controllers.Player.buildStats();
  DC.Shop.data.build();
 },
 generateBlurb: (id) => {
  var blurbs = Blurbs[id],
   i = Math.floor(Math.random()*blurbs.length);
   
  return blurbs[i];
 },
 polish: () => {
  if(DC.Shop.selectedItem){
   if(DC.Shop.transactionType == 'buy'){
    // only player inventory
   }else{
    if(DC.controllers.Player.hasEnoughForTransaction(40)){
     var item = Inventory.getItem(DC.Shop.selectedItem);
     item.polish();
				}else{
					DC.Tpl.buildModal("error", "<strong>You still have enough Marks to purchase.</strong>");
				}
			}
		}else{
			DC.Tpl.buildModal("error", "<strong>You select an item first.</strong>");
		}
	},
	identify: () => {
		if(DC.Shop.selectedItem){
			if(DC.Shop.transactionType == 'buy'){
				// only player inventory
			}else{
				if(DC.controllers.Player.hasEnoughForTransaction(40)){
					var item = Inventory.getItem(DC.Shop.selectedItem);
					item.identify();
				}else{
					DC.Tpl.buildModal("error", "<strong>You still have enough Marks to purchase.</strong>");
				}
			}
		}else{
			DC.Tpl.buildModal("error", "<strong>You select an item first.</strong>");
		}
	},
	transaction: () => {
		if(DC.Shop.selectedItem){
			console.log(DC.Shop.selectedItem);
			if(DC.Shop.transactionType == 'buy'){
				DC.Shop.buy();
			}else{
				DC.Shop.sell();
			}
		}else{
			DC.Tpl.buildModal("error", "<strong>You select an item first.</strong>");
		}
	},
	info: () => {
		if(DC.Shop.selectedItem){
			
		}else{
			DC.Tpl.buildModal("error", "<strong>You select an item first.</strong>");
		}
	},
	buy: () => {
		var item = DC.Shop.getItem(DC.Shop.selectedItem);
		item.qty = 1;
		
		if(DC.controllers.Player.hasEnoughForTransaction(item.cost)){
			DC.models.Player.cash = DC.models.Player.cash-item.cost;
			DC.models.Player.cashToday = DC.models.Player.cashToday-item.cost;
			
			Inventory.addItem(item);
			Socket.emit('shop-buy', {id: DC.models.Player.owner, itm: item});
			Socket.on('shop-buy-result', (data) => {
				DC.Tpl.buildModal("error", "<strong>You have successfully purchased 1 "+data+".</strong>");
				
			});
		}else{
			DC.Tpl.buildModal("error", "<strong>You still have enough Marks to purchase.</strong>");
		}
	},
	sell: () => {
		
	},
	getItem: (id) => {
		var result = DC.Shop.items.filter(obj => {
			if(obj.id == id){
				return obj;
			}
		});
		return result;
	},
	buildSellItems: (data) => {
		console.log(data);
	}
};