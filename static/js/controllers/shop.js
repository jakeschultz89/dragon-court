DC.Shop =  {
 type: '',
 selectedItem: 0,
 transactionType: 'buy',
 data: {},
 items: [],
 events: {
  init: () => {
   $(document).on('click', '.shop-item', function(e){
    e.preventDefault();
    
    DC.Shop.selectedItem = $(this).data().id;
    $(this).style('background-color', rgba(0,0,0,0.2));
   });
   
   $(document).on('click', '#shopTrade', function(e){
    e.preventDefault();
    DC.Shop.transaction();
   });
   
   $(document).on('click', '#shopExit', function(e){
    e.preventDefault();
     DC.Region.init(DC.models.Player.region);
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
    DC.Shop.info();
   });
   
   $(document).on('click', '#shopPolish', function(e){
    e.preventDefault();
    DC.Shop.polish();
   });
   
   $(document).on('click', '#shopIdentify', function(e){
    e.preventDefault();
    DC.Shop.identify();
   });
  }
 },
 listeners: {
  init: () => {
   Socket.on('shop-buy-result', (data) => {
				DC.Tpl.buildModal("info", "<strong>You have successfully purchased 1 "+data+".</strong>");
				
			});
   
   Socket.on('shop-init-result', (data) => {
    for(var i = 0; i < data.data.items.length; i++){
     var item = new Item(data.data.items[i].id, data.data.items[i].name, data.data.items[i].region, data.data.items[i].shop, data.data.items[i].guts, data.data.items[i].wits, data.data.items[i].charm, data.data.items[i].attack, data.data.items[i].defend, data.data.items[i].skill, data.data.items[i].cost, data.data.items[i].func, data.data.items[i].equippable, 1000, 0, 1, '', data.data.items[i].max_enchants, data.data.items[i].times_enchanted, data.data.items[i].in_storage, data.data.items[i].drop_rate, 1, 0, 0);
     DC.Shop.items.push(item);
    }
    var html = DC.Tpl.build(data);
    DC.Game.container.html(html);
   });
  }
 },
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
  DC.Player.buildStats();
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
    if(DC.Player.hasEnoughForTransaction(40)){
     var item = DC.Inventory.getItem(DC.Shop.selectedItem);
     Socket.emit('shop-polish', {id: DC.models.Player.owner, itm: item});
				}else{
					DC.Tpl.buildModal("error", "<strong>You still have enough Marks to purchase.</strong>");
				}
			}
		}else{
			DC.Tpl.buildModal("error", "<strong>You must select an item first.</strong>");
		}
	},
	identify: () => {
		if(DC.Shop.selectedItem){
			if(DC.Shop.transactionType == 'buy'){
				// only player inventory
			}else{
				if(DC.Player.hasEnoughForTransaction(40)){
					var item = DC.Inventory.getItem(DC.Shop.selectedItem);
					Socket.emit('shop-identify', {id: DC.models.Player.owner, itm: item});
				}else{
					DC.Tpl.buildModal("error", "<strong>You still have enough Marks to purchase.</strong>");
				}
			}
		}else{
			DC.Tpl.buildModal("error", "<strong>You must select an item first.</strong>");
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
			DC.Tpl.buildModal("error", "<strong>You must select an item first.</strong>");
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
		if(DC.Player.hasEnoughForTransaction(item.cost)){
			Socket.emit('shop-buy', {id: DC.models.Player.owner, itm: item});
		}else{
			DC.Tpl.buildModal("error", "<strong>You do not have enough Marks to purchase.</strong>");
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