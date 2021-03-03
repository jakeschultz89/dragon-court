class Item {
	id = 0;
	name = 0;
	region = '';
	shop = '';
	guts = 0;
	wits = 0;
	charm = 0;
	attack = 0;
	defend = 0;
	skill = 0;
	cost = 0;
	func = '';
	equippable = 0;
	qty = 0;
	equipped = 0;
	identified = 0;
	abilities = '';
	maxEnchants = 0;
	timesEnchanted = 0;
	inStorage = 0;
	dropRate = 0;
	lvl = 0;
	isSilver = 0;
	isCrystal = 0;
	
	constructor(id, name, region, shop, guts, wits, charm, attack, defend, skill, cost, func, equippable, qty, equipped, identified, abilities, maxEnchants, timesEnchanted, inStorage, dropRate, lvl, isSilver, isCrystal){
		this.id = id;
		this.name = name;
		this.region = region;
		this.shop = shop;
		this.guts = guts;
		this.wits = wits;
		this.charm = charm;
		this.attack = attack;
		this.defend = defend;
		this.skill = skill;
		this.cost = cost;
		this.func = func;
		this.equippable = equippable;
		this.qty = qty;
		this.equipped = equipped;
		this.identified = identified;
		this.abilities = abilities;
		this.maxEnchants = maxEnchants;
		this.timesEnchanted = timesEnchanted;
		this.inStorage = inStorage;
		this.dropRate = dropRate;
		this.lvl = lvl;
		this.isSilver = isSilver;
		this.isCrystal = isCrystal;
	}
	
	addAbility(ability){
		return this.abilities += ","+ability;
    }
    
    hasAbility(ability){
		return this.abilities.includes(ability);
    }
    
    removeAbility(ability){
		if(this.abilities.includes(ability)){
			this.abilities.replace(ability, '');
			if(this.abilities.startsWith(",")){
				this.abilities.replace(",", "");
			}
		}
		return this.abilities;
    }
    
    getDescription(forName = false){
		var itemDescription = '',
			funcParts = this.func.split(":");
		if(funcParts[0] == "Weapon" || funcParts[0] == "Armor"){
			if(this.hasAbility("Rust")){
				itemDescription += "@";
			}
			itemDescription += this.name;
			if(this.identified){
				itemDescription += "["+this.attack+"a, "+this.defend+"d]";
			}
		}else{
			if(forName){
                itemDescription = this.name;
            }else{
                itemDescription = this.func;
            }
		}
		return itemDescription;
    }
    
    identify(){
		this.identified = 1;
    }
    
    polish(){
		if(this.hasAbility("Rust")){
			this.removeAbility("Rust");
		}
    }
}