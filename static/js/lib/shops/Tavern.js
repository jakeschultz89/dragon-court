class Tavern {
	name = 'Keeper\'s Bed and Breakfast';
	blurb = '';
	region = 'town';
	
	constructor(){
		this.blurb = DC.Shop.generateBlurb('tavern');
	}
	
	build(){
		var data = {
			'type': 'tavern',
			'transactions': false,
			'identifyBtn': false,
			'polishBtn': false,
			'infoBtn': false,
			'items': false,
			'title': this.name,
			'blurb': this.blurb,
			'region': this.region
		};
		
		Socket.emit('shop-init', data);
	}
}