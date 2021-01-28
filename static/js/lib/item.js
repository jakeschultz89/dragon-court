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
	
	get id(){
		return this.id;
	}
	
	set id(id){
		this.id = id;
	}
	
	get name(){
		return this.name;
	}
	
	set name(name){
		this.name = name;
	}
	
	get region(){
		return this.region;
	}
	
	set region(region){
		this.region = region;
	}
	
	get shop(){
		return this.shop;
	}
	
	set shop(shop){
		this.shop = shop;
	}
	
	get guts(){
		return this.guts;
	}
	
	set guts(guts){
		this.guts = guts;
	}
	
	get wits(){
		return this.wits;
	}
	
	set wits(wits){
		this.wits = wits;
	}
	
	get charm(){
		return this.charm;
	}
	
	set charm(charm){
		this.charm = charm;
	}
	
	get attack(){
		return this.attack;
	}
	
	set attack(attack){
		this.attack = attack;
	}
	
	get defend(){
		return this.defend;
	}
	
	set defend(defend){
		this.defend = defend;
	}
	
	get skill(){
		return this.skill;
	}
	
	set skill(skill){
		this.skill = skill;
	}
	
	get cost(){
		return this.cost;
	}
	
	set cost(cost){
		this.cost = cost;
	}
	
	get func(){
		return this.func;
	}
	
	set func(func){
		this.func = func;
	}
	
	get equippable(){
		return this.equippable;
	}
	
	set equippable(equippable){
		this.equippable = equippable;
	}
	
	get qty(){
		return this.qty;
	}
	
	set qty(qty){
		this.qty = qty;
	}
	
	get equipped(){
		return this.equipped;
	}
	
	set equipped(equipped){
		this.equipped = equipped;
	}
	
	get identified(){
		return this.identified;
	}
	
	set identified(identified){
		this.identified = identified;
	}
	
	get abilities(){
		return this.abilities;
	}
	
	set abilities(abilities){
		this.abilities = abilities;
	}
	
	get maxEnchants(){
		return this.maxEnchants;
	}
	
	set maxEnchants(maxEnchants){
		this.maxEnchants = maxEnchants;
	}
	
	get timesEnchanted(){
		return this.timesEnchanted;
	}
	
	set timesEnchanted(timesEnchanted){
		this.timesEnchanted = timesEnchanted;
	}
	
	get inStorage(){
		return this.inStorage;
	}
	
	set inStorage(inStorage){
		this.inStorage = inStorage;
	}
	
	get dropRate(){
		return this.dropRate;
	}
	
	set dropRate(dropRate){
		this.dropRate = dropRate;
	}
	
	get lvl(){
		return this.lvl;
	}
	
	set lvl(lvl){
		this.lvl = lvl;
	}
	
	get isSilver(){
		return this.isSilver;
	}
	
	set isSilver(isSilver){
		this.isSilver = isSilver;
	}
	
	get isCrystal(){
		return this.isCrystal;
	}
	
	set isCrystal(isCrystal){
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