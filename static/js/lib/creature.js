class Creature {
	_id = 0;
	_name = '';
	_guts = 0;
	_wits = 0;
	_exp = 0;
	_fame = 0;
	_abilities = '';
	_option = '';
	_items = '';
	_level = 0;
	_fighterSkillCt = 0;
	_magicSkillCt = 0;
	_traderSkillCt = 0;
	
	constructor(id, name, guts, wits, exp, fame, abilities, option, region, items, level){
		this._id = id;
        this._name = name;
        this._guts = guts;
        this._wits = wits;
        this._exp = exp;
        this._fame = fame;
        this._option = option;
        this._region = region;
        this._items = items;
        this._level = level;
	}
	
	get id(){
		return this._id;
	}
	
	set id(id){
		this._id = id;
	}
	
	get name(){
		return this._name;
	}
	
	set name(name){
		this._name = name;
	}
	
	get region(){
		return this._region;
	}
	
	set region(region){
		this._region = region;
	}
	
	get guts(){
		return this._guts;
	}
	
	set guts(guts){
		this._guts = guts;
	}
	
	get wits(){
		return this._wits;
	}
	
	set wits(wits){
		this._wits = wits;
	}
	
	get exp(){
		return this._attack;
	}
	
	set attack(attack){
		this._attack = attack;
	}
	
	get defend(){
		return this._defend;
	}
	
	set defend(defend){
		this._defend = defend;
	}
	
	get skill(){
		return this._skill;
	}
	
	set skill(skill){
		this._skill = skill;
	}

	get level(){
		return this._level;
	}
	
	set level(level){
		this._level = level;
	}
	
	
}