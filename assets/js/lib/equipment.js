class Equipment {
	head = {};
	body = {};
	feet = {};
	left = {};
	right = {};
	weapon = {};
	armor = {};
	
	constructor(){}
	
	getItemByLocation(loc){
		var item;
        switch(loc){
            default:
            case "head":
                item = this.head;
                break;

            case "body":
                item = this.body;
                break;

            case "feet":
                item = this.feet;
                break;

            case "right":
                item = this.right;
                break;

            case "left":
                item = this.left;
                break;
        }
        return item;
	}
	
	getTotals(){
		var totals = {
			guts: 0,
			wits: 0,
			charm: 0,
			attack: 0,
			defend: 0,
			skill: 0
		};
		var guts=0;
        var wits=0;
        var charm=0;
        var attack=0;
        var defend=0;
        var skill=0;
        if(head != null){
            guts = guts+head.getGuts();
            wits = wits+head.getWits();
            charm = charm+head.getCharm();
            attack = attack+head.getAttack();
            defend = defend+head.getDefend();
            skill = skill+head.getSkill();
        }
        if(body != null){
            guts = guts+body.getGuts();
            wits = wits+body.getWits();
            charm = charm+body.getCharm();
            attack = attack+body.getAttack();
            defend = defend+body.getDefend();
            skill = skill+body.getSkill();
        }
        if(feet !=null){
            guts = guts+feet.getGuts();
            wits = wits+feet.getWits();
            charm = charm+feet.getCharm();
            attack = attack+feet.getAttack();
            defend = defend+feet.getDefend();
            skill = skill+feet.getSkill();
        }
        if(right != null){
            guts = guts+right.getGuts();
            wits = wits+right.getWits();
            charm = charm+right.getCharm();
            attack = attack+right.getAttack();
            defend = defend+right.getDefend();
            skill = skill+right.getSkill();
        }
        if(left != null){
            guts = guts+left.getGuts();
            wits = wits+left.getWits();
            charm = charm+left.getCharm();
            attack = attack+left.getAttack();
            defend = defend+left.getDefend();
            skill = skill+left.getSkill();
        }
        
        totals.guts = guts;
        totals.wits = wits;
        totals.charm = charm;
        totals.attack = attack;
        totals.defend = defend;
        totals.skill = skill;
        
        return totals;
	}
	
	hasActiveEffect(name){
		var status = false;
		if(head.hasAbility(name)){
			status = true;
		}
		if(body.hasAbility(name)){
			status = true;
		}
		if(feet.hasAbility(name)){
			status = true;
		}
		if(left.hasAbility(name)){
			status = true;
		}
		if(right.hasAbility(name)){
			status = true;
		}
		return status;
	}
}