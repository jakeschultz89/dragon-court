class Armor {
	name = 'Suitor\'s Able Armor';
	blurb = '';
	region = 'town';
	
	constructor(){
		this.blurb = DC.Shop.generateBlurb('armor');
	}
	
	build(){
		var data = {
			'type': 'armor',
			'transactions': true,
			'identifyBtn': false,
			'polishBtn': true,
			'infoBtn': false,
			'items': true,
			'title': this.name,
			'blurb': this.blurb,
			'region': this.region
		};
		
		Socket.emit('shop-init', data);
	}
}