class Trade {
	name = 'Trader\'s Curious Goods';
	blurb = '';
	region = 'town';
	
	constructor(){
		this.blurb = DC.Shop.generateBlurb('trade');
	}
	
	build(){
		var data = {
			'type': 'trade',
			'transactions': true,
			'identifyBtn': false,
			'polishBtn': false,
			'infoBtn': true,
			'items': true,
			'title': this.name,
			'blurb': this.blurb,
			'region': this.region
		};
		
		Socket.emit('shop-init', data);
	}
}